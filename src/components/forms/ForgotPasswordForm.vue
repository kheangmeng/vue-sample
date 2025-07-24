<script setup lang="ts">
import { ref, reactive } from 'vue'
import { required, validEmail } from '@/utilities/validator'

const valid = ref(false)
const loading = ref(false)
const forgotPasswordForm = reactive<{
  email: string
}>({
  email: '',
})

async function onSubmit(): Promise<void> {
  if (!valid.value) return
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forgotPasswordForm),
    })
    console.log('res:', res)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <v-form v-model="valid" @submit.prevent="onSubmit">
    <div class="text-subtitle-1 text-medium-emphasis">Account</div>
    <v-text-field
      v-model="forgotPasswordForm.email"
      :readonly="loading"
      :rules="[required, validEmail]"
      density="compact"
      placeholder="Email"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      :loading="loading"
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
      type="submit"
    >
      Confirm
    </v-btn>
  </v-form>
</template>
