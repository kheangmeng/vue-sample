import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getPayments, handlePayment } from '@/api/http/payment/fetchApi'
import { handleRefreshToken } from '@/api/http/auth/fetchApi'
import { useAuthStore } from '@/stores/auth'
import type { Payment, PaymentResponse, Pagination } from '@/types'

export const usePaymentStore = defineStore('payment', () => {
  const payment = reactive<Payment>({
    order_id: 2,
    amount: 100,
    payment_method: 'Cash',
  })
  const authStore = useAuthStore()
  const data = ref<PaymentResponse>()
  const status = ref<'idle' | 'submitting' | 'finished'>('idle')
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit(): Promise<void> {
    try {
      status.value = 'submitting'
      loading.value = true
      const res = await handlePayment(payment)
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
          handleSubmit()
        }
      }
      error.value = error
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { payment, data, valid, loading, status, error, handleSubmit }
})

export const usePaymentsStore = defineStore('payments', () => {
  const authStore = useAuthStore()
  const data = ref<PaymentResponse[]>([])
  const loading = ref(false)
  const error = ref()
  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
  })

  async function fetchPayments(): Promise<void> {
    try {
      loading.value = true
      const res = await getPayments(pagination.value)
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
          fetchPayments()
        }
      }
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchPayments }
})
