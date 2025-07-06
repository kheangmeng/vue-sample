<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { required, minLength, comparePassword } from '@/utilities/validator'

const route = useRoute()
const token = route.params.token || ''
const valid = ref(false)
const visible = ref(false)
const visibleConfirmPassword = ref(false)
const loading = ref(false)
const resetForm = reactive<{
  password: string
  confirmPassword: string
}>({
  password: '',
  confirmPassword: '',
})

function onSubmit(): void {
  if (!valid.value) return
  loading.value = true
  try {
    fetch(`http://localhost:3000/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify(resetForm),
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
    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Password
    </div>
    <v-text-field
      v-model="resetForm.password"
      :readonly="loading"
      :rules="[required, (v) => minLength(v, 8)]"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Confirm Password
    </div>
    <v-text-field
      v-model="resetForm.confirmPassword"
      :readonly="loading"
      :rules="[required, (v) => minLength(v, 8), (v) => comparePassword(v, resetForm.password)]"
      :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visibleConfirmPassword ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
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
      Reset
    </v-btn>
  </v-form>
</template>
