<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed, effect, onMounted, onUnmounted, provide, ref } from "vue";

const route = useRoute();
const responsiveChecker = ref(null);
const isSmallScreen = computed(
  () => responsiveChecker.value?.isSmallScreen ?? false,
);

effect(() => {
  if (import.meta.env.SSR) return;
  if (route.params.id === undefined) return;

  // Post message to parent frame
  window.parent.postMessage(
    { type: "route-change", itemId: route.params.id },
    "*",
  );
});

onMounted(() => {
  const app = document.querySelector("#app");
  const resizeObserver = new ResizeObserver((entries) => {
    const elRect = app.getBoundingClientRect();
    if (import.meta.env.SSR) return;
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
    resizeObserver.disconnect();
  });

provide("isSmallScreen", isSmallScreen);
</script>

<template>
  <RouterView />
</template>
