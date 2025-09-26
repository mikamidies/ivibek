<script setup>
import PageBanner from "@/components/PageBanner.vue";
</script>

<template>
  <div class="booking-page">
    <PageBanner titleProps="Booking" />
  </div>
</template>

<style scoped>
.booking-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
</style>
