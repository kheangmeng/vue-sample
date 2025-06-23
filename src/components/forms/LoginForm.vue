<script setup lang="ts">
import { useLoginStore } from '@/stores/login'

const store = useLoginStore()

function onSubmit(): void {
  if (!store.valid) return
  store.handleSubmit()
}
function required(v: string): string | boolean {
  return !!v || 'Field is required'
}
</script>

<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <h1 class="text-center">Login Form</h1>
      <v-form v-model="store.valid" @submit.prevent="onSubmit">
        <v-text-field
          v-model="store.login.email"
          :readonly="store.loading"
          :rules="[required]"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="store.login.password"
          :readonly="store.loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!store.valid"
          :loading="store.loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>
