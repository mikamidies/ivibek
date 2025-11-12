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
  return date ? dayjs(date).format("MMM DD, YYYY HH:mm") : "-";
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
    <a-spin :spinning="loading">
      <div v-if="assignment" class="assignment-detail">
        <div class="assignment-detail__header">
          <h1>{{ assignment.title }}</h1>
          <span
            class="status"
            :class="`status--${assignment.status?.toLowerCase()}`"
          >
            {{ getStatusLabel(assignment.status) }}
          </span>
        </div>

        <div class="assignment-detail__info">
          <div class="info-item">
            <strong>Course:</strong> {{ assignment.course?.name || "-" }}
          </div>
          <div class="info-item">
            <strong>Due Date:</strong> {{ formatDate(assignment.dueDate) }}
          </div>
          <div class="info-item">
            <strong>Created:</strong> {{ formatDate(assignment.createdAt) }}
          </div>
        </div>

        <div class="assignment-detail__description">
          <h3>Description</h3>
          <p>{{ assignment.description || "No description provided" }}</p>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<style scoped>
.assignment-detail-page {
  padding: 24px;
}

.assignment-detail__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.assignment-detail__info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.info-item {
  margin-bottom: 12px;
}

.assignment-detail__description {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.status {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.status--pending {
  background: #fef3cd;
  color: #856404;
}

.status--in_progress {
  background: #d1ecf1;
  color: #0c5460;
}

.status--completed {
  background: #d4edda;
  color: #155724;
}

.status--overdue {
  background: #f8d7da;
  color: #721c24;
}
</style>
