<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";

const { fetchMajorsCareersGrouped, createMajorCareer, updateMajorCareer } =
  useMajorsCareers();

const majorsCareers = ref([]);
const loading = ref(false);

const visible = ref(false);
const editVisible = ref(false);
const currentType = ref("RESEARCH");

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

const researchItems = computed(() => {
  const sections = majorsCareers.value.filter(
    (item) => item.type === "RESEARCH"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});
const careerItems = computed(() => {
  const sections = majorsCareers.value.filter(
    (item) => item.type === "EXPLORATION"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});
const networkingItems = computed(() => {
  const sections = majorsCareers.value.filter(
    (item) => item.type === "NETWORKING"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const loadMajorsCareers = async () => {
  loading.value = true;
  try {
    const data = await fetchMajorsCareersGrouped();
    majorsCareers.value = Array.isArray(data) ? data : [];
  } catch (error) {
    majorsCareers.value = [];
  } finally {
    loading.value = false;
  }
};

const showModal = (type) => {
  currentType.value = type;
  createForm.value = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    type: type,
  };
  visible.value = true;
};

const handleOk = async () => {
  try {
    const result = await createMajorCareer(createForm.value);
    message.success("Item added successfully");
    visible.value = false;
    await loadMajorsCareers();
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
  editVisible.value = true;
};

const handleEditOk = async () => {
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
    await loadMajorsCareers();
  } catch (error) {
    message.error("Failed to update item");
  }
};

onMounted(async () => {
  await loadMajorsCareers();
});
</script>

<template>
  <div class="careers-page">
    <div class="careers__left">
      <PageBanner
        titleProps="Majors & Careers"
        backgroundProps="#FF163D"
        iconProps="/page-icons/majors.png"
      />

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">School Research & Preparation</h4>
          <a-button @click="showModal('RESEARCH')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="researchItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
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
          <h4 class="section__title">Major, Career and Interest Exploration</h4>
          <a-button @click="showModal('EXPLORATION')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div v-if="careerItems.length === 0 && !loading" class="empty__state">
            <Icon name="lucide:file-text" />
            No items added yet
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
          <h4 class="section__title">Networking</h4>
          <a-button @click="showModal('NETWORKING')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="networkingItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
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
    <GeneralCard />
  </div>

  <a-modal
    v-model:visible="visible"
    title="Add Item"
    @ok="handleOk"
    :okText="'Add'"
    :cancelText="'Cancel'"
  >
    <a-form layout="vertical">
      <a-form-item label="Title" required>
        <a-input v-model:value="createForm.title" placeholder="Enter title" />
      </a-form-item>

      <a-form-item label="Description" required>
        <a-textarea
          v-model:value="createForm.description"
          placeholder="Enter description"
          :rows="4"
        />
      </a-form-item>

      <a-form-item label="Start Date" required>
        <a-date-picker
          v-model:value="createForm.startDate"
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>

      <a-form-item label="End Date" required>
        <a-date-picker
          v-model:value="createForm.endDate"
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:visible="editVisible"
    title="Edit Item"
    @ok="handleEditOk"
    :okText="'Update'"
    :cancelText="'Cancel'"
  >
    <a-form layout="vertical">
      <a-form-item label="Title" required>
        <a-input v-model:value="editForm.title" placeholder="Enter title" />
      </a-form-item>

      <a-form-item label="Description" required>
        <a-textarea
          v-model:value="editForm.description"
          placeholder="Enter description"
          :rows="4"
        />
      </a-form-item>

      <a-form-item label="Start Date" required>
        <a-date-picker
          v-model:value="editForm.startDate"
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>

      <a-form-item label="End Date" required>
        <a-date-picker
          v-model:value="editForm.endDate"
          style="width: 100%"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.careers-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
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
  grid-template-columns: 6fr 4fr;
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
