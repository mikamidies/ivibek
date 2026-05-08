<script setup>
defineProps({
  title: { type: [String], default: "" },
});

const isSidebarOpen = inject("isSidebarOpen");
const { t } = useTranslations();
</script>

<template>
  <div class="container">
    <div class="left">
      <button class="menu-btn" @click="isSidebarOpen = !isSidebarOpen">
        <Icon name="lucide:menu" class="icon" />
      </button>
      <div class="brand">
        <NuxtImg
          src="/images/brand.svg"
          alt="Brand"
          class="logo"
          width="140"
          height="48"
        />
      </div>
      <h1 class="title">{{ title ? t(title) : "" }}</h1>
    </div>
    <div class="right">
      <!-- <div class="search">
        <input type="text" placeholder="Search" />
        <Icon name="lucide:search" class="icon" />
      </div> -->
      <div class="buttons">
        <NuxtLink to="/">
          <Icon name="lucide:file-question-mark" class="icon" />
        </NuxtLink>
        <NuxtLink to="/">
          <Icon name="lucide:bell" class="icon" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: white;
  z-index: 3;
}
.title {
  font-size: 24px;
  font-weight: 600;
}
.left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.brand {
  display: none;
}
@media screen and (max-width: 1300px) {
  .brand {
    display: flex;
  }
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.search {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 14px;
  font-size: 14px;
  overflow: hidden;
}
.search input {
  padding: 7px 12px 8px 12px;
}
.search span {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: var(--light-grey);
}
.buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}
.buttons a {
  border: 1px solid var(--border);
  width: 36px;
  height: 36px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  transition: all 0.2s;
}
.buttons a:hover {
  background-color: var(--border);
  color: var(--blue);
}
.menu-btn {
  border: 1px solid var(--border);
  width: 36px;
  height: 36px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  transition: all 0.2s;
  background: none;
  cursor: pointer;
}
.menu-btn:hover {
  background-color: var(--light-grey);
}
@media (min-width: 1300px) {
  .menu-btn {
    display: none;
  }
}
</style>
