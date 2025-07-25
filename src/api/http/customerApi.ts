import type { CustomerResponse, Pagination } from '@/types'

const BASE_API = import.meta.env.VITE_BASE_API

export async function getCustomers(pagination: Pagination): Promise<CustomerResponse[]> {
  try {
    const response = await fetch(
      `${BASE_API}/api/customers?page=${pagination.page}&limit=${pagination.limit}`,
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
      return data.customers?.map((customer: CustomerResponse) => ({
        id: customer.id,
        name: customer.name,
        gender: customer.gender,
        email: customer.email,
        phone: customer.phone,
        photo_url: customer.photo_url,
        id_card_number: customer.id_card_number,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      }))
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
