export interface Category {
  id: number
  name: string
  parentCategoryId?: number
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
export interface CategoryResponse {
  id: number
  name: string
  parentCategoryId?: number
  description?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
