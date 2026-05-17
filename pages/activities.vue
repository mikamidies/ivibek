<script setup>
import PageBanner from "@/components/PageBanner.vue";
import { ref } from "vue";
import { message } from "ant-design-vue";

const {
    fetchActivityCategories,
    fetchActivities,
    createActivity,
    updateActivity,
} = useActivities();
const { t } = useTranslations();

const activitiesActiveKeys = ref({});

const {
    data: activitySections,
    pending: loading,
    refresh: refreshActivities,
} = await useAsyncData(
    "activity-sections",
    async () => {
        const categories = await fetchActivityCategories();

        return await Promise.all(
            categories.map(async (category) => ({
                category,
                activities: await fetchActivities(category.id),
            })),
        );
    },
    {
        default: () => [],
    },
);

const visible = ref(false);
const editVisible = ref(false);
const selectedActivityCategoryId = ref(null);

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

    if (
        !Number.isInteger(form.value.schoolYear) ||
        form.value.schoolYear < 6 ||
        form.value.schoolYear > 12
    ) {
        errors.value.schoolYear = "School year must be between 6 and 12";
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

const showModal = (categoryId) => {
    selectedActivityCategoryId.value = categoryId;
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
    if (selectedActivityCategoryId.value === null) {
        message.error("Activity category is required");
        return;
    }

    if (!validateActivityForm(createForm, createErrors)) {
        message.error("Please fix the form errors");
        return;
    }

    try {
        await createActivity({
            ...createForm.value,
            categoryId: selectedActivityCategoryId.value,
        });
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
</script>

<template>
    <div class="activities-page">
        <div class="activities__left">
            <PageBanner
                :titleProps="t('activities.activities')"
                backgroundProps="#18A171"
                iconProps="/page-icons/activities.png"
            />

            <a-spin :spinning="loading">
                <div
                    v-if="activitySections.length === 0 && !loading"
                    class="activities__body"
                >
                    <div class="empty__state">
                        <Icon name="lucide:file-text" class="empty-icon" />
                        {{ t("activities.no-activities") }}
                    </div>
                </div>

                <div
                    v-for="section in activitySections"
                    :key="section.category.id"
                    class="activities__body"
                >
                    <div class="act__header">
                        <h4 class="section__title">
                            {{ section.category.name }}
                        </h4>

                        <a-button
                            @click="showModal(section.category.id)"
                            class="add__btn"
                        >
                            <Icon name="lucide:plus" class="icon" />
                            {{ t("common.add") }}
                        </a-button>
                    </div>

                    <div
                        v-if="section.activities.length === 0"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" class="empty-icon" />
                        {{ t("activities.no-activities") }}
                    </div>

                    <div
                        v-for="(activity, index) in section.activities"
                        :key="activity.id"
                        class="programmes__item"
                    >
                        <div class="programmes__item-head">
                            <div class="programmes__item-left">
                                <div>
                                    <h3 class="programmes__item-title">
                                        {{ activity.name }}
                                    </h3>
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
                            <a-collapse
                                accordion
                                v-model:activeKey="
                                    activitiesActiveKeys[section.category.id]
                                "
                            >
                                <a-collapse-panel
                                    :key="index"
                                    :show-arrow="false"
                                >
                                    <template #header>
                                        <div class="panel-header">
                                            <p>{{ t("activities.details") }}</p>
                                            <Icon name="lucide:chevron-down" />
                                        </div>
                                    </template>
                                    <div class="panel-content">
                                        <div class="panel__content-items">
                                            <div class="panel__content-item">
                                                <h4
                                                    class="panel__content-title"
                                                >
                                                    {{
                                                        t("activities.org-name")
                                                    }}
                                                </h4>
                                                <p class="panel__content-text">
                                                    {{ activity.orgName }}
                                                </p>
                                            </div>
                                            <div class="panel__content-item">
                                                <h4
                                                    class="panel__content-title"
                                                >
                                                    {{ t("activities.school") }}
                                                </h4>
                                                <p class="panel__content-text">
                                                    Year
                                                    {{ activity.schoolYear }}
                                                </p>
                                            </div>
                                            <div class="panel__content-item">
                                                <h4
                                                    class="panel__content-title"
                                                >
                                                    {{ t("activities.week") }}
                                                </h4>
                                                <p class="panel__content-text">
                                                    {{ activity.hoursPerWeek }}
                                                </p>
                                            </div>
                                            <div class="panel__content-item">
                                                <h4
                                                    class="panel__content-title"
                                                >
                                                    {{ t("activities.year") }}
                                                </h4>
                                                <p class="panel__content-text">
                                                    {{ activity.weekPerYear }}
                                                </p>
                                            </div>
                                            <div class="panel__content-item">
                                                <h4
                                                    class="panel__content-title"
                                                >
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
                </div>
            </a-spin>
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
                    :min="6"
                    :max="12"
                />
            </a-form-item>

            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item
                        :label="t('activities.week')"
                        required
                        :validate-status="
                            createErrors.hoursPerWeek ? 'error' : ''
                        "
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
                        :validate-status="
                            createErrors.weekPerYear ? 'error' : ''
                        "
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
                    :min="6"
                    :max="12"
                />
            </a-form-item>

            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item
                        :label="t('activities.week')"
                        required
                        :validate-status="
                            editErrors.hoursPerWeek ? 'error' : ''
                        "
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
</style>
