<script setup lang="ts">
import { ref, onMounted } from 'vue'

declare const google: any
declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void
  }
}

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

// Initialize Google Sign-In (using the newer GSI library)
// https://developers.google.com/identity/gsi/web/guides/overview
function handleCredentialResponse(response: any) {
  // response.credential contains the Google ID token
  const id_token = response.credential
  console.log('Encoded ID Token:', id_token)

  // Send this ID token to your backend
  fetch(`${import.meta.env.VITE_BASE_API}/api/auth/google-verify-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_token: id_token }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        // Store the JWT (e.g., in localStorage or a state management solution)
        localStorage.setItem('token', data.token)
        // alert('Logged in successfully!')
        // Redirect or update UI
      } else {
        alert('Login failed: ' + data.message)
      }
    })
    .catch((error) => {
      console.error('Error sending token to backend:', error)
      alert('An error occurred during login.')
    })
}

onMounted(() => {
  renderGoogleSignInButton()
})

function renderGoogleSignInButton() {
  google.accounts.id.initialize({
    client_id: googleClientId, // Use your actual Google Client ID
    callback: handleCredentialResponse,
  })
  google.accounts.id.renderButton(
    document.getElementById('google-signin-button'), // ID of a div element in your HTML
    { theme: 'outline', size: 'large' }, // customization attributes
  )
  // Optional: automatically prompt the user with One Tap
  // google.accounts.id.prompt();
}
</script>

<template>
  <div id="google-signin-button"></div>
</template>
