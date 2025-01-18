<template />

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

// Принимаем параметр maxWidth
const props = defineProps({
  maxWidth: {
    type: Number,
    required: true,
  },
});

// Реактивное значение для отслеживания состояния
const isSmallScreen = ref(false);

// Функция для проверки размера окна
const checkScreenSize = () => {
  isSmallScreen.value = window.matchMedia(`(max-width: ${props.maxWidth}px)`).matches;
};

// Обновляем состояние при изменении параметра maxWidth
watch(
  () => props.maxWidth,
  () => {
    checkScreenSize();
  },
  { immediate: true }
);

// Хуки жизненного цикла
onMounted(() => {
  checkScreenSize(); // Проверяем размер экрана при загрузке
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// Экспортируем реактивное значение для использования в родительском компоненте
defineExpose({
  isSmallScreen,
});
</script>