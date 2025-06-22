import { createMemoryHistory } from 'vue-router';

export const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/en/items/1'
  },
  {
    path: '/',
    redirect: '/en/items/1'
  },
  {
    path: '/:lang/items',
    redirect: '/:lang/items/1'
  },
  {
    path: "/slim/items/:id(\\d+)", 
    name: "item.show-slim",
    component: () => import("../views/ItemOnlyView.vue"),
  },
  {
    path: '/:lang/items/:id',
    name: 'item.show',
    component: () => import('@/views/ItemView.vue')
  },
  {
    path: '/:lang/heroes/:id',
    name: 'hero.show',
    component: () => import('@/views/HeroView.vue')
  }
];

export const routerOptions = {
  history: createMemoryHistory(),
  routes
};
