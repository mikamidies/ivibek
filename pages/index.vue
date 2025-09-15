<script setup>
import AiBanner from "~/components/AiBanner.vue";

definePageMeta({
  layoutTitle: "Dashboard",
});

const sessions = [
  {
    date: "Aug 19",
    items: [
      {
        name: "Yu Jimin",
        time: "5:00 pm-6:00 pm",
        title: "Abror and Muhammet: General Meeting Hannibal Lectus",
        img: "/images/person.jpg",
      },
      {
        name: "Yu Jimin",
        time: "5:00 pm-6:00 pm",
        title: "Abror and Muhammet: General Meeting",
        img: "/images/person.jpg",
      },
    ],
  },
  {
    date: "Aug 20",
    items: [
      {
        name: "Yu Jimin",
        time: "5:00 pm-6:00 pm",
        title: "Abror and Muhammet: General Meeting",
        img: "/images/person.jpg",
      },
    ],
  },
];

const tasks = [
  {
    name: "Develop research methodology and data collection tools City of Stars",
    desc: "The Influence of Language Clubs on Cultural Awareness",
    date: "Sep 26, 2025",
  },
  {
    name: "Develop research methodology and data collection tools",
    desc: "The Influence of Language Clubs on Cultural Awareness",
    date: "Sep 26, 2025",
  },
  {
    name: "Develop research methodology and data collection tools",
    desc: "The Influence of Language Clubs on Cultural Awareness",
    date: "Sep 26, 2025",
  },
];
</script>

<template>
  <div class="index">
    <div class="grid">
      <div class="left">
        <AiBanner />
        <div class="sections">
          <div class="sessions">
            <div class="sessions__head">
              <p class="sessions__title">Upcoming sessions</p>
              <NuxtLink to="/">View</NuxtLink>
            </div>
            <div class="sessions__items">
              <div
                class="sessions__by-date"
                v-for="(session, index) in sessions"
                :key="index"
              >
                <p class="sessions__date-date">{{ session.date }}</p>
                <div
                  class="sessions__item"
                  v-for="(item, itemIndex) in session.items"
                  :key="itemIndex"
                >
                  <NuxtLink to="/">
                    <div class="sessions__item-top">
                      <div class="sessions__item-person">
                        <NuxtImg
                          :src="item.img"
                          alt=""
                          class="sessions__item-pic"
                        />
                        <p class="sessions__item-name">{{ item.name }}</p>
                      </div>
                      <p class="sessions__item-time">{{ item.time }}</p>
                    </div>
                    <h4 class="sessions__item-title">
                      {{ item.title }}
                    </h4>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="tasks">
            <div class="tasks__head">
              <p class="tasks__title">Student tasks</p>
              <NuxtLink to="/">View</NuxtLink>
            </div>
            <div class="tasks__items">
              <div
                class="tasks__item"
                v-for="(task, index) in tasks"
                :key="index"
              >
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
                <p class="tasks__item-date">{{ task.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile">
        <div class="profile__head">
          <p class="profile__title">My Profile</p>
          <NuxtLink to="/">
            <Icon name="lucide:ellipsis-vertical" />
          </NuxtLink>
        </div>
        <div class="profile__person">
          <div class="profile__img">
            <NuxtImg src="/images/person.jpg" alt="" />
          </div>
          <div>
            <p class="profile__name">Yu Jimin</p>
            <p class="profile__email">aespa@naver.com</p>
          </div>
        </div>
        <div class="profile__items">
          <div class="profile__item">
            <p class="profile__question">Application year</p>
            <p class="profile__answer">2023</p>
          </div>
          <div class="profile__item">
            <p class="profile__question">Target Countries</p>
            <p class="profile__answer">US</p>
          </div>
          <div class="profile__item">
            <p class="profile__question">Intended Majors</p>
            <p class="profile__answer">Management</p>
          </div>
          <div class="profile__item">
            <p class="profile__question">Hook Statement</p>
            <p class="profile__answer">Unknown</p>
          </div>
        </div>

        <div class="profile__overview">
          <p class="profile__title">Candidacy Overview</p>

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
            <div class="profile__overview-item">
              <p class="profile__overview-name">Honors</p>
              <div class="profile__overview-flex">
                <div class="profile__overview-icon yellow">
                  <Icon name="lucide:circle-star" />
                </div>
                <p class="profile__overview-number">12</p>
              </div>
            </div>
            <div class="profile__overview-item">
              <p class="profile__overview-name">Class Rank</p>
              <div class="profile__overview-flex">
                <div class="profile__overview-icon red">
                  <Icon name="lucide:trending-up" />
                </div>
                <p class="profile__overview-number">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.index {
  padding: 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 384px;
  gap: 24px;
}
.sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;
}
.sessions,
.tasks,
.profile {
  background: white;
  border-radius: 16px;
  padding: 24px;
  height: fit-content;
}
.sessions__head,
.tasks__head,
.profile__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.sessions__title,
.tasks__title,
.profile__title {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
.sessions__head a,
.tasks__head a,
.profile__head a {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.sessions__by-date {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sessions__by-date:last-child {
  margin-bottom: 0;
}
.sessions__date-date {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  position: relative;
}
.sessions__date-date::after {
  content: "";
  position: absolute;
  width: 90%;
  height: 1px;
  background: var(--border);
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.sessions__item {
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s;
}
.sessions__item:hover {
  background: var(--border);
}
.sessions__item:hover .sessions__item-time {
  background: white;
}
.sessions__item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.sessions__item-person {
  display: flex;
  align-items: center;
  gap: 8px;
}
.sessions__item-pic {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
.sessions__item-name {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}
.sessions__item-time {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  background: var(--border);
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s;
}
.sessions__item-title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-top: 12px;
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
.profile__person {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.profile__img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
.profile__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile__name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.profile__email {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.profile__items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.profile__question {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 4px;
  color: var(--light-grey);
}
.profile__answer {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.profile__overview {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
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
</style>
