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

const indexWithinBounds = (targetIndex, segments) =>  segments.length > targetIndex && targetIndex >= -1
const canToggleMode = (state) => !state.currentSegment.recording

const currentStream = (state = null, action) => {
  const { type, payload } = action
  switch (type) {

    case 'NEW_STREAM': {
      if(state == null){
        return {
          title: "",
          segments: [],
          mode: 'compose',
          canEdit: true,
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

    case 'TOGGLE_MODE': {
      if(canToggleMode(state)){
        const { mode } = state
        const newMode = (mode == "compose") ? "playback" : "compose"
        return updateObject(state, {
          mode: newMode
        })
      }else{
        return state
      }
    }

    case 'SEGMENT_ENDED': {
      const { segments, currentSegment, mode } = state
      const { index } = currentSegment

      if(mode == 'compose') return state

      if(!indexWithinBounds(index + 1, segments)) return state
      
      return updateObject(state, {
        currentSegment: currentSegmentReducer(currentSegment, action)
      })
    }

    case 'GO_TO_SEGMENT': {
      const { segments, currentSegment } = state
      const targetIndex = payload.index

      if(indexWithinBounds(targetIndex, segments)){
        return updateObject(state, {
          currentSegment: currentSegmentReducer(currentSegment, action)
        })
      }else{
        return state
      }
    }

    case 'ADD_SEGMENT': {
      const { segments, currentSegment } = state
      const { index, recording } = currentSegment
      const targetIndex = index + 1
      const { timestamp } = payload

      if(recording) return state;

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

    case 'ADD_IMAGE':
    case 'REMOVE_IMAGE':
    case 'SET_IMAGE_CAPTION':
    case 'SET_SEGMENT_TEXT': {
      const { segments, currentSegment } = state
      const currentIndex = currentSegment.index

      return updateObject(state, {
        segments: updateItemAtIndex(segments, currentIndex, (segment) => {
          return segmentReducer(segment, action)
        })
      })
    }

    case 'START_PLAYING':
    case 'STOP_PLAYING':
    case 'START_RECORDING':
    case 'REMOVE_RECORDING':
    case 'STOP_RECORDING': {
      const { segments, currentSegment } = state
      const currentIndex = currentSegment.index

      return updateObject(state, {
        segments: updateItemAtIndex(segments, currentIndex, (segment) => {
          return segmentReducer(segment, action)
        }),
        currentSegment: currentSegmentReducer(currentSegment, action)
      })
    }

    default:
      return state
  }
}

export default currentStream
