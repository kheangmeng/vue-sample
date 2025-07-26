import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const auth = reactive({
    hasAuthenticated: false,
    retryToken: false,
  })
  function setAuthenticated(value: boolean) {
    auth.hasAuthenticated = value
  }
  function setRetryToken(value: boolean) {
    auth.retryToken = value
  }

  return { auth, setAuthenticated, setRetryToken }
})
