<script setup>
import sidebar from "~/components/sidebar.vue";
</script>

<template>
  <div class="app">
    <sidebar />
    <main>
      <slot />
    </main>
  </div>
</template>
