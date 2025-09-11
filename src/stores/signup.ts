import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { handleSignup } from '@/api/http/auth/fetchApi'
import type { Signup } from '@/types'

export const useSignupStore = defineStore('signup', () => {
  const router = useRouter()
  const signup = reactive<Signup>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const status = ref<'idle' | 'submitting' | 'finished'>('idle')
  const data = ref<string>()
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit() {
    try {
      status.value = 'submitting'
      loading.value = true
      data.value = await handleSignup(signup)
      router.replace('/signup-success')
    } catch (e: unknown) {
      error.value = e?.message
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { signup, data, valid, loading, status, error, handleSubmit }
})
