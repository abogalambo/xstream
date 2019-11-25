import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import config from '../../../../config'

const Autosave = () => {
  const { lastUpdateAt, lastRequestTriggeredAt, lastRequestStatus } = useSelector((state) => state.persistence)
  
  useEffect(() => {
    if(lastUpdateAt != null) {
      if(lastRequestTriggeredAt < lastUpdateAt) {
        const currentTime = (new Date).getTime()
        if(lastRequestTriggeredAt < currentTime - config.stream.autosaveInterval) {
          if(lastRequestStatus != 'pending') {
            console.log('need to update server')
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