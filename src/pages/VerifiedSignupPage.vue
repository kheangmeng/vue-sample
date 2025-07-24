<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const token = route.params.token || ''
const verified = ref(false)
const loading = ref(false)

async function onSubmit(): Promise<void> {
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/auth/verify-email/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    verified.value = true
    console.log('res:', res)
  } catch (error) {
    verified.value = false
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  onSubmit()
})
</script>

<template>
  <div v-if="verified" class="mt-16">
    <h1>Account has been confirmed!</h1>
    <v-btn to="/login">Login</v-btn>
  </div>
  <div v-else class="mt-16">Something went wrong!</div>
</template>
