export const setSegmentText = (text, index) => ({
  type: 'SET_SEGMENT_TEXT',
  payload: {
    index,
    text,
    timestamp: new Date().getTime()
  }
})

export const setSegmentScript = (script, index) => ({
  type: 'SET_SEGMENT_SCRIPT',
  payload: {
    script,
    index,
    timestamp: new Date().getTime()
  }
})

export const newScript = (index) => ({
  type: 'NEW_SCRIPT',
  payload: {
    index,
    timestamp: new Date().getTime()
  }
})
