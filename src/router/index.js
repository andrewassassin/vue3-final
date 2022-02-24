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
import ProductManage from '../views/ProductManage'
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
        component: Create,
        meta: {
            requiresAuth: true,
        }
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
        component: UserInfo,
        redirect: '/userinfo/info',
        children: [{
            path: 'info',
            component: () => import('../views/Info.vue'),
            meta: {
                requiresAuth: true,
            }
        }],
    },
    {
        path: '/productManage',
        name: 'ProductManage',
        component: ProductManage,
        meta: {
            requiresAuth: true,
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0, behavior: "smooth" };
    },
})

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0);
//   console.log('to=>', to);
//   console.log('from=>', from);

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     var eip_b = store.state.user.name;

//       if ((eip_b == null) || (eip_b == '')) {
        
//         console.log("你沒有登入!");
  
//       } else {
//         console.log('放行')
//         next() 
//       }
//   } else {
//     // 不需權限的頁面
//     next()
//   }
// })

export default router
