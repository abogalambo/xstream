import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  saveStream as saveStreamAction
} from '../../../state/actions/autosave'
import config from '../../../../config'

const Autosave = () => {
  const { lastUpdateAt, lastRequestTriggeredAt, lastRequestStatus } = useSelector((state) => state.persistence)
  const dispatch = useDispatch()
  const saveStream = () => dispatch(saveStreamAction())
  
  useEffect(() => {
    if(lastUpdateAt != null) {
      if(lastRequestTriggeredAt < lastUpdateAt) { // user made an update after last server update
        if(lastRequestStatus != 'pending') { // if there is an update request pending, wait for it then this code will trigger again because it depends on lastRequestStatus
          const currentTime = (new Date).getTime()
          if(lastRequestTriggeredAt < currentTime - config.stream.autosaveInterval) { // last update request was more than 5 seconds ago
            console.log('dispatch update server instantly')
            saveStream()
          }else{
            delay = config.stream.autosaveInterval - (currentTime - lastRequestStatus)
            console.log(`dispatch update server in ${delay} millis`)
          }
        }
      }
    }
  }, [lastUpdateAt, lastRequestStatus]);

  return (
    ''
  )
}

export default Autosave