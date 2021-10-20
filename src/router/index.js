import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/cart-details.vue')
  },
  {

    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import(/* webpackChunkName: "product-details" */  '../views/product-details.vue'),
    props: route => ({ id: parseInt(route.params.id) })
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
