import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { handleCreateProduct, handleFetchProducts } from '@/api/productApi'
import type { Product, ProductList, CreateResponse, Pagination } from '@/types'

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
  const status = ref<'idle' | 'submitting' | 'finished'>('idle')
  const valid = ref(false)
  const loading = ref(false)
  const error = ref()

  async function handleSubmit(): Promise<void> {
    try {
      status.value = 'submitting'
      loading.value = true
      const res = await handleCreateProduct(product)
      data.value = res
    } catch (error: unknown) {
      error.value = error
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { product, data, valid, loading, status, error, handleSubmit }
})

export const useProductsStore = defineStore('products', () => {
  const data = ref<ProductList[]>([])
  const loading = ref(false)
  const error = ref()
  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
  })

  async function fetchProducts(): Promise<void> {
    try {
      loading.value = true
      const res = await handleFetchProducts(pagination.value)
      data.value = res.products
    } catch (error: unknown) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchProducts }
})
