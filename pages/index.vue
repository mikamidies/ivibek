<script setup>
import AiBanner from "~/components/AiBanner.vue";
import { ref, onMounted } from "vue";
const { user } = useAuth();
const { fetchUpcomingMeetings } = useMeetings();
const { fetchTasks, toggleTask } = useTasks();

definePageMeta({
  layoutTitle: "Dashboard",
});

const sessions = ref([]);
const tasks = ref([]);
const isLoadingSessions = ref(true);
const isLoadingTasks = ref(true);

// Format time from "20:00:00" to "8:00 pm"
const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Format date from "2025-11-24" to "Nov 24"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};

// Load upcoming meetings
const loadSessions = async () => {
  try {
    isLoadingSessions.value = true;
    const data = await fetchUpcomingMeetings();

    sessions.value = data.meetings.map((group) => ({
      date: formatDate(group.date),
      items: group.meetings.map((meeting) => ({
        id: meeting.id,
        name: meeting.meetingWith.fullName,
        time: `${formatTime(meeting.timeFrom)}-${formatTime(meeting.timeTo)}`,
        title: meeting.description,
        img: meeting.meetingWith.image || "/images/person.jpg",
      })),
    }));
  } catch (error) {
    console.error("Failed to load sessions:", error);
  } finally {
    isLoadingSessions.value = false;
  }
};

// Load tasks
const loadTasks = async () => {
  try {
    isLoadingTasks.value = true;
    const data = await fetchTasks();

    tasks.value = data.map((task) => ({
      id: task.id,
      name: task.task,
      desc: task.description,
      date: formatDate(task.endDate),
      checked: task.isDone,
    }));
  } catch (error) {
    console.error("Failed to load tasks:", error);
  } finally {
    isLoadingTasks.value = false;
  }
};

// Handle task toggle
const handleTaskToggle = async (taskId) => {
  try {
    await toggleTask(taskId);
  } catch (error) {
    console.error("Failed to toggle task:", error);
  }
};

onMounted(() => {
  loadSessions();
  loadTasks();
});
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
              <NuxtLink to="/booking">View</NuxtLink>
            </div>
            <div class="sessions__items">
              <div v-if="isLoadingSessions" class="sessions__loading">
                Loading...
              </div>
              <div v-else-if="sessions.length === 0" class="sessions__empty">
                No upcoming sessions
              </div>
              <div
                v-else
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
              <NuxtLink to="/tasks">View</NuxtLink>
            </div>
            <div class="tasks__items">
              <div v-if="isLoadingTasks" class="tasks__loading">Loading...</div>
              <div v-else-if="tasks.length === 0" class="tasks__empty">
                No tasks available
              </div>
              <div
                v-else
                class="tasks__item"
                v-for="task in tasks"
                :key="task.id"
                :class="{ checked: task.checked }"
              >
                <div class="check">
                  <input
                    type="checkbox"
                    :id="'task' + task.id"
                    v-model="task.checked"
                    @change="handleTaskToggle(task.id)"
                  />
                  <label :for="'task' + task.id"></label>
                </div>
                <div class="tasks__item-mid">
                  <label :for="'task' + task.id" class="tasks__item-name">
                    {{ task.name }}
                  </label>
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
          <NuxtLink to="/profile" class="profile__edit">
            <Icon name="lucide:pencil" />
          </NuxtLink>
        </div>
        <div class="profile__person">
          <div class="profile__img">
            <NuxtImg
              :src="user?.image || '/images/default-person.jpg'"
              alt="person"
              width="48"
              height="48"
              format="webp"
            />
          </div>
          <div>
            <p class="profile__name">{{ user?.info.fullName }}</p>
            <p class="profile__email">{{ user?.info.email }}</p>
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
.profile__edit span {
  width: 16px;
  height: 16px;
}
.index {
  padding: 24px 24px 120px 24px;
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
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
}
.tasks__item.checked .tasks__item-name,
.tasks__item.checked .tasks__item-desc {
  text-decoration: line-through;
  color: var(--light-grey);
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
.section__title {
  margin-bottom: 16px;
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
.sessions__loading,
.sessions__empty,
.tasks__loading,
.tasks__empty {
  padding: 16px;
  text-align: center;
  color: var(--light-grey);
  font-size: 14px;
}
</style>
