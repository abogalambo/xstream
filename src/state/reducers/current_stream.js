const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const updateItemAtIndex = (array, itemIndex, updateItemCallback) => {
  return array.map((item, index) => {
    if (index !== itemIndex) return item

    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
}

const currentStream = (state = null, action) => {
  const { type, payload } = action
  switch (type) {

    case 'NEW_STREAM': {
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
    }

    case 'SET_STREAM_TITLE': {
      return updateObject(state, {
        title: payload.title
      })
    }

    case 'NEXT_SEGMENT': {
      const { segments, currentSegment } = state
      if((segments.length - 1) > currentSegment.index){
        return updateObject(state, {
          currentSegment: updateObject(currentSegment, {
            index: currentSegment.index + 1
          })
        })
      }else{
        return state
      }
    }

    case 'PREVIOUS_SEGMENT': {
      const { currentSegment } = state
      if(currentSegment.index > 0){
        return updateObject(state, {
          currentSegment: updateObject(currentSegment, {
            index: currentSegment.index - 1
          })
        })
      }else{
        return state
      }
    }

    case 'ADD_SEGMENT': {
      const { segments, currentSegment } = state
      const targetIndex = Math.min(segments.length, currentSegment.index + 1)

      return updateObject(state, {
        segments: [
          ...segments.slice(0, targetIndex),
          {},
          ...segments.slice(targetIndex),
        ],
        currentSegment: updateObject(currentSegment, {
          index: targetIndex
        })
      })
    }

    case 'REMOVE_SEGMENT': {
      const { segments, currentSegment } = state
      const { index } = currentSegment

      return updateObject(state, {
        segments: [
          ...segments.slice(0, index),
          ...segments.slice(index + 1),
        ],
        currentSegment: updateObject(currentSegment, {
          index: Math.max(0, index - 1)
        })
      })
    }

    case 'SET_SEGMENT_TEXT': {
      const { segments, currentSegment } = state
      const currentIndex = currentSegment.index

      return updateObject(state, {
        segments: updateItemAtIndex(segments, currentIndex, (segment) => {
          return updateObject(segment, {
            text: payload.text
          })
        })
      })
    }

    default:
      return state
  }
}

export default currentStream
