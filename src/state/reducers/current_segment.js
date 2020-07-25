import {
  newIndex
} from '../../lib/stream'

const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)
const initialState = {
  index: -1, // displaying cover
  typing: false,
  // recording data
  recording: false,
  recordingStartedAt: null,
  // playing data
  isStarted: false,
  startedAt: null,
  startOffset: 0
}

const canNavigate = (state) => (!state.typing)

const currentSegment = (state = null, action, currentStream) => {
  const { type, payload } = action

  switch (type) {

    case 'NEW_STREAM': {
      return {
        ...initialState,
        index: 0
      }
    }

    case 'FETCH_STREAM_FULFILLED': {
      return initialState
    }

    case 'PLAY_STREAM': {
      const { index } = state

      return (index == -1) ? {
        ...initialState,
        index: newIndex(-1, 0, currentStream.segments, true)
      } : state
    }

    case 'GO_TO_SEGMENT': {
      const { mode, segments } = currentStream
      const { index } = state
      if(canNavigate(state)) {
        return {
          ...initialState,
          index: newIndex(index, payload.index, segments, mode == 'playback')
        }
      }else{
        return state
      }
    }

    case 'TOGGLE_MODE': {
      const { mode, segments } = currentStream
      const { index } = state
      return {
        ...initialState,
        index: newIndex(index, index, segments, mode == 'compose')
      }
    }

    case 'ADD_SEGMENT': {
      return updateObject(initialState, {
        index: payload.index
      })
    }

    case 'NEW_SCRIPT': {
      return {
        ...initialState,
        index: payload.index + 1
      } 
    }

    case 'REMOVE_SEGMENT': {
      const { index } = payload

      if(index > state.index){
        return state
      }

      const { segments } = currentStream
      return updateObject(initialState, {
        index: Math.min(segments.length - 2, state.index)
      })
    }

    case 'START_RECORDING': {
      return updateObject(state, {
        recording: true,
        recordingStartedAt: payload.timestamp
      })
    }

    case 'STOP_RECORDING': {
      const { index } = payload
      const { index: currentIndex } = state

      return index == currentIndex ? {
        ...state,
        recording: false,
        recordingStartedAt: null
      } : state
    }

    case 'SEGMENT_STARTED': {
      const { startOffset, isStarted } = state
      const startedAt = payload.timestamp - startOffset

      if(isStarted) {
        return state
      }

      return {
        ...state,
        isStarted: true,
        startedAt,
        startOffset: 0
      }
    }

    case 'SEGMENT_PAUSED': {
      const { startedAt, isStarted } = state
      const startOffset = payload.timestamp - startedAt

      if(!isStarted) {
        return state
      }

      return {
        ...state,
        isStarted: false,
        startedAt: null,
        startOffset
      }
    }

    case 'SEGMENT_ENDED': {
      const { mode, segments } = currentStream
      const { index, startedAt } = state
      const nextSegmentIndex = newIndex(index, index + 1, segments, mode == 'playback')
      const shouldGoToNextSegment = (mode == 'playback' && nextSegmentIndex != index)

      if(shouldGoToNextSegment) {
        return {
          ...initialState,
          index: nextSegmentIndex
        }
      } else {
        const startOffset = mode == 'playback' ? payload.timestamp - startedAt : 0
        return {
          ...state,
          isStarted: false,
          startedAt: null,
          startOffset
        }
      }
    }

    case 'START_TYPING': {
      return updateObject(state, {
        typing: true
      })
    }

    case 'STOP_TYPING': {
      return updateObject(state, {
        typing: false
      })
    }

    case 'REMOVE_RECORDING': {
      return updateObject(state, {
        recording: false,
        recordingStartedAt: null
      })
    }

    case 'REORDER_SEGMENTS': {
      const { oldIndex, newIndex } = payload
      const { index } = state

      let nextIndex = index

      if(oldIndex == index) {
        nextIndex = newIndex
      }

      if(oldIndex < index && newIndex >= index) {
        nextIndex = index - 1
      }

      if(oldIndex > index && newIndex <= index) {
        nextIndex = index + 1
      }

      return {
        ...state,
        index: nextIndex
      }
    }

    default:
      return state
  }
}

export default currentSegment
