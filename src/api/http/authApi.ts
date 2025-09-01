import type { Login, LoginResponse, Signup, RefreshTokenResponse } from '@/types'

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
    const { token, refreshToken, profile } = data.data
    return { token, refreshToken, profile }
  } else {
    throw new Error(data.message)
  }
}

export async function handleRefreshToken(): Promise<RefreshTokenResponse> {
  const res = await fetch(`${BASE_API}/api/auth/refresh-token`, {
    // credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-refresh-token': `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  })
  const data = await res.json()
  if (res.ok) {
    return data
  } else {
    throw new Error(data.message)
  }
}

export async function handleLogout(): Promise<void> {}

export async function handleSignup(req: Signup): Promise<string> {
  const res = await fetch(`${BASE_API}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
  const data = await res.json()
  if (res.ok) {
    return data.data?.message
  } else {
    throw new Error(data.message)
  }
}

export async function handleForgotPassword(): Promise<void> {}

export async function handleResetPassword(): Promise<void> {}

export async function handleVerifyEmail(): Promise<void> {}
