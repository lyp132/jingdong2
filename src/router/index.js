import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/register/Register.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "CartList" */ '../views/cartList/CartList.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "OrderConfirmation" */ '../views/orderConfirmation/OrderConfirmation.vue')
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
