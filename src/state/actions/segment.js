export const setSegmentText = (text) => ({
  type: 'SET_SEGMENT_TEXT',
  payload: {
    text,
    timestamp: new Date().getTime()
  }
})
