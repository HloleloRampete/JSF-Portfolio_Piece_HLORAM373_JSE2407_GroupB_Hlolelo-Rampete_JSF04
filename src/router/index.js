import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import WishList from '../views/WishList.vue';
import Login from '../views/LoginPage.vue';
import Cart from '../views/CartPage.vue';
import ProductDetailPage from '../views/ProductDetailPage.vue';
import ComparisonPage from '../views/ComparisonPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { 
    path: '/wishList', 
    name: 'WishList', 
    component: WishList, 
    meta: { requiresAuth: true } 
  },
  { path: '/login', name: 'Login', component: Login },
  { 
    path: '/cart', 
    name: 'Cart', 
    component: Cart, 
    meta: { requiresAuth: true } 
  },
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetailPage },
  { 
    path: '/comparison', 
    name: 'Comparison', 
    component: ComparisonPage, 
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    localStorage.setItem('redirectPath', to.fullPath);
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
