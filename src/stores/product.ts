import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { handleCreate, fetchList } from '@/api/productApi'
import type { Product, ProductResponse, CreateResponse } from '@/types'

export const useProductStore = defineStore('product', () => {
  const product = reactive<Product>({
    name: '',
    description: '',
    categoryId: null,
    brand: '',
    supplierId: undefined,
    tags: [],
    isActive: true,
    isSellable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '',
    taxExempt: false,
    basePrice: undefined,
    sku: '',
    barcode: '',
    stockQuantity: undefined,
    lowStockThreshold: undefined,
  })
  const data = ref<CreateResponse>()
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit(): Promise<void> {
    try {
      loading.value = true
      const res = (await handleCreate(product)) as CreateResponse
      data.value = res
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { product, data, valid, loading, error, handleSubmit }
})

export const useProductsStore = defineStore('products', () => {
  const data = ref<ProductResponse[]>([])
  const loading = ref(false)
  const error = ref()

  async function fetchProducts(): Promise<void> {
    try {
      loading.value = true
      const res = (await fetchList()) as { data: ProductResponse[] }
      data.value = res.data
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchProducts }
})
