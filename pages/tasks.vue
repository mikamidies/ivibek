<script setup>
definePageMeta({});

import PageBanner from "@/components/PageBanner.vue";
import { ref } from "vue";
import GeneralCard from "~/components/cards/GeneralCard.vue";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

const tasks = [
  {
    name: "Design new landing page",
    desc: "Create a modern and responsive design for the new product landing page.",
    date: "2023-10-01",
  },
  {
    name: "Fix login bug",
    desc: "Resolve the issue where users are unable to log in with their social media accounts.",
    date: "2023-10-03",
  },
  {
    name: "Update user profile UI",
    desc: "Redesign the user profile section to improve usability and aesthetics.",
    date: "2023-10-05",
  },
];
</script>

<template>
  <div class="tasks-page">
    <div class="left">
      <PageBanner titleProps="Tasks" />
      <div class="tasks__body">
        <button class="tasks__btn" @click="showModal">
          <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add Task
        </button>
        <div class="tasks__item" v-for="(task, index) in tasks" :key="index">
          <div class="leftists">
            <div class="check">
              <input type="checkbox" :id="'task' + index" />
              <label :for="'task' + index"></label>
            </div>
            <div class="tasks__item-mid">
              <p class="tasks__item-name">
                {{ task.name }}
              </p>
              <p class="tasks__item-desc">
                {{ task.desc }}
              </p>
            </div>
          </div>
          <p class="tasks__item-date">{{ task.date }}</p>
        </div>
      </div>
    </div>

    <div class="right">
      <GeneralCard />
    </div>
  </div>

  <a-modal v-model:visible="visible" title="Edit Profile" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
        >Save information</a-button
      >
    </template>
    <div class="form__wrapper">
      <a-form :model="form" layout="vertical">
        <a-form-item
          style="grid-column: 1 / 3"
          label="Task Name"
          name="taskName"
        >
          <a-input placeholder="Task Name" />
        </a-form-item>
        <a-form-item
          style="grid-column: 1 / 3"
          label="Project"
          name="projectName"
        >
          <a-input placeholder="Enter your project name" />
        </a-form-item>
        <a-form-item label="Session" name="session_start">
          <a-date-picker style="width: 100%" format="DD/MM/YYYY" />
        </a-form-item>
        <a-form-item label=" " name="session_end">
          <a-date-picker style="width: 100%" format="DD/MM/YYYY" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<style scoped>
.tasks-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;

  padding: 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.right {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  height: fit-content;
}
.tasks__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tasks__item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
}
.tasks__item-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
}
.tasks__item-desc {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.tasks__item-date {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  background: var(--border);
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
}
.leftists {
  display: flex;
  gap: 12px;
}
.tasks__body {
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
  padding: 16px;
}
.tasks__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: var(--blue);
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  margin-bottom: 24px;
  border: none;
  cursor: pointer;
}
</style>
