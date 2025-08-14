<script setup lang="ts">
import { ref } from 'vue'
import { useSignupStore } from '@/stores/signup'
import { required, minLength, validEmail, comparePassword } from '@/utilities/validator'

const store = useSignupStore()
const visible = ref(false)
const visibleConfirmPassword = ref(false)

function onSubmit(): void {
  if (!store.valid) return
  store.handleSubmit()
}
</script>

<template>
  <v-card class="my-auto mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <v-form v-model="store.valid" @submit.prevent="onSubmit">
      <div class="text-subtitle-1 text-medium-emphasis">First Name</div>
      <v-text-field
        v-model="store.signup.firstName"
        :readonly="store.loading"
        :rules="[required]"
        density="compact"
        placeholder="First Name"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Last Name</div>
      <v-text-field
        v-model="store.signup.lastName"
        :readonly="store.loading"
        :rules="[required]"
        density="compact"
        placeholder="Last Name"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field
        v-model="store.signup.email"
        :readonly="store.loading"
        :rules="[required, validEmail]"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
        v-model="store.signup.password"
        :readonly="store.loading"
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
        v-model="store.signup.confirmPassword"
        :readonly="store.loading"
        :rules="[
          required,
          (v) => minLength(v, 8),
          (v) => comparePassword(v, store.signup.password),
        ]"
        :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visibleConfirmPassword ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
      ></v-text-field>

      <br />
      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: Current sign up do not sent verification email to your email address.
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
        Sign Up
      </v-btn>

      <v-card-text class="text-center">
        <router-link class="text-blue text-decoration-none" to="/login">
          Login <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-form>
  </v-card>
</template>
