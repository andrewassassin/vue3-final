import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Product from '../views/Product'
import Item from '../views/Item'
import Search from '../views/Search'
import multi from '../views/multi'
import CreatePrd from '../views/CreatePrd'
import Login from '../views/Login'
import Register from '../views/Register'
import UserInfo from '../views/UserInfo'
import PrdManage from '../views/PrdManage'
import Order from '../views/Order'
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta:{
            m_hideHeader:true,
            transparentNav:true
        }
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
        component: Item,
        meta: {
            m_hideHeader: true,
        }
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
        component: multi,
        meta:{
            m_hideHeader:true,
            m_hideNavAll:true,
        }
    },
    {
        path: '/CreatePrd',
        name: 'CreatePrd',
        component: CreatePrd,
        meta: {
            requiresAuth: true,
            m_hideHeader: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            m_hideHeader: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            m_hideHeader: true,
        }
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: UserInfo,
        redirect: '/userinfo/info',
        children: [{
            path: '/userinfo/info',
            name:'userinfo_info',
            component: () => import('../views/Info.vue'),
        },
        {
            path: '/userinfo/Payment',
            name:'userinfo_pay',
            component: () => import('../views/Payment.vue'),
        }],
        meta:{
            m_hideHeader:true
        }
    },
    {
        path: '/PrdManage',
        name: 'PrdManage',
        component: PrdManage,
        meta: {
            requiresAuth: true,
            m_hideHeader:true
        }
    },
    {
        path: '/Order',
        name: 'Order',
        component: Order,
        meta:{
            m_hideNavAll:true,
            m_hideHeader:true
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

// const arr = []
// router.beforeEach((to) => {
//     console.log('to=>', to.path);
//     arr.push(to.path)
//     console.log('arr', arr);
// })

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
