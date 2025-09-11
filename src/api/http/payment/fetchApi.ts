import { mapPayments } from './mapping'
import type { Payment, PaymentResponse, Pagination } from '@/types'

const BASE_API = import.meta.env.VITE_BASE_API

export async function handlePayment(payment: Payment): Promise<PaymentResponse> {
  const res = await fetch(`${BASE_API}/api/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payment),
  })
  const data = await res.json()
  if (res.ok) {
    return data
  } else {
    throw new Error(data.message)
  }
}

export async function getPayments(pagination: Pagination): Promise<PaymentResponse[]> {
  try {
    const response = await fetch(
      `${BASE_API}/api/payments?page=${pagination.page}&limit=${pagination.limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    if (response?.ok) {
      const data = await response.json()
      return mapPayments(data)
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
