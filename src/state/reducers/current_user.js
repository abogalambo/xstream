const initialState = {
  loginStatus: 'pending',
  user: null
}

const currentUser = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {

    case 'USER_LOGGED_IN': {
      const { user } = payload
      return {
        loginStatus: 'logged_in',
        user
      }
    }

    case 'USER_LOGGED_OUT': {
      return {
        loginStatus: 'logged_out',
        user: null
      }
    }

    default:
      return state
  }
}

export default currentUser
