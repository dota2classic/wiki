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
    <!--    <div class="item-container" v-if="item">-->
    <!--      <div class="item-title">-->
    <!--        <span>-->
    <!--          <img-->
    <!--            :src="`/images/${item.image}`"-->
    <!--            :alt="item.name"-->
    <!--            class="item-image"-->
    <!--          />-->
    <!--        </span>-->
    <!--        <div>-->
    <!--          <h2>{{ item.name }}</h2>-->
    <!--          <div v-if="item.cost || item.level" class="item-shop-info">-->
    <!--            <div v-if="item.cost" class="item-cost">-->
    <!--              <img src="/images/icon_gold.png" alt="item cost" />-->
    <!--              <span> {{ item.cost }}</span>-->
    <!--            </div>-->
    <!--            <span class="item-level" v-if="item.level"-->
    <!--              >Level {{ item.level }}</span-->
    <!--            >-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div-->
    <!--        v-if="-->
    <!--          Object.values(item.abilities).some((v) => v && v.length) ||-->
    <!--          item.description ||-->
    <!--          item.stats-->
    <!--        "-->
    <!--        class="description-card"-->
    <!--      >-->
    <!--        <span class="descrition-title">-->
    <!--          <h3>{{ t("general.item.description") }}</h3>-->
    <!--          <span>-->
    <!--            <a-->
    <!--              v-if="foundCategory"-->
    <!--              :title="-->
    <!--                t(`general.categories.${foundCategory.name.toLowerCase()}`)-->
    <!--              "-->
    <!--              tabindex="0"-->
    <!--            >-->
    <!--              <img-->
    <!--                :src="`/images/${foundCategory.image}`"-->
    <!--                :alt="-->
    <!--                  t(`general.categories.${foundCategory.name.toLowerCase()}`)-->
    <!--                "-->
    <!--              />-->
    <!--            </a>-->
    <!--            <a-->
    <!--              v-if="f_shareable"-->
    <!--              :title="t('general.item.shareable.full')"-->
    <!--              tabindex="0"-->
    <!--            >-->
    <!--              <img-->
    <!--                src="/images/F_S.png"-->
    <!--                :alt="t('general.item.shareable.full')"-->
    <!--              />-->
    <!--            </a>-->
    <!--            <a-->
    <!--              v-else-if="p_shareable"-->
    <!--              :title="t('general.item.shareable.partial')"-->
    <!--              tabindex="0"-->
    <!--            >-->
    <!--              <img-->
    <!--                src="/images/P_S.png"-->
    <!--                :alt="t('general.item.shareable.partial')"-->
    <!--              />-->
    <!--            </a>-->
    <!--          </span>-->
    <!--        </span>-->
    <!--        <div-->
    <!--          v-if="Object.values(item.abilities).some((v) => v && v.length)"-->
    <!--          class="main-ability-list"-->
    <!--        >-->
    <!--          <TheAbilityCard-->
    <!--            :abilities="item.abilities?.active || []"-->
    <!--            :label="t('general.item.abilities.active')"-->
    <!--            tagColor="magenta"-->
    <!--          />-->
    <!--          <TheAbilityCard-->
    <!--            :abilities="item.abilities?.passive || []"-->
    <!--            :label="t('general.item.abilities.passive')"-->
    <!--            tagColor="blue"-->
    <!--          />-->
    <!--          <TheAbilityCard-->
    <!--            :abilities="item.abilities?.use || []"-->
    <!--            :label="t('general.item.abilities.use')"-->
    <!--            tagColor="green"-->
    <!--          />-->
    <!--          <span-->
    <!--            v-if="item.description || item.stats"-->
    <!--            style="-->
    <!--              margin-right: -0.8rem;-->
    <!--              margin-left: -0.8rem;-->
    <!--              display: flex;-->
    <!--              height: 3px;-->
    <!--              background-color: #16191d;-->
    <!--            "-->
    <!--          ></span>-->
    <!--        </div>-->
    <!--        <div v-if="item.description" class="description-text-container">-->
    <!--          <p v-html="t(item.description).replace(/\n/g, '<br />')"></p>-->
    <!--        </div>-->
    <!--        <div v-if="item.stats" class="stats-container">-->
    <!--          <p v-for="(value, name) in item.stats">-->
    <!--            <span v-if="value.startsWith('+')">-->
    <!--              +-->
    <!--              <span v-if="item.level" class="stat-value">-->
    <!--                <span v-if="value.includes('/')">-->
    <!--                  <span class="before">-->
    <!--                    {{-->
    <!--                      value-->
    <!--                        .replace(/^\+/, "")-->
    <!--                        .split("/")-->
    <!--                        .slice(0, item.level - 1)-->
    <!--                        .join("/") + (item.level > 1 ? "/" : "")-->
    <!--                    }}-->
    <!--                  </span>-->

    <!--                  <span class="target">-->
    <!--                    {{ value.replace(/^\+/, "").split("/")[item.level - 1] }}-->
    <!--                  </span>-->

    <!--                  <span class="after">-->
    <!--                    {{-->
    <!--                      value.split("/").length > item.level-->
    <!--                        ? "/" + value.split("/").slice(item.level).join("/")-->
    <!--                        : ""-->
    <!--                    }}-->
    <!--                  </span>-->
    <!--                </span>-->
    <!--                <span v-else>{{ value.slice(1) }}</span>-->
    <!--              </span>-->
    <!--              <span v-else class="stat-value">{{ value.slice(1) }}</span>-->
    <!--              {{ t(`general.item.stats.${name.toLowerCase()}`) }}-->
    <!--            </span>-->
    <!--            <span v-else>-->
    <!--              {{ t(`general.item.stats.${name.toLowerCase()}`) }}-->
    <!--              <span v-if="item.level" class="stat-value">-->
    <!--                <span v-if="value.includes('/')">-->
    <!--                  <span class="before">-->
    <!--                    {{-->
    <!--                      value-->
    <!--                        .split("/")-->
    <!--                        .slice(0, item.level - 1)-->
    <!--                        .join("/") + (item.level > 1 ? "/" : "")-->
    <!--                    }}-->
    <!--                  </span>-->

    <!--                  <span class="target">-->
    <!--                    {{ value.split("/")[item.level - 1] }}-->
    <!--                  </span>-->

    <!--                  <span class="after">-->
    <!--                    {{-->
    <!--                      value.split("/").length > item.level-->
    <!--                        ? "/" + value.split("/").slice(item.level).join("/")-->
    <!--                        : ""-->
    <!--                    }}-->
    <!--                  </span>-->
    <!--                </span>-->
    <!--                <span v-else>{{ value }}</span>-->
    <!--              </span>-->
    <!--              <span v-else-if="value.includes('/')" class="stat-value">-->
    <!--                <span class="target">-->
    <!--                  {{ value.split("/")[0] }}-->
    <!--                </span>-->
    <!--                <span class="after">-->
    <!--                  {{ "/" + value.split("/").slice(1).join("/") }}-->
    <!--                </span>-->
    <!--              </span>-->
    <!--              <span v-else class="stat-value">{{ value }}</span>-->
    <!--            </span>-->
    <!--          </p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="wheretobuy-countainer" v-if="!item.wheretobuy.roshan">-->
    <!--        {{-->
    <!--          item.wheretobuy.upgradable-->
    <!--            ? t("general.item.shops.requiring_components")-->
    <!--            : t("general.item.shops.purchasable_at")-->
    <!--        }}-->
    <!--        <div>-->
    <!--          <a-->
    <!--            v-if="item.wheretobuy.mainshop"-->
    <!--            :title="t('general.item.shops.main_shop')"-->
    <!--            tabindex="0"-->
    <!--          >-->
    <!--            <img-->
    <!--              src="/images/icon_main_shop.png"-->
    <!--              :alt="t('general.item.shops.main_shop')"-->
    <!--            />-->
    <!--          </a>-->
    <!--          <a-->
    <!--            v-if="item.wheretobuy.sideshop && item.wheretobuy.upgradable"-->
    <!--            :title="t('general.item.shops.side_shop_opt')"-->
    <!--            tabindex="0"-->
    <!--          >-->
    <!--            <img-->
    <!--              src="/images/icon_side_shop_alt.png"-->
    <!--              :alt="t('general.item.shops.side_shop_opt')"-->
    <!--            />-->
    <!--          </a>-->
    <!--          <a-->
    <!--            v-if="item.wheretobuy.sideshop && !item.wheretobuy.upgradable"-->
    <!--            :title="t('general.item.shops.side_shop')"-->
    <!--            tabindex="0"-->
    <!--          >-->
    <!--            <img-->
    <!--              src="/images/icon_side_shop.png"-->
    <!--              :alt="t('general.item.shops.side_shop')"-->
    <!--            />-->
    <!--          </a>-->
    <!--          <a-->
    <!--            v-if="item.wheretobuy.secretshop"-->
    <!--            :title="t('general.item.shops.secret_shop')"-->
    <!--            tabindex="0"-->
    <!--          >-->
    <!--            <img-->
    <!--              src="/images/icon_secret_shop.png"-->
    <!--              :alt="t('general.item.shops.secret_shop')"-->
    <!--            />-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <span v-else style="padding-top: 0.8rem">-->
    <!--        <template v-if="item.id === 117">-->
    <!--          {{ t("general.item.shops.aegis") }}-->
    <!--        </template>-->
    <!--        <template v-else>-->
    <!--          {{ t("general.item.shops.cheese") }}-->
    <!--        </template>-->
    <!--      </span>-->
    <!--      <div v-if="item.lore" class="item-lore">-->
    <!--        <i v-html="t(item.lore).replace(/\n/g, '<br />')"></i>-->
    <!--      </div>-->
    <!--    </div>-->
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
