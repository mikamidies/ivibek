<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "~/components/cards/GeneralCard.vue";
import AiBanner from "~/components/AiBanner.vue";
// import AcademicsInformation from "~/components/academics-page/AcademicsInformation.vue";
// import AcademicsSchool from "~/components/academics-page/AcademicsSchool.vue";
import AcademicsProgrammes from "~/components/academics-page/AcademicsProgrammes.vue";
import AcademicsResearch from "~/components/academics-page/AcademicsReseach.vue";
// import AcademicsPortfolio from "~/components/academics-page/AcademicsPortfolio.vue";
const { t } = useTranslations();
</script>

<template>
  <div class="academics-page">
    <div class="left">
      <PageBanner
        :titleProps="t('academics.academics')"
        backgroundProps="#0764F1"
        iconProps="/page-icons/academics.png"
        class="marginer"
      />
      <!-- <AiBanner class="marginer" /> -->

      <!-- <AcademicsInformation
        :school__options="school__options"
        :school__items="school__items"
        class="marginer"
      /> -->

      <!-- <AcademicsSchool :school__items="school__items" class="marginer" /> -->

      <AcademicsProgrammes
        :school__options="school__options"
        :school__items="school__items"
        class="marginer"
      />

      <AcademicsResearch :school__items="school__items" class="marginer" />
      <!-- <AcademicsPortfolio :school__items="school__items" /> -->
    </div>
    <div class="right">
      <GeneralCard />
    </div>
  </div>
</template>

<style scoped>
.academics-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
  position: relative;
}
@media screen and (max-width: 1300px) {
  .academics-page {
    grid-template-columns: 1fr 300px;
  }
}
.right {
  background: white;
  border-radius: 16px;
  height: fit-content;
  position: sticky;
  top: 0;
}
.marginer {
  margin-bottom: 16px;
}
:deep(.ant-select) {
  width: 192px;
}
:deep(.ant-select-selection-placeholder) {
  color: var(--text-grey);
}
</style>
