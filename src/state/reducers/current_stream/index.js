import segmentReducer from '../segment'
import currentSegmentReducer from '../current_segment'

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
          title: "",
          segments: [],
          mode: 'edit',
          currentSegment: currentSegmentReducer(null, action)
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
          currentSegment: currentSegmentReducer(currentSegment, action)
        })
      }else{
        return state
      }
    }

    case 'PREVIOUS_SEGMENT': {
      const { currentSegment } = state
      if(currentSegment.index >= 0){
        return updateObject(state, {
          currentSegment: currentSegmentReducer(currentSegment, action)
        })
      }else{
        return state
      }
    }

    case 'ADD_SEGMENT': {
      const { segments, currentSegment } = state
      const targetIndex = currentSegment.index + 1
      const { timestamp } = payload

      return updateObject(state, {
        segments: [
          ...segments.slice(0, targetIndex),
          { timestamp },
          ...segments.slice(targetIndex),
        ],
        currentSegment: currentSegmentReducer(currentSegment, action)
      })
    }

    case 'REMOVE_SEGMENT': {
      const { segments, currentSegment } = state
      const { index } = currentSegment

      if(segments[index]) {
        return updateObject(state, {
          segments: [
            ...segments.slice(0, index),
            ...segments.slice(index + 1),
          ],
          currentSegment: currentSegmentReducer(currentSegment, action)
        })
      }else{
        return state
      }
    }

    case 'SET_SEGMENT_TEXT': {
      const { segments, currentSegment } = state
      const currentIndex = currentSegment.index

      return updateObject(state, {
        segments: updateItemAtIndex(segments, currentIndex, (segment) => {
          return segmentReducer(segment, action)
        })
      })
    }

    default:
      return state
  }
}

export default currentStream
