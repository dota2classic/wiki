<script setup>
import { computed } from "vue";
import categories from "@/data/items_categories.json";
import { useI18n } from "vue-i18n";
import TheAbilityCard from "@/components/items/TheAbilityCard.vue";

const { item } = defineProps(["item"]);
const { t } = useI18n();

const f_shareable = computed(() => {
  const shareableCategory = categories.filter_categories?.others?.find(
    (cat) => cat.name === "F_Shareable",
  );
  return shareableCategory?.items.includes(item.id) || false;
});

const p_shareable = computed(() => {
  const shareableCategory = categories.filter_categories?.others?.find(
    (cat) => cat.name === "P_Shareable",
  );
  return shareableCategory?.items.includes(item.id) || false;
});

const foundCategory = computed(() => {
  return categories.items_categories.find(
    (category) =>
      categories.filter_categories.default_categories.includes(category.id) &&
      category.items.includes(item.id),
  );
});
</script>

<template>
  <div v-if="item" class="item-container">
    <div class="item-title">
      <span>
        <img
          :alt="item.name"
          :src="`/images/items/${item.image}`"
          class="item-image"
        />
      </span>
      <div>
        <h2>{{ item.name }}</h2>
        <div v-if="item.cost || item.level" class="item-shop-info">
          <div v-if="item.cost" class="item-cost">
            <img alt="item cost" src="/images/items/icon_gold.png" />
            <span> {{ item.cost }}</span>
          </div>
          <span v-if="item.level" class="item-level"
            >Level {{ item.level }}</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="
        Object.values(item.abilities).some((v) => v && v.length) ||
        item.description ||
        item.stats
      "
      class="description-card"
    >
      <span class="descrition-title">
        <h3>{{ t("general.item.description") }}</h3>
        <span>
          <a
            v-if="foundCategory"
            :title="t(`general.categories.${foundCategory.name.toLowerCase()}`)"
            tabindex="0"
          >
            <img
              :alt="t(`general.categories.${foundCategory.name.toLowerCase()}`)"
              :src="`/images/items/${foundCategory.image}`"
            />
          </a>
          <a
            v-if="f_shareable"
            :title="t('general.item.shareable.full')"
            tabindex="0"
          >
            <img
              :alt="t('general.item.shareable.full')"
              src="/images/items/F_S.webp"
            />
          </a>
          <a
            v-else-if="p_shareable"
            :title="t('general.item.shareable.partial')"
            tabindex="0"
          >
            <img
              :alt="t('general.item.shareable.partial')"
              src="/images/items/P_S.webp"
            />
          </a>
        </span>
      </span>
      <div
        v-if="Object.values(item.abilities).some((v) => v && v.length)"
        class="main-ability-list"
      >
        <TheAbilityCard
          :abilities="item.abilities?.active || []"
          :label="t('general.item.abilities.active')"
          tagColor="magenta"
        />
        <TheAbilityCard
          :abilities="item.abilities?.passive || []"
          :label="t('general.item.abilities.passive')"
          tagColor="blue"
        />
        <TheAbilityCard
          :abilities="item.abilities?.use || []"
          :label="t('general.item.abilities.use')"
          tagColor="green"
        />
        <span
          v-if="item.description || item.stats"
          style="
            margin-right: -0.8rem;
            margin-left: -0.8rem;
            display: flex;
            height: 3px;
            background-color: #16191d;
          "
        ></span>
      </div>
      <div v-if="item.description" class="description-text-container">
        <p v-html="t(item.description).replace(/\n+/g, '\n').replace(/\n/g, '<br />')"></p>
      </div>
      <div v-if="item.stats" class="stats-container">
        <p v-for="(value, name) in item.stats">
          <span v-if="value.startsWith('+')">
            +
            <span v-if="item.level" class="stat-value">
              <span v-if="value.includes('/')">
                <span class="before">
                  {{
                    value
                      .replace(/^\+/, "")
                      .split("/")
                      .slice(0, item.level - 1)
                      .join("/") + (item.level > 1 ? "/" : "")
                  }}
                </span>

                <span class="target">
                  {{ value.replace(/^\+/, "").split("/")[item.level - 1] }}
                </span>

                <span class="after">
                  {{
                    value.split("/").length > item.level
                      ? "/" + value.split("/").slice(item.level).join("/")
                      : ""
                  }}
                </span>
              </span>
              <span v-else>{{ value.slice(1) }}</span>
            </span>
            <span v-else class="stat-value">{{ value.slice(1) }}</span>
            {{ t(`general.item.stats.${name.toLowerCase()}`) }}
          </span>
          <span v-else>
            {{ t(`general.item.stats.${name.toLowerCase()}`) }}
            <span v-if="item.level" class="stat-value">
              <span v-if="value.includes('/')">
                <span class="before">
                  {{
                    value
                      .split("/")
                      .slice(0, item.level - 1)
                      .join("/") + (item.level > 1 ? "/" : "")
                  }}
                </span>

                <span class="target">
                  {{ value.split("/")[item.level - 1] }}
                </span>

                <span class="after">
                  {{
                    value.split("/").length > item.level
                      ? "/" + value.split("/").slice(item.level).join("/")
                      : ""
                  }}
                </span>
              </span>
              <span v-else>{{ value }}</span>
            </span>
            <span v-else-if="value.includes('/')" class="stat-value">
              <span class="target">
                {{ value.split("/")[0] }}
              </span>
              <span class="after">
                {{ "/" + value.split("/").slice(1).join("/") }}
              </span>
            </span>
            <span v-else class="stat-value">{{ value }}</span>
          </span>
        </p>
      </div>
    </div>
    <div v-if="!item.wheretobuy.roshan" class="wheretobuy-countainer">
      {{
        item.wheretobuy.upgradable
          ? t("general.item.shops.requiring_components")
          : t("general.item.shops.purchasable_at")
      }}
      <div>
        <a
          v-if="item.wheretobuy.mainshop"
          :title="t('general.item.shops.main_shop')"
          tabindex="0"
        >
          <img
            :alt="t('general.item.shops.main_shop')"
            src="/images/items/icon_main_shop.webp"
          />
        </a>
        <a
          v-if="item.wheretobuy.sideshop && item.wheretobuy.upgradable"
          :title="t('general.item.shops.side_shop_opt')"
          tabindex="0"
        >
          <img
            :alt="t('general.item.shops.side_shop_opt')"
            src="/images/items/icon_side_shop_alt.webp"
          />
        </a>
        <a
          v-if="item.wheretobuy.sideshop && !item.wheretobuy.upgradable"
          :title="t('general.item.shops.side_shop')"
          tabindex="0"
        >
          <img
            :alt="t('general.item.shops.side_shop')"
            src="/images/items/icon_side_shop.webp"
          />
        </a>
        <a
          v-if="item.wheretobuy.secretshop"
          :title="t('general.item.shops.secret_shop')"
          tabindex="0"
        >
          <img
            :alt="t('general.item.shops.secret_shop')"
            src="/images/items/icon_secret_shop.webp"
          />
        </a>
      </div>
    </div>
    <span v-else style="padding-top: 0.8rem">
      <template v-if="item.id === 117">
        {{ t("general.item.shops.aegis") }}
      </template>
      <template v-else>
        {{ t("general.item.shops.cheese") }}
      </template>
    </span>
    <div v-if="item.lore" class="item-lore">
      <i v-html="t(item.lore).replace(/\n/g, '<br />')"></i>
    </div>
  </div>
