<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { messaging } from '../firebase-config'
import { getToken, onMessage } from 'firebase/messaging'
import { handleUpdateToken } from '@/api/http/notification/fetchApi'

const fcmToken = ref('')
const notificationMessage = ref('')
const isSubscribed = ref(false)

const profile = localStorage.getItem('profile')
const userId = profile && JSON.parse(profile).id

const BASE_PATH = import.meta.env.BASE_URL
const VAPID_KEY =
  'BNSV2DvPsrNblkgChinb112a7rGz-w5jtupXhiGKlGcs4NGp9BBzhNWXseKP-oxPoSxPwxDucnjlOaKpioDISqE' // Get this from Firebase Console -> Project settings -> Cloud Messaging -> Web Push certificates

// Function to request notification permission and get the token
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      console.log('Notification permission granted.')
      await getAndSendToken()
    } else {
      console.warn('Notification permission denied.')
      isSubscribed.value = false
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error)
    isSubscribed.value = false
  }
}

// Function to get the FCM token and send it to your backend
const getAndSendToken = async () => {
  try {
    let registration = null
    if ('serviceWorker' in navigator) {
      console.log('Attempting to register service worker...')
      try {
        registration = await navigator.serviceWorker.register(
          `${BASE_PATH}firebase-messaging-sw.js`, // Use BASE_PATH
          { scope: BASE_PATH }, // Set the scope to your base path
        )
        console.log('Service Worker registered successfully with scope:', registration.scope)
      } catch (swError) {
        console.error('Service Worker registration failed:', swError)
        // If registration fails, Firebase Messaging won't work correctly.
        // You might want to prevent getToken from being called if this happens.
        return
      }
    } else {
      console.warn('Service Workers are not supported in this browser.')
      return
    }

    // Get FCM token. The service worker is automatically registered here.
    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    })

    if (currentToken) {
      console.log('FCM Registration Token:', currentToken)
      fcmToken.value = currentToken
      isSubscribed.value = true

      // // TODO: Send this token to your backend API
      // // Example using fetch (replace with your actual backend endpoint and user ID)
      await handleUpdateToken({ id: userId, token: currentToken, platform: 'web' })
      console.log('FCM token sent to backend successfully.')
    } else {
      console.warn('No registration token available. Request permission to generate one.')
      isSubscribed.value = false
    }
  } catch (error: any) {
    console.error('An error occurred while retrieving or sending token. ', error)
    isSubscribed.value = false
    // Handle specific errors, e.g., 'messaging/permission-blocked'
    if (error?.code === 'messaging/permission-blocked') {
      alert('Notification permission is blocked. Please enable it in your browser settings.')
    }
  }
}

onMounted(async () => {
  // Check if notifications are already granted when the component mounts
  if ('Notification' in window && Notification.permission === 'granted') {
    isSubscribed.value = true
    await getAndSendToken() // Refresh token or ensure it's sent to backend
  } else if ('Notification' in window && Notification.permission === 'default') {
    // Permission is 'default', meaning user hasn't explicitly granted or denied
    // You can prompt them to enable notifications here if you want immediate subscription
    // For this example, we let the button handle the explicit request.
  }

  // Handle foreground messages
  onMessage(messaging, (payload) => {
    console.log('Foreground message received:', payload)
    if (!payload.notification) {
      console.log('No notification payload received.')
      return
    }
    notificationMessage.value = payload.notification.title + ': ' + payload.notification.body

    // You can also display a custom in-app notification here instead of, or in addition to, the browser notification
    // For example, using a Vue component for toasts or banners.
    // Example: Show a simple alert for demonstration purposes
    alert(
      `New Message (Foreground):\nTitle: ${payload.notification.title}\nBody: ${payload.notification.body}\nData: ${JSON.stringify(payload.data)}`,
    )
  })
})
</script>

<template>
  <div class="notification-manager">
    <button @click="requestNotificationPermission" v-if="!isSubscribed">
      Enable Notifications
    </button>
    <p v-else>Notifications are enabled.</p>
    <p v-if="fcmToken">FCM Token: {{ fcmToken }}</p>
    <p v-if="notificationMessage">Message: {{ notificationMessage }}</p>
  </div>
</template>

<style scoped>
.notification-manager {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 20px;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
