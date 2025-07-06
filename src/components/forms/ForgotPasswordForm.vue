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

function onSubmit(): void {
  if (!valid.value) return
  loading.value = true
  try {
    fetch('http://localhost:3000/forgot-password', {
      method: 'POST',
      body: JSON.stringify(forgotPasswordForm),
    })
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
