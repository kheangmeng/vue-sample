<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()
const visible = ref(false)

function onSubmit(): void {
  if (!store.valid) return
  store.handleSubmit()
}
function required(v: string): string | boolean {
  return !!v || 'Field is required'
}
</script>

<template>
  <v-card class="my-auto mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <v-form v-model="store.valid" @submit.prevent="onSubmit">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>
      <v-text-field
        v-model="store.login.email"
        :readonly="store.loading"
        :rules="[required]"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        v-model="store.login.password"
        :readonly="store.loading"
        :rules="[required]"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked
          for three hours. If you must login now, you can also click "Forgot login password?" above
          to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        :disabled="!store.valid"
        :loading="store.loading"
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        type="submit"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-form>
  </v-card>
</template>
