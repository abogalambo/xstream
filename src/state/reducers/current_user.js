const initialState = null

const currentUser = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'USER_LOGGED_IN': {
      const { user } = payload
      return user
    }

    case 'USER_LOGGED_OUT': {
      return initialState
    }

    default:
      return state
  }
}

export default currentUser
