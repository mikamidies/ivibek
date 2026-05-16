<script setup>
definePageMeta({});

import PageBanner from "@/components/PageBanner.vue";
import EntityFormModal from "@/components/forms/EntityFormModal.vue";
import { ref } from "vue";
import { message } from "ant-design-vue";

const { fetchTasks, createTask, updateTask, toggleTask } = useTasks();
const { t } = useTranslations();

const {
    data: tasks,
    pending: loading,
    refresh: refreshTasks,
} = await useAsyncData("tasks", () => fetchTasks(), {
    default: () => [],
});

const visible = ref(false);
const editVisible = ref(false);
const createErrors = ref({
    task: "",
    description: "",
    startDate: "",
    endDate: "",
});
const editErrors = ref({
    task: "",
    description: "",
    startDate: "",
    endDate: "",
});

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

const resetTaskErrors = (target) => {
    Object.keys(target.value).forEach((key) => {
        target.value[key] = "";
    });
};

const validateTaskForm = (form, errors) => {
    resetTaskErrors(errors);

    if (!form.value.task.trim()) {
        errors.value.task = "Task name is required";
    }

    if (!form.value.description.trim()) {
        errors.value.description = "Description is required";
    }

    if (!form.value.startDate) {
        errors.value.startDate = "Start date is required";
    }

    if (!form.value.endDate) {
        errors.value.endDate = "End date is required";
    }

    if (
        form.value.startDate &&
        form.value.endDate &&
        form.value.endDate < form.value.startDate
    ) {
        errors.value.endDate = "End date must be on or after start date";
    }

    return !Object.values(errors.value).some(Boolean);
};

const showModal = () => {
    createForm.value = {
        task: "",
        description: "",
        startDate: "",
        endDate: "",
    };
    resetTaskErrors(createErrors);
    visible.value = true;
};

const handleOk = async () => {
    if (!validateTaskForm(createForm, createErrors)) {
        message.error("Please fix the form errors");
        return;
    }

    try {
        await createTask(createForm.value);
        message.success("Task added successfully");
        visible.value = false;
        await refreshTasks();
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
    resetTaskErrors(editErrors);
    editVisible.value = true;
};

const handleEditOk = async () => {
    if (!validateTaskForm(editForm, editErrors)) {
        message.error("Please fix the form errors");
        return;
    }

    try {
        await updateTask(editForm.value.id, {
            task: editForm.value.task,
            description: editForm.value.description,
            startDate: editForm.value.startDate,
            endDate: editForm.value.endDate,
        });
        message.success("Task updated successfully");
        editVisible.value = false;
        await refreshTasks();
    } catch (error) {
        message.error("Failed to update task");
    }
};

const handleToggle = async (taskId) => {
    const taskIndex = tasks.value.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const previousState = tasks.value[taskIndex].isDone;
    tasks.value[taskIndex].isDone = !previousState;

    try {
        await toggleTask(taskId);
        await refreshTasks();
    } catch (error) {
        console.error("Toggle error:", error);
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
</script>

<template>
    <div class="tasks-page">
        <div class="left">
            <PageBanner
                :titleProps="t('tasks.tasks')"
                backgroundProps="#0764F1"
                iconProps="/page-icons/tasks.png"
            />
            <div class="tasks__body">
                <button class="tasks__btn" @click="showModal">
                    <Icon
                        name="lucide:plus"
                        style="width: 16px; height: 16px"
                    />
                    {{ t("tasks.add-task") }}
                </button>

                <a-spin :spinning="loading">
                    <div
                        v-if="tasks.length === 0 && !loading"
                        style="text-align: center; padding: 40px; color: #999"
                    >
                        {{ t("tasks.no-tasks") }}
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
                        <div
                            style="display: flex; align-items: center; gap: 8px"
                        >
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
    </div>

    <EntityFormModal
        v-model:visible="visible"
        :title="t('tasks.add-task')"
        okText="Add"
        cancelText="Cancel"
        :form="createForm"
        :errors="createErrors"
        nameKey="task"
        :nameLabel="t('tasks.task-name')"
        :namePlaceholder="t('tasks.task-name')"
        :descriptionLabel="t('tasks.task-desc')"
        :descriptionPlaceholder="t('tasks.task-desc')"
        :startLabel="t('common.start')"
        :endLabel="t('common.end')"
        :descriptionRows="3"
        @submit="handleOk"
    />

    <EntityFormModal
        v-model:visible="editVisible"
        title="Edit Task"
        okText="Update"
        cancelText="Cancel"
        :form="editForm"
        :errors="editErrors"
        nameKey="task"
        nameLabel="Task Name"
        namePlaceholder="Task Name"
        descriptionLabel="Description"
        descriptionPlaceholder="Enter task description"
        startLabel="Start Date"
        endLabel="End Date"
        :descriptionRows="3"
        @submit="handleEditOk"
    />
</template>

<style scoped>
.tasks-page {
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
