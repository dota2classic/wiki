<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";
import TheTag from "../TheTag.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

onMounted(() => {
  if (import.meta.env.SSR) return;
  window.addEventListener("resize", updateAllLines);
});

onUnmounted(() => {
  if (import.meta.env.SSR) return;
  window.removeEventListener("resize", updateAllLines);
});

const isSlim = useRoute().path.includes("slim/");

function animateLineUpdates() {
  const intervalDuration = 25; 
  const totalDuration = 750;
  let elapsedTime = 0;

  const intervalId = setInterval(() => {
    updateAllLines();
    elapsedTime += intervalDuration;

    if (elapsedTime >= totalDuration) {
      clearInterval(intervalId);
    }
  }, intervalDuration);
}

function updateAllLines() {
  if (parentItems.value.length > 0) {
    parentItems.value.forEach((parentItem, index) => {
      drawItemLine(
        `ci-${props.currentItem.id}`,
        `${parentItem.id}-${index}`,
        false,
      );
    });
  }

  if (childItems.value.length > 0) {
    childItems.value.forEach((childItem, index) => {
      drawItemLine(
        `ci-${props.currentItem.id}`,
        `${childItem.id}-${index}`,
        true,
      );
    });
  }
}

const props = defineProps({
  currentItem: {
    type: Object,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  tree_id: {
    type: String,
    required: true,
  },
});

const some = computed(() => {
  console.log(props.currentItem, "computed current item treee");
  return 5;
});

const parentItems = computed(() =>
  (props.currentItem.parents || [])
    .map((parentId) => props.data.find((item) => item.id === parentId))
    .filter(Boolean),
);

const childItems = computed(() =>
  (props.currentItem.children || [])
    .map((childId) => props.data.find((item) => item.id === childId))
    .filter(Boolean),
);

function drawItemLine(currentItemId, relativeId, top) {
  const itemTree = document.getElementById(props.tree_id);

  const el1 = itemTree.querySelector(`#${currentItemId}`);
  const el2 = itemTree.querySelector(`#rel-${relativeId}`);
  const line = itemTree.querySelector(`#line-${relativeId}`).firstElementChild;

  function updateLine() {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const treeRect = itemTree.getBoundingClientRect();

    const x1 = rect1.left - treeRect.left + rect1.width / 2;
    const y1 = rect1.top - treeRect.top + rect1.height / 2;
    const x2 = rect2.left - treeRect.left + rect2.width / 2;
    const y2 = rect2.top - treeRect.top + rect2.height / (top ? 1.5 : 2.5);

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
  }

  updateLine();
}
</script>

<template>
  <div :id="props.tree_id" class="item-tree">
    <TheTag color="dark">{{ t("general.itemtree.name") }}</TheTag>
    <transition mode="out-in" name="fade">
      <span
        v-if="!currentItem.children && !currentItem.parents"
        class="no-recipe-holder"
      >
        {{ t("general.itemtree.no_recipe") }}
      </span>
    </transition>

    <div class="item-list-outer children">
      <transition mode="out-in" name="fade">
        <div v-if="childItems.length" class="item-list">
          <transition appear name="squash">
            <span
              :key="`${currentItem.id}-children-1__item-list-animation-helper`"
              class="item-list-animation-helper"
            ></span>
          </transition>
          <RouterLink
            v-for="(child, index) in childItems"
            :id="`rel-${child.id}-${index}`"
            :to="{
              name: isSlim ? 'item.show-slim' : 'item.show',
              params: { category: props.category, id: child.id },
            }"
            class="item"
          >
            <img
              :alt="child.name"
              :src="`/images/items/${child.image}`"
              :title="child.name"
            />
            <div class="line-container">
              <svg
                :id="`line-${child.id}-${index}`"
                class="item-line"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  stroke="white"
                  stroke-width="2"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="0"
                />
              </svg>
            </div>
          </RouterLink>
          <transition appear name="squash">
            <span
              :key="`${currentItem.id}-children-2__item-list-animation-helper`"
              class="item-list-animation-helper`"
            ></span>
          </transition>
        </div>
      </transition>
    </div>

    <transition appear @enter="animateLineUpdates">
      <span
        :key="`${currentItem.id}-event-listener`"
        style="display: none"
      ></span>
    </transition>
    <div :id="`ci-${currentItem.id}`" class="item current-item">
      <img
        :alt="currentItem.name"
        :src="`/images/items/${currentItem.image}`"
        :title="currentItem.name"
      />
    </div>

    <div class="item-list-outer parents">
      <transition mode="out-in" name="fade">
        <div v-if="parentItems.length" class="item-list">
          <transition appear name="squash">
            <span
              :key="`${currentItem.id}-parents-1__item-list-animation-helper`"
              class="item-list-animation-helper"
            ></span>
          </transition>
          <RouterLink
            v-for="(parent, index) in parentItems"
            :id="`rel-${parent.id}-${index}`"
            :to="{
              name: isSlim ? 'item.show-slim' : 'item.show',
              params: { category: props.category, id: parent.id },
            }"
            class="item"
          >
            <img
              :alt="parent.name"
              :src="`/images/items/${parent.image}`"
              :title="parent.name"
            />
            <div class="line-container">
              <svg
                :id="`line-${parent.id}-${index}`"
                class="item-line"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  stroke="white"
                  stroke-width="2"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="0"
                />
              </svg>
            </div>
          </RouterLink>
          <transition appear name="squash">
            <span
              :key="`${currentItem.id}-parents-2__item-list-animation-helper`"
              class="item-list-animation-helper"
            ></span>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.line-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0.625;
  pointer-events: none;
  z-index: -1;
}

.item-line {
  height: 100%;
  width: 100%;
}

.fade-enter-active {
  transition: max-height 0.35s ease;
}

.fade-leave-active {
  transition: none;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  max-height: 45px;
}

.squash-enter-active {
  transition: flex 0.55s ease;
}

.squash-leave-active {
  transition: none;
}

.squash-enter-from,
.squash-leave-to {
  flex: 0.25;
}

.squash-enter-to,
.squash-leave-from {
  flex: 0;
}

.item-tree {
  margin-top: 1rem;
  position: relative;
  padding: 0.5rem;
  padding-top: 0.9rem;
  padding-bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  height: 10rem;
  width: 25rem;
  flex-shrink: 0;

  align-items: center;
  justify-content: space-around;
  user-select: none;

  border-radius: 3px;
}

.item-tree > .tag {
  position: absolute;
  top: -16px;
  margin: 0 auto;
}

.item-list-outer {
  width: 100%;
  overflow: hidden;
}

.item img {
  max-width: 3.2rem;
  border-radius: 3px;
  transition: transform 0.2s;
  aspect-ratio: 85/64;
}

.current-item img {
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2);
}

.item:not(.current-item) img:hover {
  transform: scale(1.1);
}

.item-list {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.no-recipe-holder {
  display: flex;
  align-items: flex-end;
  height: 45px;
}

@media (max-width: 405px) {
  .item-tree {
    width: 19rem;
    height: 8rem;
  }

  .item img {
    max-width: 2.6rem;
  }
}
</style>
