<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
</script>

<template>
  <div class="personal-development-page">
    <div class="personal-development__left">
      <PageBanner titleProps="Personal Development" />
    </div>
    <GeneralCard />
  </div>
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
</style>
