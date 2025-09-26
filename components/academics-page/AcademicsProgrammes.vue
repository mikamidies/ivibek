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
  <div class="programmes">
    <div class="programmes__head">
      <h2 class="programmes__title">Summer Programs & Univercity Courses</h2>
      <button class="add__btn">
        <Icon name="lucide:plus" style="width: 16px; height: 16px" /> Add
        programme
      </button>
    </div>
    <div class="programmes__items">
      <div class="programmes__item">
        <div class="programmes__item-head">
          <div class="programmes__item-left">
            <div class="programmes__item-img">
              <NuxtImg src="path/to/image.jpg" alt="Stanford University" />
            </div>
            <h3 class="programmes__item-title">Stanford University</h3>
            <p class="programmes__item-description">
              Stanford University offers a variety of summer programs for high
              school students.
            </p>
          </div>
          <div class="programmes__item-right">
            <div class="programmes__item-date">
              <span>June 15, 2023 - August 15, 2023</span>
            </div>
            <div class="programmes__item-order">
              <a-select
                v-model:value="value__one"
                :options="school__options"
                placeholder="Order by"
              ></a-select>
            </div>
            <button class="programmes__item-edit">
              <Icon name="lucide:ellipsis-vertical" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
