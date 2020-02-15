export const userLoggedIn = (user) => (
  {
    type: 'USER_LOGGED_IN',
    payload: {
      user
    }
  }
)
