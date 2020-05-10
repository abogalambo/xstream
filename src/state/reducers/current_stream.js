import {
  isSegmentEmpty
} from '../../lib/stream'
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

const ensureLastEmptySegment = (segments, timestamp) => {
  const lastSegment = segments[segments.length - 1]
  if(!lastSegment || !isSegmentEmpty(lastSegment)) {
    return [
      ...segments,
      {timestamp}
    ]
  } else {
    let lastEmptyIndex = segments.length - 1
    for (let i = lastEmptyIndex; i > 0; i--) {
      if(segments[i - 1] && isSegmentEmpty(segments[i - 1])) {
        lastEmptyIndex = i - 1
      } else {
        break
      }
    }
    return (lastEmptyIndex == segments.length - 1) ? segments : segments.slice(0, lastEmptyIndex + 1)
  }
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

const reorder = (array, itemIndex, spliceStartIndex) => {
  array.splice(spliceStartIndex, 0, array.splice(itemIndex, 1)[0])
  return array
}

const currentStream = (state = null, action) => {
  const { type, payload } = action
  switch (type) {

    case 'NEW_STREAM': {
      if(state == null){
        const { uid, timestamp } = payload
        const { segments } = initialState

        return {
          ...initialState,
          authorId: uid,
          createdAt: timestamp,
          currentSegment: currentSegmentReducer(null, action),
          segments: ensureLastEmptySegment(segments, timestamp)
        }
      }else{
        return state
      }
    }

    case 'EXIT_STREAM': {
      return null
    }

    case 'FETCH_STREAM_FULFILLED': {
      const {streamData, page, timestamp} = payload
      const { segments } = streamData
      return {
        ...initialState,
        ...streamData,
        segments: ensureLastEmptySegment(segments, timestamp),
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
        isStreamPlaying: true,
        currentSegment: currentSegmentReducer(state.currentSegment, action, state)
      }
    }

    case 'PAUSE_STREAM': {
      return {
        ...state,
        isStreamPlaying: false
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
          isStreamPlaying: false
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
          isStreamPlaying: false
        })
      }else{
        return state
      }
    }

    case 'NEW_SCRIPT': {
      const { segments, currentSegment } = state
      const { index, timestamp } = payload

      const targetSegment = segments[index]
      const isTargetSegmentEmpty = isSegmentEmpty(targetSegment)
      const newSegments = isTargetSegmentEmpty ?
        segments : (
          ensureLastEmptySegment([
            ...segments.slice(0, index),
            { timestamp },
            ...segments.slice(index),
          ], timestamp)
        )

      return {
        ...state,
        segments: newSegments,
        currentSegment: currentSegmentReducer(currentSegment, action)
      }
    }

    case 'ADD_SEGMENT': {
      const { segments, currentSegment } = state
      const { recording } = currentSegment
      const { index, timestamp } = payload
      const targetIndex = index

      if(recording) return state;

      return {
        ...state,
        segments: ensureLastEmptySegment([
          ...segments.slice(0, targetIndex),
          { timestamp },
          ...segments.slice(targetIndex),
        ], timestamp),
        currentSegment: currentSegmentReducer(currentSegment, action)
      }
    }

    case 'REMOVE_SEGMENT': {
      const { segments, currentSegment } = state
      const { index, timestamp } = payload

      if(segments[index]) {
        return updateObject(state, {
          segments: ensureLastEmptySegment([
            ...segments.slice(0, index),
            ...segments.slice(index + 1),
          ], timestamp),
          currentSegment: currentSegmentReducer(currentSegment, action, state)
        })
      }else{
        return state
      }
    }

    case 'REORDER_SEGMENTS': {
      const { segments, currentSegment } = state
      const { oldIndex, newIndex, timestamp } = payload

      if(segments[oldIndex] && segments[newIndex]) {
        return {
          ...state,
          segments: ensureLastEmptySegment(
            reorder([...segments], oldIndex, newIndex),
            timestamp
          ),
          currentSegment: currentSegmentReducer(currentSegment, action)
        }
      }else{
        return state
      }
    }

    case 'STREAM_ASSET_UPLOADED': {
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
      const { timestamp } = payload

      return updateObject(state, {
        segments: ensureLastEmptySegment(
          updateItemAtIndex(segments, currentIndex, (segment) => {
            return segmentReducer(segment, action)
          }),
          timestamp
        )
      })
    }

    case 'SET_SEGMENT_SCRIPT': {
      const { segments } = state
      const { timestamp, index } = payload

      return updateObject(state, {
        segments: ensureLastEmptySegment(
          updateItemAtIndex(segments, index, (segment) => {
            return segmentReducer(segment, action)
          }),
          timestamp
        )
      })
    }

    case 'START_TYPING':
    case 'STOP_TYPING': {
      const { currentSegment } = state

      return {
        ...state,
        currentSegment: currentSegmentReducer(currentSegment, action)
      }
    }

    case 'START_RECORDING':
    case 'STOP_RECORDING':
    case 'REMOVE_RECORDING': {
      const { segments, currentSegment } = state
      const { timestamp, index } = payload

      return {
        ...state,
        segments: ensureLastEmptySegment(
          updateItemAtIndex(segments, index, (segment) => {
            return segmentReducer(segment, action)
          }),
          timestamp
        ),
        currentSegment: currentSegmentReducer(currentSegment, action)
      }
    }

    case 'SEGMENT_STARTED':
    case 'SEGMENT_PAUSED': {
      const { currentSegment } = state

      return { 
        ...state,
        currentSegment: currentSegmentReducer(currentSegment, action, state)
      }
    }

    case 'SEGMENT_ENDED': {
      const { segments, currentSegment } = state
      const { index } = currentSegment

      const isLastSegment = index == segments.length - 1
      
      return { 
        ...state,
        currentSegment: currentSegmentReducer(currentSegment, action, state),
        isStreamPlaying: !isLastSegment
      }
    }

    case 'SAVE_STREAM_FULFILLED': {
      if(state.id == null && payload.id) {
        return updateObject(state, { id: payload.id })
      } else {
        return state
      }
    }

    case 'PUBLISH_STREAM_PENDING': {
      return {
        ...state,
        isPublishPending: true
      }
    }

    case 'PUBLISH_STREAM_FULFILLED': {
      const { timestamp } = payload
      return {
        ...state,
        publishedAt: timestamp,
        isPublishPending: false
      }
    }

    default:
      return state
  }
}

export default currentStream
