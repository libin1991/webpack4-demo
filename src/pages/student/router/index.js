import Vue from 'vue';
import VueRouter from 'vue-router';

import home from './home';

Vue.use(VueRouter);

const routes = [
  ...home,
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/student',
});

export default router;
