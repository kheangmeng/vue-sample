import type { Subscribe, Unsubscribe, UserDeviceInfo } from '@/types'

const BASE_API = import.meta.env.VITE_BASE_API

export function handleUpdateToken(req: UserDeviceInfo): Promise<Response> {
  return fetch(`${import.meta.env.VITE_BASE_API}/api/notifications/save-fcm-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      id: req.id,
      token: req.token,
      platform: 'web', // or 'web-chrome', 'web-firefox', etc.
    }),
  })
}

export async function handleSubscribe(req: Subscribe): Promise<string> {
  const res = await fetch(`${BASE_API}/api/notifications/subscribe-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(req),
  })
  const data = await res.json()
  if (res.ok) {
    const { message } = data
    return message
  } else {
    throw new Error(data.message)
  }
}

export async function handleUnsubscribe(req: Unsubscribe): Promise<string> {
  const res = await fetch(`${BASE_API}/api/notifications/unsubscribe-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(req),
  })
  const data = await res.json()
  if (res.ok) {
    const { message } = data
    return message
  } else {
    throw new Error(data.message)
  }
}
