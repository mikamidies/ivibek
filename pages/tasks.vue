<script setup>
definePageMeta({
  layoutTitle: "Tasks",
  layout: "noTitle",
});

import PageBanner from "@/components/PageBanner.vue";
import { ref } from "vue";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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
      <PageBanner />
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
      <div class="general__info">
        <p class="section__title">General information</p>
        <div class="profile__overview-items">
          <div class="profile__overview-item">
            <p class="profile__overview-name">Extracurriculars</p>
            <div class="profile__overview-flex">
              <div class="profile__overview-icon blue">
                <Icon
                  name="lucide:pen-tool"
                  style="transform: rotate(225deg)"
                />
              </div>
              <p class="profile__overview-number">12</p>
            </div>
          </div>
          <div class="profile__overview-item">
            <p class="profile__overview-name">Summer Programs</p>
            <div class="profile__overview-flex">
              <div class="profile__overview-icon green">
                <Icon name="lucide:backpack" />
              </div>
              <p class="profile__overview-number">8</p>
            </div>
          </div>
        </div>
      </div>
      <div class="active__sessions">
        <p class="section__title">Active sessions</p>
        <div class="active__sessions-items">
          <div class="active__session-item">
            <div>
              <p class="active__session-name">Son Heoung Min</p>
              <p class="active__session-desc">Ux/Ui desing course</p>
              <p class="active__session-platform">
                <span>Online</span><span>Zoom</span>
              </p>
            </div>
            <div class="active__session-right">
              <p class="active__session-date">Avg. 20</p>
              <div class="active__session-time">19.00</div>
            </div>
          </div>
          <div class="active__session-item">
            <div>
              <p class="active__session-name">Son Heoung Min</p>
              <p class="active__session-desc">Ux/Ui desing course</p>
              <p class="active__session-platform">
                <span>Online</span><span>Zoom</span>
              </p>
            </div>
            <div class="active__session-right">
              <p class="active__session-date">Avg. 20</p>
              <div class="active__session-time">19.00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="essay__sent">
        <p class="section__title">Essays sent</p>
        <div class="essay__items">
          <div class="essay__item">
            <div class="essay__info">
              <div class="essay__img">
                <NuxtImg src="/images/person.jpg" alt="Person" />
              </div>
              <div>
                <p class="essay__name">Yu Jimin</p>
                <p class="essay__status green">Sent</p>
              </div>
            </div>
            <button>
              <Icon name="lucide:ellipsis-vertical" />
            </button>
          </div>
          <div class="essay__item">
            <div class="essay__info">
              <div class="essay__img">
                <NuxtImg src="/images/person.jpg" alt="Person" />
              </div>
              <div>
                <p class="essay__name">Yu Jimin</p>
                <p class="essay__status red">Cancelled</p>
              </div>
            </div>
            <button>
              <Icon name="lucide:ellipsis-vertical" />
            </button>
          </div>
        </div>
      </div>
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
.section__title {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
}
.general__info,
.active__sessions {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.profile__overview-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.profile__overview-item {
  background: var(--border);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.profile__overview-name {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.profile__overview-flex {
  display: flex;
  align-items: center;
  gap: 12px;
}
.profile__overview-icon {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile__overview-icon span {
  width: 24px;
  height: 24px;
}
.profile__overview-number {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
.blue {
  background: #2b7fff1a;
  color: #2b7fff;
}
.green {
  background: #00c8531a;
  color: #00c853;
}
.yellow {
  background: #ffab001a;
  color: #ffab00;
}
.red {
  background: #ff3d001a;
  color: #ff3d00;
}
.active__sessions-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.active__session-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--border);
  border-radius: 8px;
  position: relative;
}
.active__session-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--blue);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.active__session-name {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--light-grey);
  margin-bottom: 4px;
}
.active__session-desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 6px;
}
.active__session-platform {
  display: flex;
  align-items: center;
  gap: 16px;
}
.active__session-platform span:first-child {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--light-grey);
}
.active__session-platform span:last-child {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--blue);
  position: relative;
}
.active__session-platform span:last-child::after {
  content: "";
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background: var(--light-grey);
  border-radius: 50%;
}
.active__session-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 10px 16px;
}
.active__session-date {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: var(--light-grey);
  margin-bottom: 4px;
}
.active__session-time {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: var(--blue);
}
.essay__items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.essay__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.essay__info {
  display: flex;
  align-items: center;
}
.essay__img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}
.essay__name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}
.essay__status {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 8px;
  border-radius: 1000px;
  text-align: center;
  display: inline-flex;
}
</style>
