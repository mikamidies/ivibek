<script setu>
import AiBanner from "~/components/AiBanner.vue";
</script>

<template>
  <div class="index">
    <div class="grid">
      <div class="left">
        <AiBanner />
        <div class="sections">
          <div class="sessions"></div>
          <div class="tasks"></div>
        </div>
      </div>
      <div class="profile"></div>
    </div>
  </div>
</template>

<style scoped>
.index {
  padding: 24px;
  background: var(--border);
  height: 100%;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 384px;
  gap: 24px;
}
</style>
