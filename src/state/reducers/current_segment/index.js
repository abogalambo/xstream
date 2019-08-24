const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)
const initialState = {
  index: -1, // displaying cover
  recording: false,
  playing: false,
  recordingStartedAt: null
}

const canNavigate = (state) => !state.recording

const currentSegment = (state = null, action) => {
  const { type, payload } = action

  switch (type) {

    case 'NEW_STREAM': {
      return initialState
    }

    case 'SEGMENT_ENDED': {
      return updateObject(initialState, {
        index: state.index + 1
      })
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

    case 'ADD_SEGMENT': {
      return updateObject(initialState, {
        index: state.index + 1
      })
    }

    case 'REMOVE_SEGMENT': {
      return updateObject(initialState, {
        index: Math.max(-1, state.index - 1)
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

    case 'REMOVE_RECORDING': {
      return updateObject(state, {
        recording: false,
        recordingStartedAt: null
      })
    }

    default:
      return state
  }
}

export default currentSegment
