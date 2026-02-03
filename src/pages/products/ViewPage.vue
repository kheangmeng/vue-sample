<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductForm from '@/components/forms/ProductForm.vue'
import { handleFetchProductById } from '@/api/fake/productApi'
import type { ProductResponse } from '@/types'

const items = [
  {
    title: 'Products',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: 'View Product',
    disabled: true,
    href: 'breadcrumbs_link_1',
  },
]

const route = useRoute()
const productId = Number(route.params.id)
const productData = ref<ProductResponse>()
const loading = ref(false)
onMounted(async () => {
  loading.value = true
  try {
    const res = await handleFetchProductById(productId)
    if (res) {
      productData.value = res.product
    }
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon icon="mdi-package-variant" size="small"></v-icon>
    </template>
  </v-breadcrumbs>
  <h1 class="mb-6">View Product</h1>
  <ProductForm :productData="productData" readonly :loading="loading" />
</template>
