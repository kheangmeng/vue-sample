import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { handleCreateProduct, handleFetchProducts } from '@/api/fake/productApi'
import type { Product, ProductResponse, ProductList, CreateResponse, Pagination } from '@/types'

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

  function setProduct(productData: ProductResponse): void {
    product.name = productData.name
    product.description = productData.description
    product.categoryId = productData.category.id
    product.brand = productData.brand
    product.supplierId = productData.supplierId
    product.tags = productData.tags
    product.isActive = productData.isActive
    product.isSellable = productData.isSellable
    product.createdAt = productData.createdAt
    product.updatedAt = productData.updatedAt
    product.imageUrl = productData.imageUrl
    product.taxExempt = productData.taxExempt
    product.basePrice = productData.basePrice
    product.sku = productData.sku
    product.barcode = productData.barcode
    product.stockQuantity = productData.stockQuantity
    product.lowStockThreshold = productData.lowStockThreshold
  }

  function resetProduct(): void {
    product.name = ''
    product.description = ''
    product.categoryId = null
    product.brand = ''
    product.supplierId = undefined
    product.tags = []
    product.isActive = true
    product.isSellable = true
    product.imageUrl = ''
    product.taxExempt = false
    product.basePrice = undefined
    product.sku = ''
    product.barcode = ''
    product.stockQuantity = undefined
    product.lowStockThreshold = undefined
  }

  async function handleSubmit(): Promise<void> {
    try {
      status.value = 'submitting'
      loading.value = true
      const res = await handleCreateProduct(product)
      data.value = res
    } catch (error: any) {
      error.value = error
    } finally {
      status.value = 'finished'
      loading.value = false
    }
  }

  return { product, data, valid, loading, status, error, handleSubmit, setProduct, resetProduct }
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
    } catch (error: any) {
      error.value = error
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchProducts }
})
