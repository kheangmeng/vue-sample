<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
function handleLogout(): void {
  authStore.setAuthenticated(false)
  router.push('/login')
}
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :elevation="2">
      <v-app-bar-title @click="$router.push('/')" class="cursor-pointer">
        <v-icon icon="mdi-volleyball" /> GY Group
      </v-app-bar-title>

      <v-btn icon color="red" variant="tonal" class="mr-2" @click="handleLogout">
        <v-icon icon="mdi-logout" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item prepend-icon="mdi-package-variant" title="Product" link></v-list-item>
        <v-list-item prepend-icon="mdi-sale" title="Discount" link></v-list-item>
        <v-list-item prepend-icon="mdi-percent" title="Promotion" link></v-list-item>
        <v-list-item prepend-icon="mdi-shape" title="Category" link></v-list-item>
        <v-list-item prepend-icon="mdi-truck" title="Supplier" link></v-list-item>
        <v-list-item prepend-icon="mdi-file-chart" title="Report" link></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <v-list-item prepend-icon="mdi-cog" title="Setting" link></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app class="text-center d-flex flex-column ga-2 py-4">
      <div>{{ new Date().getFullYear() }} — <strong>@GY Group</strong></div>
    </v-footer>
  </v-layout>
</template>
