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
      const { timestamp, profile } = payload
      const { id, avatar, ...rest } = profile
      return {
        ...state,
        ...rest,
        lastSavedAt: timestamp,
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
      const { assetUrl, timestamp } = payload
      const { avatar } = state || {}
      return {
        lastModifiedAt: timestamp,
        avatar: {
          ...avatar,
          src: assetUrl,
          isPersisted: true
        }
      }
    }

    case 'SET_PROFILE_NAME': {
      const { name, timestamp } = payload
      const { name: currentName, ...rest } = state
      return name == '' ? {
        ...rest,
        lastModifiedAt: timestamp
      } : {
        ...state,
        lastModifiedAt: timestamp,
        name
      }
    }

    default:
      return state
  }
}

export default profile
