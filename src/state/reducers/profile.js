const initialState = null

const profile = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'USER_LOGGED_IN': {
      return {
        isPending: true
      }
    }

    case 'FETCH_PROFILE_FULFILLED':
    case 'SAVE_PROFILE_FULFILLED': {
      const { id, ...rest } = payload.profile
      return rest
    }

    case 'FETCH_PROFILE_REJECTED': {
      return {}
    }

    case 'USER_LOGGED_OUT': {
      return initialState
    }

    default:
      return state
  }
}

export default profile
