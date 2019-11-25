import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import config from '../../../../config'

const Autosave = () => {
  const { lastUpdateAt, lastRequestTriggeredAt, lastRequestStatus } = useSelector((state) => state.persistence)
  
  useEffect(() => {
    if(lastUpdateAt != null) {
      if(lastRequestTriggeredAt < lastUpdateAt) { // user made an update after last server update
        if(lastRequestStatus != 'pending') { // there is an update request pending, wait for it then this code will trigger again
          const currentTime = (new Date).getTime()
          if(lastRequestTriggeredAt < currentTime - config.stream.autosaveInterval) {
            console.log('need to update server')
          }else{
            console.log('need to make a delayed update to server')
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