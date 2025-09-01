export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  customer_id: number
  role: 'Staff' | 'Customer'
}

export interface UserResponse {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  documents: string[]
}
