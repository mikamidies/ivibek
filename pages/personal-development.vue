<script setup>
import PageBanner from "@/components/PageBanner.vue";
import EntityFormModal from "@/components/forms/EntityFormModal.vue";
import { ref, computed } from "vue";
import { message } from "ant-design-vue";

const {
    fetchPersonalDevelopmentsGrouped,
    createPersonalDevelopment,
    updatePersonalDevelopment,
} = usePersonalDevelopment();
const { t } = useTranslations();

const {
    data: personalDevelopments,
    pending: loading,
    refresh: refreshPersonalDevelopments,
} = await useAsyncData(
    "personal-developments",
    () => fetchPersonalDevelopmentsGrouped(),
    {
        default: () => [],
    },
);

const visible = ref(false);
const editVisible = ref(false);
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

const resetDevelopmentErrors = (target) => {
    Object.keys(target.value).forEach((key) => {
        target.value[key] = "";
    });
};

const validateDevelopmentForm = (form, errors) => {
    resetDevelopmentErrors(errors);

    if (!form.value.name.trim()) {
        errors.value.name = "Title is required";
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

const readingItems = computed(() => {
    const sections = personalDevelopments.value.filter(
        (item) => item.type === "READING",
    );
    return sections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, type: section.type })),
    );
});

const writingItems = computed(() => {
    const sections = personalDevelopments.value.filter(
        (item) => item.type === "WRITING",
    );
    return sections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, type: section.type })),
    );
});

const experienceItems = computed(() => {
    const sections = personalDevelopments.value.filter(
        (item) => item.type === "EXPERIENCE",
    );
    return sections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, type: section.type })),
    );
});

const relationshipItems = computed(() => {
    const sections = personalDevelopments.value.filter(
        (item) => item.type === "RELATIONSHIP",
    );
    return sections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, type: section.type })),
    );
});

const academicSkillsItems = computed(() => {
    const sections = personalDevelopments.value.filter(
        (item) => item.type === "ACADEMIC_SKILLS",
    );
    return sections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, type: section.type })),
    );
});

const academicEnrichItems = computed(() => {
    const sections = personalDevelopments.value.filter(
        (item) => item.type === "ACADEMIC_ENRICH",
    );
    return sections.flatMap((section) =>
        (section.items || []).map((item) => ({ ...item, type: section.type })),
    );
});

const showModal = (type) => {
    createForm.value = {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        type: type,
    };
    resetDevelopmentErrors(createErrors);
    visible.value = true;
};

const handleOk = async () => {
    if (!validateDevelopmentForm(createForm, createErrors)) {
        message.error("Please fix the form errors");
        return;
    }

    try {
        const result = await createPersonalDevelopment(createForm.value);
        message.success("Item added successfully");
        visible.value = false;
        await refreshPersonalDevelopments();
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
    resetDevelopmentErrors(editErrors);
    editVisible.value = true;
};

const handleEditOk = async () => {
    if (!validateDevelopmentForm(editForm, editErrors)) {
        message.error("Please fix the form errors");
        return;
    }

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
        await refreshPersonalDevelopments();
    } catch (error) {
        message.error("Failed to update item");
    }
};
</script>

