import DashboardLayout from '@/layouts/DashboardLayout.vue'
import CreatePage from '@/pages/products/CreatePage.vue'
import EditPage from '@/pages/products/EditPage.vue'
import ListPage from '@/pages/products/ListPage.vue'

export default [
  {
    path: '/products',
    name: 'products',
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
