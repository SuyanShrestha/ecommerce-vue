import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: ProductsView,
      props: { listType: 'favorites' } 
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductsView,
      props: { listType: 'products' } 
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView,
    },
  ],
})

export default router
