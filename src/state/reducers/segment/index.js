const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const segmentReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {

    case 'ADD_IMAGE': {
      return updateObject(state, {
        image: {
          src: payload.src
        }
      })
    }

    case 'REMOVE_IMAGE': {
      const {image, ...newState} = state;

      return newState
    }

    case 'ADD_IMAGE_CAPTION': {
      return updateObject(state, {
        image: updateObject(state.image || {}, {
          caption: payload.caption
        })
      })
    }

    case 'REMOVE_IMAGE_CAPTION': {
      const {caption, ...newImage} = (state.image || {});

      return updateObject(state, {
        image: newImage
      })
    }

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
