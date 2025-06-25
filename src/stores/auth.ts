import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const auth = reactive({
    hasAuthenticated: false,
  })
  function setAuthenticated(value: boolean) {
    auth.hasAuthenticated = value
  }

  return { auth, setAuthenticated }
})
