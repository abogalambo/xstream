const currentStream = (state = null, action) => {
  const { type, payload } = action
  const { segments, currentSegment } = state || {}

  switch (type) {
    case 'NEW_STREAM':
      if(state == null){
        return {
          title: "New Stream",
          segments: [],
          mode: 'edit',
          currentSegment: {
            index: 0
          }
        }
      }else{
        return state
      }
    case 'SET_STREAM_TITLE':
      return Object.assign({}, state, {
        title: payload.title
      })
    case 'NEXT_SEGMENT':
      if((segments.length - 1) > currentSegment.index){
        return Object.assign({}, state, {
          currentSegment: Object.assign({}, currentSegment, {
            index: currentSegment.index + 1
          })
        })
      }else{
        return state
      }
    case 'PREVIOUS_SEGMENT':
      if(currentSegment.index > 0){
        return Object.assign({}, state, {
          currentSegment: Object.assign({}, currentSegment, {
            index: currentSegment.index - 1
          })
        })
      }else{
        return state
      }
    case 'ADD_SEGMENT':
      const targetIndex = Math.min(segments.length, currentSegment.index + 1)

      return Object.assign({}, state, {
        segments: [
          ...segments.slice(0, targetIndex),
          {},
          ...segments.slice(targetIndex),
        ],
        currentSegment: Object.assign({}, currentSegment, {
          index: targetIndex
        })
      })
    case 'REMOVE_SEGMENT':
      const { index } = currentSegment

      return Object.assign({}, state, {
        segments: [
          ...segments.slice(0, index),
          ...segments.slice(index + 1),
        ],
        currentSegment: Object.assign({}, currentSegment, {
          index: Math.max(0, index - 1)
        })
      })
    case 'SET_SEGMENT_TEXT':
      const currentIndex = currentSegment.index

      return Object.assign({}, state, {
        segments: segments.map((segment, index) => {
          if(index == currentIndex) {
            return Object.assign({}, segment, {
              text: payload.text
            })
          }else{
            return segment
          }
        })
      })
    default:
      return state
  }
}

export default currentStream
