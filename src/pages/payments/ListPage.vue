<script setup lang="ts">
import { usePaymentStore } from '@/stores/payment'

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
</template>
