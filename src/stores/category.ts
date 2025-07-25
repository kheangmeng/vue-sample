import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { handleCreateCategory, handleFetchCategories } from '@/api/fake/categoryApi'
import type { Category, CategoryResponse, Pagination } from '@/types'

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
  const status = ref<'idle' | 'submitting' | 'finished'>('idle')
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit(): Promise<void> {
    try {
      status.value = 'submitting'
      loading.value = true
      const res = await handleCreateCategory(category)
      data.value = res.category
      categories.data.push({
        ...category,
        id: Math.round(Math.random() * 1000000),
      })
    } catch (error: unknown) {
      error.value = error
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { category, data, valid, loading, status, error, handleSubmit }
})

export const useCategoriesStore = defineStore('categories', () => {
  const data = ref<CategoryResponse[]>([])
  const loading = ref(false)
  const error = ref()
  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
  })

  async function fetchCategories(): Promise<void> {
    try {
      loading.value = true
      const res = await handleFetchCategories(pagination.value)
      data.value = res.categories
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchCategories }
})
