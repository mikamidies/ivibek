<script setup>
import Sidebar from "@/components/layout/sidebar.vue";
import Header from "../components/layout/header.vue";
</script>

<template>
  <div class="app">
    <Sidebar />
    <main>
      <Header />
      <slot />
    </main>
  </div>
</template>

<style scoped>
main {
  margin-left: 264px;
  height: 100vh;
  overflow: auto;
}
</style>
