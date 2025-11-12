<script setup>
import dayjs from "dayjs";

const { fetchAssignments } = useAssignments();

const assignments = ref([]);
const loading = ref(false);

const loadAssignments = async () => {
  loading.value = true;
  try {
    assignments.value = await fetchAssignments();
  } catch (error) {
    console.error("Failed to load assignments:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadAssignments();
});

const truncateText = (text, maxLength) => {
  if (!text) return "-";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const formatDate = (date) => {
  return date ? dayjs(date).format("MMM DD, YYYY") : "-";
};

const getStatusLabel = (status) => {
  const labels = {
    ASSIGNED: "Assigned",
    COMPLETED: "Completed",
  };
  return labels[status] || status;
};
</script>

<template>
  <div class="assignments-page">
    <PageBanner
      titleProps="Assignments"
      backgroundProps="#00A155"
      iconProps="/page-icons/tasks.png"
    />

    <div class="assignments__body">
      <div class="assignments__head">
        <h4 class="assignments__title">My Assignments</h4>
      </div>
      <div class="assignments__table">
        <a-spin :spinning="loading">
          <table>
            <thead>
              <tr>
                <th>University</th>
                <th>Teacher name</th>
                <th>Task name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="assignment in assignments.content" :key="assignment">
                <td>{{ assignment?.mentor.university || "No data" }}</td>
                <td>{{ assignment?.mentor.fullName || "No data" }}</td>
                <td>{{ assignment?.title || "No data" }}</td>
                <td>
                  <span
                    class="status"
                    :class="`status--${assignment.status?.toLowerCase()}`"
                  >
                    {{ getStatusLabel(assignment.status) }}
                  </span>
                </td>
                <td>
                  <NuxtLink
                    :to="`/assignments/${assignment.id}`"
                    class="assignments__view-btn"
                  >
                    <Icon name="lucide:eye" />
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<style scoped>
.assignments-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  min-height: 100vh;
  overflow: auto;
}
.assignments__body {
  margin-top: 24px;
  padding: 24px;
  background: white;
  border-radius: 16px;
}
.assignments__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.assignments__title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
}
</style>
