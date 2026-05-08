<script setup>
import PageBanner from "@/components/PageBanner.vue";
import EntityFormModal from "@/components/forms/EntityFormModal.vue";
import { ref, computed } from "vue";
import { message } from "ant-design-vue";

const { fetchMajorsCareersGrouped, createMajorCareer, updateMajorCareer } =
  useMajorsCareers();
const { t } = useTranslations();

const {
  data: majorsCareers,
  pending: loading,
  refresh: refreshMajorsCareers,
} = await useAsyncData("majors-careers", () => fetchMajorsCareersGrouped(), {
  default: () => [],
});

const visible = ref(false);
const editVisible = ref(false);
const createForm = ref({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "RESEARCH",
});

const editForm = ref({
  id: null,
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "RESEARCH",
});

const createErrors = ref({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
});

const editErrors = ref({
  title: "",
  description: "",
  startDate: "",
  endDate: "",
});

const resetMajorCareerErrors = (target) => {
  Object.keys(target.value).forEach((key) => {
    target.value[key] = "";
  });
};

const validateMajorCareerForm = (form, errors) => {
  resetMajorCareerErrors(errors);

  if (!form.value.title.trim()) {
    errors.value.title = "Title is required";
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

const researchItems = computed(() => {
  const sections = majorsCareers.value.filter(
    (item) => item.type === "RESEARCH",
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type })),
  );
});
const careerItems = computed(() => {
  const sections = majorsCareers.value.filter(
    (item) => item.type === "EXPLORATION",
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type })),
  );
});
const networkingItems = computed(() => {
  const sections = majorsCareers.value.filter(
    (item) => item.type === "NETWORKING",
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type })),
  );
});

const showModal = (type) => {
  createForm.value = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    type: type,
  };
  resetMajorCareerErrors(createErrors);
  visible.value = true;
};

const handleOk = async () => {
  if (!validateMajorCareerForm(createForm, createErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    const result = await createMajorCareer(createForm.value);
    message.success("Item added successfully");
    visible.value = false;
    await refreshMajorsCareers();
  } catch (error) {
    message.error("Failed to add item");
  }
};

const showEditModal = (item) => {
  editForm.value = {
    id: item.id,
    title: item.title,
    description: item.description,
    startDate: item.startDate,
    endDate: item.endDate,
    type: item.type,
  };
  resetMajorCareerErrors(editErrors);
  editVisible.value = true;
};

const handleEditOk = async () => {
  if (!validateMajorCareerForm(editForm, editErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await updateMajorCareer(editForm.value.id, {
      title: editForm.value.title,
      description: editForm.value.description,
      startDate: editForm.value.startDate,
      endDate: editForm.value.endDate,
      type: editForm.value.type,
    });
    message.success("Item updated successfully");
    editVisible.value = false;
    await refreshMajorsCareers();
  } catch (error) {
    message.error("Failed to update item");
  }
};
</script>

<template>
  <div class="careers-page">
    <div class="careers__left">
      <PageBanner
        :titleProps="t('majors.majors-careers')"
        backgroundProps="#FF163D"
        iconProps="/page-icons/majors.png"
      />

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">{{ t("majors.school-research") }}</h4>
          <a-button @click="showModal('RESEARCH')" class="add__btn">
            <Icon name="lucide:plus" />
            {{ t("majors.add") }}
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="researchItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            {{ t("majors.no-items") }}
          </div>
          <div v-else class="books__items">
            <div
              v-for="item in researchItems"
              :key="item.id"
              class="books__item"
            >
              <div class="books__item-left">
                <div>
                  <p class="books__item-name">{{ item.title }}</p>
                  <p class="books__item-genre">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="books__item-right">
                <p class="books__item-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>

                <a-button @click="showEditModal(item)" class="books__item-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">{{ t("majors.major-exploration") }}</h4>
          <a-button @click="showModal('EXPLORATION')" class="add__btn">
            <Icon name="lucide:plus" />
            {{ t("majors.add") }}
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div v-if="careerItems.length === 0 && !loading" class="empty__state">
            <Icon name="lucide:file-text" />
            {{ t("majors.no-items") }}
          </div>
          <div v-else class="books__items">
            <div v-for="item in careerItems" :key="item.id" class="books__item">
              <div class="books__item-left">
                <div>
                  <p class="books__item-name">{{ item.title }}</p>
                  <p class="books__item-genre">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="books__item-right">
                <p class="books__item-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>

                <a-button @click="showEditModal(item)" class="books__item-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">
            {{ t("majors.networking") }}
          </h4>
          <a-button @click="showModal('NETWORKING')" class="add__btn">
            <Icon name="lucide:plus" />
            {{ t("majors.add") }}
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="networkingItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            {{ t("majors.no-items") }}
          </div>
          <div v-else class="books__items">
            <div
              v-for="item in networkingItems"
              :key="item.id"
              class="books__item"
            >
              <div class="books__item-left">
                <div>
                  <p class="books__item-name">{{ item.title }}</p>
                  <p class="books__item-genre">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="books__item-right">
                <p class="books__item-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>

                <a-button @click="showEditModal(item)" class="books__item-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>
    </div>
  </div>

  <EntityFormModal
    v-model:visible="visible"
    :title="t('majors.add-item')"
    okText="Add"
    cancelText="Cancel"
    modalClass="academics__form"
    :form="createForm"
    :errors="createErrors"
    nameKey="title"
    :nameLabel="t('majors.title')"
    :namePlaceholder="t('majors.title')"
    :descriptionLabel="t('majors.desc')"
    :descriptionPlaceholder="t('majors.desc')"
    :startLabel="t('majors.start')"
    :endLabel="t('majors.end')"
    @submit="handleOk"
  />

  <EntityFormModal
    v-model:visible="editVisible"
    :title="t('majors.edit-item')"
    okText="Update"
    cancelText="Cancel"
    modalClass="academics__form"
    :form="editForm"
    :errors="editErrors"
    nameKey="title"
    :nameLabel="t('majors.title')"
    :namePlaceholder="t('majors.title')"
    :descriptionLabel="t('majors.desc')"
    :descriptionPlaceholder="t('majors.desc')"
    :startLabel="t('majors.start')"
    :endLabel="t('majors.end')"
    @submit="handleEditOk"
  />
</template>

<style scoped>
.careers-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.majors-body {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
}
.majors__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.books__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.books__item {
  display: grid;
  grid-template-columns: 5fr 5fr;
  align-items: center;
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 12px;
}
.books__item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.books__item-img {
  width: 68px;
  height: 68px;
  border-radius: 8px;
  border: 1px solid var(--border);
  overflow: hidden;
}
.books__item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.books__item-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}
.books__item-genre {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.books__item-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}
.books__item-date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: var(--border);
  color: var(--light-grey);
  padding: 4px 8px;
  border-radius: 8px;
}
.books__item-edit {
  border: 0;
}
.books__item-edit .icon {
  width: 20px;
  height: 20px;
}
.empty__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--light-grey);
  gap: 12px;
}
.empty__state span {
  width: 48px;
  height: 48px;
}
</style>
