import { createRouter, createWebHistory } from 'vue-router'
import guest from './guest'
import dashboard from './dashboard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...guest, ...dashboard],
})

export default router
