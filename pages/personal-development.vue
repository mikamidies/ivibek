<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";

const {
  fetchPersonalDevelopmentsGrouped,
  createPersonalDevelopment,
  updatePersonalDevelopment,
} = usePersonalDevelopment();

const personalDevelopments = ref([]);
const loading = ref(false);

const visible = ref(false);
const editVisible = ref(false);
const currentType = ref("READING");

const createForm = ref({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "READING",
});

const editForm = ref({
  id: null,
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  type: "READING",
});

const readingItems = computed(() => {
  const sections = personalDevelopments.value.filter(
    (item) => item.type === "READING"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const writingItems = computed(() => {
  const sections = personalDevelopments.value.filter(
    (item) => item.type === "WRITING"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const experienceItems = computed(() => {
  const sections = personalDevelopments.value.filter(
    (item) => item.type === "EXPERIENCE"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const relationshipItems = computed(() => {
  const sections = personalDevelopments.value.filter(
    (item) => item.type === "RELATIONSHIP"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const academicSkillsItems = computed(() => {
  const sections = personalDevelopments.value.filter(
    (item) => item.type === "ACADEMIC_SKILLS"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const academicEnrichItems = computed(() => {
  const sections = personalDevelopments.value.filter(
    (item) => item.type === "ACADEMIC_ENRICH"
  );
  return sections.flatMap((section) =>
    (section.items || []).map((item) => ({ ...item, type: section.type }))
  );
});

const loadPersonalDevelopments = async () => {
  loading.value = true;
  try {
    const data = await fetchPersonalDevelopmentsGrouped();
    personalDevelopments.value = Array.isArray(data) ? data : [];
  } catch (error) {
    personalDevelopments.value = [];
  } finally {
    loading.value = false;
  }
};

const showModal = (type) => {
  currentType.value = type;
  createForm.value = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    type: type,
  };
  visible.value = true;
};

const handleOk = async () => {
  try {
    const result = await createPersonalDevelopment(createForm.value);
    message.success("Item added successfully");
    visible.value = false;
    await loadPersonalDevelopments();
  } catch (error) {
    message.error("Failed to add item");
  }
};

const showEditModal = (item) => {
  editForm.value = {
    id: item.id,
    name: item.name,
    description: item.description,
    startDate: item.startDate,
    endDate: item.endDate,
    type: item.type,
  };
  editVisible.value = true;
};

const handleEditOk = async () => {
  try {
    await updatePersonalDevelopment(editForm.value.id, {
      name: editForm.value.name,
      description: editForm.value.description,
      startDate: editForm.value.startDate,
      endDate: editForm.value.endDate,
      type: editForm.value.type,
    });
    message.success("Item updated successfully");
    editVisible.value = false;
    await loadPersonalDevelopments();
  } catch (error) {
    message.error("Failed to update item");
  }
};

onMounted(async () => {
  await loadPersonalDevelopments();
});
</script>

<template>
  <div class="personal-development-page">
    <div class="personal-development__left">
      <PageBanner
        titleProps="Personal Development"
        backgroundProps="#4116FF"
        iconProps="/page-icons/personal.png"
      />

      <!-- Reading Section -->
      <div class="development-body">
        <div class="development__header">
          <h4 class="section__title">Reading</h4>
          <a-button @click="showModal('READING')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="readingItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
          </div>
          <div v-else class="items__list">
            <div v-for="item in readingItems" :key="item.id" class="item__card">
              <div class="item__card-left">
                <div>
                  <p class="item__card-name">{{ item.name }}</p>
                  <p class="item__card-description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="item__card-right">
                <p class="item__card-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>
                <a-button @click="showEditModal(item)" class="item__card-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <!-- Writing Section -->
      <div class="development-body">
        <div class="development__header">
          <h4 class="section__title">Writing</h4>
          <a-button @click="showModal('WRITING')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="writingItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
          </div>
          <div v-else class="items__list">
            <div v-for="item in writingItems" :key="item.id" class="item__card">
              <div class="item__card-left">
                <div>
                  <p class="item__card-name">{{ item.name }}</p>
                  <p class="item__card-description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="item__card-right">
                <p class="item__card-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>
                <a-button @click="showEditModal(item)" class="item__card-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <!-- Experience Section -->
      <div class="development-body">
        <div class="development__header">
          <h4 class="section__title">Experience</h4>
          <a-button @click="showModal('EXPERIENCE')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="experienceItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
          </div>
          <div v-else class="items__list">
            <div
              v-for="item in experienceItems"
              :key="item.id"
              class="item__card"
            >
              <div class="item__card-left">
                <div>
                  <p class="item__card-name">{{ item.name }}</p>
                  <p class="item__card-description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="item__card-right">
                <p class="item__card-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>
                <a-button @click="showEditModal(item)" class="item__card-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <!-- Relationship Section -->
      <div class="development-body">
        <div class="development__header">
          <h4 class="section__title">Relationship</h4>
          <a-button @click="showModal('RELATIONSHIP')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="relationshipItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
          </div>
          <div v-else class="items__list">
            <div
              v-for="item in relationshipItems"
              :key="item.id"
              class="item__card"
            >
              <div class="item__card-left">
                <div>
                  <p class="item__card-name">{{ item.name }}</p>
                  <p class="item__card-description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="item__card-right">
                <p class="item__card-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>
                <a-button @click="showEditModal(item)" class="item__card-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <!-- Academic Skills Section -->
      <div class="development-body">
        <div class="development__header">
          <h4 class="section__title">Academic Skills</h4>
          <a-button @click="showModal('ACADEMIC_SKILLS')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="academicSkillsItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
          </div>
          <div v-else class="items__list">
            <div
              v-for="item in academicSkillsItems"
              :key="item.id"
              class="item__card"
            >
              <div class="item__card-left">
                <div>
                  <p class="item__card-name">{{ item.name }}</p>
                  <p class="item__card-description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="item__card-right">
                <p class="item__card-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>
                <a-button @click="showEditModal(item)" class="item__card-edit">
                  <Icon name="lucide:pencil" class="icon" />
                </a-button>
              </div>
            </div>
          </div>
        </a-spin>
      </div>

      <!-- Academic Enrichment Section -->
      <div class="development-body">
        <div class="development__header">
          <h4 class="section__title">Academic Enrichment</h4>
          <a-button @click="showModal('ACADEMIC_ENRICH')" class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <a-spin :spinning="loading">
          <div
            v-if="academicEnrichItems.length === 0 && !loading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" />
            No items added yet
          </div>
          <div v-else class="items__list">
            <div
              v-for="item in academicEnrichItems"
              :key="item.id"
              class="item__card"
            >
              <div class="item__card-left">
                <div>
                  <p class="item__card-name">{{ item.name }}</p>
                  <p class="item__card-description">
                    {{ item.description }}
                  </p>
                </div>
              </div>
              <div class="item__card-right">
                <p class="item__card-date">
                  {{ item.startDate }} - {{ item.endDate }}
                </p>
                <a-button @click="showEditModal(item)" class="item__card-edit">
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

  <!-- Create Modal -->
  <a-modal
    v-model:visible="visible"
    title="Add Item"
    @ok="handleOk"
    :okText="'Add'"
    :cancelText="'Cancel'"
  >
    <a-form layout="vertical">
      <a-form-item label="Title" required>
        <a-input v-model:value="createForm.name" placeholder="Enter title" />
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

  <!-- Edit Modal -->
  <a-modal
    v-model:visible="editVisible"
    title="Edit Item"
    @ok="handleEditOk"
    :okText="'Update'"
    :cancelText="'Cancel'"
  >
    <a-form layout="vertical">
      <a-form-item label="Title" required>
        <a-input v-model:value="editForm.name" placeholder="Enter title" />
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
.personal-development-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}

.development-body {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
}

.development__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.items__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item__card {
  display: grid;
  grid-template-columns: 6fr 4fr;
  align-items: center;
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 12px;
}

.item__card-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item__card-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}

.item__card-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}

.item__card-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.item__card-date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: var(--border);
  color: var(--light-grey);
  padding: 4px 8px;
  border-radius: 8px;
}

.item__card-edit {
  border: 0;
}

.item__card-edit .icon {
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
