<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NotificationManager from '../components/NotificationManager.vue'
import avatarUser from '@/assets/with-mac.png'

const router = useRouter()
const authStore = useAuthStore()
function handleLogout(): void {
  authStore.setAuthenticated(false)
  localStorage.clear()
  router.push('/login')
}

const drawer = ref(false)
</script>

<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <span class="cursor-pointer" @click="$router.push('/')">
          <v-icon icon="mdi-volleyball" /> Vue Sample
        </span>
      </v-app-bar-title>

      <v-btn icon class="mr-2">
        <v-icon icon="mdi-bell" />
      </v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-list v-bind="props">
            <v-list-item :prepend-avatar="avatarUser" subtitle="Software Engineer" title="Jonh doe">
            </v-list-item>
          </v-list>
        </template>
        <v-card min-width="150">
          <v-list>
            <v-list-item prepend-icon="mdi-account" title="Profile" disabled> </v-list-item>
            <v-list-item prepend-icon="mdi-logout" color="red" title="Logout" @click="handleLogout">
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined">
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-package-variant"
          title="Product"
          link
          to="products"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Customer"
          link
          to="/customers"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-currency-usd"
          title="Payment"
          link
          to="/payments"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple-plus"
          title="Subscribes"
          link
          to="/subscribes"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-chat-outline" title="Chat" link to="/chats"></v-list-item>
        <v-list-item prepend-icon="mdi-sale" title="Discount" link disabled></v-list-item>
        <v-list-item prepend-icon="mdi-percent" title="Promotion" link disabled></v-list-item>
        <v-list-item prepend-icon="mdi-shape" title="Category" link disabled></v-list-item>
        <v-list-item prepend-icon="mdi-truck" title="Supplier" link disabled></v-list-item>
        <v-list-item prepend-icon="mdi-file-chart" title="Report" link disabled></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <div class="pa-2">
          <v-list-item prepend-icon="mdi-cog" title="Setting" link disabled></v-list-item>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <v-container style="min-height: 500px">
        <NotificationManager />
        <br />
        <router-view />
      </v-container>
    </v-main>

    <v-footer app class="text-center d-flex flex-column ga-2 py-4">
      <div>© {{ new Date().getFullYear() }} — <strong>Vue Sample</strong></div>
    </v-footer>
  </v-layout>
</template>
