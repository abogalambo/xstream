const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)
const initialState = {
  index: -1, // displaying cover
  recording: false,
  recordingStartedAt: null
}

const canNavigate = (state) => !state.recording

const currentSegment = (state = null, action) => {
  const { type, payload } = action

  switch (type) {

    case 'NEW_STREAM': {
      return initialState
    }

    case 'NEXT_SEGMENT': {
      if(canNavigate(state)) {
        return updateObject(initialState, {
          index: state.index + 1
        })
      }else{
        return state
      }
    }

    case 'PREVIOUS_SEGMENT': {
      if(canNavigate(state)) {
        return updateObject(initialState, {
          index: state.index - 1
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
        recording: false
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
