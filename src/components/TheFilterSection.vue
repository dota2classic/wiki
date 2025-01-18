<script setup>
  import { useRouter, useRoute } from 'vue-router';
  import { ref, watch, inject } from 'vue';
  import categories from '@/data/items_categories.json';
  import CheckBox from '@/components/Checkbox.vue';
  import TheItemTree from '@/components/TheItemTree.vue';
  import TheCircleButton from './TheCircleButton.vue';
  import { useI18n } from 'vue-i18n';

  const { t, locale } = useI18n();

  const changeLocale = (lang) => {
  locale.value = locale.value === lang ? (lang === 'ru' ? 'en' : 'ru') : lang;
};

  defineProps({
    currentItem: Object,
    data: Array,
    hightlightRelativies: Boolean,
  });

  const router = useRouter();
  const route = useRoute();
  const searchQuery = ref('');

  const isSmallScreen = inject('isSmallScreen');

  watch(
    () => route.query.search,
    (newSearch) => {
      searchQuery.value = newSearch || ''; 
    },
    { immediate: true } 
  );

  const toggleHighlightRelatives = (value) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        hr: value.toString(),
      },
    });
  };

  const defaultCategories = categories.items_categories.filter(category =>
    categories.filter_categories.default_categories.includes(category.id)
  );

  const shopCategories = categories.filter_categories.shop.map(shop => ({
    ...shop,
    categories: shop.categories_id
      ? shop.categories_id.map(id =>
          categories.items_categories.find(category => category.id === id)
        )
      : [],
  }));

  const updateCategoryFilter = (category) => {
    const query = {
      ...router.currentRoute.value.query,
      category: category.name.slice(0, 4).toLowerCase(), 
      shop: undefined,
      resetfilters: undefined
    };
    router.push({ query });
  };

  const updateShopFilter = (shop) => {
    const query = {
      ...router.currentRoute.value.query,
      shop: `${shop.name.slice(0, 4).toLowerCase()}`,
      category: undefined,
      resetfilters: undefined
    };
    router.push({ query });
  };

  const resetFilters = () => {
    router.push({ query: { resetfilters: true} });
    searchQuery.value = null;
  };

  const updateSearchFilter = () => {
    const query = {
      ...router.currentRoute.value.query,
      search: searchQuery.value.toLowerCase(),
      category: undefined,
      shop: undefined,
      resetfilters: undefined,
    };
    router.push({ query });
  };
</script>

<template>
  <div class="items-container-title">
    <div class="items-filter">
      <div class="items-filter-options">
        <div class="locale-switch">
          <button
            v-for="lang in ['ru', 'en']"
            :key="lang"
            @click="changeLocale(lang)"
            :class="['locale', locale === lang ? 'active' : '']"
          >
            {{ lang === 'ru' ? 'Русский' : 'English' }}
          </button>
          <div class="highlight" :style="{ transform: locale === 'ru' ? 'translateX(0)' : 'translateX(100%)' }"></div>
        </div>

        <CheckBox style="min-width: 11rem;"
          :modelValue="hightlightRelativies"
          @update:modelValue="toggleHighlightRelatives"
          :trueText="t('general.filter.hightlight_rel')"
          :falseText="t('general.filter.hightlight_rel')"
        />
  
        <div class="search-container">
          <input
            type="text"
            :placeholder="t('general.filter.search_placeholder')"
            v-model="searchQuery"
            @input="updateSearchFilter"
          />
        </div>
      </div>
      
      <div class="filter-category-container">
        <button
          v-for="category in defaultCategories"
          class="filter-category"
          :key="category.id"
          @click="updateCategoryFilter(category)"
        >
          <img
            :src="`/images/${category.image}`"
            :alt="t(`general.categories.${category.name.toLowerCase()}`)"
            :title="t(`general.categories.${category.name.toLowerCase()}`)"
            :class="category.name.toLowerCase().startsWith(route.query.category) ? 'active-category': ''"
          />
        </button>
      
        <button
          v-for="shop in shopCategories"
          class="filter-category"
          :key="shop.id"
          @click="updateShopFilter(shop)"
        >
          <img
            :src="`/images/${shop.image}`"
            :alt="shop.name"
            :title="t(`general.item.shops.${shop.name.toLowerCase().replace(' ','_')}`)"
            :class="shop.name.toLowerCase().startsWith(route.query.shop) ? 'active-category': ''"
          />
        </button>
        <TheCircleButton @click="resetFilters" :title="t('general.filter.reset_button_title')" class="reset-filter-button" />
      </div>
    </div>
    <TheItemTree
      v-if="currentItem"
      v-show="!isSmallScreen"
      :currentItem="currentItem"
      :data="data"
      :tree_id="`tree_1`"
    />
  </div>
</template>

<style scoped>
  .locale-switch {
    position: relative;
    display: inline-flex;
    border-radius: 5px;
    overflow: hidden;
    background-color: #A0A0A0;
    width: 12rem;
    height: 1.85rem; 
    transition: background-color 0.2s ease;
  }

  .locale-switch:hover {
    background-color: #f0f0f0;
  }

  .locale {
    flex: 1;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #333;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
    z-index: 1;
  }

  .locale.active {
    color: #CCC;
  }

  .locale:not(.active):hover{
    color: black;
  }

  .highlight {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(50% - 4px);
    height: calc(100% - 4px);
    background-color: #2E3135;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
    z-index: 0;
  }

  .search-container input {
    width: 100%;
    max-width: 12rem;
    padding: 0.3rem 1rem;
    border-radius: 5px;
    background-color: #CCC;
    color: #333;
    transition: all 0.3s ease-in-out;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .search-container input:focus {
    border-color: #007bff;
    outline: none;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  .search-container input::placeholder {
    color: #999;
    font-style: italic;
  }

  .search-container input:hover {
    border-color: #666;
  }

 .items-container-title {
    display: flex;
    padding-bottom: 1rem;
    min-height: 11rem;
    align-items: center;
    justify-content: space-between;
  }

 .items-filter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 22rem;
  }

  .items-filter img {
    width: 100%;
  }

  .filter-category-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 0.27rem;
    row-gap: 0.5rem;
    max-width: 18rem;
    user-select: none;
  }

  .filter-category {
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    border: none;
    height: 2rem;
    width: 2rem;
    transition: scale 0.2s ease; 
  }

  .reset-filter-button {
    width: 1.85rem !important;
    height: 1.85rem !important;
  }

  .active-category {
    filter: drop-shadow(0px 0px 3px rgba(225, 225, 225, 0.5));
    scale: 1.1;
  }

  .filter-category:hover,
  .reset-filter-button:hover {
    scale: 1.1;
  }

  .items-filter-options {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      row-gap: 0.75rem;
      column-gap: 1rem;
    }

  
  @media (max-width: 1219px) {
    .items-container-title {
      min-height: 0;
    }

    .items-filter-options {
      display: flex;
      flex-direction: row-reverse;
      flex-wrap: wrap;
      column-gap: 9rem;
      row-gap: 1rem;
      justify-content: center;
      padding-bottom: 1rem;
    }

    .items-filter {
      margin: 0 auto;
      width: inherit;
      max-width: inherit;
    }

    .filter-category-container {
      max-width: inherit;
      gap: 1rem;
    }

    .filter-category {
      height: 2.5rem;
      width: 2.5rem;
    }

    .reset-filter-button  {
      width: 2.5rem !important;
      height: 2.5rem !important;
    }
  }

  </style>