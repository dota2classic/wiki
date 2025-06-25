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
  }
});

const { t } = useI18n();

const route = useRoute();
const itemsCategories = computed(() => props.categoriesData.items_categories);

const categorizedItems = computed(() => {
  const activeCategoryFilter = route.query.category;
  const activeShopFilter = route.query.shop?.toLowerCase();
  const searchQuery = route.query.search?.toLowerCase();

  const shopCategories = activeShopFilter
    ? props.categoriesData.filter_categories.shop.find((shop) =>
        shop.name.toLowerCase().startsWith(activeShopFilter.toLowerCase()),
      )?.categories_id
    : null;

  const isFilterActive =
    activeCategoryFilter || (shopCategories && shopCategories.length > 0);

  const defaultCategories =
    props.categoriesData.filter_categories.mainpage_categories;

  return itemsCategories.value
    .map((category) => {
      if (
        !isFilterActive &&
        searchQuery &&
        !defaultCategories.includes(category.id)
      ) {
        return null;
      }

      if (!isFilterActive && !defaultCategories.includes(category.id)) {
        return null;
      }

      if (
        activeCategoryFilter &&
        !category.name
          .toLowerCase()
          .startsWith(activeCategoryFilter.toLowerCase())
      ) {
        return null;
      }

      if (shopCategories && !shopCategories.includes(category.id)) {
        return null;
      }

      const filteredItems = category.items
        .map((itemId) => props.data.find((item) => item.id === itemId))
        .filter((item) => {
          if (!item) return false;
          return searchQuery
            ? item.name.toLowerCase().includes(searchQuery)
            : true;
        });

      if (filteredItems.length === 0) {
        return null;
      }

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter(Boolean);
});

const currentItem = computed(() => {
  const currentId = Number(route.params.id);
  return props.data.find((item) => item.id === currentId);
});

const hightlightRelativies = computed(() => route.query.hr === "true");
</script>


<template>
    <div
      :class="hightlightRelativies ? 'hightlight-relativies' : ''"
      class="items-container"
    >
      <div
        v-for="category in categorizedItems"
        :key="category.id"
        class="items-category"
      >
        <RouterLink
          v-for="item in category.items"
          :key="item.id"
          :class="{
            current: item.id === currentItem?.id,
            parent: currentItem?.parents?.includes(item.id),
            child: currentItem?.children?.includes(item.id),
          }"
          :to="{ name: 'item.show', params: { id: item.id }, hash: '#top' }"
          class="item-link"
        >
          <img
            :alt="item.name"
            :src="`/images/items/${item.image}`"
            :title="item.name"
          />
          <p>{{ item.name }}</p>
        </RouterLink>
      </div>
      <div v-if="!(categorizedItems.length > 0)" class="no-items-placeholder">
        {{ t("general.filter.no_results") }}
      </div>
    </div>
</template>

<style scoped>
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

.items-container {
  scrollbar-width: none;
  user-select: none;
  padding: 3px;
  display: flex;
  gap: 0.5rem;
  max-width: fit-content;
  margin: 0 auto;
}

.items-category {
  width: 100%;
  max-width: 3.6rem;
}

.items-category img {
  width: 100%;
  aspect-ratio: 85/64;
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
