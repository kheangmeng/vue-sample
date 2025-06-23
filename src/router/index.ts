import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../pages/HomePage.vue'),
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../pages/AboutPage.vue'),
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../pages/LoginPage.vue'),
    // },
  ],
})

export default router
