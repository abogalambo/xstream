export const startRecording = (recorder) => {
  return (dispatch) => {
    recorder.onStart(() => {
      dispatch({
        type: 'START_RECORDING',
        payload: {
          timestamp: (new Date).getTime()
        }
      })
    })
    recorder.startRecording()
  }
}

export const stopRecording = (recorder) => {
  return (dispatch) => {
    recorder.onStop(() => {
      dispatch({
        type: 'STOP_RECORDING',
        payload: {
          audioUrl: recorder.audioUrl
        }
      })
    })
    recorder.stopRecording()
  }
}

export const removeRecording = (recorder) => {
  return (dispatch) => {
    recorder.reset()
    dispatch({
      type: 'REMOVE_RECORDING'
    })
  }
}

export const playRecording = () => ({
  type: 'PLAY_RECORDING'
})
