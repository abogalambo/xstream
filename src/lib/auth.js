import * as firebaseui from 'firebaseui'
import { auth } from './firebase'

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    auth.EmailAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: 'http://google.com',
  // Privacy policy url/callback.
  privacyPolicyUrl: 'http://google.com'
}

const ui = new firebaseui.auth.AuthUI(auth())

auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)
  } else {
    // User is signed out.
    console.log('logged out')
  }
}, function(error) {
  console.log(error);
});

// for testing only
const triggerLogin = () => {
  ui.start('#firebaseui-auth-container', uiConfig)
}
