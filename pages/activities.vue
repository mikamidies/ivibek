<script setup>
import PageBanner from "@/components/PageBanner.vue";
import { ref, computed } from "vue";
import { message } from "ant-design-vue";

const { fetchActivities, createActivity, updateActivity } = useActivities();
const { fetchInternships, createInternship, updateInternship } =
  useInternships();
const { t } = useTranslations();

const activitiesActiveKey = ref([0]);
const internshipsActiveKey = ref([0]);

const {
  data: activities,
  pending: loading,
  refresh: refreshActivities,
} = await useAsyncData("activities", () => fetchActivities(), {
  default: () => [],
});

const {
  data: internships,
  pending: internshipsLoading,
  refresh: refreshInternships,
} = await useAsyncData("internships", () => fetchInternships(), {
  default: () => [],
});

const visible = ref(false);
const editVisible = ref(false);

const intershipVisible = ref(false);
const intershipEditVisible = ref(false);

const createForm = ref({
  name: "",
  description: "",
  schoolYear: null,
  orgName: "",
  hoursPerWeek: "",
  weekPerYear: "",
});

const editForm = ref({
  id: null,
  name: "",
  description: "",
  schoolYear: null,
  orgName: "",
  hoursPerWeek: "",
  weekPerYear: "",
});

const createInternshipForm = ref({
  name: "",
  description: "",
  orgName: "",
  position: "",
  programProvider: "",
  startDate: "",
  endDate: "",
});

const editInternshipForm = ref({
  id: null,
  name: "",
  description: "",
  orgName: "",
  position: "",
  programProvider: "",
  startDate: "",
  endDate: "",
});

const createErrors = ref({
  name: "",
  description: "",
  schoolYear: "",
  orgName: "",
  hoursPerWeek: "",
  weekPerYear: "",
});

const editErrors = ref({
  name: "",
  description: "",
  schoolYear: "",
  orgName: "",
  hoursPerWeek: "",
  weekPerYear: "",
});

const createInternshipErrors = ref({
  name: "",
  description: "",
  orgName: "",
  position: "",
  programProvider: "",
  startDate: "",
  endDate: "",
});

const editInternshipErrors = ref({
  name: "",
  description: "",
  orgName: "",
  position: "",
  programProvider: "",
  startDate: "",
  endDate: "",
});

const resetErrors = (target) => {
  Object.keys(target.value).forEach((key) => {
    target.value[key] = "";
  });
};

const isPositiveNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return false;
  }

  return Number(value) > 0;
};

const validateActivityForm = (form, errors) => {
  resetErrors(errors);

  if (!form.value.name.trim()) {
    errors.value.name = "Activity name is required";
  }

  if (!form.value.orgName.trim()) {
    errors.value.orgName = "Organization name is required";
  }

  if (!Number.isInteger(form.value.schoolYear) || form.value.schoolYear < 1 || form.value.schoolYear > 13) {
    errors.value.schoolYear = "School year must be between 1 and 13";
  }

  if (!isPositiveNumber(form.value.hoursPerWeek)) {
    errors.value.hoursPerWeek = "Hours per week must be a positive number";
  }

  if (!isPositiveNumber(form.value.weekPerYear)) {
    errors.value.weekPerYear = "Weeks per year must be a positive number";
  }

  if (!form.value.description.trim()) {
    errors.value.description = "Description is required";
  }

  return !Object.values(errors.value).some(Boolean);
};

