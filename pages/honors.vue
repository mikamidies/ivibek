<script setup>
import PageBanner from "@/components/PageBanner.vue";
import EntityFormModal from "@/components/forms/EntityFormModal.vue";
import { ref } from "vue";
import { message } from "ant-design-vue";

const { fetchHonors, createHonor, updateHonor } = useHonors();
const { t } = useTranslations();

const {
  data: honors,
  pending: loading,
  refresh: refreshHonors,
} = await useAsyncData("honors", () => fetchHonors(), {
  default: () => [],
});

const visible = ref(false);
const editVisible = ref(false);

const createForm = ref({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
});

const createErrors = ref({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
});

const editErrors = ref({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
});

const resetHonorErrors = (target) => {
  Object.keys(target.value).forEach((key) => {
    target.value[key] = "";
  });
};

const validateHonorForm = (form, errors) => {
  resetHonorErrors(errors);

  if (!form.value.name.trim()) {
    errors.value.name = "Name is required";
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

const editForm = ref({
  id: null,
  name: "",
  description: "",
  startDate: "",
  endDate: "",
});

const showModal = () => {
  createForm.value = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  resetHonorErrors(createErrors);
  visible.value = true;
};

const handleOk = async () => {
  if (!validateHonorForm(createForm, createErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await createHonor(createForm.value);
    message.success("Honor added successfully");
    visible.value = false;
    await refreshHonors();
  } catch (error) {
    message.error("Failed to add honor");
  }
};

const showEditModal = (honor) => {
  editForm.value = {
    id: honor.id,
    name: honor.name,
    description: honor.description,
    startDate: honor.startDate,
    endDate: honor.endDate,
  };
  resetHonorErrors(editErrors);
  editVisible.value = true;
};

const handleVisibleOk = async () => {
  if (!validateHonorForm(editForm, editErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await updateHonor(editForm.value.id, {
      name: editForm.value.name,
      description: editForm.value.description,
      startDate: editForm.value.startDate,
      endDate: editForm.value.endDate,
    });
    message.success("Honor updated successfully");
    editVisible.value = false;
    await refreshHonors();
  } catch (error) {
    message.error("Failed to update honor");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

</script>

<template>
  <div class="honors-page">
    <div class="honors__left">
      <PageBanner
        :titleProps="t('honors.honors')"
        backgroundProps="#FF4C16"
        iconProps="/page-icons/honors.png"
      />

      <div class="honors__body">
        <div class="honors__header">
          <h4 class="section__title">{{ t("honors.honors-title") }}</h4>

          <a-button @click="showModal" class="add__btn">
            <Icon name="lucide:plus" class="icon" />
            {{ t("honors.add-btn") }}
          </a-button>
        </div>
        <div class="honors__items">
          <a-spin :spinning="loading">
            <div v-if="honors.length === 0 && !loading" class="empty__state">
              <Icon name="lucide:file-text" />
              {{ t("honors.no-honors") }}
            </div>
            <div v-for="honor in honors" :key="honor.id" class="honors__item">
              <div class="honors__item-header">
                <div>
                  <h5 class="honors__item-name">
                    {{ honor.name }}
                  </h5>
                  <span class="honors__item-sub">
                    {{ t("honors.award") }}
                  </span>
                </div>
                <button @click="showEditModal(honor)" class="honors__item-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </button>
              </div>
              <div class="honors__item-mid">
                <p class="honors__item-date">
                  {{ formatDate(honor.startDate) }} -
                  {{ formatDate(honor.endDate) }}
                </p>
              </div>
              <div class="honors__item-bottom">
                <p class="honors__item-question">{{ t("honors.desc") }}:</p>
                <p class="honors__item-answer">
                  {{ honor.description }}
                </p>
              </div>
            </div>
          </a-spin>
        </div>
      </div>
    </div>
  </div>

  <EntityFormModal
    v-model:visible="visible"
    :title="t('honors.add-honor')"
    okText="Add"
    cancelText="Cancel"
    :form="createForm"
    :errors="createErrors"
    :nameLabel="t('honors.name')"
    :namePlaceholder="t('honors.name')"
    :descriptionLabel="t('honors.desc')"
    :descriptionPlaceholder="t('honors.desc')"
    :startLabel="t('honors.start')"
    :endLabel="t('honors.end')"
    @submit="handleOk"
  />

  <EntityFormModal
    v-model:visible="editVisible"
    :title="t('honors.edit-honor')"
    okText="Update"
    cancelText="Cancel"
    :form="editForm"
    :errors="editErrors"
    :nameLabel="t('honors.name')"
    :namePlaceholder="t('honors.name')"
    :descriptionLabel="t('honors.desc')"
    :descriptionPlaceholder="t('honors.desc')"
    :startLabel="t('honors.start')"
    :endLabel="t('honors.end')"
    @submit="handleVisibleOk"
  />
</template>

<style scoped>
.honors-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.honors__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.honors__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.honors__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.honors__item {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.honors__item:last-child {
  margin-bottom: 0;
}
.honors__item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.honors__item-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}
.honors__item-sub {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.honors__item-edit span {
  width: 20px;
  height: 20px;
}
.honors__item-mid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.honors__item-date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 8px;
}
.programmes__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--light-grey);
}
.honors__item-bottom {
  display: grid;
  grid-template-columns: 160px 1fr;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
}
.honors__item-question {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.honors__item-answer {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: end;
}
</style>
