// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app"

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDECTfaaZTc39Co6UmaWBPAyav0KOFLzZw",
  authDomain: "x-stream-45773.firebaseapp.com",
  databaseURL: "https://x-stream-45773.firebaseio.com",
  projectId: "x-stream-45773",
  storageBucket: "x-stream-45773.appspot.com",
  messagingSenderId: "178254637186",
  appId: "1:178254637186:web:85da59b8e72bb3bd3fac9b",
  measurementId: "G-1HEL3454DP"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
