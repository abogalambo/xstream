export const startRecording = () => ({
  type: 'START_RECORDING',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const stopRecording = (audioUrl) => ({
  type: 'STOP_RECORDING',
  payload: {
    audioUrl,
    timestamp: (new Date).getTime()
  }
})

export const removeRecording = () => ({
  type: 'REMOVE_RECORDING',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const startPlaying = () => ({
  type: 'START_PLAYING'
})

export const stopPlaying = () => ({
  type: 'STOP_PLAYING'
})
