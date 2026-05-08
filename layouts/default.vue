<script setup>
import Sidebar from "@/components/layout/sidebar.vue";
import Header from "../components/layout/header.vue";
import AiChat from "@/components/AiChat.vue";

import { computed, ref, provide, onMounted, onBeforeUnmount, watch } from "vue";
const route = useRoute();
const pageTitle = computed(() => route.meta?.layoutTitle || "");

const isSidebarOpen = ref(false);
provide("isSidebarOpen", isSidebarOpen);

const handleResize = () => {
  if (!import.meta.client) {
    return;
  }

  isSidebarOpen.value = window.innerWidth >= 1300;
};

watch(route, () => {
  if (process.client && window.innerWidth < 1300) {
    isSidebarOpen.value = false;
  }
});

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return;
  }

  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="app">
    <Sidebar />
    <main>
      <Header :title="pageTitle" />
      <slot />
    </main>
    <!-- <AiChat /> -->
  </div>
</template>

<style scoped>
main {
  height: 100vh;
  overflow: hidden;
  transition: margin-left 0.3s ease;
  margin-left: 254px;
}
@media screen and (max-width: 1300px) {
  main {
    margin-left: 0;
    overflow: auto;
  }
}
</style>
