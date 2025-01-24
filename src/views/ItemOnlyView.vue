<script setup>
import { computed } from "vue";
import sourceData from "@/data/items.json";
import { useRoute, useRouter } from "vue-router";
import TheItemTree from "@/components/TheItemTree.vue";
import ItemCard from "@/components/ItemCard.vue";

const route = useRoute();
const router = useRouter();

const item = computed(() => {
  const foundItem = sourceData.items.find((item) => item.id == route.params.id);
  if (!foundItem) {
    router.replace("/items/1");
  }
  return foundItem;
});
</script>

<template>
  <div class="item-preview">
    <ItemCard :item="item" class="item" />
    <TheItemTree
      :currentItem="item"
      :data="sourceData.items"
      :tree_id="`tree_2`"
      class="item-tree"
    />
  </div>
</template>

<style scoped>
.item-preview {
  display: grid;
  grid-template-columns: 1fr;
}

.item {
  grid-column: span 1;
}

.item-tree {
  margin-top: 1rem;
  grid-column: span 1;
}
</style>
