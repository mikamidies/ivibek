<script setup>
import { message } from "ant-design-vue";

definePageMeta({
  layoutTitle: "Edit Essay",
});

const route = useRoute();
const router = useRouter();

const {
  fetchEssayById,
  editEssay,
  calculatePrice,
  fetchDeadlines,
  fetchWordLimits,
} = useEssay();
const { fetchMentors } = useMentors();

const loading = ref(true);
const saving = ref(false);
const priceLoading = ref(false);
const mentors = ref([]);
const deadlines = ref([]);
const wordLimits = ref([]);
const calculatedPrice = ref(null);

const form = ref({
  mentorId: null,
  deadlineId: null,
  essayType: null,
  wordLimitId: null,
  title: "",
  body: "",
});

const selectedMentor = computed(() => {
  return mentors.value.find((m) => m.id === form.value.mentorId);
});

const selectedEssayType = computed(() => {
  return essayTypes.find((t) => t.value === form.value.essayType);
});

const selectedDeadline = computed(() => {
  return deadlines.value.find((d) => d.id === form.value.deadlineId);
});

const selectedWordLimit = computed(() => {
  return wordLimits.value.find((w) => w.id === form.value.wordLimitId);
});

const showWordLimit = computed(() => {
  return form.value.essayType === "SUPPLEMENTAL";
});

const essayTypes = [
  { value: "PERSONAL", label: "Personal" },
  { value: "SUPPLEMENTAL", label: "Supplemental" },
];

