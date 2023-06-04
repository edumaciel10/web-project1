import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DefesasView from '@/views/DefesasView.vue';
import DefesaView from '@/views/DefesaView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/defesas',
      name: 'defesas',
      component: DefesasView,
    },
    {
      path: '/defesas/:id',
      name: 'defesa',
      component: DefesaView,
    },
  ],
});

export default router;
