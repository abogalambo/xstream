import segmentReducer from './segment'
import currentSegmentReducer from './current_segment'

const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const updateItemAtIndex = (array, itemIndex, updateItemCallback) => {
  return array.map((item, index) => {
    if (index !== itemIndex) return item

    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
}

const updateSegmentWithMediaKey = (segments, mediaKey, updateSegmentCallback) => {
  return segments.map((segment) => {
    const { audio, image } = segment

    if ((audio && audio.mediaKey == mediaKey) ||
        (image && image.mediaKey == mediaKey)) {
      return updateSegmentCallback(segment)
    }

    return segment
  })
}

const indexWithinBounds = (targetIndex, segments) =>  segments.length > targetIndex && targetIndex >= -1
const canToggleMode = (state) => !state.currentSegment.recording && state.page != 'view'

const initialState = {
  id: null,
  title: "",
  cover: null,
  segments: [],
  mode: 'compose',
  page: 'new',
  isStreamPlaying: false
}

const isStreamPlayingReducer = (state, action) => {
  const { mode, isStreamPlaying, currentSegment, segments } = state
  const { index, playing } = currentSegment
  const { type } = action
  const isLastSegment = index == segments.length - 1

  if(mode == 'playback' && type == 'START_PLAYING') {
    return true
  } else if(type == 'PLAY_STREAM') {
    return true
  } else if(type == 'STOP_PLAYING') {
    return false
  } else if(type == 'SEGMENT_ENDED' && isLastSegment) {
    return false
  } else if(type == 'GO_TO_SEGMENT') {
    return false
  } else if(type == 'TOGGLE_MODE') {
    return playing && mode == 'compose'
  } else {
    return isStreamPlaying
  }
}

const reorder = (array, itemIndex, spliceStartIndex) => {
  array.splice(spliceStartIndex, 0, array.splice(itemIndex, 1)[0])
  return array
}

const currentStream = (state = null, action) => {
  const { type, payload } = action
  switch (type) {

    case 'NEW_STREAM': {
      if(state == null){
        return {
          ...initialState,
          currentSegment: currentSegmentReducer(null, action)
        }
      }else{
        return state
      }
    }

    case 'FETCH_STREAM_FULFILLED': {
      const {streamData, page} = payload
      return {
        ...initialState,
        ...streamData,
        page,
        mode: (page == 'view') ? 'playback' : 'compose',
        currentSegment: currentSegmentReducer(null, action)
      }
    }

    case 'SET_STREAM_TITLE': {
      return updateObject(state, {
        title: payload.title
      })
    }

    case 'PLAY_STREAM': {
      return {
        ...state,
        mode: 'playback',
        isStreamPlaying: isStreamPlayingReducer(state, action),
        currentSegment: currentSegmentReducer(state.currentSegment, action, state)
      }
    }

    case 'ADD_COVER_IMAGE': {
      const { src, mediaKey } = payload
      return updateObject(state, {
        cover: {
          src,
          mediaKey,
          isPersisted: false
        }
      })
    }

    case 'REMOVE_COVER_IMAGE': {
      return updateObject(state, {
        cover: null
      })
    }

    case 'TOGGLE_MODE': {
      if(canToggleMode(state)){
        const { mode } = state
        const newMode = (mode == "compose") ? "playback" : "compose"
        return updateObject(state, {
          mode: newMode,
          isStreamPlaying: isStreamPlayingReducer(state, action)
        })
      }else{
        return state
      }
    }

    case 'GO_TO_SEGMENT': {
      const { segments, currentSegment } = state
      const targetIndex = payload.index

      if(indexWithinBounds(targetIndex, segments)){
        return updateObject(state, {
          currentSegment: currentSegmentReducer(currentSegment, action),
          isStreamPlaying: isStreamPlayingReducer(state, action)
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
      const { index } = payload

      if(segments[index]) {
        return updateObject(state, {
          segments: [
            ...segments.slice(0, index),
            ...segments.slice(index + 1),
          ],
          currentSegment: currentSegmentReducer(currentSegment, action, state)
        })
      }else{
        return state
      }
    }

    case 'REORDER_SEGMENTS': {
      const { segments, currentSegment } = state
      const { oldIndex, newIndex } = payload

      if(segments[oldIndex] && segments[newIndex]) {
        return {
          ...state,
          segments: reorder([...segments], oldIndex, newIndex),
          currentSegment: currentSegmentReducer(currentSegment, action)
        }
      }else{
        return state
      }
    }

    case 'ASSET_UPLOADED': {
      const { uploadKey } = payload
      const { segments, cover } = state
      if(cover && uploadKey == cover.mediaKey) {
        return {
          ...state,
          cover: {
            ...cover,
            isPersisted: true
          }
        }
      } else {
        return {
          ...state,
          segments: updateSegmentWithMediaKey(segments, uploadKey, (segment) => {
            return segmentReducer(segment, action)
          })
        }
      }
    }

    case 'ADD_IMAGE':
    case 'REMOVE_IMAGE':
    case 'SET_IMAGE_CAPTION':
    case 'SET_IMAGE_STYLE':
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
    case 'START_TYPING':
    case 'STOP_TYPING':
    case 'START_RECORDING':
    case 'REMOVE_RECORDING':
    case 'STOP_RECORDING': {
      const { segments, currentSegment } = state
      const currentIndex = currentSegment.index

      return updateObject(state, {
        segments: updateItemAtIndex(segments, currentIndex, (segment) => {
          return segmentReducer(segment, action)
        }),
        currentSegment: currentSegmentReducer(currentSegment, action),
        isStreamPlaying: isStreamPlayingReducer(state, action)
      })
    }

    case 'SEGMENT_ENDED': {
      const { currentSegment } = state

      return updateObject(state, {
        currentSegment: currentSegmentReducer(currentSegment, action, state),
        isStreamPlaying: isStreamPlayingReducer(state, action)
      })
    }

    case 'SAVE_STREAM_FULFILLED': {
      if(state.id == null && payload.id) {
        return updateObject(state, { id: payload.id })
      } else {
        return state
      }
    }

    default:
      return state
  }
}

export default currentStream
