<script setup lang="ts">
import { ref, onMounted } from 'vue'

declare const FB: any

const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID
const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL

const errorMessage = ref('')
const user = ref(null)

onMounted(() => {
  // Initialize Facebook SDK
  window.fbAsyncInit = function () {
    FB.init({
      appId: facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v19.0', // Use the latest API version
    })

    FB.getLoginStatus(function (response) {
      statusChangeCallback(response)
    })
  }

  // Load the Facebook SDK asynchronously
  ;(function (d, s, id) {
    let js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
})

const statusChangeCallback = async (response) => {
  console.log('Facebook login status changed:', response)
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    const accessToken = response.authResponse.accessToken
    console.log('Facebook Access Token:', accessToken)
    await sendTokenToBackend(accessToken)
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    errorMessage.value = 'Not authorized to use your app.'
    user.value = null
  } else {
    // The person is not logged into Facebook, so you're not sure if
    // they are logged into your app or not.
    errorMessage.value = 'Not logged into Facebook.'
    user.value = null
  }
}

const loginWithFacebook = () => {
  FB.login(statusChangeCallback, { scope: 'public_profile,email' }) // Request email and public profile
}

const sendTokenToBackend = async (accessToken: string) => {
  try {
    const response = await fetch(`${backendApiUrl}/api/auth/facebook-verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken }),
    })

    const data = await response.json()

    if (response.ok) {
      console.log('Backend sign-in successful:', data)
      errorMessage.value = ''
      user.value = data.user // Assuming backend sends user info
      localStorage.setItem('userToken', data.token) // Store the JWT
    } else {
      console.error('Backend sign-in failed:', data.message || 'Unknown error')
      errorMessage.value = data.message || 'Sign-in failed. Please try again.'
      user.value = null
    }
  } catch (error) {
    console.error('Error sending token to backend:', error)
    errorMessage.value = 'Network error or backend issue. Please try again.'
    user.value = null
  }
}
</script>
<template>
  <div class="fb fb-container" @click="loginWithFacebook">
    <div class="fb-context">
      <img src="/fb.png" width="18" height="18" alt="Facebook Logo" />
      <span class="fb-text">Sign In with Facebook</span>
    </div>
    <!-- <h2>Sign In with Facebook</h2>
    <button @click="loginWithFacebook">Sign In with Facebook</button>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    <p v-if="user" style="color: green">Welcome, {{ user.name }}!</p> -->
  </div>
</template>

<style scoped>
.fb {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 4px;
}

.fb-container {
  -webkit-user-select: none;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dadce0;
  color: #3c4043;
  cursor: pointer;
  font-family: 'Google Sans', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
}

.fb-context {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
  height: 100%;
  position: relative;
  width: 100%;
}
.fb-text {
  flex-grow: 1;
  font-family: 'Google Sans', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

button {
  background-color: #1877f2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
