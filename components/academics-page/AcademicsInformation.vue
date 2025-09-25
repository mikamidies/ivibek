<script setup>
defineProps({
  school__options: {
    type: Array,
    required: true,
  },
  school__items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="information">
    <div class="information__head">
      <h2 class="information__title">Education Information</h2>
      <button class="add__btn">
        <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add school
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
</template>

<style scoped>
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
  font-weight: 600;
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
</style>
