import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { Login, LoginResponse } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { handleLogin, mapResponse } from '@/api/authApi'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const login = reactive<Login>({
    email: '',
    password: '',
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
      const res = await handleLogin(login)
      data.value = mapResponse(res)
      authStore.setAuthenticated(true)
      router.push('/products')
    } catch (error: unknown) {
      error.value = error
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { login, data, valid, loading, status, error, handleSubmit }
})
