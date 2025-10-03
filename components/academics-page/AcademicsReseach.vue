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
const value = ref(2);

import { ref } from "vue";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
</script>

<template>
  <div class="programmes">
    <div class="programmes__head">
      <h2 class="programmes__title">Academics Research & Publications</h2>
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
            <div class="programmes__item-order">
              <a-select
                v-model:value="value__one"
                :options="school__options"
                placeholder="Order by"
              ></a-select>
            </div>
            <button class="programmes__item-edit">
              <Icon name="lucide:ellipsis-vertical" />
            </button>
          </div>
        </div>
        <div class="programmes__mid">
          <div class="programmes__item-date">
            <span>June 15, 2023 - August 15, 2023</span>
          </div>
          <div class="programmes__copilot-btn">
            <Icon name="lucide:bot" style="width: 16px; height: 16px" />
            <span>Copilot suggestion</span>
          </div>
          <div class="programmes__switch">
            <a-switch />
            <span>Crimson Supported</span>
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
          <a-collapse accordion>
            <a-collapse-panel key="1" :show-arrow="false">
              <template #header>
                <div class="panel-header">
                  <p>Collapse</p>
                  <Icon name="lucide:chevron-down" />
                </div>
              </template>
              <div class="panel-content">
                <div class="panel__content-items">
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Categories</h4>
                    <p class="panel__content-text">Engeenering</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Session</h4>
                    <p class="panel__content-text">Aug 21 - Sep 15</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">For credit?</h4>
                    <p class="panel__content-text">Credit</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Application Outcome</h4>
                    <p class="panel__content-text">Admitted but undecided</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Learning format</h4>
                    <p class="panel__content-text">Online</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Application Deadline</h4>
                    <p class="panel__content-text">RD. Dec 11</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Application Status</h4>
                    <p class="panel__content-text">Considering (short list)</p>
                  </div>
                  <div class="panel__content-item">
                    <h4 class="panel__content-title">Description</h4>
                    <p class="panel__content-text">
                      Now summarize what you wrote above: describe the activity,
                      including what you accomplished and any recognition you
                      received, etc.
                    </p>
                  </div>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
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
  margin-bottom: 16px;
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
.programmes :deep(.ant-select-selector) {
  width: 120px;
  height: 32px !important;
  border-radius: 8px !important;
}
.programmes :deep(.ant-collapse-item) {
  border: 0 !important;
}
.programmes :deep(.ant-collapse-header) {
  padding: 0 !important;
  justify-content: center;
}
.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.programmes :deep(.ant-collapse-content) {
  border: 1px solid var(--border) !important;
  padding: 16px !important;
  margin-top: 16px;
}
.panel__content-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.panel__content-item:last-child {
  grid-column: span 4;
}
.panel__content-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  margin-bottom: 4px;
}
.panel__content-text {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.programmes__mid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.programmes__copilot-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--blue);
}
.programmes__switch {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.programmes__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--light-grey);
}
</style>
