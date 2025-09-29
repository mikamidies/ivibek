<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "~/components/cards/GeneralCard.vue";
import AiBanner from "~/components/AiBanner.vue";
import AcademicsInformation from "~/components/academics-page/AcademicsInformation.vue";
import AcademicsSchool from "~/components/academics-page/AcademicsSchool.vue";
import AcademicsProgrammes from "~/components/academics-page/AcademicsProgrammes.vue";
import AcademicsResearch from "~/components/academics-page/AcademicsReseach.vue";
import AcademicsPortfolio from "~/components/academics-page/AcademicsPortfolio.vue";

const school__options = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "yiminghe",
    label: "Yiminghe",
  },
];

const school__items = [
  {
    school: "Harvard University",
    country: "USA",
    start_year: "2015",
    end_year: "2019",
    status: "Graduated",
  },
  {
    school: "Stanford University",
    country: "USA",
    start_year: "2016",
    end_year: "2020",
    status: "Graduated",
  },
  {
    school: "MIT",
    country: "USA",
    start_year: "2017",
    end_year: "2021",
    status: "Graduated",
  },
  {
    school: "University of California, Berkeley",
    country: "USA",
    start_year: "2018",
    end_year: "2022",
    status: "Graduated",
  },
  {
    school: "Princeton University",
    country: "USA",
    start_year: "2019",
    end_year: "2023",
    status: "Graduated",
  },
];
</script>

<template>
  <div class="academics-page">
    <div class="left">
      <PageBanner titleProps="Academics" class="marginer" />
      <AiBanner class="marginer" />

      <AcademicsInformation
        :school__options="school__options"
        :school__items="school__items"
        class="marginer"
      />

      <AcademicsSchool :school__items="school__items" class="marginer" />

      <AcademicsProgrammes
        :school__options="school__options"
        :school__items="school__items"
        class="marginer"
      />

      <AcademicsResearch :school__items="school__items" class="marginer" />
      <AcademicsPortfolio :school__items="school__items" />
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
</style>
