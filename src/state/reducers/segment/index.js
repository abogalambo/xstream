const updateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues)

const segmentReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {

    case 'ADD_IMAGE': {
      const { src, mediaKey } = payload
      return updateObject(state, {
        image: {
          src,
          mediaKey,
          isPersisted: false
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
      const { audioUrl, mediaKey } = payload
      return updateObject(state, {
        audio: {
          url: audioUrl,
          mediaKey
        }
      })
    }

    case 'REMOVE_RECORDING': {
      const {audio, ...newState} = state;

      return newState
    }

    case 'ASSET_UPLOADED': {
      const { uploadKey } = payload
      const {audio, image} = state
      if(audio && audio.mediaKey == uploadKey) {
        return {
          ...state,
          audio: {
            ...audio,
            isPersisted: true
          }
        }
      } else if(image && image.mediaKey == uploadKey) {
        return {
          ...state,
          image: {
            ...image,
            isPersisted: true
          }
        }
      } else {
        return state
      }
    }

    default:
      return state
  }
}

export default segmentReducer
