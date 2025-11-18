<script setup>
definePageMeta({});

import PageBanner from "@/components/PageBanner.vue";
import { ref, onMounted } from "vue";
import GeneralCard from "~/components/cards/GeneralCard.vue";
import { message } from "ant-design-vue";

// Явный импорт composable
const { fetchTasks, createTask, updateTask, toggleTask } = useTasks();

// Состояние
const tasks = ref([]);
const loading = ref(false);
const visible = ref(false);
const editVisible = ref(false);

const createForm = ref({
  task: "",
  description: "",
  startDate: "",
  endDate: "",
});

const editForm = ref({
  id: null,
  task: "",
  description: "",
  startDate: "",
  endDate: "",
});

const loadTasks = async () => {
  loading.value = true;
  try {
    tasks.value = await fetchTasks();
  } catch (error) {
    message.error("Failed to load tasks");
  } finally {
    loading.value = false;
  }
};

const showModal = () => {
  createForm.value = {
    task: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  visible.value = true;
};

const handleOk = async () => {
  try {
    await createTask(createForm.value);
    message.success("Task added successfully");
    visible.value = false;
    await loadTasks();
  } catch (error) {
    message.error("Failed to add task");
  }
};

const showEditModal = (task) => {
  editForm.value = {
    id: task.id,
    task: task.task,
    description: task.description,
    startDate: task.startDate,
    endDate: task.endDate,
  };
  editVisible.value = true;
};

const handleEditOk = async () => {
  try {
    await updateTask(editForm.value.id, {
      task: editForm.value.task,
      description: editForm.value.description,
      startDate: editForm.value.startDate,
      endDate: editForm.value.endDate,
    });
    message.success("Task updated successfully");
    editVisible.value = false;
    await loadTasks();
  } catch (error) {
    message.error("Failed to update task");
  }
};

const handleToggle = async (taskId) => {
  // Находим задачу и меняем статус локально для мгновенной реакции UI
  const taskIndex = tasks.value.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return;

  const previousState = tasks.value[taskIndex].isDone;
  tasks.value[taskIndex].isDone = !previousState;

  try {
    await toggleTask(taskId);
    // Перезагружаем весь список, так как сервер не возвращает обновленную задачу
    await loadTasks();
  } catch (error) {
    console.error("Toggle error:", error);
    // Откатываем изменение при ошибке
    tasks.value[taskIndex].isDone = previousState;
    message.error("Failed to toggle task");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const handleCancel = () => {
  visible.value = false;
  editVisible.value = false;
};

onMounted(() => {
  loadTasks();
});
</script>

<template>
  <div class="tasks-page">
    <div class="left">
      <PageBanner
        titleProps="Tasks"
        backgroundProps="#0764F1"
        iconProps="/page-icons/tasks.png"
      />
      <div class="tasks__body">
        <button class="tasks__btn" @click="showModal">
          <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add Task
        </button>

        <a-spin :spinning="loading">
          <div
            v-if="tasks.length === 0 && !loading"
            style="text-align: center; padding: 40px; color: #999"
          >
            No tasks added yet
          </div>

          <div
            class="tasks__item"
            v-for="task in tasks"
            :key="task.id"
            :class="{ checked: task.isDone }"
          >
            <div class="leftists">
              <div class="check">
                <input
                  type="checkbox"
                  :id="'task' + task.id"
                  :checked="task.isDone"
                  @change="handleToggle(task.id)"
                />
                <label :for="'task' + task.id"></label>
              </div>
              <div class="tasks__item-mid">
                <label
                  :for="'task' + task.id"
                  class="tasks__item-name"
                  style="cursor: pointer"
                  @dblclick="showEditModal(task)"
                >
                  {{ task.task }}
                </label>
                <p class="tasks__item-desc">
                  {{ task.description }}
                </p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px">
              <p class="tasks__item-date">
                {{ formatDate(task.startDate) }} -
                {{ formatDate(task.endDate) }}
              </p>
              <!-- <button
                @click="showEditModal(task)"
                style="
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  color: var(--light-grey);
                  display: flex;
                  align-items: center;
                "
              >
                <Icon name="lucide:pencil" style="width: 16px; height: 16px" />
              </button> -->
            </div>
          </div>
        </a-spin>
      </div>
    </div>

    <div class="right">
      <GeneralCard />
    </div>
  </div>

  <a-modal
    v-model:visible="visible"
    title="Add Task"
    @ok="handleOk"
    :okText="'Add'"
    :cancelText="'Cancel'"
  >
    <div class="form__wrapper">
      <a-form :model="createForm" layout="vertical">
        <a-form-item
          style="grid-column: 1 / 3"
          label="Task Name"
          name="task"
          required
        >
          <a-input v-model:value="createForm.task" placeholder="Task Name" />
        </a-form-item>
        <a-form-item
          style="grid-column: 1 / 3"
          label="Description"
          name="description"
          required
        >
          <a-textarea
            v-model:value="createForm.description"
            placeholder="Enter task description"
            :rows="3"
          />
        </a-form-item>
        <a-form-item label="Start Date" name="startDate" required>
          <a-date-picker
            v-model:value="createForm.startDate"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="End Date" name="endDate" required>
          <a-date-picker
            v-model:value="createForm.endDate"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>

  <a-modal
    v-model:visible="editVisible"
    title="Edit Task"
    @ok="handleEditOk"
    :okText="'Update'"
    :cancelText="'Cancel'"
  >
    <div class="form__wrapper">
      <a-form :model="editForm" layout="vertical">
        <a-form-item
          style="grid-column: 1 / 3"
          label="Task Name"
          name="task"
          required
        >
          <a-input v-model:value="editForm.task" placeholder="Task Name" />
        </a-form-item>
        <a-form-item
          style="grid-column: 1 / 3"
          label="Description"
          name="description"
          required
        >
          <a-textarea
            v-model:value="editForm.description"
            placeholder="Enter task description"
            :rows="3"
          />
        </a-form-item>
        <a-form-item label="Start Date" name="startDate" required>
          <a-date-picker
            v-model:value="editForm.startDate"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
        <a-form-item label="End Date" name="endDate" required>
          <a-date-picker
            v-model:value="editForm.endDate"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
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
  line-height: 100%;
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