<template>
    <div class="personal-development-page">
        <div class="personal-development__left">
            <PageBanner
                :titleProps="t('personal.development')"
                backgroundProps="#4116FF"
                iconProps="/page-icons/personal.png"
            />

            <div class="development-body">
                <div class="development__header">
                    <h4 class="section__title">{{ t("personal.reading") }}</h4>
                    <a-button @click="showModal('READING')" class="add__btn">
                        <Icon name="lucide:plus" />
                        {{ t("common.add") }}
                    </a-button>
                </div>
                <a-spin :spinning="loading">
                    <div
                        v-if="readingItems.length === 0 && !loading"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" />
                        {{ t("personal.no_items") }}
                    </div>
                    <div v-else class="items__list">
                        <div
                            v-for="item in readingItems"
                            :key="item.id"
                            class="item__card"
                        >
                            <div class="item__card-left">
                                <div>
                                    <p class="item__card-name">
                                        {{ item.name }}
                                    </p>
                                    <p class="item__card-description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="item__card-right">
                                <p class="item__card-date">
                                    {{ item.startDate }} - {{ item.endDate }}
                                </p>
                                <a-button
                                    @click="showEditModal(item)"
                                    class="item__card-edit"
                                >
                                    <Icon name="lucide:pencil" class="icon" />
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>

            <div class="development-body">
                <div class="development__header">
                    <h4 class="section__title">{{ t("personal.writing") }}</h4>
                    <a-button @click="showModal('WRITING')" class="add__btn">
                        <Icon name="lucide:plus" />
                        {{ t("common.add") }}
                    </a-button>
                </div>
                <a-spin :spinning="loading">
                    <div
                        v-if="writingItems.length === 0 && !loading"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" />
                        {{ t("personal.no_items") }}
                    </div>
                    <div v-else class="items__list">
                        <div
                            v-for="item in writingItems"
                            :key="item.id"
                            class="item__card"
                        >
                            <div class="item__card-left">
                                <div>
                                    <p class="item__card-name">
                                        {{ item.name }}
                                    </p>
                                    <p class="item__card-description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="item__card-right">
                                <p class="item__card-date">
                                    {{ item.startDate }} - {{ item.endDate }}
                                </p>
                                <a-button
                                    @click="showEditModal(item)"
                                    class="item__card-edit"
                                >
                                    <Icon name="lucide:pencil" class="icon" />
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>

            <div class="development-body">
                <div class="development__header">
                    <h4 class="section__title">{{ t("personal.exp") }}</h4>
                    <a-button @click="showModal('EXPERIENCE')" class="add__btn">
                        <Icon name="lucide:plus" />
                        {{ t("common.add") }}
                    </a-button>
                </div>
                <a-spin :spinning="loading">
                    <div
                        v-if="experienceItems.length === 0 && !loading"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" />
                        {{ t("personal.no_items") }}
                    </div>
                    <div v-else class="items__list">
                        <div
                            v-for="item in experienceItems"
                            :key="item.id"
                            class="item__card"
                        >
                            <div class="item__card-left">
                                <div>
                                    <p class="item__card-name">
                                        {{ item.name }}
                                    </p>
                                    <p class="item__card-description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="item__card-right">
                                <p class="item__card-date">
                                    {{ item.startDate }} - {{ item.endDate }}
                                </p>
                                <a-button
                                    @click="showEditModal(item)"
                                    class="item__card-edit"
                                >
                                    <Icon name="lucide:pencil" class="icon" />
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>

            <div class="development-body">
                <div class="development__header">
                    <h4 class="section__title">
                        {{ t("personal.relations") }}
                    </h4>
                    <a-button
                        @click="showModal('RELATIONSHIP')"
                        class="add__btn"
                    >
                        <Icon name="lucide:plus" />
                        {{ t("common.add") }}
                    </a-button>
                </div>
                <a-spin :spinning="loading">
                    <div
                        v-if="relationshipItems.length === 0 && !loading"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" />
                        {{ t("personal.no_items") }}
                    </div>
                    <div v-else class="items__list">
                        <div
                            v-for="item in relationshipItems"
                            :key="item.id"
                            class="item__card"
                        >
                            <div class="item__card-left">
                                <div>
                                    <p class="item__card-name">
                                        {{ item.name }}
                                    </p>
                                    <p class="item__card-description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="item__card-right">
                                <p class="item__card-date">
                                    {{ item.startDate }} - {{ item.endDate }}
                                </p>
                                <a-button
                                    @click="showEditModal(item)"
                                    class="item__card-edit"
                                >
                                    <Icon name="lucide:pencil" class="icon" />
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>

            <div class="development-body">
                <div class="development__header">
                    <h4 class="section__title">{{ t("personal.skills") }}</h4>
                    <a-button
                        @click="showModal('ACADEMIC_SKILLS')"
                        class="add__btn"
                    >
                        <Icon name="lucide:plus" />
                        {{ t("common.add") }}
                    </a-button>
                </div>
                <a-spin :spinning="loading">
                    <div
                        v-if="academicSkillsItems.length === 0 && !loading"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" />
                        {{ t("personal.no_items") }}
                    </div>
                    <div v-else class="items__list">
                        <div
                            v-for="item in academicSkillsItems"
                            :key="item.id"
                            class="item__card"
                        >
                            <div class="item__card-left">
                                <div>
                                    <p class="item__card-name">
                                        {{ item.name }}
                                    </p>
                                    <p class="item__card-description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="item__card-right">
                                <p class="item__card-date">
                                    {{ item.startDate }} - {{ item.endDate }}
                                </p>
                                <a-button
                                    @click="showEditModal(item)"
                                    class="item__card-edit"
                                >
                                    <Icon name="lucide:pencil" class="icon" />
                                </a-button>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>

            <div class="development-body">
                <div class="development__header">
                    <h4 class="section__title">
                        {{ t("personal.enrichment") }}
                    </h4>
                    <a-button
                        @click="showModal('ACADEMIC_ENRICH')"
                        class="add__btn"
                    >
                        <Icon name="lucide:plus" />
                        {{ t("common.add") }}
                    </a-button>
                </div>
                <a-spin :spinning="loading">
                    <div
                        v-if="academicEnrichItems.length === 0 && !loading"
                        class="empty__state"
                    >
                        <Icon name="lucide:file-text" />
                        {{ t("personal.no_items") }}
                    </div>
                    <div v-else class="items__list">
                        <div
                            v-for="item in academicEnrichItems"
                            :key="item.id"
                            class="item__card"
                        >
                            <div class="item__card-left">
                                <div>
                                    <p class="item__card-name">
                                        {{ item.name }}
                                    </p>
                                    <p class="item__card-description">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="item__card-right">
                                <p class="item__card-date">
                                    {{ item.startDate }} - {{ item.endDate }}
                                </p>
                                <a-button
                                    @click="showEditModal(item)"
                                    class="item__card-edit"
                                >
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
        :title="t('personal.add-item')"
        okText="Add"
        cancelText="Cancel"
        modalClass="academics__form"
        :form="createForm"
        :errors="createErrors"
        :nameLabel="t('personal.title')"
        :namePlaceholder="t('personal.title')"
        :descriptionLabel="t('personal.desc')"
        :descriptionPlaceholder="t('personal.desc')"
        :startLabel="t('common.start')"
        :endLabel="t('common.end')"
        @submit="handleOk"
    />

    <EntityFormModal
        v-model:visible="editVisible"
        title="Edit Item"
        okText="Update"
        cancelText="Cancel"
        modalClass="academics__form"
        :form="editForm"
        :errors="editErrors"
        :nameLabel="t('personal.title')"
        :namePlaceholder="t('personal.title')"
        :descriptionLabel="t('personal.desc')"
        :descriptionPlaceholder="t('personal.desc')"
        :startLabel="t('common.start')"
        :endLabel="t('common.end')"
        @submit="handleEditOk"
    />
</template>

<style scoped>
.personal-development-page {
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
    grid-template-columns: 5fr 5fr;
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
