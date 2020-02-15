import * as firebaseui from 'firebaseui'
import { auth } from './firebase'

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    auth.EmailAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  tosUrl: 'http://google.com',
  privacyPolicyUrl: 'http://google.com'
}

let instance = null

class Auth {
  constructor() {
    if(instance){
      return instance
    }

    instance = this

    this._ui = new firebaseui.auth.AuthUI(auth())
    this._handleLogin = () => {}
    this._handleLogout = () => {}
    this._handleError = (error) => console.log(error)

    auth().onAuthStateChanged((user) => {
      if (user) {
        this._handleLogin(user)
      } else {
        this._handleLogout(user)
      }
    }, function(error) {
      this._handleError(error)
    });
  }

  onLogin(callback) {
    this._handleLogin = callback
  }

  onLogout(callback) {
    this._handleLogout = callback
  }

  onError(callback) {
    this._handleError = callback
  }

  triggerLogin(selector) {
    this._ui.start(selector, uiConfig)
  }
}

export default Auth