onMounted(async () => {
  const id = Number(route.params.id);
  if (!id) {
    message.error("Invalid essay ID");
    router.push("/essay-lab");
    return;
  }

  try {
    const [mentorsResult, deadlinesResult, wordLimitsResult] =
      await Promise.all([fetchMentors(), fetchDeadlines(), fetchWordLimits()]);

    if (mentorsResult) {
      mentors.value = mentorsResult;
    }

    if (deadlinesResult.success) {
      deadlines.value = deadlinesResult.data;
    } else {
      message.error(deadlinesResult.error || "Не удалось загрузить дедлайны");
    }

    if (wordLimitsResult.success) {
      wordLimits.value = wordLimitsResult.data;
    } else {
      message.error(
        wordLimitsResult.error || "Не удалось загрузить лимиты слов"
      );
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }

  const result = await fetchEssayById(id);

  if (result.success) {
    const data = result.data;

    form.value = {
      mentorId: data.mentor?.id || null,
      deadlineId:
        data.content?.deadline?.id ||
        (deadlines.value.length > 0 ? deadlines.value[0].id : null),
      essayType: data.content?.type || null,
      wordLimitId: data.content?.wordLimit?.id || null,
      title: data.content?.title || "",
      body: data.content?.body || "",
    };

    await handleCalculatePrice();
  } else {
    message.error(result.error || "Не удалось загрузить эссе");
    router.push("/essay-lab");
  }

  loading.value = false;
});

watch(
  () => form.value.essayType,
  (newType) => {
    if (newType === "PERSONAL") {
      form.value.wordLimitId = null;
    } else if (
      newType === "SUPPLEMENTAL" &&
      wordLimits.value.length > 0 &&
      !form.value.wordLimitId
    ) {
      form.value.wordLimitId = wordLimits.value[0].id;
    }
  }
);

const handleCalculatePrice = async () => {
  if (form.value.essayType === "SUPPLEMENTAL" && !form.value.wordLimitId) {
    return;
  }

  if (!form.value.deadlineId) {
    return;
  }

  priceLoading.value = true;

  const result = await calculatePrice({
    deadlineId: form.value.deadlineId,
    wordLimitId: form.value.wordLimitId,
  });

  priceLoading.value = false;

  if (result.success) {
    calculatedPrice.value = result.price;
  } else {
    message.error(result.error || "Не удалось рассчитать цену");
    calculatedPrice.value = null;
  }
};

watch(
  () => [form.value.deadlineId, form.value.wordLimitId],
  async () => {
    await handleCalculatePrice();
  }
);

const handleSave = async () => {
  if (!form.value.mentorId) {
    message.error("Выберите ментора");
    return;
  }

  if (!form.value.essayType) {
    message.error("Выберите тип эссе");
    return;
  }

  if (!form.value.title) {
    message.error("Введите название эссе");
    return;
  }

  if (!form.value.body) {
    message.error("Введите текст эссе");
    return;
  }

  if (!calculatedPrice.value) {
    message.error("Не удалось рассчитать цену. Попробуйте ещё раз");
    return;
  }

  saving.value = true;

  const id = Number(route.params.id);
  const result = await editEssay(id, {
    mentorId: form.value.mentorId,
    deadlineId: form.value.deadlineId,
    essayType: form.value.essayType,
    wordLimitId: form.value.wordLimitId,
    title: form.value.title,
    body: form.value.body,
    price: calculatedPrice.value,
  });

  saving.value = false;

  if (result.success) {
    message.success("Эссе успешно обновлено!");
    router.push(`/essay-lab/${id}`);
  } else {
    message.error(result.error || "Ошибка обновления эссе");
  }
};
</script>

<template>
  <div class="essay__create-page">
    <div class="essay__grid">
      <div class="essay__left">
        <NuxtLink :to="`/essay-lab/${route.params.id}`" class="essay__back">
          <Icon name="lucide:arrow-left" class="icon" />
          Back
        </NuxtLink>
        <h4 class="essay__title">Edit Essay</h4>

        <div v-if="loading" class="essay__loading">
          <a-spin size="large" />
        </div>

        <div v-else class="essay__form">
          <div class="essay__selects">
            <div class="essay__select-item">
              <label for="teacher">Mentor *</label>
              <a-select
                id="teacher"
                v-model:value="form.mentorId"
                placeholder="Select Mentor"
                show-search
                :filter-option="
                  (input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                "
              >
                <a-select-option
                  v-for="mentor in mentors"
                  :key="mentor.id"
                  :value="mentor.id"
                  :label="mentor.fullName"
                >
                  {{ mentor.fullName }}
                </a-select-option>
              </a-select>
            </div>
            <div class="essay__select-item">
              <label for="time-limit">Time Limit</label>
              <a-select
                id="time-limit"
                v-model:value="form.deadlineId"
                placeholder="Select Time Limit"
              >
                <a-select-option
                  v-for="deadline in deadlines"
                  :key="deadline.id"
                  :value="deadline.id"
                >
                  {{ deadline.name }}
                </a-select-option>
              </a-select>
            </div>
            <div class="essay__select-item">
              <label for="type">Type *</label>
              <a-select
                id="type"
                v-model:value="form.essayType"
                placeholder="Select Type"
                :options="essayTypes"
              />
            </div>
            <div v-if="showWordLimit" class="essay__select-item">
              <label for="word-limit">Word Limit *</label>
              <a-select
                id="word-limit"
                v-model:value="form.wordLimitId"
                placeholder="Select Word Limit"
              >
                <a-select-option
                  v-for="wordLimit in wordLimits"
                  :key="wordLimit.id"
                  :value="wordLimit.id"
                >
                  {{ wordLimit.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>
          <div class="essay__inputs">
            <div class="essay__input-item">
              <label for="title">Title *</label>
              <a-input
                id="title"
                v-model:value="form.title"
                placeholder="Enter Essay Title"
                class="input-full"
              />
            </div>
            <div class="essay__input-item">
              <label for="essay">Essay *</label>
              <a-textarea
                id="essay"
                v-model:value="form.body"
                placeholder="Enter your essay"
                class="input-full"
                :autosize="{ minRows: 30, maxRows: 30 }"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="essay__right" v-if="!loading">
        <h4 class="section__title">Details</h4>
        <div class="details__items">
          <p class="detail__item">
            <Icon name="lucide:check-circle" class="icon icon--success" />
            Update your essay content and mentor selection
          </p>
          <p class="detail__item">
            <Icon name="lucide:check-circle" class="icon icon--success" />
            Changes will be saved after payment confirmation
          </p>
          <p class="detail__item">
            <Icon name="lucide:alert-circle" class="icon icon--warning" />
            Make sure all required fields are filled
          </p>
        </div>
        <div class="details__pricelist">
          <div class="pricelist__items">
            <div class="pricelist__item">
              <p>Mentor</p>
              <p>{{ selectedMentor?.fullName || "-" }}</p>
            </div>
            <div class="pricelist__item">
              <p>Essay Type</p>
              <p>{{ selectedEssayType?.label || "-" }}</p>
            </div>
            <div class="pricelist__item">
              <p>Deadline</p>
              <p>{{ selectedDeadline?.name || "-" }}</p>
            </div>
            <div v-if="showWordLimit" class="pricelist__item">
              <p>Word Limit</p>
              <p>{{ selectedWordLimit?.name || "-" }}</p>
            </div>
            <div class="pricelist__total">
              <p>Total</p>
              <p v-if="priceLoading">
                <a-spin size="small" />
              </p>
              <p v-else-if="calculatedPrice !== null">
                ${{ calculatedPrice.totalPriceUsd }}
              </p>
              <p v-else>-</p>
            </div>
          </div>
        </div>

        <div class="essay__actions">
          <a-button
            type="primary"
            class="btn--full btn--large"
            :loading="saving"
            :disabled="!calculatedPrice || priceLoading"
            @click="handleSave"
          >
            Save Changes
          </a-button>
          <a-button
            class="btn--full"
            :disabled="saving"
            @click="router.push(`/essay-lab/${route.params.id}`)"
          >
            Cancel
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.essay__create-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.essay__grid {
  display: grid;
  grid-template-columns: 1fr 384px;
  gap: 24px;
}
.essay__left {
  background: white;
  padding: 24px;
  border-radius: 16px;
  height: fit-content;
}
.essay__title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin: 8px 0 16px 0;
}
.essay__loading {
  display: flex;
  justify-content: center;
  padding: 60px;
}
.essay__form {
  margin-top: 16px;
}
.essay__selects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  border-bottom: 1px solid var(--ant-border);
  padding-bottom: 24px;
}
.essay__select-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.essay__inputs {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.essay__input-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.essay__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border);
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
}
label {
  font-weight: 500;
}
.essay__right {
  background: white;
  padding: 24px;
  border-radius: 16px;
  height: fit-content;
}
.details__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}
.detail__item {
  display: grid;
  align-items: baseline;
  grid-template-columns: 20px 1fr;
  gap: 8px;
  font-size: 14px;
}
.detail__item .icon {
  font-size: 20px;
  transform: translateY(8px);
}
.icon--success {
  color: green;
}
.icon--warning {
  color: orange;
}
.details__pricelist {
  border: 1px solid var(--ant-border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}
.pricelist__items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pricelist__total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
}
.pricelist__total p:nth-child(2) {
  color: var(--blue);
  font-size: 16px;
}
.essay__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.btn--full {
  width: 100%;
}
.btn--large {
  height: 48px;
}
.pricelist__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  position: relative;
}
.pricelist__item p:first-child {
  color: var(--light-grey);
}
.pricelist__item p:last-child {
  font-size: 16px;
  font-weight: 500;
}
</style>
