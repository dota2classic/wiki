<script setup>
  import { RouterView } from 'vue-router'
  import TheItemList from './components/TheItemList.vue';
  import { ref, provide, computed } from 'vue';
  import TheResponsiveChecker from "@/components/TheResponsiveChecker.vue";

  const responsiveChecker = ref(null);
  const isSmallScreen = computed(() => responsiveChecker.value?.isSmallScreen ?? false);

  provide('isSmallScreen', isSmallScreen);
</script>

<template>
  <TheResponsiveChecker :max-width="1219" ref="responsiveChecker" />

  <header>
    <div class="wrapper">
        <TheItemList />
    </div>
  </header>

  <RouterView />
</template>