import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Seller from '../pages/Seller.vue';
import Sale from '../pages/Sale.vue';

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
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
