import MediaManager from '../../lib/media_manager'

export const startRecording = () => ({
  type: 'START_RECORDING',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const stopRecording = (audioUrl, uploadKey, blob, duration) => {
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
        mediaKey: uploadKey
      }    
    })
  } 
}

export const removeRecording = () => ({
  type: 'REMOVE_RECORDING',
  payload: {
    isConfirmationNeeded: true,
    timestamp: (new Date).getTime()
  }
})
