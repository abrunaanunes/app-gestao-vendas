import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Seller from '../pages/Seller.vue';
import Sale from '../pages/Sale.vue';

const isAuthenticated = () => {
  const token = localStorage.getItem('jwt');
  return token !== null;
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller,
    meta: { requiresAuth: true },
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
