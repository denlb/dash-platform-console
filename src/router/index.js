import Vue from 'vue';
import VueRouter from 'vue-router';
import Identities from '@/views/Identities.vue';
import Names from '@/views/Names.vue';
import Contracts from '@/views/Contracts.vue';
import Documents from '@/views/Documents.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/identities',
    name: 'identities',
    component: Identities,
  },
  {
    path: '/contracts',
    name: 'contracts',
    component: Contracts,
  },
  {
    path: '/documents',
    name: 'documents',
    component: Documents,
  },
  {
    path: '/names',
    name: 'names',
    component: Names,
  },
  {
    path: '*',
    redirect: 'identities',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
