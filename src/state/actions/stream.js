export const newStream = () => ({
  type: 'NEW_STREAM'
})

export const setStreamTitle = (title) => ({
  type: 'SET_STREAM_TITLE',
  payload: { title }
})

export const goToSegment = (index) => ({
  type: 'GO_TO_SEGMENT',
  payload: { index }
})

export const addSegment = () => ({
  type: 'ADD_SEGMENT',
  payload: {
    timestamp: (new Date).getTime()
  }
})

export const removeSegment = () => ({
  type: 'REMOVE_SEGMENT'
})