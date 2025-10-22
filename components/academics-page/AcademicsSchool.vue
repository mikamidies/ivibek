<script setup>
import { defineProps } from "vue";

const props = defineProps({
  school__items: {
    type: Array,
    required: true,
  },
});

const activeKey = ref(["1"]);

import { ref } from "vue";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = (e) => {
  visible.value = false;
};
const secondModal = ref(false);
</script>

<template>
  <div class="academics">
    <div class="academics__head">
      <h2 class="academics__title">School academics</h2>
      <button @click="showModal" class="add__btn">
        <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add
      </button>
    </div>

    <div class="academics__body">
      <a-collapse accordion v-model:activeKey="activeKey">
        <a-collapse-panel key="1">
          <template #header>
            <div class="panel-header">
              <div class="panel-title">
                <h3>Grade 10</h3>
                <small class="panel-sub">Sep 2023 - May 2024 </small>
              </div>

              <div class="panel-actions">
                <div class="panel-switch">
                  <span>GPA</span>
                  <a-switch @click.stop />
                </div>
                <button type="button" @click.stop>
                  <Icon name="lucide:ellipsis-vertical" />
                </button>
              </div>
            </div>
          </template>

          <div class="panel-content">
            <div class="panel__top">
              <div class="panel__top-items">
                <div class="panel__top-item">
                  <div>
                    <span class="panel__top-item-label">Subjects</span>
                    <span class="panel__top-item-value">5</span>
                  </div>
                  <div>
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
                <div class="panel__top-item">
                  <span class="panel__top-item-label">Courses</span>
                  <span class="panel__top-item-value">3</span>
                </div>
                <div class="panel__top-item">
                  <span class="panel__top-item-label">Teachers</span>
                  <span class="panel__top-item-value">2</span>
                </div>
                <div class="panel__top-item">
                  <span class="panel__top-item-label">GPA</span>
                  <span class="panel__top-item-value">3.8</span>
                </div>
              </div>
            </div>
            <div class="panel__content-items">
              <div class="panel__content-item">
                <div class="panel__main">
                  <div class="panel__main-top">
                    <h4 class="panel__main-title">Courses</h4>
                    <button @click="secondModal = true" class="add__btn">
                      <Icon
                        name="lucide:plus"
                        style="width: 16px; height: 16px"
                      />
                      Add subject
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Country</th>
                        <th>Start Year</th>
                        <th>End Year</th>
                        <th>Special status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in school__items" :key="index">
                        <td>{{ item.school }}</td>
                        <td>{{ item.country }}</td>
                        <td>{{ item.start_year }}</td>
                        <td>{{ item.end_year }}</td>
                        <td>
                          <span class="status">{{ item.status }}</span>
                        </td>
                        <td>
                          <button>
                            <Icon name="lucide:ellipsis-vertical" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="panel__content-item">
                <div class="panel__main">
                  <div class="panel__main-top">
                    <h4 class="panel__main-title">Courses</h4>
                    <button class="add__btn">
                      <Icon
                        name="lucide:plus"
                        style="width: 16px; height: 16px"
                      />
                      Add subject
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Country</th>
                        <th>Start Year</th>
                        <th>End Year</th>
                        <th>Special status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in school__items" :key="index">
                        <td>{{ item.school }}</td>
                        <td>{{ item.country }}</td>
                        <td>{{ item.start_year }}</td>
                        <td>{{ item.end_year }}</td>
                        <td>
                          <span class="status">{{ item.status }}</span>
                        </td>
                        <td>
                          <button>
                            <Icon name="lucide:ellipsis-vertical" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <button class="panel__big-btn">
              <Icon name="lucide:plus" style="width: 16px; height: 16px" />
              Add another course
            </button>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2">
          <template #header>
            <div class="panel-header">
              <div class="panel-title">
                <h3>Grade 9</h3>
                <small class="panel-sub">Sep 2022 - May 2023 </small>
              </div>

              <div class="panel-actions">
                <div class="panel-switch">
                  <span>GPA</span>
                  <a-switch @click.stop />
                </div>
                <button type="button" @click.stop>
                  <Icon name="lucide:ellipsis-vertical" />
                </button>
              </div>
            </div>
          </template>

          <div class="panel-content">
            <div class="panel__top">
              <div class="panel__top-items">
                <div class="panel__top-item">
                  <div>
                    <span class="panel__top-item-label">Subjects</span>
                    <span class="panel__top-item-value">5</span>
                  </div>
                  <div>
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                    <NuxtImg
                      src="/images/person.jpg"
                      alt="Subjects"
                      width="24"
                      height="24"
                    />
                  </div>
                </div>
                <div class="panel__top-item">
                  <span class="panel__top-item-label">Courses</span>
                  <span class="panel__top-item-value">3</span>
                </div>
                <div class="panel__top-item">
                  <span class="panel__top-item-label">Teachers</span>
                  <span class="panel__top-item-value">2</span>
                </div>
                <div class="panel__top-item">
                  <span class="panel__top-item-label">GPA</span>
                  <span class="panel__top-item-value">3.8</span>
                </div>
              </div>
            </div>
            <div class="panel__content-items">
              <div class="panel__content-item">
                <div class="panel__main">
                  <div class="panel__main-top">
                    <h4 class="panel__main-title">Courses</h4>
                    <button class="add__btn">
                      <Icon
                        name="lucide:plus"
                        style="width: 16px; height: 16px"
                      />
                      Add subject
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Country</th>
                        <th>Start Year</th>
                        <th>End Year</th>
                        <th>Special status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in school__items" :key="index">
                        <td>{{ item.school }}</td>
                        <td>{{ item.country }}</td>
                        <td>{{ item.start_year }}</td>
                        <td>{{ item.end_year }}</td>
                        <td>
                          <span class="status">{{ item.status }}</span>
                        </td>
                        <td>
                          <button>
                            <Icon name="lucide:ellipsis-vertical" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <button class="panel__big-btn">
              <Icon name="lucide:plus" style="width: 16px; height: 16px" />
              Add another course
            </button>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>

  <a-modal v-model:visible="secondModal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style scoped>
.academics {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.panel-title h3 {
  margin: 0;
  font-size: 16px;
}
.panel-sub {
  display: block;
  color: #888;
  font-size: 12px;
}

.panel-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: transparent;
  border: 1px solid #e6e6e6;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.action-btn.danger {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

.academics__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.academics__title {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
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

.panel-title :deep(h3) {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}
.panel-title :deep(small) {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 8px;
}
.panel-switch {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  font-size: 12px;
}
.panel-switch span {
  font-weight: 500;
}
.panel__top-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.panel__top-item {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
}
.panel__top-item-label {
  display: block;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--light-grey);
  margin-bottom: 4px;
}
.panel__top-item-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.panel__top-item:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel__top-item:first-child div:last-child {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 12px;
}
.panel__top-item img {
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid white;
  width: 32px;
  height: 32px;
  margin-right: -12px;
}
.panel__main-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.panel__main-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
}
.panel__main-top .add__btn {
  padding: 0px;
  font-size: 12px;
  line-height: 16px;
  border: 0;
}
.panel__big-btn {
  width: 100%;
  padding: 16px;
  background: var(--light-blue);
  margin-top: 16px;
  color: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 8px;
}
</style>
