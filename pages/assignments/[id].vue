<script setup>
import dayjs from "dayjs";
import { message } from "ant-design-vue";

const route = useRoute();
const { fetchAssignmentById, submitAssignmentSolution } = useAssignments();
const { t } = useTranslations();

const {
    data: assignment,
    pending: loading,
    refresh: refreshAssignment,
} = await useAsyncData(
    `assignment-${route.params.id}`,
    () => fetchAssignmentById(route.params.id),
    {
        default: () => null,
        watch: [() => route.params.id],
    },
);

const submitting = ref(false);
const submissionUrl = ref("");
const submissionError = ref("");

const formatDate = (date) => {
    return date ? dayjs(date).format("MMM DD, YYYY") : "-";
};

const getStatusLabel = (status) => {
    const labels = {
        ASSIGNED: "Assigned",
        COMPLETED: "Completed",
    };
    return labels[status] || status;
};

const handleSubmit = async () => {
    submissionError.value = "";

    if (!submissionUrl.value.trim()) {
        submissionError.value = "Submission URL is required";
    } else {
        try {
            new URL(submissionUrl.value.trim());
        } catch {
            submissionError.value = "Enter a valid URL";
        }
    }

    if (submissionError.value) {
        message.error(submissionError.value);
        return;
    }

    submitting.value = true;
    try {
        await submitAssignmentSolution(route.params.id, submissionUrl.value);
        message.success("Solution submitted successfully!");
        submissionUrl.value = "";
        await refreshAssignment();
    } catch (error) {
        console.error("Failed to submit solution:", error);
        message.error("Failed to submit solution");
    } finally {
        submitting.value = false;
    }
};
</script>

<template>
    <div class="assignment-detail-page">
        <PageBanner
            :titleProps="t('assignments.assignments')"
            backgroundProps="#00A155"
            iconProps="/page-icons/tasks.png"
        />

        <a-spin :spinning="loading">
            <div class="assignment__grid">
                <div v-if="assignment" class="assignment__body">
                    <div class="assignment__head">
                        <div class="assignment__back">
                            <NuxtLink :to="`/assignments`">
                                <Icon name="lucide:arrow-left" />
                                {{ t("common.back") }}
                            </NuxtLink>
                        </div>
                        <div class="assignment__from">
                            <Icon name="lucide:calendar" />
                            {{ formatDate(assignment?.startDate) }}
                        </div>
                        <div class="assignment__to">
                            <Icon name="lucide:calendar" />
                            {{ formatDate(assignment?.endDate) }}
                        </div>
                    </div>
                    <div class="assignment__content">
                        <h2 class="assignment__title">
                            {{ assignment?.title || "-" }}
                        </h2>
                        <div class="assignment__description">
                            <p>{{ assignment?.description || "-" }}</p>
                        </div>
                    </div>
                </div>
                <div class="assignment__teacher">
                    <h4 class="assignment__teacher-title">
                        {{ t("assignments.teachers") }}
                    </h4>
                    <div class="assignment__teacher-person">
                        <div class="assignment__teacher-img">
                            <img
                                :src="
                                    assignment?.mentor?.image ||
                                    '/images/default-person.jpg'
                                "
                                alt="Teacher Avatar"
                            />
                        </div>
                        <div class="assignment__teacher-info">
                            <p class="assignment__teacher-name">
                                {{ assignment?.mentor?.fullName || "No data" }}
                            </p>
                            <p class="assignment__teacher-university">
                                {{
                                    assignment?.mentor?.university.name ||
                                    "No data"
                                }}
                            </p>
                            <p class="assignment__teacher-university">
                                {{
                                    assignment?.mentor?.faculty.name ||
                                    "No data"
                                }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="assignment__teacher-response"
                        v-if="!assignment?.submission?.submissionUrl"
                    >
                        <form @submit.prevent="handleSubmit">
                            <a-form-item
                                :validate-status="
                                    submissionError ? 'error' : ''
                                "
                                :help="submissionError"
                            >
                                <a-input
                                    v-model:value="submissionUrl"
                                    type="text"
                                    :placeholder="t('assignments.enter')"
                                    class="assignment__teacher-input"
                                    :disabled="submitting"
                                />
                            </a-form-item>
                            <a-button
                                type="primary"
                                html-type="submit"
                                class="assignment__teacher-submit"
                                :loading="submitting"
                            >
                                {{ t("assignments.submit") }}
                            </a-button>
                        </form>
                    </div>
                    <div class="assignment__response" v-else>
                        <h4>{{ t("assignments.response") }}</h4>
                        <a
                            target="_blank"
                            :href="`${assignment?.submission?.submissionUrl}`"
                        >
                            {{ assignment?.submission?.submissionUrl }}
                        </a>
                    </div>
                    <div class="assignment__grade" v-if="assignment?.grade">
                        <h4>{{ t("assignments.grade") }}</h4>
                        <p
                            class="status"
                            :class="`status--${assignment?.status?.toLowerCase()}`"
                        >
                            {{
                                assignment?.grade?.grade
                                    ? assignment.grade.grade + " / 100"
                                    : t("assignments.no-grade")
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </a-spin>
    </div>
</template>

<style scoped>
.assignment-detail-page {
    padding: 24px 24px 120px 24px;
    background: var(--border);
    min-height: 100vh;
    overflow: auto;
}
.assignment__body {
    padding: 24px;
    background: white;
    border-radius: 16px;
    height: fit-content;
}
.assignment__head {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 16px;
    gap: 32px;
    border-bottom: 1px solid var(--border);
}
.assignment__from,
.assignment__to {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: var(--essay-txt);
}
.assignment__from span {
    color: var(--green);
    font-size: 18px;
}
.assignment__to span {
    color: var(--blue);
    font-size: 18px;
}
.assignment__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    margin-bottom: 16px;
}
.assignment__description {
    font-size: 16px;
    line-height: 24px;
    color: var(--essay-txt);
}
.assignment__grid {
    display: grid;
    grid-template-columns: 1fr 384px;
    gap: 24px;
    margin-top: 24px;
}
@media screen and (max-width: 1300px) {
    .assignment__grid {
        grid-template-columns: 1fr 300px;
    }
}
.assignment__teacher {
    background: white;
    border-radius: 16px;
    padding: 24px;
    height: fit-content;
}
.assignment__teacher-title {
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 16px;
}
.assignment__teacher-person {
    display: grid;
    grid-template-columns: 70px 1fr;
    align-items: center;
    gap: 16px;
}
.assignment__teacher-img img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
}
.assignment__teacher-name {
    font-size: 18px;
    line-height: 26px;
    font-weight: 600;
}
.assignment__teacher-university {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-grey);
}
.assignment__teacher-response form {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 70px;
    gap: 8px;
}
.assignment__grade h4,
.assignment__response h4 {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 8px;
}
.assignment__response {
    margin: 16px 0 0 0;
    padding: 16px 0 0 0;
    border-top: 1px solid var(--border);
}
.assignment__response a {
    color: var(--blue);
    font-weight: 500;
    text-decoration: underline;
}
.assignment__grade {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
}
.assignment__back a {
    border: 1px solid var(--border);
    padding: 8px 16px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: var(--essay-txt);
}
</style>
