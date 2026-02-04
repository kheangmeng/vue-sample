<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/product'
import { formatCurrency, formatDate } from '@/utilities/helper'

const store = useProductsStore()
const dialog = ref(false)
const headers = [
  { title: 'Product Name', key: 'name', align: 'start', minWidth: '150px' },
  { title: 'Description', key: 'description', minWidth: '250px' },
  { title: 'Brand', key: 'brand', minWidth: '100px' },
  { title: 'Price', key: 'basePrice', minWidth: '100px' },
  { title: 'Sellable', key: 'isSellable', align: 'end', minWidth: '100px' },
  { title: 'SKU', key: 'sku', minWidth: '150px' },
  { title: 'Stock Quantity', key: 'stockQuantity', align: 'end', minWidth: '150px' },
  { title: 'Low Stock Threshold', key: 'lowStockThreshold', align: 'end', minWidth: '250px' },
  { title: 'Created At', key: 'createdAt', align: 'end', minWidth: '150px' },
  { title: 'Updated At', key: 'updatedAt', align: 'end', minWidth: '150px' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false, minWidth: '100px' },
]

onMounted(() => {
  store.fetchProducts()
})

const snackbar = ref(false)
const snackbarMessage = ref('')
const deleteId = ref<number>()
function handleDelete(id: number) {
  deleteId.value = id
  dialog.value = true
}
async function handleConformDelete() {
  try {
    // await store.handleDelete(deleteId.value)
    store.fetchProducts()
    dialog.value = false
    snackbarMessage.value = 'Product deleted successfully!'
    snackbar.value = true
  } catch (error) {
    console.error('Error deleting product:', error)
  }
  deleteId.value = 0
}
</script>
<template>
  <v-row align="start" justify="space-between" class="my-6 mx-3">
    <h1>Products</h1>
    <v-btn
      color="primary"
      prepend-icon="mdi-plus"
      rounded="lg"
      text="Add a Product"
      border
      @click="$router.push('/products/create')"
    ></v-btn>
  </v-row>
  <v-card class="my-auto mx-auto pa-2" elevation="8" rounded="lg">
    <v-data-table
      border
      :headers="headers"
      :items="store.data"
      :loading="store.loading"
      :items-length="120"
    >
      <!-- <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-package-variant" size="x-small" start></v-icon>

          Products
        </v-toolbar-title>

        <v-btn
          class="me-2"
          color="primary"
          prepend-icon="mdi-plus"
          rounded="lg"
          text="Add a Product"
          border
          @click="$router.push('/products/create')"
        ></v-btn>
      </v-toolbar>
    </template> -->

      <template v-slot:item.title="{ value }">
        <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.basePrice="{ value }">
        <div>{{ formatCurrency(value) }}</div>
      </template>

      <template v-slot:item.isSellable="{ value }">
        <div>{{ value ? 'Yes' : 'No' }}</div>
      </template>

      <template v-slot:item.createdAt="{ value }">
        <div>{{ formatDate(value) }}</div>
      </template>

      <template v-slot:item.updatedAt="{ value }">
        <div>{{ formatDate(value) }}</div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end">
          <router-link :to="`/products/${item.id}`">
            <v-btn size="small" color="blue-lighten-2" icon="mdi-eye" variant="text"></v-btn>
            <!-- <v-icon color="medium-emphasis" icon="mdi-eye" size="small"></v-icon> -->
          </router-link>
          <router-link :to="`/products/${item.id}/edit`">
            <v-btn size="small" color="orange-lighten-2" icon="mdi-pencil" variant="text"></v-btn>
            <!-- <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"></v-icon> -->
          </router-link>

          <v-btn
            size="small"
            color="red-lighten-2"
            icon="mdi-delete"
            variant="text"
            @click="handleDelete(item.id)"
          ></v-btn>
        </div>
      </template>

      <template v-slot:no-data> No data </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="dialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-delete"
      title="Delete Product"
      text="Are you sure you want to delete this product?"
    >
      <template v-slot:actions>
        <div>
          <v-btn class="mr-3" variant="outlined" text="Cancel" @click="dialog = false"></v-btn>
          <v-btn
            variant="outlined"
            class="ms-auto"
            text="Confirm"
            color="red"
            @click="handleConformDelete"
          ></v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="2000">
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
