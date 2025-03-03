<script setup>
import { RouterView, useRoute } from "vue-router";
import { effect, onMounted, onUnmounted } from "vue";

const route = useRoute();
let resizeObserver;

effect(() => {
  if (import.meta.env.SSR) return;
  if (route.params.id === undefined) return;

  window.parent.postMessage(
    { type: "route-change", itemId: route.params.id },
    "*",
  );
});

onMounted(() => {
  const app = document.querySelector("#app");
  resizeObserver = new ResizeObserver(() => {
    if (import.meta.env.SSR) return;
    const elRect = app.getBoundingClientRect();
    window.parent.postMessage(
      {
        type: "resize-iframe",
        payload: {
          width: elRect.width,
          height: elRect.height,
        },
      },
      "*",
    );
  });

  resizeObserver.observe(app);
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

</script>

<template>
  <RouterView />
</template>
