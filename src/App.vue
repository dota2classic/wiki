<template>
  <div id="app-wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { watch, onMounted, onUnmounted, nextTick, computed } from 'vue'

const route = useRoute();
const shouldObserve = computed(() => !route.meta.disableObserveResize);
let resizeObserver;
let popupObserver;
let parentOrigin = null;

function postToParent(type, payload = {}) {
  const target = parentOrigin || '*';
  window.parent.postMessage({ type, ...payload }, target);
}

// Отправляем высоту iframe
function sendHeight() {
  if (import.meta.env.SSR) return;
  if (!shouldObserve.value) return;
  const wrapper = document.getElementById('app-wrapper');
  if (!wrapper) return;
  const height = Math.ceil(wrapper.getBoundingClientRect().height);
  postToParent('setHeight', { height });
}

// Слежка за изменением маршрута: route-change и scrollToTop
watch(
  () => route.fullPath,
  (newPath) => {
    if (import.meta.env.SSR) return;

    postToParent('route-change', { path: newPath, itemId: route.params.id });

    if (route.hash) {
      postToParent('scrollToTopDefault');
    }
  }
);

onMounted(() => {  
  nextTick(() => {
    const wrapper = document.getElementById('app-wrapper');
    if (wrapper) {
      resizeObserver = new ResizeObserver(sendHeight);
      resizeObserver.observe(wrapper);
    }

    const app = document.querySelector('#app');
    if (app) {
      popupObserver = new ResizeObserver(() => {
        if (import.meta.env.SSR) return;
        if (!route.query.hideTree) return;
        const elRect = app.getBoundingClientRect();
        postToParent('resize-iframe-popup', {
          payload: { width: elRect.width, height: elRect.height }
        });
      });
      popupObserver.observe(app);
    }
  });
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (popupObserver) popupObserver.disconnect();
});
</script>
