<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";

import { ref } from "vue";
const value = ref(2);

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = (e) => {
  visible.value = false;
};
</script>

<template>
  <div class="honors-page">
    <div class="honors__left">
      <PageBanner
        titleProps="Honors"
        backgroundProps="#FF4C16"
        iconProps="/page-icons/honors.png"
      />

      <div class="honors__body">
        <div class="honors__header">
          <h4 class="section__title">Honors and Awards</h4>

          <a-button @click="showModal" class="add__btn">
            <Icon name="lucide:plus" class="icon" />
            Add
          </a-button>
        </div>
        <div class="honors__items">
          <div class="honors__item">
            <div class="honors__item-header">
              <div>
                <h5 class="honors__item-name">
                  The Influence of Language Clubs on Cultural Awareness
                </h5>
                <span class="honors__item-sub"> Comnputing </span>
              </div>
              <button class="honors__item-edit">
                <Icon name="lucide:ellipsis-vertical" class="icon" />
              </button>
            </div>
            <div class="honors__item-mid">
              <p class="honors__item-date">June 2020 - August 2020</p>

              <div class="programmes__rating">
                <span>Impact factor</span>
                <a-tooltip>
                  <template #title>Info</template>
                  <Icon name="lucide:info" style="width: 16px; height: 16px" />
                </a-tooltip>
                <a-rate v-model:value="value" />
              </div>
            </div>
            <div class="honors__item-bottom">
              <p class="honors__item-question">Description:</p>
              <p class="honors__item-answer">
                This research explores how participation in language clubs
                enhances cultural awareness among students.
              </p>
            </div>
          </div>
          <div class="honors__item">
            <div class="honors__item-header">
              <div>
                <h5 class="honors__item-name">
                  The Influence of Language Clubs on Cultural Awareness
                </h5>
                <span class="honors__item-sub"> Comnputing </span>
              </div>
              <button class="honors__item-edit">
                <Icon name="lucide:ellipsis-vertical" class="icon" />
              </button>
            </div>
            <div class="honors__item-mid">
              <p class="honors__item-date">June 2020 - August 2020</p>

              <div class="programmes__rating">
                <span>Impact factor</span>
                <ATooltip>
                  <template #title>Info</template>
                  <Icon name="lucide:info" style="width: 16px; height: 16px" />
                </ATooltip>
                <!-- explicit binding + change handler -->
                <ARate
                  :value="value"
                  @change="onRateChange"
                  :key="'rate-' + value"
                />
              </div>
            </div>
            <div class="honors__item-bottom">
              <p class="honors__item-question">Description:</p>
              <p class="honors__item-answer">
                This research explores how participation in language clubs
                enhances cultural awareness among students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GeneralCard />
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style scoped>
.honors-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.honors__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.honors__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.honors__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.honors__item {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
.honors__item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.honors__item-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}
.honors__item-sub {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.honors__item-edit span {
  width: 20px;
  height: 20px;
}
.honors__item-mid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.honors__item-date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 8px;
}
.programmes__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--light-grey);
}
.honors__item-bottom {
  display: grid;
  grid-template-columns: 160px 1fr;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
}
.honors__item-question {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.honors__item-answer {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: end;
}
</style>
