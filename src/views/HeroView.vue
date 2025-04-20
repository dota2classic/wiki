<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import sourceData from "@/data/heroes.json";
import categories from "@/data/heroes_categories.json"
import TheHeroesList from "@/components/heroes/TheHeroesList.vue";
import TheHeroCard from "@/components/heroes/TheHeroCard.vue";

const route = useRoute();
const router = useRouter();

const hero = computed(() => {
  const foundHero = sourceData.heroes.find((hero) => hero.id == route.params.id);
  if (!foundHero) {
    router.replace("/heroes/1");
  }
  return foundHero;
});

</script>

<template>
    <div class="wrapper">
        <div class="grid-item-container fltr-item">
            тут фильтры
        </div>
        <div class="grid-item-container list-item">
            <TheHeroesList :data="sourceData.heroes" :categoriesData="categories" :hero="hero" />
        </div>
        <div class="grid-item-container card-item">
            <TheHeroCard v-if="hero" :hero="hero" />
        </div>
    </div>
</template>

<style scoped>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 12rem 1fr;
        grid-template-areas: 
        "   fltr-item   fltr-item   card-item   "
        "   list-item   list-item   card-item   "
    }

    .grid-item-container {
        display: flex;
        justify-content: center;
    }

    .fltr-item {
        grid-area: fltr-item;
        padding: 0 0.5rem;
    }

    .list-item {
        grid-area: list-item;
    }

    .card-item {
        grid-area: card-item;
    }
</style>