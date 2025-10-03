<script setup>
defineProps({
  school__options: {
    type: Array,
    required: true,
  },
  school__items: {
    type: Array,
    required: true,
  },
});

import { ref } from "vue";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
  console.log("clicked");
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
</script>

<template>
  <div class="programmes">
    <div class="programmes__head">
      <h2 class="programmes__title">Creative Portfolio</h2>
      <button @click="showModal" class="add__btn">
        <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add
      </button>
    </div>
    <div class="programmes__items">
      <div class="programmes__item">
        <div class="programmes__item-head">
          <div class="programmes__item-left">
            <div>
              <h3 class="programmes__item-title">Stanford University</h3>
              <p class="programmes__item-description">
                Stanford University offers a variety of summer programs
              </p>
            </div>
          </div>
          <div class="programmes__item-right">
            <button class="programmes__item-edit">
              <Icon name="lucide:ellipsis-vertical" />
            </button>
          </div>
        </div>
        <div class="programmes__mid">
          <div class="programmes__item-date">
            <span>June 15, 2023 - August 15, 2023</span>
          </div>
          <div class="programmes__rating">
            <span>Impact factor</span>
            <a-tooltip>
              <template #title>Info</template>
              <Icon name="lucide:info" style="width: 16px; height: 16px" />
            </a-tooltip>
            <a-rate v-model:value="value" />
          </div>
        </div>
        <div class="programmes__item-body">
          <div class="portfolio__item">
            <div class="portfolio__left">
              <h3 class="portfolio__title">File type</h3>
              <p class="portfolio__description">Audio</p>
            </div>
            <div class="portfolio__right">
              <p class="portfolio__view-name">Download</p>
              <button class="portfolio__download-btn">Audio.mp3</button>
            </div>
          </div>
          <div class="portfolio__item">
            <div class="portfolio__left">
              <h3 class="portfolio__title">File type</h3>
              <p class="portfolio__description">Audio</p>
            </div>
            <div class="portfolio__right">
              <p class="portfolio__view-name">Download</p>
              <button class="portfolio__download-btn">Audio.mp3</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style scoped>
.programmes {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
}
.programmes__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.programmes__title {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #111827;
}
.add__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--blue);
  color: var(--blue);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.programmes__item {
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
}
.programmes__item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.programmes__item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.programmes__item-img {
  width: 68px;
  height: 68px;
  border-radius: 8px;
  overflow: hidden;
}
.programmes__item-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #111827;
  margin-bottom: 4px;
}
.programmes__item-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.programmes__item-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.programmes__item-date {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 8px;
}
.programmes__mid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.programmes__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--light-grey);
}
.portfolio__item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
}
.portfolio__left {
  display: flex;
  gap: 24px;
}
.portfolio__title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.portfolio__description {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.portfolio__right {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-left: 24px;
  border-left: 1px solid var(--border);
}
.portfolio__view-name {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.portfolio__download-btn {
  color: var(--blue);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.programmes__item-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
