import Auth from '../../lib/auth'

export const triggerLoginUI = () => {
  return (dispatch) => {
    const auth = new Auth()
    auth.onLogin((user) => { dispatch(userLoggedIn(user)) })
    auth.triggerLogin('#firebaseui-auth-container')
  }
}

export const userLoggedIn = (user) => (
  {
    type: 'USER_LOGGED_IN',
    payload: {
      user
    }
  }
)
