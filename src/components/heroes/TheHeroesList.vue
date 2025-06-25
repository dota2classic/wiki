<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  categoriesData: {
    type: Object,
    required: true,
  },
  hero: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();
const route = useRoute();

const categorizedHeroes = computed(() => {
  return props.categoriesData.heroes_categories.map(category => ({
    id: category.id,
    name: category.name,
    heroes: category.heroes.map(heroId => props.data.find(hero => hero.id == heroId)).filter(Boolean)
  })).filter(category => category.heroes.length > 0);
});
</script>

<template>
  <div class="items-container">
    <div v-for="category in categorizedHeroes" :key="category.id" class="items-category">
      <RouterLink
        v-for="hero in category.heroes"
        :key="hero.id"
        :class="{ current: hero.id === props.hero?.id }"
        :to="{ name: 'hero.show', params: { id: hero.id }, hash: '#top' }"
        class="item-link"
      >
        <img
          :alt="hero.name"
          :src="`/images/heroes/${hero.image}`"
          :title="hero.name"
        />
        <p>{{ hero.name }}</p>
      </RouterLink>
    </div>
    <div v-if="!(categorizedHeroes.length > 0)" class="no-items-placeholder">
      {{ t("general.filter.no_results") }}
    </div>
  </div>
</template>

<style scoped>
.items-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  margin: 0 auto;
  scrollbar-width: none;
  user-select: none;
  padding: 3px;
}

.items-category {
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  flex-wrap: wrap;
  align-content: start;
}

.items-category img {
  max-width: 4.25rem;
  aspect-ratio: 16/9;
  border-radius: 3px;
  transition:
    opacity 0.35s ease,
    transform 0.15s ease;
}

.items-category img:hover {
  transform: scale(1.1);
}

.items-category .current img {
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  outline: 2px solid rgba(255, 215, 0, 0.5);
}

.items-category p {
  display: none;
}

.no-items-placeholder {
  padding: 2rem 0;
}

.items-container::-webkit-scrollbar {
  display: none;
}

.item-link:not(.current):not(.parent):not(.child) > img {
  box-shadow: 0 0 10px 2px rgba(24, 24, 24, 1);
}

.hightlight-relativies .item-link:not(.current):not(.parent):not(.child) > img {
  filter: grayscale(85%);
  opacity: 0.15;
}

@media (max-width: 750px) {
  .items-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .items-category {
    max-width: none;
    display: flex;
    flex-direction: column;
  }

  .items-category > a {
    display: flex;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    padding: 0.5rem;
    width: 18rem;
  }

  .items-category > a.parent,
  .items-category > a.child {
    background-color: rgba(24, 44, 64, 0.3);
  }

  .items-category > a:hover,
  .items-category > a.current {
    background-color: rgba(24, 44, 64, 0.7);
  }

  .items-category p {
    display: inline;
    margin: auto 0;
  }

  .items-category > a > img,
  .items-category > img {
    width: 3.2rem;
  }
}
</style>
