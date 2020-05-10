import MediaManager from '../../lib/media_manager'

export const startRecording = (index) => ({
  type: 'START_RECORDING',
  payload: {
    index,
    timestamp: (new Date).getTime()
  }
})

export const stopRecording = (audioUrl, uploadKey, blob, duration, index) => {
  return (dispatch) => {
    (new MediaManager).write(uploadKey, blob).then(audioUrl => {
      dispatch({
        type: 'STREAM_ASSET_UPLOADED',
        payload: {
          uploadKey,
          assetUrl: audioUrl,
          timestamp: (new Date).getTime()
        }
      })
    })

    dispatch({
      type: 'STOP_RECORDING',
      payload: {
        audioUrl,
        duration,
        index,
        mediaKey: uploadKey,
        timestamp: (new Date).getTime()
      }    
    })
  } 
}

export const removeRecording = (index) => ({
  type: 'REMOVE_RECORDING',
  payload: {
    index,
    isConfirmationNeeded: true,
    timestamp: (new Date).getTime()
  }
})
