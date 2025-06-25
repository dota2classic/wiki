<template>
  <button class="circle-button" :aria-label="ariaLabel" @click="onClick">
    <div class="cross" :title="innerTitle">
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  ariaLabel: {
    type: String,
    default: "Close",
  },
  innerTitle: {
    type: String,
  }
});

const emit = defineEmits(["click"]);

function onClick() {
  emit("click");
}
</script>

<style scoped>
.circle-button {
  width: 50px;
  height: 50px;
  border: 2px solid gray;
  border-radius: 50%;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
}

.cross {
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line {
  position: absolute;
  width: 35%;
  height: 2px;
  background: gray;
  transition: background 0.3s ease;
}

.line:first-child {
  transform: rotate(45deg);
}

.line:last-child {
  transform: rotate(-45deg);
}

.circle-button:hover {
  transform: scale(1.1);
  background: rgba(148, 7, 0, 0.6);
  border-color: var(--color-text);
}

.circle-button:hover .line {
  background: var(--color-text);
}

.circle-button:active {
  transform: scale(0.95);
}
</style>
