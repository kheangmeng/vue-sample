import { mapCustomers } from './mapping'
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
      return mapCustomers(data)
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
