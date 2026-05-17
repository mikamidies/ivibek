<script setup>
import { message } from "ant-design-vue";

definePageMeta({
  layoutTitle: "verification.title",
  alias: ["/student/verification/:inviteGuid"],
});

const route = useRoute();
const { verifyInvite } = useAuth();

const loading = ref(true);
const verified = ref(false);
const errorMessage = ref("");

const inviteGuid = computed(() => {
  const param = route.params.inviteGuid;

  return Array.isArray(param) ? param[0] : param;
});

onMounted(async () => {
  if (!inviteGuid.value) {
    loading.value = false;
    errorMessage.value = "Verification link is invalid.";
    return;
  }

  const result = await verifyInvite(inviteGuid.value);

  loading.value = false;
  verified.value = result.success;

  if (result.success) {
    message.success("Student verified successfully.");

    window.setTimeout(() => {
      navigateTo("/", { replace: true });
    }, 1200);
  } else {
    errorMessage.value = result.error || "Verification failed.";
    message.error(errorMessage.value);
  }
});
</script>

<template>
  <div class="verification-page">
    <section class="verification-panel">
      <a-spin v-if="loading" size="large" />

      <template v-else-if="verified">
        <Icon
          name="lucide:check-circle"
          class="verification-icon verification-icon--success"
        />
        <h1>Verification complete</h1>
        <p>Your student account has been verified.</p>
      </template>

      <template v-else>
        <Icon
          name="lucide:circle-alert"
          class="verification-icon verification-icon--error"
        />
        <h1>Verification failed</h1>
        <p>{{ errorMessage }}</p>
        <NuxtLink to="/" class="verification-link">Go to dashboard</NuxtLink>
      </template>
    </section>
  </div>
</template>

<style scoped>
.verification-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--border);
}

.verification-panel {
  width: min(100%, 420px);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  text-align: center;
  background: white;
  border-radius: 16px;
}

.verification-panel h1 {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}

.verification-panel p {
  color: var(--text-grey);
}

.verification-icon {
  width: 48px;
  height: 48px;
}

.verification-icon--success {
  color: var(--green);
}

.verification-icon--error {
  color: var(--pink);
}

.verification-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 16px;
  color: white;
  background: var(--blue);
  border-radius: 8px;
  font-weight: 500;
}
</style>
