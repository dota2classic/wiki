<script setup>
import { computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import sourceData from "@/data/items.json";
import categories from "@/data/items_categories.json";
import TheItemTree from "@/components/TheItemTree.vue";
import { useI18n } from "vue-i18n";
import TheItemList from "@/components/TheItemList.vue";
import TheResponsiveChecker from "@/components/TheResponsiveChecker.vue";
import ItemCard from "@/components/ItemCard.vue";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const item = computed(() => {
  const foundItem = sourceData.items.find((item) => item.id == route.params.id);
  if (!foundItem) {
    router.replace("/items/1");
  }
  return foundItem;
});

const isSmallScreen = inject("isSmallScreen");

const f_shareable = computed(() => {
  const shareableCategory = categories.filter_categories?.others?.find(
    (cat) => cat.name === "F_Shareable",
  );
  return shareableCategory?.items.includes(item.value?.id) || false;
});

const p_shareable = computed(() => {
  const shareableCategory = categories.filter_categories?.others?.find(
    (cat) => cat.name === "P_Shareable",
  );
  return shareableCategory?.items.includes(item.value?.id) || false;
});

const foundCategory = computed(() => {
  return categories.items_categories.find(
    (category) =>
      categories.filter_categories.default_categories.includes(category.id) &&
      category.items.includes(item.value?.id),
  );
});
</script>

<template>
  <TheResponsiveChecker ref="responsiveChecker" :max-width="1200" />
  <header>
    <div class="wrapper">
      <TheItemList />
    </div>
  </header>
  <div class="main-container">
    <TheItemTree
      v-if="item"
      v-show="isSmallScreen"
      :currentItem="item"
      :data="sourceData.items"
      :tree_id="`tree_2`"
      class="item-tree-container__item-view"
    />
    <ItemCard v-if="item" :item="item" class="item-container" />
  </div>
</template>

<style scoped>
.wrapper {
  padding-top: 2rem;
}

.descrition-title {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.descrition-title img {
  width: 100%;
}

.descrition-title a {
  display: flex;
  width: 1.75rem;
  height: 1.75rem;
}

.descrition-title > span {
  display: flex;
  gap: 0.5rem;
}

.item-tree-container__item-view {
  margin: 1rem auto 0 auto;
}

.main-container {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  column-gap: 1rem;
}

::v-deep(
  .main-ability-list .abilities-list:last-child .ability-item:last-child
) {
  border-radius: 0 0 3px 3px;
}

::v-deep(
  .main-ability-list .abilities-list:last-of-type .ability-item:last-child
) {
  padding-bottom: 0.6rem;
}

.wheretobuy-countainer > div {
  display: flex;
  flex-direction: row;
  height: 2.5rem;
  padding-top: 0.25rem;
  gap: 0.25rem;
}

.wheretobuy-countainer a,
.wheretobuy-countainer img {
  width: 2.2rem;
  height: 2.2rem;
}

.item-container {
  margin: 2rem auto;
}
</style>
