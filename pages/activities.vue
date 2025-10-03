<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";

const activeKey = ref(["1"]);

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
  <div class="activities-page">
    <div class="activities__left">
      <PageBanner titleProps="Activities" />

      <div class="activities__body">
        <div class="act__header">
          <h4 class="section__title">Activities</h4>

          <a-button @click="showModal" class="add__btn">
            <Icon name="lucide:plus" class="icon" />
            Add
          </a-button>
        </div>
        <div class="act__top">
          <p class="act__total">Total Hours per School Year</p>
          <div class="act__top-items">
            <div class="act__top-item">
              <p>Year 9:</p>
              <span>0</span>
            </div>
            <div class="act__top-item">
              <p>Year 10:</p>
              <span>0</span>
            </div>
            <div class="act__top-item">
              <p>Year 11:</p>
              <span>0</span>
            </div>
            <div class="act__top-item">
              <p>Year 12:</p>
              <span>0</span>
            </div>
          </div>
        </div>
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
              <div class="programmes__item-date">
                <span>June 15, 2023 - August 15, 2023</span>
              </div>
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
          <div class="programmes__item-body">
            <a-collapse accordion v-model:activeKey="activeKey">
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
                      <p class="panel__content-text">
                        Considering (short list)
                      </p>
                    </div>
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">Description</h4>
                      <p class="panel__content-text">
                        Now summarize what you wrote above: describe the
                        activity, including what you accomplished and any
                        recognition you received, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
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
              <div class="programmes__item-date">
                <span>June 15, 2023 - August 15, 2023</span>
              </div>
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
          <div class="programmes__item-body">
            <a-collapse accordion v-model:activeKey="activeKey">
              <a-collapse-panel key="2" :show-arrow="false">
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
                      <p class="panel__content-text">
                        Considering (short list)
                      </p>
                    </div>
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">Description</h4>
                      <p class="panel__content-text">
                        Now summarize what you wrote above: describe the
                        activity, including what you accomplished and any
                        recognition you received, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </div>

      <div class="activities__body">
        <div class="act__header">
          <h4 class="section__title">Internship & Work Experience</h4>

          <a-button class="add__btn">
            <Icon name="lucide:plus" class="icon" />
            Add
          </a-button>
        </div>

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
              <div class="programmes__item-date">
                <span>June 15, 2023 - August 15, 2023</span>
              </div>

              <button class="programmes__item-edit">
                <Icon name="lucide:ellipsis-vertical" />
              </button>
            </div>
          </div>
          <div class="programmes__item-body">
            <a-collapse accordion v-model:activeKey="activeKey">
              <a-collapse-panel key="1" :show-arrow="false">
                <template #header>
                  <div class="panel-header">
                    <p>Collapse</p>
                    <Icon name="lucide:chevron-down" />
                  </div>
                </template>
                <div class="panel-content">
                  <div class="panel__content-items new__grid">
                    <div class="separator">
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
                    </div>

                    <div class="separator">
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">Application Status</h4>
                        <p class="panel__content-text">
                          Considering (short list)
                        </p>
                      </div>
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">Description</h4>
                        <p class="panel__content-text">
                          Now summarize what you wrote above: describe the
                          activity, including what you accomplished and any
                          recognition you received, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
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
.activities-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.activities__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.act__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.act__top {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
.act__total {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.act__top-items {
  display: flex;
  align-items: center;
  gap: 24px;
}
.act__top-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.act__top-item p {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.act__top-item span {
  font-weight: 600;
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
:deep(.ant-select) {
  width: 167px !important;
}
:deep(.ant-select-selector) {
  width: 120px;
  height: 32px !important;
  border-radius: 8px !important;
}
:deep(.ant-collapse-item) {
  border: 0 !important;
}
:deep(.ant-collapse-header) {
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
:deep(.ant-collapse-content) {
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
.new__grid {
  grid-template-columns: repeat(2, 1fr);
}
.separator {
  border-right: 1px solid var(--border);
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.new__grid .panel__content-item {
  display: grid;
  grid-template-columns: 3fr 5fr;
  gap: 24px;
}
</style>
