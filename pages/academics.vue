<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "~/components/cards/GeneralCard.vue";
import AiBanner from "~/components/AiBanner.vue";

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

      <div class="information">
        <div class="information__head">
          <h2 class="information__title">Education Information</h2>
          <button class="add__btn">
            <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add
            school
          </button>
        </div>
        <div class="information__filter">
          <a-select
            v-model:value="value__one"
            :options="school__options"
            placeholder="Select an option"
          ></a-select>
          <a-select
            v-model:value="value__one"
            :options="school__options"
            placeholder="Select an option"
          ></a-select>
          <a-select
            v-model:value="value__one"
            :options="school__options"
            placeholder="Select an option"
          ></a-select>
        </div>
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Country</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Special status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in school__items" :key="index">
              <td>{{ item.school }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.start_year }}</td>
              <td>{{ item.end_year }}</td>
              <td>
                <span class="status">{{ item.status }}</span>
              </td>
              <td>
                <button>
                  <Icon name="lucide:ellipsis-vertical" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="academics">
        <div class="academics__head">
          <h2 class="academics__title">School academics</h2>
          <button class="add__btn">
            <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add
            course
          </button>
        </div>
      </div>
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
  padding: 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.right {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  height: fit-content;
}
.marginer {
  margin-bottom: 16px;
}
.information {
  background: white;
  border-radius: 16px;
  padding: 20px;
}
.information__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.information__title {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
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
.information__filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border: 1px solid var(--border);
}
th {
  padding: 16px 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background: var(--border);
  border-bottom: 1px solid var(--border);
}
td {
  padding: 16px 20px;
  border-block: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-grey);
}
tr td:last-child {
  text-align: right;
}
.status {
  background: var(--light-blue);
  color: var(--blue);
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}
</style>
