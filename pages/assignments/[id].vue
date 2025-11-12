<script setup>
import dayjs from "dayjs";

const route = useRoute();
const { fetchAssignmentById } = useAssignments();

const assignment = ref(null);
const loading = ref(false);

const loadAssignment = async () => {
  loading.value = true;
  try {
    assignment.value = await fetchAssignmentById(route.params.id);
  } catch (error) {
    console.error("Failed to load assignment:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadAssignment();
});

const formatDate = (date) => {
  return date ? dayjs(date).format("MMM DD, YYYY") : "-";
};

const getStatusLabel = (status) => {
  const labels = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    OVERDUE: "Overdue",
  };
  return labels[status] || status;
};
</script>

<template>
  <div class="assignment-detail-page">
    <PageBanner
      titleProps="Assignments"
      backgroundProps="#00A155"
      iconProps="/page-icons/tasks.png"
    />

    <a-spin :spinning="loading">
      <div class="assignment__grid">
        <div v-if="assignment" class="assignment__body">
          <div class="assignment__head">
            <div class="assignment__from">
              <Icon name="lucide:calendar" />
              {{ formatDate(assignment?.startDate) }}
            </div>
            <div class="assignment__to">
              <Icon name="lucide:calendar" />
              {{ formatDate(assignment?.endDate) }}
            </div>
          </div>
          <div class="assignment__content">
            <h2 class="assignment__title">{{ assignment?.title || "-" }}</h2>
            <div class="assignment__description">
              <p>{{ assignment?.description || "-" }}</p>
            </div>
          </div>
        </div>
        <div class="assignment__teacher">
          <h4 class="assignment__teacher-title">Teacher</h4>
          <div class="assignment__teacher-person">
            <div class="assignment__teacher-img">
              <img
                :src="assignment?.mentor?.image || '/default-person.jpg'"
                alt="Teacher Avatar"
              />
            </div>
            <div class="assignment__teacher-info">
              <p class="assignment__teacher-name">
                {{ assignment?.mentor?.fullName || "No data" }}
              </p>
              <p class="assignment__teacher-university">
                {{ assignment?.mentor?.university.name || "No data" }}
              </p>
              <p class="assignment__teacher-university">
                {{ assignment?.mentor?.faculty.name || "No data" }}
              </p>
            </div>
          </div>
          <div class="assignment__teacher-response">
            <form>
              <a-input
                type="text"
                placeholder="Write a response..."
                class="assignment__teacher-input"
              />
              <a-button type="primary" class="assignment__teacher-submit">
                Submit
              </a-button>
            </form>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<style scoped>
.assignment-detail-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  min-height: 100vh;
  overflow: auto;
}
.assignment__body {
  padding: 24px;
  background: white;
  border-radius: 16px;
  height: fit-content;
}
.assignment__head {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  gap: 32px;
  border-bottom: 1px solid var(--border);
}
.assignment__from,
.assignment__to {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--essay-txt);
}
.assignment__from span {
  color: var(--green);
  font-size: 18px;
}
.assignment__to span {
  color: var(--blue);
  font-size: 18px;
}
.assignment__title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  margin-bottom: 16px;
}
.assignment__description {
  font-size: 16px;
  line-height: 24px;
  color: var(--essay-txt);
}
.assignment__grid {
  display: grid;
  grid-template-columns: 1fr 384px;
  gap: 24px;
  margin-top: 24px;
}
.assignment__teacher {
  background: white;
  border-radius: 16px;
  padding: 24px;
}
.assignment__teacher-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 16px;
}
.assignment__teacher-person {
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  gap: 16px;
}
.assignment__teacher-img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}
.assignment__teacher-name {
  font-size: 18px;
  line-height: 26px;
  font-weight: 600;
}
.assignment__teacher-university {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
}
.assignment__teacher-response form {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 70px;
  gap: 8px;
}
</style>
