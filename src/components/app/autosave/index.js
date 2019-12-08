import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

  return (
    <div className={styles.autosave}>
      {lastRequestStatus == 'failure' && (
        <span>⚠️error</span>
      )}

      {lastRequestStatus == 'pending' && (
        <span>⏳Saving...</span>
      )}

      {(lastRequestStatus == 'success') && (lastRequestTriggeredAt > lastUpdateAt) && (
        <span>✅Saved</span>
      )}

      {(lastRequestStatus == 'success') && (lastRequestTriggeredAt < lastUpdateAt) && (
        <span>🔄Unsaved Changes</span>
      )}
    </div>
  )
}

export default Autosave
