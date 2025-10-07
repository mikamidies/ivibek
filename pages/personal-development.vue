<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
import DevelopmentBooks from "@/components/development-page/DevelopmentBooks.vue";
import DevelopmentWritings from "@/components/development-page/DevelopmentWritings.vue";
import DevelopmentSkills from "@/components/development-page/DevelopmentSkills.vue";
import DevelopmentRelations from "@/components/development-page/DevelopmentRelations.vue";
import DevelopmentEnrichment from "@/components/development-page/DevelopmentEnrichment.vue";
import DevelopmentEssentials from "@/components/development-page/DevelopmentEssentials.vue";
import DevelopmentCirruculum from "@/components/development-page/DevelopmentCirruculum.vue";
</script>

<template>
  <div class="personal-development-page">
    <div class="personal-development__left">
      <PageBanner
        titleProps="Personal Development"
        backgroundProps="#4116FF"
        iconProps="/page-icons/personal.png"
      />
      <DevelopmentBooks />
      <DevelopmentWritings />
      <DevelopmentSkills />
      <DevelopmentRelations />
      <DevelopmentCirruculum />
      <DevelopmentEssentials />
      <DevelopmentEnrichment />
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
