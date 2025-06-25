import GuestLayout from '@/layouts/GuestLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

export default [
  {
    path: '/',
    name: 'guest',
    component: GuestLayout,
    children: [
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
    ],
  },
]
// {
//   path: '/',
//   name: 'home',
//   component: () => import('@/pages/HomePage.vue'),
// },
// {
//   path: '/about',
//   name: 'about',
//   component: () => import('@/pages/AboutPage.vue'),
// },
// {
//   path: '/login',
//   name: 'login',
//   component: () => import('@/pages/LoginPage.vue'),
// },
