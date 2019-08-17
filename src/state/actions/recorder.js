export const startRecording = () => {
  return {
    type: 'START_RECORDING',
    payload: {
      timestamp: (new Date).getTime()
    }
  }
}

export const stopRecording = (audioUrl) => {
  return {
    type: 'STOP_RECORDING',
    payload: {
      audioUrl: audioUrl
    }
  }
}

export const removeRecording = () => {
  return {
    type: 'REMOVE_RECORDING'
  }
}

export const playRecording = () => ({
  type: 'PLAY_RECORDING'
})
