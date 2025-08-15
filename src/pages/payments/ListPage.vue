<script setup lang="ts">
import { onMounted } from 'vue'
import { usePaymentsStore } from '@/stores/payment'
import { formatDate, formatCurrency } from '@/utilities/helper'

const store = usePaymentsStore()
const headers = [
  { title: 'Payment Date', key: 'payment_date', align: 'start', minWidth: '200px' },
  { title: 'Payment Method', key: 'payment_method', align: 'start', minWidth: '200px' },
  { title: 'Paid Amount', key: 'amount', align: 'end', minWidth: '150px' },
  { title: 'Order Status', key: 'order_status', align: 'start', minWidth: '150px' },
  { title: 'Total Order Amount', key: 'total_amount', align: 'end', minWidth: '200px' },
  { title: 'Invoice No.', key: 'invoice_number', align: 'start', minWidth: '250px' },
  { title: 'Created At', key: 'createdAt', align: 'end', minWidth: '150px' },
  { title: 'Updated At', key: 'updatedAt', align: 'end', minWidth: '150px' },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false, minWidth: '100px' },
]

onMounted(() => {
  store.fetchPayments()
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

            Payments
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

      <!-- <template v-slot:item.photo_url="{ item }">
        <v-avatar color="grey">{{ item.name[0] }}</v-avatar>
      </template> -->

      <template v-slot:item.amount="{ item }">
        <div>{{ formatCurrency(item.amount) }}</div>
      </template>

      <template v-slot:item.order_status="{ item }">
        <div>{{ item.order?.order_status }}</div>
      </template>

      <template v-slot:item.total_amount="{ item }">
        <div>{{ formatCurrency(item.order?.total_amount) }}</div>
      </template>

      <template v-slot:item.invoice_number="{ item }">
        <div>{{ item.invoice?.invoice_number }}</div>
      </template>

      <template v-slot:item.payment_date="{ value }">
        <div>{{ formatDate(value) }}</div>
      </template>

      <template v-slot:item.createdAt="{ value }">
        <div>{{ formatDate(value) }}</div>
      </template>

      <template v-slot:item.updatedAt="{ value }">
        <div>{{ formatDate(value) }}</div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-eye-outline" size="small"></v-icon>
        </div>
      </template>

      <template v-slot:no-data> No data </template>
    </v-data-table>
  </v-sheet>
</template>

<!-- <script setup lang="ts">
import { usePaymentStore, usePaymentsStore } from '@/stores/payment'

const store = usePaymentStore()

function submitPayment() {
  store.handleSubmit()
}
</script>

<template>
  <div>
    <h1>Payment</h1>
    <v-divider></v-divider>
    <v-btn class="mt-6" color="primary" @click="submitPayment">
      Test Payment
      <v-icon icon="mdi-currency-usd" end></v-icon>
    </v-btn>
  </div>
</template> -->
