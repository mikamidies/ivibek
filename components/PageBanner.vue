<script setup>
defineProps({
  titleProps: {
    type: String,
    default: "Dashboard",
  },
});
</script>

<template>
  <div class="page-banner">
    <h1 class="title">
      {{ titleProps }}
    </h1>

    <div class="bacteria">
      <NuxtImg
        src="/images/bacteria.png"
        alt="Bacteria"
        width="100%"
        height="100%"
      />
    </div>

    <div class="icon">
      <Icon name="tabler:file-check-filled" />
    </div>
  </div>
</template>

<style scoped>
.page-banner {
  padding: 36px 40px;
  border-radius: 16px;
  background: var(--blue);
  height: max-content;
  position: relative;
  overflow: hidden;
}
.title {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
}
.bacteria {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 1;
}
.bacteria img {
  object-fit: cover;
  object-position: right;
  opacity: 0.4;
  width: 100%;
}
.icon {
  width: 192px;
  height: 192px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) rotate(25deg);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: 114px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
}
.icon span {
  width: 96px;
  height: 96px;
  color: white;
}
.icon::after {
  width: 192px;
  height: 192px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left: none;
  border-top: none;
  transform: translate(-46%, -46%) rotate(0deg);
  border-radius: 24px;
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  z-index: -1;
}
.icon::before {
  width: 192px;
  height: 192px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left: none;
  border-top: none;
  transform: translate(-42%, -42%) rotate(0deg);
  border-radius: 24px;
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  z-index: -1;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  filter: blur(40px);
}
</style>
