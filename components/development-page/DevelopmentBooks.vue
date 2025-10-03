<script setup></script>

<template>
  <div class="development-books">
    <div class="books__header">
      <h4 class="section__title">Development Books</h4>
      <a-button class="add__btn">
        <Icon name="lucide:plus" class="icon" />
        Add
      </a-button>
    </div>
    <div class="books__items">
      <div class="books__item">
        <div class="books__item-left">
          <div class="books__item-img">
            <NuxtImg src="/images/book.jpg" alt="Book Image" />
          </div>
          <div>
            <p class="books__item-name">
              Battlefield 6: The Ultimate Guide to Mastering the Game
            </p>
            <p class="books__item-genre">Genre: Action</p>
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
</template>

<style scoped>
.development-books {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
}
.books__header {
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
  display: flex;
  justify-content: space-between;
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
