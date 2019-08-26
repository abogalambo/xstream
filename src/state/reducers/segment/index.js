const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const segmentReducer = (state, action, currentStream) => {
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

    case 'SET_IMAGE_CAPTION': {
      if(payload.caption){
        return updateObject(state, {
          image: updateObject(state.image || {}, {
            caption: payload.caption
          })
        })
      }else{
        const {caption, ...newImage} = (state.image || {});

        return updateObject(state, {
          image: newImage
        })
      }
    }

    case 'SET_SEGMENT_TEXT': {
      return updateObject(state, {
        text: payload.text
      })
    }

    case 'STOP_RECORDING': {
      const { recordingStartedAt } = currentStream.currentSegment
      return updateObject(state, {
        audio: {
          url: payload.audioUrl,
          duration: payload.timestamp - recordingStartedAt
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