const validateInternshipForm = (form, errors) => {
  resetErrors(errors);

  if (!form.value.name.trim()) {
    errors.value.name = "Internship name is required";
  }

  if (!form.value.orgName.trim()) {
    errors.value.orgName = "Organization name is required";
  }

  if (!form.value.position.trim()) {
    errors.value.position = "Position is required";
  }

  if (!form.value.programProvider.trim()) {
    errors.value.programProvider = "Program provider is required";
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

  if (!form.value.description.trim()) {
    errors.value.description = "Description is required";
  }

  return !Object.values(errors.value).some(Boolean);
};

const showModal = () => {
  createForm.value = {
    name: "",
    description: "",
    schoolYear: null,
    orgName: "",
    hoursPerWeek: "",
    weekPerYear: "",
  };
  resetErrors(createErrors);
  visible.value = true;
};

const handleOk = async () => {
  if (!validateActivityForm(createForm, createErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await createActivity(createForm.value);
    message.success("Activity added successfully");
    visible.value = false;
    await refreshActivities();
  } catch (error) {
    message.error("Failed to add activity");
  }
};

const showEditModal = (activity) => {
  editForm.value = {
    id: activity.id,
    name: activity.name,
    description: activity.description,
    schoolYear: activity.schoolYear,
    orgName: activity.orgName,
    hoursPerWeek: activity.hoursPerWeek,
    weekPerYear: activity.weekPerYear,
  };
  resetErrors(editErrors);
  editVisible.value = true;
};

const handleEditOk = async () => {
  if (!validateActivityForm(editForm, editErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await updateActivity(editForm.value.id, {
      name: editForm.value.name,
      description: editForm.value.description,
      schoolYear: editForm.value.schoolYear,
      orgName: editForm.value.orgName,
      hoursPerWeek: editForm.value.hoursPerWeek,
      weekPerYear: editForm.value.weekPerYear,
    });
    message.success("Activity updated successfully");
    editVisible.value = false;
    await refreshActivities();
  } catch (error) {
    message.error("Failed to update activity");
  }
};

const showInternshipModal = () => {
  createInternshipForm.value = {
    name: "",
    description: "",
    orgName: "",
    position: "",
    programProvider: "",
    startDate: "",
    endDate: "",
  };
  resetErrors(createInternshipErrors);
  intershipVisible.value = true;
};

const handleIntershipOk = async () => {
  if (!validateInternshipForm(createInternshipForm, createInternshipErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await createInternship(createInternshipForm.value);
    message.success("Internship added successfully");
    intershipVisible.value = false;
    await refreshInternships();
  } catch (error) {
    message.error("Failed to add internship");
  }
};

const showInternshipEditModal = (internship) => {
  editInternshipForm.value = {
    id: internship.id,
    name: internship.name,
    description: internship.description,
    orgName: internship.orgName,
    position: internship.position,
    programProvider: internship.programProvider,
    startDate: internship.startDate,
    endDate: internship.endDate,
  };
  resetErrors(editInternshipErrors);
  intershipEditVisible.value = true;
};

const handleIntershipEditOk = async () => {
  if (!validateInternshipForm(editInternshipForm, editInternshipErrors)) {
    message.error("Please fix the form errors");
    return;
  }

  try {
    await updateInternship(editInternshipForm.value.id, {
      name: editInternshipForm.value.name,
      description: editInternshipForm.value.description,
      orgName: editInternshipForm.value.orgName,
      position: editInternshipForm.value.position,
      programProvider: editInternshipForm.value.programProvider,
      startDate: editInternshipForm.value.startDate,
      endDate: editInternshipForm.value.endDate,
    });
    message.success("Internship updated successfully");
    intershipEditVisible.value = false;
    await refreshInternships();
  } catch (error) {
    message.error("Failed to update internship");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

</script>

<template>
  <div class="activities-page">
    <div class="activities__left">
      <PageBanner
        :titleProps="t('activities.activities')"
        backgroundProps="#18A171"
        iconProps="/page-icons/activities.png"
      />

      <div class="activities__body">
        <div class="act__header">
          <h4 class="section__title">{{ t("activities.activities") }}</h4>

          <a-button @click="showModal" class="add__btn">
            <Icon name="lucide:plus" class="icon" />
            {{ t("activities.add") }}
          </a-button>
        </div>
        <!-- <div class="act__top">
          <p class="act__total">Total Hours per School Year</p>
          <div class="act__top-items">
            <div class="act__top-item">
              <p>Year 9:</p>
              <span>0</span>
            </div>
            <div class="act__top-item">
              <p>Year 10:</p>
              <span>0</span>
            </div>
            <div class="act__top-item">
              <p>Year 11:</p>
              <span>0</span>
            </div>
            <div class="act__top-item">
              <p>Year 12:</p>
              <span>0</span>
            </div>
          </div>
        </div> -->

        <a-spin :spinning="loading">
          <div v-if="activities.length === 0 && !loading" class="empty__state">
            <Icon name="lucide:file-text" class="empty-icon" />
            {{ t("activities.no-activities") }}
          </div>

          <div
            v-for="(activity, index) in activities"
            :key="activity.id"
            class="programmes__item"
          >
            <div class="programmes__item-head">
              <div class="programmes__item-left">
                <div>
                  <h3 class="programmes__item-title">{{ activity.name }}</h3>
                  <p class="programmes__item-description">
                    {{ activity.orgName }}
                  </p>
                </div>
              </div>
              <div class="programmes__item-right">
                <button
                  @click="showEditModal(activity)"
                  class="programmes__item-edit"
                >
                  <Icon name="lucide:pencil" />
                </button>
              </div>
            </div>
            <div class="programmes__item-body">
              <a-collapse accordion v-model:activeKey="activitiesActiveKey">
                <a-collapse-panel :key="index" :show-arrow="false">
                  <template #header>
                    <div class="panel-header">
                      <p>{{ t("activities.details") }}</p>
                      <Icon name="lucide:chevron-down" />
                    </div>
                  </template>
                  <div class="panel-content">
                    <div class="panel__content-items">
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">
                          {{ t("activities.org-name") }}
                        </h4>
                        <p class="panel__content-text">
                          {{ activity.orgName }}
                        </p>
                      </div>
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">
                          {{ t("activities.school") }}
                        </h4>
                        <p class="panel__content-text">
                          Year {{ activity.schoolYear }}
                        </p>
                      </div>
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">
                          {{ t("activities.week") }}
                        </h4>
                        <p class="panel__content-text">
                          {{ activity.hoursPerWeek }}
                        </p>
                      </div>
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">
                          {{ t("activities.year") }}
                        </h4>
                        <p class="panel__content-text">
                          {{ activity.weekPerYear }}
                        </p>
                      </div>
                      <div class="panel__content-item">
                        <h4 class="panel__content-title">
                          {{ t("activities.desc") }}
                        </h4>
                        <p class="panel__content-text">
                          {{ activity.description }}
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

      <div class="activities__body">
        <div class="act__header">
          <h4 class="section__title">{{ t("activities.intership") }}</h4>

          <a-button @click="showInternshipModal" class="add__btn">
            <Icon name="lucide:plus" class="icon" />
            {{ t("activities.add") }}
          </a-button>
        </div>

        <a-spin :spinning="internshipsLoading">
          <div
            v-if="internships.length === 0 && !internshipsLoading"
            class="empty__state"
          >
            <Icon name="lucide:file-text" class="empty-icon" />
            {{ t("activities.no-intership") }}
          </div>

          <div
            v-for="(internship, index) in internships"
            :key="internship.id"
            class="programmes__item"
          >
            <div class="programmes__item-head">
              <div class="programmes__item-left">
                <div>
                  <h3 class="programmes__item-title">{{ internship.name }}</h3>
                  <p class="programmes__item-description">
                    {{ internship.orgName }}
                  </p>
                </div>
              </div>
              <div class="programmes__item-right">
                <div class="programmes__item-date">
                  <span>
                    {{ formatDate(internship.startDate) }} -
                    {{ formatDate(internship.endDate) }}
                  </span>
                </div>

                <button
                  @click="showInternshipEditModal(internship)"
                  class="programmes__item-edit"
                >
                  <Icon name="lucide:pencil" />
                </button>
              </div>
            </div>
            <div class="programmes__item-body">
              <a-collapse accordion v-model:activeKey="internshipsActiveKey">
                <a-collapse-panel :key="index" :show-arrow="false">
                  <template #header>
                    <div class="panel-header">
                      <p>{{ t("activities.details") }}</p>
                      <Icon name="lucide:chevron-down" />
                    </div>
                  </template>
                  <div class="panel-content">
                    <div class="panel__content-items new__grid">
                      <div class="separator">
                        <div class="panel__content-item">
                          <h4 class="panel__content-title">
                            {{ t("activities.position") }}
                          </h4>
                          <p class="panel__content-text">
                            {{ internship.position }}
                          </p>
                        </div>
                        <div class="panel__content-item">
                          <h4 class="panel__content-title">
                            {{ t("activities.org-name") }}
                          </h4>
                          <p class="panel__content-text">
                            {{ internship.orgName }}
                          </p>
                        </div>
                        <div class="panel__content-item">
                          <h4 class="panel__content-title">
                            {{ t("activities.program-provider") }}
                          </h4>
                          <p class="panel__content-text">
                            {{ internship.programProvider }}
                          </p>
                        </div>
                      </div>

                      <div class="separator">
                        <div class="panel__content-item">
                          <h4 class="panel__content-title">
                            {{ t("activities.period") }}
                          </h4>
                          <p class="panel__content-text">
                            {{ formatDate(internship.startDate) }} -
                            {{ formatDate(internship.endDate) }}
                          </p>
                        </div>
                        <div class="panel__content-item">
                          <h4 class="panel__content-title">
                            {{ t("activities.desc") }}
                          </h4>
                          <p class="panel__content-text">
                            {{ internship.description }}
                          </p>
                        </div>
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
  </div>

  <a-modal
    v-model:visible="visible"
    :title="t('activities.add-activity')"
    @ok="handleOk"
    :okText="'Add'"
    :cancelText="'Cancel'"
    width="600px"
    class="activities__form"
  >
    <a-form layout="vertical">
      <a-form-item
        :label="t('activities.activity-name')"
        required
        :validate-status="createErrors.name ? 'error' : ''"
        :help="createErrors.name"
      >
        <a-input
          v-model:value="createForm.name"
          :placeholder="t('activities.activity-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.org-name')"
        required
        :validate-status="createErrors.orgName ? 'error' : ''"
        :help="createErrors.orgName"
      >
        <a-input
          v-model:value="createForm.orgName"
          :placeholder="t('activities.org-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.school')"
        required
        :validate-status="createErrors.schoolYear ? 'error' : ''"
        :help="createErrors.schoolYear"
      >
        <a-input-number
          v-model:value="createForm.schoolYear"
          :placeholder="t('activities.school')"
          style="width: 100%"
          :min="1"
          :max="13"
        />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :label="t('activities.week')"
            required
            :validate-status="createErrors.hoursPerWeek ? 'error' : ''"
            :help="createErrors.hoursPerWeek"
          >
            <a-input
              v-model:value="createForm.hoursPerWeek"
              :placeholder="t('activities.week')"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :label="t('activities.year')"
            required
            :validate-status="createErrors.weekPerYear ? 'error' : ''"
            :help="createErrors.weekPerYear"
          >
            <a-input
              v-model:value="createForm.weekPerYear"
              :placeholder="t('activities.year')"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        :label="t('activities.desc')"
        required
        :validate-status="createErrors.description ? 'error' : ''"
        :help="createErrors.description"
      >
        <a-textarea
          v-model:value="createForm.description"
          :placeholder="t('activities.desc')"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:visible="editVisible"
    title="Edit Activity"
    @ok="handleEditOk"
    :okText="'Update'"
    :cancelText="'Cancel'"
    width="600px"
    class="activities__form"
  >
    <a-form layout="vertical">
      <a-form-item
        :label="t('activities.activity-name')"
        required
        :validate-status="editErrors.name ? 'error' : ''"
        :help="editErrors.name"
      >
        <a-input
          v-model:value="editForm.name"
          :placeholder="t('activities.activity-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.org-name')"
        required
        :validate-status="editErrors.orgName ? 'error' : ''"
        :help="editErrors.orgName"
      >
        <a-input
          v-model:value="editForm.orgName"
          :placeholder="t('activities.org-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.school')"
        required
        :validate-status="editErrors.schoolYear ? 'error' : ''"
        :help="editErrors.schoolYear"
      >
        <a-input-number
          v-model:value="editForm.schoolYear"
          :placeholder="t('activities.school')"
          style="width: 100%"
          :min="1"
          :max="13"
        />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :label="t('activities.week')"
            required
            :validate-status="editErrors.hoursPerWeek ? 'error' : ''"
            :help="editErrors.hoursPerWeek"
          >
            <a-input
              v-model:value="editForm.hoursPerWeek"
              :placeholder="t('activities.week')"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :label="t('activities.year')"
            required
            :validate-status="editErrors.weekPerYear ? 'error' : ''"
            :help="editErrors.weekPerYear"
          >
            <a-input
              v-model:value="editForm.weekPerYear"
              :placeholder="t('activities.year')"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        :label="t('activities.desc')"
        required
        :validate-status="editErrors.description ? 'error' : ''"
        :help="editErrors.description"
      >
        <a-textarea
          v-model:value="editForm.description"
          :placeholder="t('activities.desc')"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:visible="intershipVisible"
    :title="t('activities.add-intership')"
    @ok="handleIntershipOk"
    :okText="'Add'"
    :cancelText="'Cancel'"
    width="600px"
    class="activities__form"
  >
    <a-form layout="vertical">
      <a-form-item
        :label="t('activities.intership-name')"
        required
        :validate-status="createInternshipErrors.name ? 'error' : ''"
        :help="createInternshipErrors.name"
      >
        <a-input
          v-model:value="createInternshipForm.name"
          :placeholder="t('activities.intership-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.org-name')"
        required
        :validate-status="createInternshipErrors.orgName ? 'error' : ''"
        :help="createInternshipErrors.orgName"
      >
        <a-input
          v-model:value="createInternshipForm.orgName"
          :placeholder="t('activities.org-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.position')"
        required
        :validate-status="createInternshipErrors.position ? 'error' : ''"
        :help="createInternshipErrors.position"
      >
        <a-input
          v-model:value="createInternshipForm.position"
          :placeholder="t('activities.position')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.program-provider')"
        required
        :validate-status="createInternshipErrors.programProvider ? 'error' : ''"
        :help="createInternshipErrors.programProvider"
      >
        <a-input
          v-model:value="createInternshipForm.programProvider"
          :placeholder="t('activities.program-provider')"
        />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :label="t('activities.start-date')"
            required
            :validate-status="createInternshipErrors.startDate ? 'error' : ''"
            :help="createInternshipErrors.startDate"
          >
            <a-date-picker
              v-model:value="createInternshipForm.startDate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :label="t('activities.end-date')"
            required
            :validate-status="createInternshipErrors.endDate ? 'error' : ''"
            :help="createInternshipErrors.endDate"
          >
            <a-date-picker
              v-model:value="createInternshipForm.endDate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        :label="t('activities.desc')"
        required
        :validate-status="createInternshipErrors.description ? 'error' : ''"
        :help="createInternshipErrors.description"
      >
        <a-textarea
          v-model:value="createInternshipForm.description"
          :placeholder="t('activities.desc')"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal
    v-model:visible="intershipEditVisible"
    :title="t('activities.edit-intership')"
    @ok="handleIntershipEditOk"
    :okText="'Update'"
    :cancelText="'Cancel'"
    width="600px"
    class="activities__form"
  >
    <a-form layout="vertical">
      <a-form-item
        :label="t('activities.intership-name')"
        required
        :validate-status="editInternshipErrors.name ? 'error' : ''"
        :help="editInternshipErrors.name"
      >
        <a-input
          v-model:value="editInternshipForm.name"
          :placeholder="t('activities.intership-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.org-name')"
        required
        :validate-status="editInternshipErrors.orgName ? 'error' : ''"
        :help="editInternshipErrors.orgName"
      >
        <a-input
          v-model:value="editInternshipForm.orgName"
          :placeholder="t('activities.org-name')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.position')"
        required
        :validate-status="editInternshipErrors.position ? 'error' : ''"
        :help="editInternshipErrors.position"
      >
        <a-input
          v-model:value="editInternshipForm.position"
          :placeholder="t('activities.position')"
        />
      </a-form-item>

      <a-form-item
        :label="t('activities.program-provider')"
        required
        :validate-status="editInternshipErrors.programProvider ? 'error' : ''"
        :help="editInternshipErrors.programProvider"
      >
        <a-input
          v-model:value="editInternshipForm.programProvider"
          :placeholder="t('activities.program-provider')"
        />
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item
            :label="t('activities.start-date')"
            required
            :validate-status="editInternshipErrors.startDate ? 'error' : ''"
            :help="editInternshipErrors.startDate"
          >
            <a-date-picker
              v-model:value="editInternshipForm.startDate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            :label="t('activities.end-date')"
            required
            :validate-status="editInternshipErrors.endDate ? 'error' : ''"
            :help="editInternshipErrors.endDate"
          >
            <a-date-picker
              v-model:value="editInternshipForm.endDate"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        :label="t('activities.desc')"
        required
        :validate-status="editInternshipErrors.description ? 'error' : ''"
        :help="editInternshipErrors.description"
      >
        <a-textarea
          v-model:value="editInternshipForm.description"
          :placeholder="t('activities.desc')"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.programmes__item-edit {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--light-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
.activities-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.activities__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.act__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.act__top {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
}
.act__total {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.act__top-items {
  display: flex;
  align-items: center;
  gap: 24px;
}
.act__top-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.act__top-item p {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.act__top-item span {
  font-weight: 600;
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
:deep(.ant-select) {
  width: 167px !important;
}
:deep(.ant-select-selector) {
  width: 120px;
  height: 32px !important;
  border-radius: 8px !important;
}
:deep(.ant-collapse-item) {
  border: 0 !important;
}
:deep(.ant-collapse-header) {
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
:deep(.ant-collapse-content) {
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
.new__grid {
  grid-template-columns: repeat(2, 1fr);
}
.separator {
  border-right: 1px solid var(--border);
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.new__grid .panel__content-item {
  display: grid;
  grid-template-columns: 3fr 5fr;
  gap: 24px;
}
</style>
