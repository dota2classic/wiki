export const routes = [
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
    path: '/:pathMatch(.*)*',
    redirect: '/en/items/1'
  }
];

export const routerOptions = {
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return false;
    }

    if (savedPosition) {
      return savedPosition; 
    }

    return false; 
  }
};
