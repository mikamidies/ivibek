<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  okText: {
    type: String,
    required: true,
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  form: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  nameKey: {
    type: String,
    default: "name",
  },
  nameLabel: {
    type: String,
    required: true,
  },
  namePlaceholder: {
    type: String,
    required: true,
  },
  descriptionLabel: {
    type: String,
    required: true,
  },
  descriptionPlaceholder: {
    type: String,
    required: true,
  },
  startLabel: {
    type: String,
    required: true,
  },
  endLabel: {
    type: String,
    required: true,
  },
  descriptionRows: {
    type: Number,
    default: 4,
  },
  modalClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:visible", "submit"]);

const modalVisible = computed({
  get: () => props.visible,
  set: (value) => emit("update:visible", value),
});
</script>

<template>
  <a-modal
    v-model:visible="modalVisible"
    :title="title"
    :okText="okText"
    :cancelText="cancelText"
    :class="modalClass"
    @ok="emit('submit')"
  >
    <div class="form__wrapper">
      <a-form :model="form" layout="vertical">
        <a-form-item
          class="form__full"
          :label="nameLabel"
          required
          :validate-status="errors[nameKey] ? 'error' : ''"
          :help="errors[nameKey]"
        >
          <a-input
            v-model:value="form[nameKey]"
            :placeholder="namePlaceholder"
          />
        </a-form-item>

        <a-form-item
          class="form__full"
          :label="descriptionLabel"
          required
          :validate-status="errors.description ? 'error' : ''"
          :help="errors.description"
        >
          <a-textarea
            v-model:value="form.description"
            :placeholder="descriptionPlaceholder"
            :rows="descriptionRows"
          />
        </a-form-item>

        <a-form-item
          :label="startLabel"
          required
          :validate-status="errors.startDate ? 'error' : ''"
          :help="errors.startDate"
        >
          <a-date-picker
            v-model:value="form.startDate"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>

        <a-form-item
          :label="endLabel"
          required
          :validate-status="errors.endDate ? 'error' : ''"
          :help="errors.endDate"
        >
          <a-date-picker
            v-model:value="form.endDate"
            style="width: 100%"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<style scoped>
.form__wrapper :deep(.ant-form) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.form__full {
  grid-column: 1 / 3;
}
</style>
