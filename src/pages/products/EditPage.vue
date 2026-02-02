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
    title: 'Update Product',
    disabled: true,
    href: 'breadcrumbs_link_1',
  },
]

const route = useRoute()
const productId = Number(route.params.id)
const productData = ref<ProductResponse>()
onMounted(async () => {
  const res = await handleFetchProductById(productId)
  if (res) {
    productData.value = res.product
  }
})
</script>
<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon icon="mdi-package-variant" size="small"></v-icon>
    </template>
  </v-breadcrumbs>
  <h1 class="mb-6">Update Product</h1>
  <ProductForm :productData="productData" />
</template>
