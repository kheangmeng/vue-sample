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
  const hasToken = authStore.auth.hasAuthenticated || localStorage.getItem('token')

  if (to.meta.requiresAuth && !hasToken) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
