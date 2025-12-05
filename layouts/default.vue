<script setup>
import Sidebar from "@/components/layout/sidebar.vue";
import Header from "../components/layout/header.vue";

import { computed } from "vue";
const route = useRoute();
const pageTitle = computed(() => route.meta?.layoutTitle || "");
</script>

<template>
  <div class="app">
    <Sidebar />
    <main>
      <Header :title="pageTitle" />
      <slot />
    </main>
    <div class="ai">
      <p class="title">Write with AI</p>
      <img src="/images/ai.svg" alt="" class="icon" />
    </div>
  </div>
</template>

<style scoped>
main {
  margin-left: 264px;
  height: 100vh;
  overflow: hidden;
}

.ai {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ffffffe5;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 18px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  min-width: 376px;
  box-shadow: 0px 0px 47px -20px #ff6ec4;
  animation: shadowAnimation 10s ease infinite;
  border: 2px solid white;
}
.ai .title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #6a7282;
  margin: 0;
}
.ai .icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
.ai::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 384px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(
    45deg,
    #ff6ec4,
    #7873f5,
    #4ade80,
    #22d3ee,
    #facc15,
    #ff6ec4
  );
  animation: gradientAnimation 10s ease infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  padding: 4px;
  transform: translate(-50%, -50%);
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes shadowAnimation {
  0%,
  100% {
    box-shadow: 0px 0px 47px -20px #ff6ec4;
  }
  25% {
    box-shadow: 0px 0px 47px -20px #4ade80;
  }
  50% {
    box-shadow: 0px 0px 47px -20px #22d3ee;
  }
  75% {
    box-shadow: 0px 0px 47px -20px #facc15;
  }
}
</style>
