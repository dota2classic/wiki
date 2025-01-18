<script setup>

defineProps({
  modelValue: { 
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  trueText: {
    type: String,
    default: 'Включено',
  },
  falseText: {
    type: String,
    default: 'Выключено',
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <label class="checkbox-label">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="updateValue($event.target.checked)"
    />
    <span class="checkbox-text">{{ modelValue ? trueText : falseText }}</span>
    <span class="checkbox-label-text">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox-text {
  font-size: 14px;
  color: #555;
}

.checkbox-label-text {
  font-size: 16px;
  font-weight: bold;
  color: #000;
}
</style>