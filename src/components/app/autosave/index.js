import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import {
  saveStream as saveStreamAction,
  saveStreamLater as saveStreamLaterAction
} from '../../../state/actions/autosave'
import {
  autosaveParamsSelector
} from '../../../state/selectors/current_stream'
import config from '../../../../config'
import styles from './autosave.css'

const Autosave = () => {
  const {
    lastUpdateAt,
    lastRequestTriggeredAt,
    lastRequestStatus,
    isTimeoutSet
  } = useSelector((state) => state.persistence)

  const autosaveParams = useSelector(autosaveParamsSelector)

  const dispatch = useDispatch()
  const saveStream = () => dispatch(saveStreamAction(autosaveParams))
  const saveStreamLater = (delay) => dispatch(saveStreamLaterAction(delay))

  const status = (
    (lastRequestStatus == 'failure' && 'failure') ||
    (lastRequestStatus == 'pending' && 'pending') ||
    ((lastRequestStatus == 'success') && (lastRequestTriggeredAt > lastUpdateAt) && 'saved')
  )

  const [isActive, setIsActive] = useState(false)
  const [activeTimer, setActiveTimer] = useState()

  useEffect(() => {
    if(lastUpdateAt != null) {
      if(lastRequestTriggeredAt < lastUpdateAt) { // user made an update after last server update
        if(lastRequestStatus != 'pending') { // if there is an update request pending, wait for it then this code will trigger again because it depends on lastRequestStatus
          const currentTime = (new Date).getTime()
          if(lastRequestTriggeredAt < currentTime - config.stream.autosaveInterval) { // last update request was more than 5 seconds ago
            saveStream()
          }else{
            if(!isTimeoutSet) {
              const delay = config.stream.autosaveInterval - (currentTime - lastRequestTriggeredAt)
              saveStreamLater(delay)
            }
          }
        }
      }
    }
  }, [lastUpdateAt, lastRequestStatus, isTimeoutSet]);

  useEffect(() => {
    if (status) {
      setIsActive(true)
      if (activeTimer) {
        clearTimeout(setActiveTimer)
      }
      const timerId = setTimeout(() => {
        setIsActive(false)
      }, config.stream.snackbarDuration);
      setActiveTimer(timerId)
    }
  }, [status]);

  return isActive && status && (
    <>
      {status == 'failure' && (
        <span className={styles.autosave}>
          <FontAwesomeIcon className={styles.autosave_error}
          icon={faExclamationCircle} />
          Error while saving</span>
      )}

      {status == 'pending' && (
        <span className={styles.autosave}>Autosaving...</span>
      )}

      {status == 'saved' && (
        <span className={styles.autosave}>All saved!</span>
      )}
    </>
  ) || null
}

export default Autosave
