import type { UserResponse, Pagination } from '@/types'
import { mapUserList } from './mapping'

const BASE_API = import.meta.env.VITE_BASE_API

export async function getUserList(pagination: Pagination): Promise<UserResponse[]> {
  const response = await fetch(
    `${BASE_API}/api/users?page=${pagination.page}&limit=${pagination.limit}`,
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
    return mapUserList(data)
  } else {
    throw response
  }
}
