export const setSegmentText = (text) => ({
  type: 'SET_SEGMENT_TEXT',
  payload: { text }
})

export const segmentEnded = () => ({
  type: 'SEGMENT_ENDED'
})
