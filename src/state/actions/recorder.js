export const startRecording = () => ({
  type: 'START_RECORDING',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const stopRecording = () => ({
  type: 'STOP_RECORDING'
})

export const playRecording = () => ({
  type: 'PLAY_RECORDING'
})

export const removeRecording = () => ({
  type: 'REMOVE_RECORDING'
})
