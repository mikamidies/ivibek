<script setup>
import PageBanner from "@/components/PageBanner.vue";
import GeneralCard from "@/components/cards/GeneralCard.vue";
</script>

<template>
  <div class="careers-page">
    <div class="careers__left">
      <PageBanner titleProps="Majors & Careers" />

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">School Research & Preparation</h4>
          <a-button class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <div class="books__items">
          <div class="books__item">
            <div class="books__item-left">
              <div>
                <p class="books__item-name">Public Writing - Voyager</p>
                <p class="books__item-genre">
                  Become an editor to an in-school or out-of-school publication.
                </p>
              </div>
            </div>
            <div class="books__item-right">
              <p class="books__item-date">Published: 2023</p>

              <a-button class="books__item-edit">
                <Icon name="lucide:ellipsis-vertical" class="icon" />
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">Major, Career and Interest Exploration</h4>
          <a-button class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <div class="books__items">
          <div class="books__item">
            <div class="books__item-left">
              <div>
                <p class="books__item-name">Research Publication</p>
                <p class="books__item-genre">
                  Collaborate with professors or researchers on a project that
                  can lead to a research publication in a reputable journal.
                </p>
              </div>
            </div>
            <div class="books__item-right">
              <p class="books__item-date">Published: 2023</p>

              <a-button class="books__item-edit">
                <Icon name="lucide:ellipsis-vertical" class="icon" />
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <div class="majors-body">
        <div class="majors__header">
          <h4 class="section__title">Networking</h4>
          <a-button class="add__btn">
            <Icon name="lucide:plus" />
            Add
          </a-button>
        </div>
        <div class="books__items">
          <div class="books__item">
            <div class="books__item-left">
              <div>
                <p class="books__item-name">
                  Engage with professors in the programming club
                </p>
                <p class="books__item-genre">
                  Take the initiative to build relationships with professors in
                  the programming club by seeking their guidance on advanced
                  coding projects and discussing potential research
                  opportunities in the field.
                </p>
              </div>
            </div>
            <div class="books__item-right">
              <p class="books__item-date">Published: 2023</p>

              <a-button class="books__item-edit">
                <Icon name="lucide:ellipsis-vertical" class="icon" />
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GeneralCard />
  </div>
</template>

<style scoped>
.careers-page {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 384px;
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}

.majors-body {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
}
.majors__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.books__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.books__item {
  display: grid;
  grid-template-columns: 6fr 4fr;
  align-items: center;
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 12px;
}
.books__item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.books__item-img {
  width: 68px;
  height: 68px;
  border-radius: 8px;
  border: 1px solid var(--border);
  overflow: hidden;
}
.books__item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.books__item-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
}
.books__item-genre {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.books__item-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}
.books__item-date {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  background: var(--border);
  color: var(--light-grey);
  padding: 4px 8px;
  border-radius: 8px;
}
.books__item-edit {
  border: 0;
}
</style>
