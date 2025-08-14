<script setup lang="ts">
// import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { useLoginStore } from '@/stores/login'
import { useSignupStore } from './stores/signup'

const loginStore = useLoginStore()
const signupStore = useSignupStore()

// const auth = useAuthStore()
// auth.setAuthenticated(true)
const snackbar = ref(false)
const text = ref('')
watch(
  () => loginStore.error,
  () => {
    if (loginStore.error) {
      snackbar.value = true
      text.value = loginStore.error
      loginStore.error = ''
    }
  },
)

watch(
  () => signupStore.error,
  () => {
    if (signupStore.error) {
      snackbar.value = true
      text.value = signupStore.error
      signupStore.error = ''
    }
  },
)
</script>

<template>
  <RouterView />
  <v-snackbar v-model="snackbar" color="red" multi-line location="top">
    <div class="text-center text-white font-weight-bold">{{ text }}</div>
  </v-snackbar>
</template>
<style lang="css">
body {
  font-family: 'Delius', cursive;
  font-weight: 400;
  font-style: normal;
  /* font-family: 'Bitcount Grid Single', system-ui;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    'slnt' 0,
    'CRSV' 0.5,
    'ELSH' 0,
    'ELXP' 0; */
}
</style>
