import type { Login, LoginResponse } from '@/types'

const BASE_API = import.meta.env.VITE_BASE_API

export async function handleLogin(credentials: Login): Promise<LoginResponse> {
  const res = await fetch(`${BASE_API}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  const data = await res.json()
  if (res.ok) {
    return { token: data.token }
  } else {
    throw new Error(data.message)
  }
}
