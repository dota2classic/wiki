import "./assets/main.css";

import itemsData from "@/data/items.json";
import heroesData from "@/data/heroes.json"
import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routerOptions } from "./router";
import i18n from "./i18n";
import { initializeLanguage } from "@/util/lang.js";

export const createApp = ViteSSG(
  App,
  routerOptions,
  ({ app, router, isClient }) => {
    initializeLanguage(router);
    app.use(i18n);

    if (isClient) {
      const initial = window.location.pathname + window.location.search + window.location.hash
      router.isReady().then(() => {
        router.replace(initial).catch(() => {
        })
      })
    }

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

      if (mergedQuery.shop && mergedQuery.category) {
        if (to.query.category) {
          delete mergedQuery.shop;
        } else if (to.query.shop) {
          delete mergedQuery.category;
        }
      }

      if (JSON.stringify(to.query) === JSON.stringify(mergedQuery)) {
        next();
      } else {
        next({ ...to, query: mergedQuery });
      }
    });

    if (typeof window !== 'undefined') {
      const handleMessage = (e) => {
        if (e.data?.type === "sync-route") {
          // console.log(e.data);
          // console.log("Текущий путь:", router.currentRoute.value.fullPath);
          // console.log("Желаемый:", e.data.route);
          router.replace(e.data.route).catch(() => {});
        }
      };

      window.addEventListener("message", handleMessage);

      if (import.meta.hot) {
        import.meta.hot.dispose(() => {
          window.removeEventListener("message", handleMessage);
        });
      }
    }
  },
);

export async function includedRoutes(paths, routes) {
  const languages = ["en", "ru"];
  const pages_items = languages.flatMap((lang) =>
    itemsData.items.map((item) => `/${lang}/items/${item.id}`),
  );
  // const pages_heroes = languages.flatMap((lang) =>
  //   heroesData.heroes.map((hero) => `/${lang}/heroes/${hero.id}`),
  // );
  const slimPreviews = itemsData.items.map((item) => `/slim/items/${item.id}`);
  return [...pages_items,
    //  ...pages_heroes,
      ...slimPreviews];
}
