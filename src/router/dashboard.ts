import CreatePage from '@/pages/products/CreatePage.vue'
import EditPage from '@/pages/products/EditPage.vue'
import ListPage from '@/pages/products/ListPage.vue'

export default [
  {
    path: '/products',
    name: 'products',
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
