<script setup>
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";

const { fetchSidebarData } = useSidebar();
const { fetchMeetingById } = useMeetings();

const sidebarData = ref(null);
const isLoading = ref(true);

const formatTimeObject = (timeObj) => {
  if (!timeObj) return "00:00";

  if (typeof timeObj === "string") {
    if (timeObj.includes(":")) {
      const parts = timeObj.split(":");
      if (parts.length === 3) {
        return `${parts[0]}:${parts[1]}`;
      }
    }
    return timeObj;
  }

  if (timeObj.hour !== undefined && timeObj.minute !== undefined) {
    const hour = String(timeObj.hour).padStart(2, "0");
    const minute = String(timeObj.minute).padStart(2, "0");
    return `${hour}:${minute}`;
  }

  return "00:00";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month}. ${day}`;
};

const getEssayStatusText = (status) => {
  const statusMap = {
    UNPAID: "Unpaid",
    PAID: "Sent",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
  };
  return statusMap[status] || status;
};

const getEssayStatusClass = (status) => {
  if (status === "PAID" || status === "COMPLETED") return "green";
  if (status === "CANCELLED") return "red";
  return "yellow";
};

const extracurricularsCount = computed(() => {
  return sidebarData.value?.activeSessionsCount || 0;
});

const sentEssaysCount = computed(() => {
  return sidebarData.value?.sentEssaysCount || 0;
});

const activeSessions = computed(() => {
  if (!sidebarData.value?.activeSessions) return [];
  return sidebarData.value.activeSessions.map((session) => ({
    id: session.id,
    name: session.mentor.fullName,
    description: session.mentor.university?.name || "University",
    platform: "Zoom",
    date: formatDate(session.date),
    time: session.timeFrom ? formatTimeObject(session.timeFrom) : "00:00",
    status: session.status,
  }));
});

const sentEssays = computed(() => {
  if (!sidebarData.value?.sentEssays) return [];
  return sidebarData.value.sentEssays.map((essay) => ({
    id: essay.id,
    name: essay.mentor.fullName,
    status: getEssayStatusText(essay.status),
    statusClass: getEssayStatusClass(essay.status),
    image: "/images/person.jpg",
  }));
});

const loadSidebarData = async () => {
  try {
    isLoading.value = true;
    const data = await fetchSidebarData();
    sidebarData.value = data;
  } catch (error) {
    console.error("Failed to load sidebar data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadSidebarData();
});

const sessionModalVisible = ref(false);
const selectedMeeting = ref(null);
const meetingDetailLoading = ref(false);

const viewMeetingDetails = async (meetingId) => {
  meetingDetailLoading.value = true;
  try {
    const meetingData = await fetchMeetingById(meetingId);
    selectedMeeting.value = meetingData;
    sessionModalVisible.value = true;
  } catch (error) {
    console.error("Failed to load meeting details:", error);
    message.error("Failed to load meeting details");
  } finally {
    meetingDetailLoading.value = false;
  }
};

const handleSessionOk = () => {
  sessionModalVisible.value = false;
  selectedMeeting.value = null;
};
</script>

<template>
  <div class="general-card">
    <div v-if="isLoading" class="loading-state">Loading...</div>
    <template v-else>
      <div class="general__info">
        <p class="section__title">General information</p>
        <div class="profile__overview-items">
          <div class="profile__overview-item">
            <p class="profile__overview-name">Active Sessions</p>
            <div class="profile__overview-flex">
              <div class="profile__overview-icon blue">
                <Icon
                  name="lucide:pen-tool"
                  style="transform: rotate(225deg)"
                />
              </div>
              <p class="profile__overview-number">
                {{ extracurricularsCount }}
              </p>
            </div>
          </div>
          <div class="profile__overview-item">
            <p class="profile__overview-name">Sent Essays</p>
            <div class="profile__overview-flex">
              <div class="profile__overview-icon green">
                <Icon name="lucide:backpack" />
              </div>
              <p class="profile__overview-number">{{ sentEssaysCount }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="active__sessions">
        <p class="section__title">Active sessions</p>
        <div v-if="activeSessions.length === 0" class="empty-state">
          No active sessions
        </div>
        <div v-else class="active__sessions-items">
          <div
            v-for="session in activeSessions"
            :key="session.id"
            class="active__session-item"
            @click="viewMeetingDetails(session.id)"
          >
            <div>
              <p class="active__session-name">{{ session.name }}</p>
              <p class="active__session-desc">{{ session.description }}</p>
              <p class="active__session-platform">
                <span>Online</span><span>{{ session.platform }}</span>
              </p>
            </div>
            <div class="active__session-right">
              <p class="active__session-date">{{ session.date }}</p>
              <div class="active__session-time">{{ session.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="essay__sent">
        <p class="section__title">Essays sent</p>
        <div v-if="sentEssays.length === 0" class="empty-state">
          No essays sent
        </div>
        <div v-else class="essay__items">
          <div v-for="essay in sentEssays" :key="essay.id" class="essay__item">
            <div class="essay__info">
              <div class="essay__img">
                <NuxtImg
                  :src="essay?.image || '/images/default-person.jpg'"
                  alt="Person"
                />
              </div>
              <div>
                <p class="essay__name">{{ essay.name }}</p>
                <p class="essay__status" :class="essay.statusClass">
                  {{ essay.status }}
                </p>
              </div>
            </div>
            <NuxtLink class="view__btn" :to="`/essay-lab/${essay.id}`">
              <Icon name="lucide:eye" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>

  <a-modal
    class="session__modal"
    v-model:visible="sessionModalVisible"
    @ok="handleSessionOk"
    :okText="'Close'"
  >
    <a-spin :spinning="meetingDetailLoading">
      <div class="modal__header">
        <h2 class="section__title">Session Details</h2>
      </div>
      <div class="modal__body" v-if="selectedMeeting">
        <div class="meeting-modal__top">
          <div class="modal__session-info">
            <div class="modal__info-item">
              <span
                class="status"
                :class="{
                  'status-pending':
                    selectedMeeting.status === 'PENDING_PAYMENT',
                  'status-confirmed': selectedMeeting.status === 'CONFIRMED',
                  'status-completed': selectedMeeting.status === 'COMPLETED',
                  'status-cancelled': selectedMeeting.status === 'CANCELLED',
                }"
              >
                {{
                  selectedMeeting.status
                    .replace("_", " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                }}
              </span>
            </div>
            <div class="modal__info-item">
              <p>{{ selectedMeeting.date }}</p>
            </div>
            <div class="modal__info-item">
              <p>
                {{ selectedMeeting.timeFrom }} - {{ selectedMeeting.timeTo }}
              </p>
            </div>
          </div>
          <div class="meeting-modal__teacher">
            <div class="modal__item-img">
              <NuxtImg
                :src="
                  selectedMeeting.mentor.image || '/images/default-person.jpg'
                "
                :alt="selectedMeeting.mentor.fullName"
                width="56px"
                height="56px"
              />
            </div>
            <div class="modal__item-content">
              <h3 class="modal__item-title">
                {{ selectedMeeting.mentor.fullName }}
              </h3>
              <p class="modal__item-desc">
                <Icon name="lucide:graduation-cap" />
                {{ selectedMeeting.mentor.university.name }}
              </p>
              <p class="modal__item-desc no__margin">
                <Icon name="lucide:briefcase" />
                {{ selectedMeeting.mentor.faculty.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="modal__response" v-if="selectedMeeting.meetingLink">
          <h4>Meeting Link</h4>
          <a :href="selectedMeeting.meetingLink.link" target="_blank">{{
            selectedMeeting.meetingLink.link
          }}</a>
        </div>
      </div>
    </a-spin>
  </a-modal>
</template>

<style scoped>
.general-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  height: fit-content;
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
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.active__session-item:hover {
  transform: translateY(-2px);
}
.active__session-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--blue);
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
.loading-state,
.empty-state {
  padding: 16px;
  text-align: center;
  color: var(--light-grey);
  font-size: 14px;
}
.meeting-modal__top {
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
}
.modal__session-info {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}
.meeting-modal__teacher {
  display: flex;
  align-items: center;
  gap: 24px;
}
.no__margin {
  margin: 0 !important;
}
.modal__info-item h4 {
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 6px;
}
.modal__info-item p {
  font-size: 12px;
  line-height: 24px;
  background: var(--border);
  color: var(--essay-txt);
  padding: 2px 8px;
  border-radius: 8px;
}
.modal__info-item span {
  display: flex;
  height: 100%;
  align-items: center;
}
.modal__response {
  padding: 0 12px;
  margin-top: 24px;
}
.modal__response h4 {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  margin-bottom: 8px;
}
.modal__response a {
  font-size: 14px;
  line-height: 20px;
  color: var(--blue);
  word-break: break-all;
  text-decoration: underline;
}
.session__modal .modal__info-item .status {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
}
.session__modal .status-pending {
  background: var(--light-yellow);
  color: var(--yellow);
}
.session__modal .status-confirmed {
  background: var(--light-blue);
  color: var(--blue);
}
.session__modal .status-completed {
  background: var(--light-green);
  color: var(--green);
}
.session__modal .status-cancelled {
  background: #fee;
  color: #c33;
}
.session__modal .meeting-modal__teacher {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
}
.session__modal .modal__item-img {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}
.session__modal .modal__item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.session__modal .modal__item-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 6px;
}
.session__modal .modal__item-desc {
  font-size: 12px;
  line-height: 18px;
  color: var(--light-grey);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.session__modal .modal__item-desc.no__margin {
  margin-bottom: 0;
}
.session__modal .modal__response {
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: 16px;
}
.session__modal .modal__response h4 {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--light-grey);
}
.session__modal .modal__response a {
  font-size: 16px;
  line-height: 24px;
  color: var(--blue);
  text-decoration: none;
  word-break: break-all;
}
.session__modal .modal__response a:hover {
  text-decoration: underline;
}
</style>
