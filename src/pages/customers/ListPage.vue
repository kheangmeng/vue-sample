<script setup lang="ts">
import { onMounted } from 'vue'
import { useCustomersStore } from '@/stores/customer'
// import { formatCurrency, formatDate } from '@/utilities/helper'

const store = useCustomersStore()
// const headers = [
//   { title: 'Product Name', key: 'name', align: 'start', minWidth: '150px' },
//   { title: 'Description', key: 'description', minWidth: '250px' },
//   { title: 'Brand', key: 'brand', minWidth: '100px' },
//   { title: 'Price', key: 'basePrice', minWidth: '100px' },
//   { title: 'Sellable', key: 'isSellable', align: 'end', minWidth: '100px' },
//   { title: 'SKU', key: 'sku', minWidth: '150px' },
//   { title: 'Stock Quantity', key: 'stockQuantity', align: 'end', minWidth: '150px' },
//   { title: 'Low Stock Threshold', key: 'lowStockThreshold', align: 'end', minWidth: '250px' },
//   { title: 'Created At', key: 'createdAt', align: 'end', minWidth: '150px' },
//   { title: 'Updated At', key: 'updatedAt', align: 'end', minWidth: '150px' },
//   { title: 'Actions', key: 'actions', align: 'end', sortable: false, minWidth: '100px' },
// ]

onMounted(() => {
  store.fetchCustomers()
})
</script>
<template>
  <v-sheet border rounded>
    <pre>{{ store.data }}</pre>
    <!-- <v-data-table
      :headers="headers"
      :hide-default-footer="store.data.length < 11"
      :items="store.data"
      :loading="store.loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-package-variant"
              size="x-small"
              start
            ></v-icon>

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
      </template>

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
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small"></v-icon>
        </div>
      </template>

      <template v-slot:no-data> No data </template>
    </v-data-table> -->
  </v-sheet>
</template>
