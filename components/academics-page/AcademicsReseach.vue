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

const { fetchResearches, createResearch, updateResearch } = useResearches();
const { t } = useTranslations();

const value = ref(2);
const activeKey = ref([]);
const visible = ref(false);
const editMode = ref(false);
const researches = ref([]);
const currentResearch = ref(null);
const loading = ref(false);
const formErrors = ref({
    name: "",
    question: "",
    startDate: "",
    endDate: "",
});

const formData = ref({
    name: "",
    question: "",
    startDate: "",
    endDate: "",
});

const resetResearchErrors = () => {
    Object.keys(formErrors.value).forEach((key) => {
        formErrors.value[key] = "";
    });
};

const validateResearchForm = () => {
    resetResearchErrors();

    if (!formData.value.name.trim()) {
        formErrors.value.name = "Research name is required";
    }

    if (!formData.value.question.trim()) {
        formErrors.value.question = "Research question is required";
    }

    if (!formData.value.startDate) {
        formErrors.value.startDate = "Start date is required";
    }

    if (!formData.value.endDate) {
        formErrors.value.endDate = "End date is required";
    }

    if (
        formData.value.startDate &&
        formData.value.endDate &&
        formData.value.endDate < formData.value.startDate
    ) {
        formErrors.value.endDate = "End date must be on or after start date";
    }

    return !Object.values(formErrors.value).some(Boolean);
};

const loadResearches = async () => {
    loading.value = true;
    try {
        researches.value = await fetchResearches();
    } catch (error) {
        message.error(`Failed to load researches: ${error.message || error}`);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadResearches();
});

const showModal = () => {
    editMode.value = false;
    formData.value = {
        name: "",
        question: "",
        startDate: "",
        endDate: "",
    };
    resetResearchErrors();
    visible.value = true;
};

const showEditModal = (research) => {
    editMode.value = true;
    currentResearch.value = research;
    formData.value = {
        name: research.name,
        question: research.question,
        startDate: research.startDate,
        endDate: research.endDate,
    };
    resetResearchErrors();
    visible.value = true;
};

const handleOk = async () => {
    if (!validateResearchForm()) {
        message.error("Please fix the form errors");
        return;
    }

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

        console.log("Saving research with payload:", payload);

        if (editMode.value && currentResearch.value) {
            await updateResearch(currentResearch.value.id, payload);
            message.success("Research updated successfully");
        } else {
            await createResearch(payload);
            message.success("Research created successfully");
        }
        await loadResearches();
        visible.value = false;
    } catch (error) {
        message.error(`Failed to save research: ${error.message || error}`);
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
            <h2 class="programmes__title">{{ t("academics.research") }}</h2>
            <button @click="showModal" class="add__btn">
                <Icon name="lucide:plus" style="width: 16px; height: 16px" />
                {{ t("common.add") }}
            </button>
        </div>
        <div class="programmes__items">
            <a-spin :spinning="loading">
                <div v-if="researches.length === 0" class="empty__state">
                    <Icon
                        name="lucide:file"
                        style="width: 48px; height: 48px; margin-bottom: 16px"
                    />
                    <p>
                        {{ t("academics.no_researches") }}
                    </p>
                </div>
                <div
                    v-for="research in researches"
                    :key="research.id"
                    class="programmes__item"
                >
                    <div class="programmes__item-head">
                        <div class="programmes__item-left">
                            <div>
                                <h3 class="programmes__item-title">
                                    {{ research.name }}
                                </h3>
                                <p class="programmes__item-description">
                                    {{ research.question }}
                                </p>
                            </div>
                        </div>
                        <div class="flexer">
                            <!-- <div class="programmes__item-date">
                <span
                  >{{ formatDate(research.startDate) }} -
                  {{ formatDate(research.endDate) }}</span
                >
              </div> -->
                            <div class="programmes__item-right">
                                <button
                                    @click="showEditModal(research)"
                                    class="edit__btn"
                                >
                                    <Icon
                                        name="lucide:edit"
                                        style="width: 16px; height: 16px"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="programmes__item-body">
                        <a-collapse accordion v-model:activeKey="activeKey">
                            <a-collapse-panel
                                :key="research.id.toString()"
                                :show-arrow="false"
                            >
                                <template #header>
                                    <div class="panel-header">
                                        <p>{{ t("academics.details") }}</p>
                                        <Icon name="lucide:chevron-down" />
                                    </div>
                                </template>
                                <div class="panel-content">
                                    <div class="panel__content-items">
                                        <div class="panel__content-item">
                                            <h4 class="panel__content-title">
                                                {{
                                                    t("academics.research-name")
                                                }}
                                            </h4>
                                            <p class="panel__content-text">
                                                {{ research.name }}
                                            </p>
                                        </div>
                                        <div class="panel__content-item">
                                            <h4 class="panel__content-title">
                                                {{ t("academics.question") }}
                                            </h4>
                                            <p class="panel__content-text">
                                                {{ research.question }}
                                            </p>
                                        </div>
                                        <div class="panel__content-item">
                                            <h4 class="panel__content-title">
                                                {{ t("common.start") }}
                                            </h4>
                                            <p class="panel__content-text">
                                                {{
                                                    formatDate(
                                                        research.startDate,
                                                    )
                                                }}
                                            </p>
                                        </div>
                                        <div class="panel__content-item">
                                            <h4 class="panel__content-title">
                                                {{ t("common.end") }}
                                            </h4>
                                            <p class="panel__content-text">
                                                {{
                                                    formatDate(research.endDate)
                                                }}
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
        :title="
            editMode
                ? t('academics.editResearch')
                : t('academics.addNewResearch')
        "
        @ok="handleOk"
        :confirm-loading="loading"
        width="600px"
        class="academics__form"
    >
        <a-form layout="vertical">
            <a-form-item
                :label="t('academics.researchName')"
                required
                :validate-status="formErrors.name ? 'error' : ''"
                :help="formErrors.name"
            >
                <a-input
                    v-model:value="formData.name"
                    :placeholder="`Enter ${t('academics.researchName')}`"
                />
            </a-form-item>

            <a-form-item
                :label="t('academics.question')"
                required
                :validate-status="formErrors.question ? 'error' : ''"
                :help="formErrors.question"
            >
                <a-textarea
                    v-model:value="formData.question"
                    :rows="4"
                    :placeholder="`Enter ${t('academics.question')}`"
                />
            </a-form-item>

            <a-row :gutter="16">
                <a-col :span="12">
                    <a-form-item
                        :label="t('common.start')"
                        required
                        :validate-status="formErrors.startDate ? 'error' : ''"
                        :help="formErrors.startDate"
                    >
                        <a-date-picker
                            v-model:value="formData.startDate"
                            style="width: 100%"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item
                        :label="t('common.end')"
                        required
                        :validate-status="formErrors.endDate ? 'error' : ''"
                        :help="formErrors.endDate"
                    >
                        <a-date-picker
                            v-model:value="formData.endDate"
                            style="width: 100%"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<style scoped>
.flexer {
    display: flex;
    align-items: center;
    gap: 16px;
}
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
.programmes__mid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
}
.programmes__copilot-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: var(--blue);
}
.programmes__switch {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}
.programmes__rating {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--light-grey);
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
