<script setup lang="ts">
import { onMounted } from 'vue'
import { useCustomersStore } from '@/stores/customer'
import { formatDate } from '@/utilities/helper'

const store = useCustomersStore()
const headers = [
  { title: 'Customer Name', key: 'name', align: 'start', minWidth: '200px' },
  { title: 'Gender', key: 'gender', minWidth: '100px' },
  { title: 'Email', key: 'email', minWidth: '250px' },
  { title: 'Phone', key: 'phone', minWidth: '150px' },
  { title: 'Photo', key: 'photo_url', minWidth: '150px' },
  { title: 'ID', key: 'id_card_number', align: 'end', minWidth: '100px' },
  { title: 'Created At', key: 'createdAt', align: 'end', minWidth: '150px' },
  { title: 'Updated At', key: 'updatedAt', align: 'end', minWidth: '150px' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false, minWidth: '100px' },
]

onMounted(() => {
  store.fetchCustomers()
})
</script>
<template>
  <v-sheet border rounded>
    <v-data-table
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

            Customers
          </v-toolbar-title>

          <v-btn
            class="me-2"
            color="primary"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add a Customer"
            border
            disabled
            @click="$router.push('/customers/create')"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.photo_url="{ item }">
        <v-avatar color="grey">{{ item.name[0] }}</v-avatar>
      </template>

      <template v-slot:item.createdAt="{ value }">
        <div>{{ formatDate(new Date()) }}</div>
      </template>

      <template v-slot:item.updatedAt="{ value }">
        <div>{{ formatDate(new Date()) }}</div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small"></v-icon>
        </div>
      </template>

      <template v-slot:no-data> No data </template>
    </v-data-table>
  </v-sheet>
</template>
