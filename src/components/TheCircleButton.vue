<template>
    <button class="circle-button" :aria-label="ariaLabel" @click="onClick"></button>
  </template>
  
  <script setup>

  const props = defineProps({
    ariaLabel: {
      type: String,
      default: "Close",
    },
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
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease;
    transition-property: scale, border-color, background;
    position: relative;
  }
  
  .circle-button::before,
  .circle-button::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 2px;
    background: gray;
    transition: background 0.3s ease;
  }
  
  .circle-button::before {
    transform: rotate(45deg);
  }
  
  .circle-button::after {
    transform: rotate(-45deg);
  }
  
  .circle-button:hover {
    background: #94070099;
    border-color: var(--color-text);
  }
  
  .circle-button:hover::before,
  .circle-button:hover::after {
    background: var(--color-text);
  }
  
  .circle-button:active {
    transform: scale(0.95);
  }
  </style>
  