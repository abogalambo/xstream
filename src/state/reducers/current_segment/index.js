const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)
const initialState = {
  index: -1, // displaying cover
  recording: false,
  playing: false,
  typing: false,
  recordingStartedAt: null
}

const canNavigate = (state) => (!state.recording && !state.typing)

const currentSegment = (state = null, action, currentStream) => {
  const { type, payload } = action

  switch (type) {

    case 'NEW_STREAM': {
      return initialState
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
      return updateObject(initialState, {
        index: state.index + 1
      })
    }

    case 'ADD_SEGMENT': {
      return updateObject(initialState, {
        index: state.index + 1
      })
    }

    case 'REMOVE_SEGMENT': {
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
      return updateObject(state, {
        playing: true
      })
    }

    case 'STOP_PLAYING': {
      return updateObject(state, {
        playing: false
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

    case 'TOGGLE_MODE': {
      const { mode } = currentStream
      if(mode == 'compose') {
        return initialState
      } else {
        return state
      }
    }

    default:
      return state
  }
}

export default currentSegment
