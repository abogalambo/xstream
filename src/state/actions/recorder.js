export const startRecording = () => {
  return {
    type: 'START_RECORDING',
    payload: {
      timestamp: (new Date).getTime()
    }
  }
}

export const stopRecording = (recorder) => {
  return {
    type: 'STOP_RECORDING',
    payload: {
      audioUrl: recorder.audioUrl
    }
  }
}

export const removeRecording = (recorder) => {
  return {
    type: 'REMOVE_RECORDING'
  }
}

export const playRecording = () => ({
  type: 'PLAY_RECORDING'
})
