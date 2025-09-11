import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCustomers } from '@/api/http/customer/fetchApi'
import { handleRefreshToken } from '@/api/http/auth/fetchApi'
import { useAuthStore } from '@/stores/auth'
import type { Customer, CustomerResponse, Pagination } from '@/types'

export const useProductStore = defineStore('customer', () => {
  const customer = reactive<Customer>({
    name: '',
    gender: '',
    email: '',
    phone: '',
    photo_url: '',
    id_card_number: '',
  })
  const data = ref<CustomerResponse[]>()
  const status = ref<'idle' | 'submitting' | 'finished'>('idle')
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  // async function handleSubmit(): Promise<void> {
  //   try {
  //     status.value = 'submitting'
  //     loading.value = true
  //     const res = await getCustomers(customer)
  //     data.value = res
  //   } catch (error: unknown) {
  //     error.value = error
  //   } finally {
  //     status.value = 'finished'
  //     loading.value = false
  //   }
  // }

  return { customer, data, valid, loading, status, error }
})

export const useCustomersStore = defineStore('customers', () => {
  const authStore = useAuthStore()
  const data = ref<CustomerResponse[]>([])
  const loading = ref(false)
  const error = ref()
  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
  })

  async function fetchCustomers(): Promise<void> {
    try {
      loading.value = true
      const res = await getCustomers(pagination.value)
      data.value = res
    } catch (error: unknown) {
      if (error.status === 401) {
        if (authStore.auth.retryToken) {
          authStore.setAuthenticated(false)
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          location.replace('/login')
        } else {
          authStore.setRetryToken(true)
          const res = await handleRefreshToken()
          localStorage.setItem('token', res?.token)
          fetchCustomers()
        }
      }
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchCustomers }
})
