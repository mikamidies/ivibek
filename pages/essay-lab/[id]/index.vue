<script setup>
import PageBanner from "@/components/PageBanner.vue";
import { useRoute, useRouter } from "#imports";
import { message } from "ant-design-vue";

const route = useRoute();
const router = useRouter();
const { fetchEssayById } = useEssay();

const loading = ref(true);
const essay = ref({
  id: null,
  title: "",
  body: "",
  mentor: null,
  status: "",
  createdAt: null,
  deadline: null,
  wordLimit: null,
  feedback: null,
});

const load = async () => {
  const id = Number(route.params.id);
  if (!id) {
    message.error("Invalid essay id");
    router.push("/essay-lab");
    return;
  }

  loading.value = true;
  const res = await fetchEssayById(id);
  loading.value = false;

  if (res.success) {
    const data = res.data;

    essay.value = {
      id: data.id,
      title: data.content?.title || "",
      body: data.content?.body || "",
      mentor: data.mentor,
      status: data.status,
      createdAt: data.createdAt,
      deadline: data.content?.deadline,
      wordLimit: data.content?.wordLimit,
      feedback: data.feedback,
    };
  } else {
    message.error(res.error || "Не удалось загрузить эссе");
    router.push("/essay-lab");
  }
};

onMounted(() => {
  load();
});

const formatDate = (d) => {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusLabel = (s) => {
  const map = {
    UNPAID: "Unpaid",
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    PAID: "Paid",
    COMPLETED: "Completed",
  };
  return map[s] || s || "-";
};

const openMentorOptions = () => {
  message.info("Mentor options not implemented");
};
</script>

<template>
  <div class="essay__edit-page">
    <PageBanner
      titleProps="Essay Details"
      backgroundProps="#00A155"
      iconProps="/page-icons/tasks.png"
    />
    <div class="essay__grid">
      <div class="essay__left">
        <div class="essay__top">
          <NuxtLink to="/essay-lab" class="essay__back">
            <Icon name="lucide:arrow-left" class="icon" />
            Back
          </NuxtLink>

          <NuxtLink
            :to="`/essay-lab/${essay.id}/edit`"
            class="btn btn--primary essay__edit-btn"
            v-if="
              !loading &&
              essay.status !== 'PAID' &&
              essay.status !== 'COMPLETED'
            "
          >
            <Icon name="lucide:edit-2" class="icon" />
            Edit Essay
          </NuxtLink>
        </div>

        <div v-if="loading" class="essay__loading">
          <a-spin size="large" />
        </div>

        <div v-else>
          <div class="essay__header">
            <h4 class="essay__title">{{ essay.title || "Untitled Essay" }}</h4>
            <!-- <div class="essay__meta">
              <span>Created: {{ formatDate(essay.createdAt) }}</span>
              <span class="separator">•</span>
              <span
                >Status:
                <strong :class="`status--${essay.status?.toLowerCase()}`">{{
                  getStatusLabel(essay.status)
                }}</strong></span
              >
            </div>
            <div
              class="essay__details"
              v-if="essay.deadline || essay.wordLimit"
            >
              <span v-if="essay.deadline">
                <Icon name="lucide:clock" class="icon" />
                {{ essay.deadline.name }} ({{ essay.deadline.hours }}h)
              </span>
              <span v-if="essay.wordLimit">
                <Icon name="lucide:file-text" class="icon" />
                {{ essay.wordLimit.name }} ({{ essay.wordLimit.minWords }}-{{
                  essay.wordLimit.maxWords
                }}
                words)
              </span>
            </div> -->
          </div>

          <div class="essay__body">
            <div class="essay__text">
              <p v-if="essay.body" style="white-space: pre-wrap">
                {{ essay.body }}
              </p>
              <p v-else class="text-muted">No content provided.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="essay__right" v-if="!loading">
        <div class="section">
          <div class="right__head">
            <h4 class="section__title">Mentor</h4>
            <button class="edit" @click="openMentorOptions">
              <Icon name="lucide:ellipsis-vertical" class="icon" />
            </button>
          </div>
          <div class="essay__info">
            <div class="essay__img">
              <NuxtImg
                :src="essay.mentor?.image || '/images/person.jpg'"
                alt="Mentor"
                width="48"
                height="48"
              />
            </div>
            <div>
              <p class="essay__name">{{ essay.mentor?.fullName || "-" }}</p>
              <p class="essay__status">
                {{ essay.mentor?.university?.name || "-" }}
              </p>
              <p class="essay__faculty" v-if="essay.mentor?.faculty">
                {{ essay.mentor.faculty.name }}
              </p>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="right__head">
            <h4 class="section__title">Feedback</h4>
          </div>
          <div class="feedback__items">
            <div v-if="!essay.feedback" class="text-muted">
              No feedback yet. Waiting for mentor review.
            </div>
            <div v-else class="feedback__item">
              <p class="feedback__date">
                {{ formatDate(essay.feedback.createdAt) }}
              </p>
              <div class="feedback__comment">
                {{ essay.feedback.feedbackUrl }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.essay__edit-page {
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
  margin-top: 16px;
}
.essay__title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin: 8px 0 16px 0;
}
.essay__text {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: var(--essay-txt);
}
.essay__right {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  height: fit-content;
}
.right__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.right__count {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
}
.essay__info {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 24px;
}
.essay__img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}
.essay__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.essay__name {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 4px;
}
.essay__status {
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.essay__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 8px;
}
.feedback__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.feedback__item p {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-grey);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.feedback__comment {
  font-size: 14px;
  line-height: 20px;
  color: var(--blue);
  word-break: break-all;
}
.essay__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.essay__edit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--blue);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
}
</style>
