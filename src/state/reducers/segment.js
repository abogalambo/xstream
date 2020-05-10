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
          style: 'FIT',
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

    case 'SET_IMAGE_STYLE': {
      const { style } = payload
      if(!['COVER', 'FIT'].includes(style)) return state

      return {
        ...state,
        image: {
          ...state.image,
          style
        }
      }
    }

    case 'SET_SEGMENT_TEXT': {
      return updateObject(state, {
        text: payload.text
      })
    }

    case 'SET_SEGMENT_SCRIPT': {
      return updateObject(state, {
        script: payload.script
      })
    }

    case 'STOP_RECORDING': {
      const { audioUrl, mediaKey, duration } = payload
      return updateObject(state, {
        audio: {
          url: audioUrl,
          duration,
          mediaKey
        }
      })
    }

    case 'REMOVE_RECORDING': {
      const {audio, ...newState} = state;

      return newState
    }

    case 'STREAM_ASSET_UPLOADED': {
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
