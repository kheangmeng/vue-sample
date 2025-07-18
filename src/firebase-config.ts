import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDq7dG8geDaLUO7a7o4x7JgABONam03bE4',
  authDomain: 'about-firebase.firebaseapp.com',
  projectId: 'about-firebase',
  storageBucket: 'about-firebase.firebasestorage.app',
  messagingSenderId: '437896780302',
  appId: '1:437896780302:web:492424b3f1c48c3414ba5f',
  measurementId: 'G-DCYQZMEDC2', // Optional, if you use Analytics
}

const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

export { messaging, app }
