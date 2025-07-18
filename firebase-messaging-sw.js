// Note: Use 'importScripts' for service workers to load external scripts
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker
const firebaseConfig = {
  apiKey: 'AIzaSyDq7dG8geDaLUO7a7o4x7JgABONam03bE4',
  authDomain: 'about-firebase.firebaseapp.com',
  projectId: 'about-firebase',
  storageBucket: 'about-firebase.firebasestorage.app',
  messagingSenderId: '437896780302',
  appId: '1:437896780302:web:492424b3f1c48c3414ba5f',
  measurementId: 'G-DCYQZMEDC2', // Optional, if you use Analytics
}

firebase.initializeApp(firebaseConfig)

// Retrieve an instance of Firebase Messaging in the service worker
const messaging = firebase.messaging()

// Handle background messages
// This is called when the app is in the background or closed
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)

  const notificationTitle = payload.notification.title || 'New Notification'
  const notificationOptions = {
    body: payload.notification.body || 'You have a new message.',
    icon: payload.notification.icon || '/firebase-logo.png', // Optional: path to an icon for the notification
    data: payload.data, // Custom data sent from backend
    // Add more options as needed for your notification
    // e.g., tag, image, actions, badge, silent
  }

  // Show the notification using the browser's Notification API
  // This will appear as a native system notification
  return self.registration.showNotification(notificationTitle, notificationOptions)
})

// Optional: Handle notification click event (when user clicks on the notification)
self.addEventListener('notificationclick', function (event) {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event)
  event.notification.close() // Close the notification

  const data = event.notification.data // Retrieve data payload

  // Example: open a specific URL when notification is clicked
  if (data && data.url) {
    event.waitUntil(clients.openWindow(data.url))
  } else {
    // Fallback: open the app's root URL
    event.waitUntil(clients.openWindow('/'))
  }
})
