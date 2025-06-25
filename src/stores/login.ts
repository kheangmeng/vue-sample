import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { Login, LoginResponse } from '@/types'
import { useAuthStore } from '@/stores/auth'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const login = reactive<Login>({
    email: '',
    password: '',
  })
  const authStore = useAuthStore()
  const data = ref<LoginResponse>()
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit() {
    try {
      loading.value = true
      const res = await handleLogin(login)
      data.value = mapResponse(res)
      authStore.setAuthenticated(true)
      router.push('/products')
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { login, data, valid, loading, error, handleSubmit }
})

function mapResponse(data: unknown): LoginResponse {
  return {
    token: data?.token,
  }
}

function handleLogin(login: Login) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login.email === 'vue.sample@gmail.com' && login.password === 'secret') {
        resolve({
          message: 'login success',
          token: 'token123',
        })
      } else {
        reject('Invalid email or password.')
      }
    }, 1000)
  })
}
