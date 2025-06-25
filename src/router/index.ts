import { createRouter, createWebHistory } from 'vue-router'
import guest from './guest'
import dashboard from './dashboard'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...guest, ...dashboard],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.auth.hasAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