</template>

<style scoped>
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

.stat-value:not(:has(.target)),
.stat-value .target {
  color: gold;
}

span.before,
span.after {
  color: darkgray;
}

.stats-container {
  padding-top: 0.5rem;
  padding-bottom: 0.8rem;
  font-weight: 500;
}

.description-card {
  background-color: #2e3135;
  border-radius: 3px;
  padding: 0.8rem;
  padding-top: 0.4rem;
  padding-bottom: 0;
  box-shadow: 0 0 10px 2px rgba(24, 24, 24, 1);
  word-break: break-word;
}

.description-text-container {
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}

.item-container {
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

.item-title {
  display: flex;
  column-gap: 1rem;
  padding-bottom: 0.8rem;
}

.item-title h2 {
  padding-bottom: 0.25rem;
}

.item-title > div {
  display: flex;
  flex-direction: column;
  flex: 5;
}

.item-image {
  flex: 2;
  width: 100%;
  aspect-ratio: 85/64;
  border-radius: 3px;
  box-shadow: 0 0 10px 2px rgba(24, 24, 24, 1);
}

.item-shop-info {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
}

.item-cost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: gold;
}

.item-level {
  padding-right: 1rem;
}

.wheretobuy-countainer {
  padding-top: 1rem;
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

.item-lore {
  padding-top: 0.5rem;
  font-size: 0.933em;
}

@media screen and (max-width: 750px) {
  .item-container {
    width: 100%;
    max-width: 27rem;
  }
}
</style>
