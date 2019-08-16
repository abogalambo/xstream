const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const segmentReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {

    case 'SET_SEGMENT_TEXT': {
      return updateObject(state, {
        text: payload.text
      })
    }

    case 'STOP_RECORDING': {
      return updateObject(state, {
        audio: {
          url: payload.audioUrl
        }
      })
    }

    case 'REMOVE_RECORDING': {
      const {audio, ...newState} = state;

      return newState
    }

    default:
      return state
  }
}

export default segmentReducer
