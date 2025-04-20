<script setup>
import { useI18n } from "vue-i18n";
const { hero } = defineProps(["hero"]);

</script>

<template>
    <div class="hero-container">
      <div class="hero-title">
        <span>
          <img
            :alt="hero.name"
            :src="`/images/heroes/${hero.image}`"
            class="hero-image"
          />
        </span>
        {{ hero.name }}
      </div>
      <div class="hero-stats">
        <span>{{ hero.AttributeBaseStrength }} + {{ hero.AttributeStrengthGain.replace(/\.0$/, '') }}</span>
        <span>{{ hero.AttributeBaseAgility }} + {{ hero.AttributeAgilityGain.replace(/\.0$/, '') }}</span>
        <span>{{ hero.AttributeBaseIntelligence }} + {{ hero.AttributeIntelligenceGain.replace(/\.0$/, '') }}</span>
      </div>
      <div class="level-stats-grid">
        <span>Level</span> <span>0</span> <span>1</span> <span>15</span> <span>25</span>
      </div>
        <p>таблица характеристик по уровню (считать прямо на странице): здоровье, мана, броня, урон, скорость атаки</p>
        <p>тут характеристики которые остаются при повышении уровня (маг. резист., дальность атаки и т.д.) 
          в дальности атаки указать мили или ренж (взять иконки с вики)</p>
        <p>оставить {{ hero.name }} для консоли и т.д.</p>
    </div>
</template>

<style scoped>
.hero-container {
  width: 27rem;
  align-self: start;
  border-radius: 3px;
  background-color: var(--color-card-1);
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 1px;
  box-shadow: 0 0 10px 2px rgba(24, 24, 24, 1);
}

.hero-stats {
  display: flex;
  column-gap: 1rem;
}

.level-stats-grid {
  display: grid;
  grid-template-columns: 1fr repeat(4, 4rem);
}
</style>