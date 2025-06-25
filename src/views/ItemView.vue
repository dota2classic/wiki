<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import sourceData from "@/data/items.json";
import categories from "@/data/items_categories.json";
import TheItemTree from "@/components/items/TheItemTree.vue";
import TheItemList from "@/components/items/TheItemList.vue";
import ItemCard from "@/components/items/TheItemCard.vue";
import TheFilterSection from "@/components/items/TheFilterSection.vue";

const route = useRoute();
const router = useRouter();

const item = computed(() => {
  const foundItem = sourceData.items.find((item) => item.id == route.params.id);
  if (!foundItem) {
    router.replace("/items/1");
  }
  return foundItem;
});

const hightlightRelativies = computed(() => route.query.hr === "true");
</script>

<template>
    <div class="wrapper">
      <TheFilterSection
        :hightlightRelativies="hightlightRelativies"
        :categories="categories"
        class="fltr-item"
      />
      <div class="list-item grid-item-container">
        <TheItemList 
          :data="sourceData.items"
          :categoriesData="categories"
        />
      </div>
      <div class="tree-item grid-item-container">
        <TheItemTree
          v-if="item"
          :currentItem="item"
          :data="sourceData.items"
          :tree_id="`tree_1`"
          class="item-tree-container__item-view"
        />
      </div>
      <div class="card-item grid-item-container">
        <ItemCard v-if="item" :item="item" class="item-container" />
      </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 12rem 1fr;
  grid-template-areas: 
  "   fltr-item   tree-item   card-item   "
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
  padding-right: 1rem;
}

.tree-item {
  grid-area: tree-item;
}

.card-item {
  grid-area: card-item;
}

@media screen and (min-width: 1200px) {
  .fltr-item,
  .tree-item {
    position: sticky;
    top: 0;
  }

  .list-item {
    position: sticky;
    top: 12rem;
    height: fit-content;
  }
}

 @media screen and (max-width: 1199px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 10.6rem 1fr;
    grid-template-areas: 
    "   fltr-item   tree-item   "
    "   card-item   card-item   "
    "   list-item   list-item   ";
    row-gap: 1.5rem;
  }

  .list-item{
    padding-right: 0;
  }
 }

 @media screen and (max-width: 750px) {
  .wrapper {
    grid-template-columns: 1fr;
    grid-template-areas: 
    "   tree-item   "
    "   card-item   "
    "   fltr-item   "
    "   list-item   ";
  }
}

@media screen and (max-width: 405px) {
  .wrapper {
    grid-template-rows: 8rem 1fr;
  }
}
</style>
