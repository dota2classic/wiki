<script setup>
import { RouterView, useRoute } from "vue-router";
import { computed, effect, provide, ref } from "vue";

const route = useRoute();
const responsiveChecker = ref(null);
const isSmallScreen = computed(
  () => responsiveChecker.value?.isSmallScreen ?? false,
);

effect(() => {
  if (route.params.id === undefined) return;

  // Post message to parent frame
  window.parent.postMessage(
    { type: "route-change", itemId: route.params.id },
    "*",
  );
});

provide("isSmallScreen", isSmallScreen);
</script>

<template>
  <RouterView />
</template>
