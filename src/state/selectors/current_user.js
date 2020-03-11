export const currentUserSelector = (state) => state.currentUser.user
export const currentUserIdSelector = (state) => (state.currentUser.user || {}).uid
export const isUserLoggedInSelector = (state) => state.currentUser.loginStatus == 'logged_in'
export const isUserLoggedOutSelector = (state) => state.currentUser.loginStatus == 'logged_out'
export const isUserPendingSelector = (state) => state.currentUser.loginStatus == 'pending'
