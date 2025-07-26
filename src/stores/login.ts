import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { handleLogin as handleLoginFake, mapResponse } from '@/api/fake/authApi'
import { handleLogin } from '@/api/http/authApi'
import type { Login, LoginResponse } from '@/types'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const login = reactive<Login>({
    email: 'vue.sample@gmail.com',
    password: 'secret123',
  })
  const authStore = useAuthStore()
  const status = ref<'idle' | 'submitting' | 'finished'>('idle')
  const data = ref<LoginResponse>()
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit() {
    try {
      status.value = 'submitting'
      loading.value = true
      if (import.meta.env.VITE_ENV === 'development') {
        data.value = await handleLogin(login)
      } else {
        const res = await handleLoginFake(login)
        data.value = mapResponse(res)
      }
      localStorage.setItem('token', data.value.token)
      localStorage.setItem('refreshToken', data.value.refreshToken)
      authStore.setAuthenticated(true)
      router.replace('/products')
    } catch (error: unknown) {
      error.value = error
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { login, data, valid, loading, status, error, handleSubmit }
})
