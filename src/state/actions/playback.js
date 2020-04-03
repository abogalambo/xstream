export const segmentStarted = () => ({
  type: 'SEGMENT_STARTED',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const segmentPaused = () => ({
  type: 'SEGMENT_PAUSED',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const segmentEnded = () => ({
  type: 'SEGMENT_ENDED',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const playStream = () => ({
  type: 'PLAY_STREAM'
})

export const pauseStream = () => ({
  type: 'PAUSE_STREAM'
})
