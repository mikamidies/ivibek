<script setup>
import { message } from "ant-design-vue";

defineProps({
  school__options: {
    type: Array,
    required: true,
  },
  school__items: {
    type: Array,
    required: true,
  },
});

const { fetchPrograms, createProgram, updateProgram } = usePrograms();

const activeKey = ref([]);
const visible = ref(false);
const editMode = ref(false);
const programs = ref([]);
const currentProgram = ref(null);
const loading = ref(false);

const formData = ref({
  name: "",
  university: "",
  description: "",
  startDate: "",
  endDate: "",
  category: "",
  isOnline: false,
});

const loadPrograms = async () => {
  loading.value = true;
  try {
    programs.value = await fetchPrograms();
    console.log("Programs loaded:", programs.value);
  } catch (error) {
    console.error("Load programs error:", error);
    message.error(`Failed to load programs: ${error.message || error}`);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPrograms();
});

const showModal = () => {
  editMode.value = false;
  formData.value = {
    name: "",
    university: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
    isOnline: false,
  };
  visible.value = true;
};

const showEditModal = (program) => {
  editMode.value = true;
  currentProgram.value = program;
  formData.value = {
    name: program.name,
    university: program.university,
    description: program.description,
    startDate: program.startDate,
    endDate: program.endDate,
    category: program.category,
    isOnline: program.isOnline,
  };
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true;
  try {
    const payload = {
      ...formData.value,
      startDate:
        typeof formData.value.startDate === "string"
          ? formData.value.startDate
          : formData.value.startDate?.format?.("YYYY-MM-DD") || "",
      endDate:
        typeof formData.value.endDate === "string"
          ? formData.value.endDate
          : formData.value.endDate?.format?.("YYYY-MM-DD") || "",
    };

    if (editMode.value && currentProgram.value) {
      await updateProgram(currentProgram.value.id, payload);
      message.success("Program updated successfully");
    } else {
      await createProgram(payload);
      message.success("Program created successfully");
    }
    await loadPrograms();
    visible.value = false;
  } catch (error) {
    message.error(`Failed to save program: ${error.message || error}`);
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="programmes">
    <div class="programmes__head">
      <h2 class="programmes__title">Summer Programs & Univercity Courses</h2>
      <button @click="showModal" class="add__btn">
        <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add
      </button>
    </div>
    <div class="programmes__items">
      <a-spin :spinning="loading">
        <div v-if="programs.length === 0" class="empty__state">
          <Icon
            name="lucide:file"
            style="width: 48px; height: 48px; margin-bottom: 16px"
          />
          <p>No programs yet</p>
        </div>
        <div
          v-for="program in programs"
          :key="program.id"
          class="programmes__item"
        >
          <div class="programmes__item-head">
            <div class="programmes__item-left">
              <div class="programmes__item-img">
                <NuxtImg src="/images/pic.avif" :alt="program.university" />
              </div>
              <div>
                <h3 class="programmes__item-title">{{ program.university }}</h3>
                <p class="programmes__item-description">
                  {{ program.name }}
                </p>
              </div>
            </div>
            <div class="programmes__item-right">
              <div class="programmes__item-date">
                <span
                  >{{ formatDate(program.startDate) }} -
                  {{ formatDate(program.endDate) }}</span
                >
              </div>
              <button @click="showEditModal(program)" class="edit__btn">
                <Icon name="lucide:edit" style="width: 16px; height: 16px" />
              </button>
            </div>
          </div>
          <div class="programmes__item-body">
            <a-collapse accordion v-model:activeKey="activeKey">
              <a-collapse-panel
                :key="program.id.toString()"
                :show-arrow="false"
              >
                <template #header>
                  <div class="panel-header">
                    <p>Details</p>
                    <Icon name="lucide:chevron-down" />
                  </div>
                </template>
                <div class="panel-content">
                  <div class="panel__content-items">
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">Category</h4>
                      <p class="panel__content-text">{{ program.category }}</p>
                    </div>
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">Session</h4>
                      <p class="panel__content-text">
                        {{ formatDate(program.startDate) }} -
                        {{ formatDate(program.endDate) }}
                      </p>
                    </div>
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">Learning Format</h4>
                      <p class="panel__content-text">
                        {{ program.isOnline ? "Online" : "In-person" }}
                      </p>
                    </div>
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">University</h4>
                      <p class="panel__content-text">
                        {{ program.university }}
                      </p>
                    </div>
                    <div class="panel__content-item">
                      <h4 class="panel__content-title">Description</h4>
                      <p class="panel__content-text">
                        {{ program.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </a-spin>
    </div>
  </div>

  <a-modal
    v-model:visible="visible"
    :title="editMode ? 'Edit Program' : 'Add New Program'"
    @ok="handleOk"
    :confirm-loading="loading"
    width="600px"
    class="academics__form"
  >
    <a-form layout="vertical">
      <a-form-item label="Program Name" required>
        <a-input
          v-model:value="formData.name"
          placeholder="Enter program name"
        />
      </a-form-item>

      <a-form-item label="University" required>
        <a-input
          v-model:value="formData.university"
          placeholder="Enter university name"
        />
      </a-form-item>

      <a-form-item label="Category">
        <a-input
          v-model:value="formData.category"
          placeholder="e.g., Engineering, Science, Arts"
        />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Start Date" required>
            <a-date-picker
              v-model:value="formData.startDate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="End Date" required>
            <a-date-picker
              v-model:value="formData.endDate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Description">
        <a-textarea
          v-model:value="formData.description"
          :rows="4"
          placeholder="Enter program description"
        />
      </a-form-item>

      <a-form-item>
        <a-checkbox v-model:checked="formData.isOnline">
          Online Program
        </a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.programmes {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-bottom: 16px;
}
.programmes__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.programmes__title {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #111827;
}
.add__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--blue);
  color: var(--blue);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.programmes__item {
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
}
.programmes__item-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.programmes__item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.programmes__item-img {
  width: 68px;
  height: 68px;
  border-radius: 8px;
  overflow: hidden;
}
.programmes__item-title {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #111827;
  margin-bottom: 4px;
}
.programmes__item-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.programmes__item-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.programmes__item-date {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 8px;
}
.programmes :deep(.ant-select-selector) {
  width: 120px;
  height: 32px !important;
  border-radius: 8px !important;
}
.programmes :deep(.ant-collapse-item) {
  border: 0 !important;
}
.programmes :deep(.ant-collapse-header) {
  padding: 0 !important;
  justify-content: center;
}
.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.programmes :deep(.ant-collapse-content) {
  border: 1px solid var(--border) !important;
  padding: 16px !important;
  margin-top: 16px;
}
.panel__content-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.panel__content-item:last-child {
  grid-column: span 4;
}
.panel__content-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  margin-bottom: 4px;
}
.panel__content-text {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.edit__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--light-grey);
  transition: all 0.3s;
}
.edit__btn:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--light-grey);
  font-size: 14px;
}
</style>
