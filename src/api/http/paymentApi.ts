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
      return data.payments?.map((payment: PaymentResponse) => ({
        id: payment.id,
        order_id: payment.order_id,
        amount: payment.amount,
        payment_date: payment.payment_date,
        payment_method: payment.payment_method,
        invoice: payment.Invoice,
        order: payment.Order,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      }))
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
