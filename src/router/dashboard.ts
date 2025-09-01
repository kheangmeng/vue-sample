import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CreatePage from '@/pages/products/CreatePage.vue'
import EditPage from '@/pages/products/EditPage.vue'
import ListPage from '@/pages/products/ListPage.vue'
import ListPageCustomer from '@/pages/customers/ListPage.vue'
import ListPagePayment from '@/pages/payments/ListPage.vue'
import ChatPage from '@/pages/ChatPage.vue'

export default [
  {
    path: '/products',
    name: 'products',
    meta: {
      requiresAuth: true,
    },
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'list-product',
        component: ListPage,
      },
      {
        path: 'create',
        name: 'create-product',
        component: CreatePage,
      },
      {
        path: 'edit/:id',
        name: 'edit-product',
        component: EditPage,
      },
    ],
  },
  {
    path: '/customers',
    name: 'customers',
    meta: {
      requiresAuth: true,
    },
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'list-customer',
        component: ListPageCustomer,
      },
      // {
      //   path: 'create',
      //   name: 'create-product',
      //   component: CreatePage,
      // },
      // {
      //   path: 'edit/:id',
      //   name: 'edit-product',
      //   component: EditPage,
      // },
    ],
  },
  {
    path: '/payments',
    name: 'payments',
    meta: {
      requiresAuth: true,
    },
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'list-payment',
        component: ListPagePayment,
      },
      // {
      //   path: 'create',
      //   name: 'create-product',
      //   component: CreatePage,
      // },
      // {
      //   path: 'edit/:id',
      //   name: 'edit-product',
      //   component: EditPage,
      // },
    ],
  },
  {
    path: '/chats',
    name: 'chats',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'list-chat',
        component: ChatPage,
      },
    ],
  },
]
// {
//   path: '',
//   name: 'list-product',
//   component: () => import('@/pages/products/ListPage.vue'),
// },
// {
//   path: 'create',
//   name: 'create-product',
//   component: () => import('@/pages/products/CreatePage.vue'),
// },
// {
//   path: 'edit/:id',
//   name: 'edit-product',
//   component: () => import('@/pages/products/EditPage.vue'),
// },
