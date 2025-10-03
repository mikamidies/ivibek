<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
</script>

<template>
  <div class="testing-page">
    <div class="testing__left">
      <PageBanner titleProps="Testing" />
      <div class="testing__body">
        <div class="testing__header">
          <h4 class="section__title">Testing overview</h4>
          <a-button class="add__btn">
            <Icon name="lucide:plus" class="add__btn-icon" />
            Add
          </a-button>
        </div>
        <div class="testing__items">
          <div class="testing__item">
            <div class="testing__item-header">
              <h4>Practice</h4>
              <p>2025</p>
            </div>
            <div class="testing__item-mid">
              <p>Your total score</p>
              <h4>460</h4>
              <span>400 - 1600</span>
            </div>
            <div class="testing__item-modules">
              <div class="testing__header-module">
                <div>
                  <p>Reading and Writing</p>
                  <span>200 - 800</span>
                </div>
                <h4>670</h4>
              </div>
              <div class="testing__header-module">
                <div>
                  <p>Reading and Writing</p>
                  <span>200 - 800</span>
                </div>
                <h4>670</h4>
              </div>
            </div>
            <div class="testing__item-buttons">
              <a-button> Score Details </a-button>
              <NuxtLink to="/" class="testing__item-buttons-link"
                >Practice Specific Questions</NuxtLink
              >
            </div>
          </div>
          <div class="testing__item">
            <div class="testing__item-header">
              <h4>Practice</h4>
              <p>2025</p>
            </div>
            <div class="testing__item-mid">
              <p>Your total score</p>
              <h4>460</h4>
              <span>400 - 1600</span>
            </div>
            <div class="testing__item-modules">
              <div class="testing__header-module">
                <div>
                  <p>Reading and Writing</p>
                  <span>200 - 800</span>
                </div>
                <h4>670</h4>
              </div>
              <div class="testing__header-module">
                <div>
                  <p>Reading and Writing</p>
                  <span>200 - 800</span>
                </div>
                <h4>670</h4>
              </div>
            </div>
            <div class="testing__item-buttons">
              <a-button> Score Details </a-button>
              <NuxtLink to="/" class="testing__item-buttons-link"
                >Practice Specific Questions</NuxtLink
              >
            </div>
          </div>
          <div class="testing__item">
            <div class="testing__item-header">
              <h4>Practice</h4>
              <p>2025</p>
            </div>
            <div class="testing__item-mid">
              <p>Your total score</p>
              <h4>460</h4>
              <span>400 - 1600</span>
            </div>
            <div class="testing__item-modules">
              <div class="testing__header-module">
                <div>
                  <p>Reading and Writing</p>
                  <span>200 - 800</span>
                </div>
                <h4>670</h4>
              </div>
              <div class="testing__header-module">
                <div>
                  <p>Reading and Writing</p>
                  <span>200 - 800</span>
                </div>
                <h4>670</h4>
              </div>
            </div>
            <div class="testing__item-buttons">
              <a-button> Score Details </a-button>
              <NuxtLink to="/" class="testing__item-buttons-link"
                >Practice Specific Questions</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <GeneralCard />
  </div>
</template>

<style scoped>
.testing-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.testing__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.testing__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.section__title {
  margin-bottom: 0;
}
.testing__items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.testing__item {
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}
.testing__item-header {
  padding: 24px;
  background: var(--blue);
  border-bottom: 1px solid var(--border);
}
.testing__item-header h4 {
  color: #ffffff;
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
}
.testing__item-header p {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
}
.testing__item-mid {
  margin: 16px;
  background: var(--border);
  padding: 24px 44px;
  border-radius: 8px;
}
.testing__item-mid p {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.7%;
  text-align: center;
  margin-bottom: 4px;
}
.testing__item-mid h4 {
  font-weight: 600;
  font-size: 60px;
  line-height: 68px;
  letter-spacing: -1.8%;
  text-align: center;
  color: #183cb1;
  margin-bottom: 4px;
}
.testing__item-mid span {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.6%;
  text-align: center;
  text-decoration: underline;
  display: block;
  color: var(--light-grey);
}
.testing__item-modules {
  padding: 0 16px;
  margin-bottom: 24px;
}
.testing__header-module {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding: 16px 0;
}
.testing__header-module:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.testing__header-module p {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 4px;
}
.testing__header-module span {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.testing__header-module h4 {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
}
.testing__item-buttons {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px 24px 16px;
}
.testing__item-buttons button {
  width: 100%;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  border: 2px solid var(--blue);
  color: var(--blue);
  padding: 16px 0;
}
.testing__item-buttons a {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.6%;
  text-align: center;
  text-decoration: underline;
  border: 0;
  padding: 0;
  color: var(--light-grey);
}
</style>
