import GuestLayout from '@/layouts/GuestLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ServerEventPage from '@/pages/ServerEventPage.vue'
import WebsocketPage from '@/pages/WebsocketPage.vue'
import WebSocketIoPage from '@/pages/WebSocketIoPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import SignupSuccessPage from '@/pages/SignupSuccessPage.vue'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import ResetPasswordPage from '@/pages/ResetPasswordPage.vue'
import VerifiedSignupPage from '@/pages/VerifiedSignupPage.vue'

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
        path: '/server-events',
        name: 'server-events',
        component: ServerEventPage,
      },
      {
        path: '/websocket',
        name: 'websocket',
        component: WebsocketPage,
      },
      {
        path: '/websocket-io',
        name: 'websocket-io',
        component: WebSocketIoPage,
      },
      {
        path: '/login',
        name: 'login',
        component: LoginPage,
      },
      {
        path: '/signup',
        name: 'signup',
        component: SignupPage,
      },
      {
        path: '/signup-success',
        name: 'signup-success',
        component: SignupSuccessPage,
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordPage,
      },
      {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPasswordPage,
      },
      {
        path: '/verify-email/:token',
        name: 'verify-email',
        component: VerifiedSignupPage,
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
