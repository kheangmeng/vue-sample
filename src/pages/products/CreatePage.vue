<script setup lang="ts">
import ProductForm from '@/components/forms/ProductForm.vue'

const items = [
  {
    title: 'Products',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: 'Create Product',
    disabled: true,
    href: 'breadcrumbs_link_1',
  },
]
</script>
<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon icon="mdi-package-variant" size="small"></v-icon>
    </template>
  </v-breadcrumbs>
  <h1 class="mb-6">Create Product</h1>
  <ProductForm />
</template>
