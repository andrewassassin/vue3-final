import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Product from '../views/Product'
import Item from '../views/Item'
import Search from '../views/Search'
import multi from '../views/multi'
import Create from '../views/Create'
import Login from '../views/Login'
import Register from '../views/Register'
import UserInfo from '../views/UserInfo'
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
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: UserInfo
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
