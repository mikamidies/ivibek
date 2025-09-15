<script>
definePageMeta({
  layoutTitle: "Profile",
});

import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
    };
  },
});
</script>

<template>
  <div class="profile-page">
    <div class="profile__top">
      <div class="profile__top-left">
        <div class="profile__img">
          <NuxtImg
            src="/images/person.jpg"
            alt="person"
            width="80"
            height="80"
            format="webp"
          />
          <button class="profile__img-edit">
            <Icon name="lucide:pencil" width="16" height="16" />
          </button>
        </div>
        <div>
          <h3 class="profile__name">Yu Jimin</h3>
          <p class="profile__email">aespa@naver.com</p>
          <p class="profile__apply">Apply year: 2023/2024</p>
        </div>
      </div>
      <NuxtLink to="/"> Preview </NuxtLink>
    </div>
    <div class="profile__grid">
      <div class="profile__details">
        <div class="profile__details-head">
          <h4 class="section__title">Personal Details</h4>
          <button class="profile__details-edit" @click="showModal">
            <Icon name="lucide:pencil" />
          </button>
        </div>
        <div class="profile__items">
          <div class="profile__item">
            <Icon name="lucide:mail" />
            <p class="profile__item-text">aespa@naver.com</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:user" />
            <p class="profile__item-text">Female</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:calendar-days" />
            <p class="profile__item-text">Apr 6, 2000</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:map-pin" />
            <p class="profile__item-text">Seoul, South Korea</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:languages" />
            <p class="profile__item-text">Korean, English</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:clock" />
            <p class="profile__item-text">Joined Jan 1, 2023</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:globe" />
            <p class="profile__item-text">Asia</p>
          </div>
        </div>
      </div>

      <div class="profile__about">
        <div class="profile__about-head">
          <h4 class="section__title">About Me</h4>
          <button class="profile__about-edit">
            <Icon name="lucide:pencil" />
          </button>
        </div>
        <p class="profile__about-text">
          Hello! I'm Yu Jimin, a passionate individual with a love for music,
          dance, and connecting with people. As a member of the global sensation
          aespa, I thrive on creativity and teamwork. When I'm not performing, I
          enjoy exploring new cultures, trying out different cuisines, and
          spending quality time with friends and family. I'm always eager to
          learn and grow, both personally and professionally. Feel free to reach
          out if you'd like to connect or collaborate!
          <br /><br />
          As the leader of aespa, I strive to inspire my members and fans
          through our music and performances. Our group is known for blending
          virtual and real worlds, pushing boundaries in K-pop with innovative
          concepts and technology. I'm proud of our achievements, including
          chart-topping songs and global recognition. Beyond the stage, I value
          kindness, hard work, and staying true to myself. Let's continue to
          make meaningful connections and create unforgettable memories
          together!
        </p>
      </div>
    </div>
  </div>

  <a-modal v-model:visible="visible" title="Edit Profile" @ok="handleOk">
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
        >Save information</a-button
      >
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style scoped>
.profile-page {
  padding: 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.profile__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  padding: 40px;
}
.profile__top-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.profile__img {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.profile__img img {
  border-radius: 50%;
}
.profile__img-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}
.profile__img-edit:hover {
  color: var(--blue);
}
.profile__name {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 4px;
}
.profile__email {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  margin-bottom: 4px;
}
.profile__apply {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.profile__top a {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}
.profile__top a:hover {
  background: var(--border);
  color: var(--blue);
}
.profile__grid {
  display: grid;
  grid-template-columns: 384px 1fr;
  gap: 24px;
}
.profile__details,
.profile__about {
  background: white;
  border-radius: 16px;
  padding: 24px;
  height: fit-content;
}
.section__title {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}
.profile__about-head,
.profile__details-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.profile__details-edit span,
.profile__about-edit span {
  width: 18px;
  height: 18px;
}
.profile__items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile__item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.profile__item-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--dark);
}
.profile__item span {
  width: 20px;
  height: 20px;
  color: var(--light-grey);
}
.profile__about-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
