import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Product from '../views/Product'
import Item from '../views/Item'
import Search from '../views/Search'
import multi from '../views/multi'
import Create from '../views/Create'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: `/product/:id`,
    name: 'item',
    props: true,
    component: Item
  },
  {
    path: `/search/:id`,
    name: 'search',
    props: true,
    component: Search
  },
  {
    path: `/multi`,
    name: 'multi',
    props: true,
    component: multi
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
