<script setup>
import PageBanner from "@/components/PageBanner.vue";
</script>

<template>
  <div class="courses-page">
    <PageBanner titleProps="Universities" />
  </div>
</template>

<style scoped>
.courses-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
</style>
