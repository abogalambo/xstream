const initialState = null

const profile = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'USER_LOGGED_IN': {
      return {
        isPending: true
      }
    }

    case 'FETCH_PROFILE_FULFILLED': {
      const { id, ...rest } = payload.profile
      return rest
    }

    case 'SAVE_PROFILE_FULFILLED': {
      const { id, avatar, ...rest } = payload.profile
      return {
        ...state,
        ...rest,
        avatar: {
          ...state.avatar,
          ...avatar
        }
      }
    }

    case 'FETCH_PROFILE_REJECTED': {
      return {}
    }

    case 'USER_LOGGED_OUT': {
      return initialState
    }

    case 'ADD_AVATAR': {
      const { src, mediaKey } = payload
      return {
        ...state,
        avatar: {
          mediaKey,
          src,
          isPersisted: false
        }
      }
    }

    case 'REMOVE_AVATAR': {
      const { avatar, ...rest } = state
      return rest
    }

    case 'PROFILE_ASSET_UPLOADED': {
      const { assetUrl } = payload
      const { avatar } = state || {}
      return {
        avatar: {
          ...avatar,
          src: assetUrl,
          isPersisted: true
        }
      } 
    }

    default:
      return state
  }
}

export default profile
