import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/items', // Перенаправление с корня на /items
    },
    {
      path: '/items',
      redirect: '/items/1', // Перенаправление с /items на /items/1
    },
    {
      path: '/items/:id(\\d+)', // Валидный маршрут для числового ID
      name: "item.show",
      component: () => import('../views/ItemView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // Перенаправление с любого невалидного пути
      redirect: '/items/1',
    },
  ],

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
},
});

router.beforeEach((to, from, next) => {
  const mergedQuery = { ...from.query, ...to.query };

  if (mergedQuery.resetfilters) {
    if (to.query.resetfilters) {
      delete mergedQuery.category;
      delete mergedQuery.shop;
      delete mergedQuery.search;
    } else {
      delete mergedQuery.resetfilters;
    }
  }

  // Обработка взаимоисключающих фильтров
  if (mergedQuery.shop && mergedQuery.category) {
    // Если пользователь выбрал категорию, удаляем магазин
    if (to.query.category) {
      delete mergedQuery.shop;
    }
    // Если пользователь выбрал магазин, удаляем категорию
    else if (to.query.shop) {
      delete mergedQuery.category;
    }
  }

  // Если результат `query` отличается, обновляем маршрут
  if (JSON.stringify(to.query) === JSON.stringify(mergedQuery)) {
    next(); // Переход без изменений
  } else {
    next({ ...to, query: mergedQuery }); // Обновляем `query`
  }
});

export default router;