import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Category, CategoryResponse } from '@/types'
import dummyData from '@/assets/dummy-data.json'

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
      categories.list.push({
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
  const list = ref<CategoryResponse[]>([])
  const loading = ref(false)
  const error = ref()

  async function fetchCategories(): Promise<void> {
    try {
      loading.value = true
      const res = (await fetchList()) as { data: CategoryResponse[] }
      list.value = res.data
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { list, loading, error, fetchCategories }
})

function fetchList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: dummyData.categories,
        status: 'success',
        code: 200,
      })
    }, 1000)
  })
}

function handleCreate(category: Category) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (category.name) {
        resolve({
          message: 'Category created successfully',
          status: 'success',
          code: 201,
        })
      } else {
        reject('Something went wrong.')
      }
    }, 1000)
  })
}
