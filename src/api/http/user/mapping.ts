import type { UserResponse } from '@/types'

export function mapUserList(res: any): UserResponse[] {
  const users = res.users || []
  return users.map((u: UserResponse) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username,
    email: u.email,
  }))
}
