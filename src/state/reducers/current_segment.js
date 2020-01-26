const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)
const initialState = {
  index: -1, // displaying cover
  typing: false,
  // recording data
  recording: false,
  recordingStartedAt: null,
  // playing data
  playing: false,
  playingStartedAt: null,
  playingOffset: 0
}

const canNavigate = (state) => (!state.recording && !state.typing)
const indexWithinBounds = (targetIndex, segments) =>  segments.length > targetIndex && targetIndex >= -1

const currentSegment = (state = null, action, currentStream) => {
  const { type, payload } = action

  switch (type) {

    case 'NEW_STREAM':
    case 'FETCH_STREAM_FULFILLED': {
      return initialState
    }

    case 'PLAY_STREAM': {
      return {
        ...state,
        index: indexWithinBounds(0, currentStream.segments) ? 0 : state.index
      }
    }

    case 'GO_TO_SEGMENT': {
      if(canNavigate(state)) {
        return updateObject(initialState, {
          index: payload.index
        })
      }else{
        return state
      }
    }

    case 'SEGMENT_ENDED': {
      const { mode, segments } = currentStream
      const { index, playingStartedAt } = state
      const shouldGoToNextSegment = (mode == 'playback' && indexWithinBounds(index + 1, segments))

      if(shouldGoToNextSegment) {
        return updateObject(initialState, {
          index: index + 1
        })
      } else {
        const playingOffset = mode == 'playback' ? payload.timestamp - playingStartedAt : 0
        return updateObject(state, {
          playing: false,
          playingStartedAt: null,
          playingOffset
        })
      }
    }

    case 'ADD_SEGMENT': {
      return updateObject(initialState, {
        index: state.index + 1
      })
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
      return updateObject(state, {
        recording: false,
        recordingStartedAt: null
      })
    }

    case 'START_PLAYING': {
      const { playingOffset, playing } = state
      const playingStartedAt = payload.timestamp - playingOffset

      if(playing) {
        return state
      }

      return updateObject(state, {
        playing: true,
        playingStartedAt,
        playingOffset: 0
      })
    }

    case 'STOP_PLAYING': {
      const { playingStartedAt, playing } = state
      const playingOffset = payload.timestamp - playingStartedAt

      if(!playing) {
        return state
      }

      return updateObject(state, {
        playing: false,
        playingStartedAt: null,
        playingOffset
      })
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
