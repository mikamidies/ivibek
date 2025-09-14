<template>
  <div class="ai-banner">
    <div class="content">
      <p class="title">Find the right university for you through AI</p>
      <p class="link">
        Try for free
        <Icon name="lucide:arrow-right" />
      </p>
    </div>

    <NuxtImg
      src="/images/building.png"
      alt="AI Banner"
      width="100%"
      height="100%"
    />
  </div>
</template>

<style scoped>
.ai-banner {
  width: 100%;
  height: 164px;
  border-radius: 16px;
  overflow: hidden;
  background: radial-gradient(
    64.95% 445.38% at 50% 100%,
    #3b18e2 0%,
    #060022 100%
  );
  position: relative;
  display: grid;
  grid-template-columns: 4fr 6fr;
}
img {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scale(1.1);
  width: 60%;
  height: 100%;
  object-fit: contain;
}
.ai-banner::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.4;
  filter: blur(197px);
  z-index: 1;
  pointer-events: none;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  position: relative;
  z-index: 2;
  color: white;
  max-width: 362px;
  gap: 12px;
}
.title {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}
.link {
  font-size: 14px;
  line-height: 20px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 300;
}
.link span {
  width: 18px;
  height: 18px;
}
</style>
