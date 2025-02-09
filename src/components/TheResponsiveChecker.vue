<template></template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  maxWidth: {
    type: Number,
    required: true,
  },
});

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  if (import.meta.env.SSR) return;
  isSmallScreen.value = window.matchMedia(`(max-width: ${props.maxWidth}px)`).matches;
};

watch(
  () => props.maxWidth,
  () => {
    if (!import.meta.env.SSR) checkScreenSize();
  },
  { immediate: true }
);

onMounted(() => {
  checkScreenSize(); 
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

defineExpose({
  isSmallScreen,
});
</script>
