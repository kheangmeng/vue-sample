import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { handleCreate, fetchList } from '@/api/categoryApi'
import type { Category, CategoryResponse } from '@/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = useCategoriesStore()
  const category = reactive<Category>({
    name: '',
    description: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentCategoryId: undefined,
  })
  const data = ref<CategoryResponse>()
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit(): Promise<void> {
    try {
      loading.value = true
      const res = (await handleCreate(category)) as CategoryResponse
      data.value = res
      categories.data.push({
        ...category,
        id: Math.round(Math.random() * 1000000),
      })
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { category, data, valid, loading, error, handleSubmit }
})

export const useCategoriesStore = defineStore('categories', () => {
  const data = ref<CategoryResponse[]>([])
  const loading = ref(false)
  const error = ref()

  async function fetchCategories(): Promise<void> {
    try {
      loading.value = true
      const res = (await fetchList()) as { data: CategoryResponse[] }
      data.value = res.data
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchCategories }
})
