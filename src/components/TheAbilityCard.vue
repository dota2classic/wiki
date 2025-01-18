<script setup>
import TheTag from "./TheTag.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { abilities, label, tagColor } = defineProps({
  abilities: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "Ability",
  },
  tagColor: {
    type: String,
    default: "magenta",
  },
});

</script>

<template>
  <div v-if="abilities && abilities.length" class="abilities-list">
    <div
      v-for="ability in abilities"
      :key="ability.name"
      class="ability-item"
      :class="tagColor"
    >
      <TheTag :color="tagColor" style="font-weight: 500;" class="ability-tag">
        {{ label }}{{ ability.name ? ":" : "" }} {{ ability.name }}
      </TheTag>
      <p>{{ t(ability.description) }}</p>
      <div v-if="ability.mana || ability.cooldown" class="ability-meta">
        <span v-if="ability.mana">
          <img 
            src="/images/Mana_symbol.webp" 
            :alt="t('general.item.abilities.mana')" 
            :title="t('general.item.abilities.mana')" 
          />
          {{ ability.mana }}
        </span>
        <span v-if="ability.cooldown">
          <img
            src="/images/Cooldown_symbol.webp"
            :alt="t('general.item.abilities.cooldown')" 
            :title="t('general.item.abilities.cooldown')" 
          />
          {{ ability.cooldown }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .abilities-list {
        margin-left: -0.8rem;
        margin-right: -0.8rem;
    }

    .abilities-list:first-of-type {
        padding-top: 1rem;
    }

    .ability-item {
        background-color: #2E3135;
        position: relative;
        padding: 0.8rem;
        padding-bottom: 1.2rem;
    }

    .ability-item::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #16191d;
    }

    .ability-item.magenta {
      background-color: #38272b;
    }

    .ability-item.blue {
      background-color: #232e3a;
    }

    .ability-item.green {
      background-color: #213526;
    }

    .ability-tag {
        position: absolute;
        top: -0.67rem;
        left: 0.8rem;
    }

    .ability-meta {
        color: gold;
        display: flex;
        gap: 2rem;
        padding: 0.45rem 0 0 0;
    }

    .ability-meta span {
        display: inline-flex;
        align-items: center; 
    }

    .ability-meta img {
        margin-right: 0.35rem;
    }
</style>