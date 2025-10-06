<script setup>
import PageBanner from "@/components/PageBanner.vue";

import { ref } from "vue";
const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const bookModalVisible = ref(false);
const handleBookOk = () => {
  bookModalVisible.value = false;
  paymentModalVisible.value = true;
};

const paymentModalVisible = ref(false);
const handlePaymentOk = () => {
  paymentModalVisible.value = false;
};
</script>

<template>
  <div class="booking-page">
    <PageBanner titleProps="Booking" />

    <div class="booking__body">
      <div class="booking__header">
        <h2 class="section__title">Testing overview</h2>

        <a-button class="add__btn" @click="showModal">
          <Icon name="lucide:plus" /> Add
        </a-button>
      </div>
      <div class="booking__content">
        <table>
          <thead>
            <tr>
              <th>University</th>
              <th>Teacher Name</th>
              <th>Test Date</th>
              <th>Description</th>
              <th>Teacher's answer</th>
              <th>Target Achieved?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="university">
                <NuxtImg
                  src="/images/cumbridge.png"
                  alt="Harvard University"
                  width="24px"
                  height="24px"
                />
                Harvard University
              </td>
              <td>John Doe</td>
              <td>2023-10-15</td>
              <td>Midterm Exam</td>
              <td>Yes</td>
              <td><span class="status"> Payment is pending </span></td>
            </tr>
            <tr>
              <td class="university">
                <NuxtImg
                  src="/images/pic.avif"
                  alt="Harvard University"
                  width="24px"
                  height="24px"
                />
                Stanford University
              </td>
              <td>Jane Smith</td>
              <td>2023-11-20</td>
              <td>Final Project</td>
              <td>No</td>
              <td><span class="status"> Achieved </span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk">
    <div class="modal__header">
      <h2 class="section__title">Add Booking</h2>
    </div>
    <div class="modal__body">
      <div class="modal__top">
        <div class="modal__search">
          <a-input placeholder="Search by name or keywords" />
          <Icon name="lucide:search" />
        </div>
        <a-select placeholder="Filter by university">
          <a-select-option value="harvard">Harvard University</a-select-option>
          <a-select-option value="stanford"
            >Stanford University</a-select-option
          >
          <a-select-option value="mit">MIT</a-select-option>
        </a-select>
      </div>
      <div class="modal__mid">
        <div
          class="modal__item"
          @click="(bookModalVisible = true), (visible = false)"
        >
          <div class="modal__item-img">
            <NuxtImg
              src="/images/person.jpg"
              alt="Harvard University"
              width="56px"
              height="56px"
            />
          </div>
          <div class="modal__item-content">
            <h3 class="modal__item-title">Yu Jimin</h3>
            <p class="modal__item-desc">
              <Icon name="lucide:graduation-cap" />
              Massachusetts Institute of Technology (MIT)
            </p>
            <p class="modal__item-desc">
              <Icon name="lucide:briefcase" />
              Software Engineering Specialist
            </p>
          </div>
        </div>
        <div class="modal__item">
          <div class="modal__item-img">
            <NuxtImg
              src="/images/person.jpg"
              alt="Harvard University"
              width="56px"
              height="56px"
            />
          </div>
          <div class="modal__item-content">
            <h3 class="modal__item-title">Yu Jimin</h3>
            <p class="modal__item-desc">
              <Icon name="lucide:graduation-cap" />
              Massachusetts Institute of Technology (MIT)
            </p>
            <p class="modal__item-desc">
              <Icon name="lucide:briefcase" />
              Software Engineering Specialist
            </p>
          </div>
        </div>
        <div class="modal__item">
          <div class="modal__item-img">
            <NuxtImg
              src="/images/person.jpg"
              alt="Harvard University"
              width="56px"
              height="56px"
            />
          </div>
          <div class="modal__item-content">
            <h3 class="modal__item-title">Yu Jimin</h3>
            <p class="modal__item-desc">
              <Icon name="lucide:graduation-cap" />
              Massachusetts Institute of Technology (MIT)
            </p>
            <p class="modal__item-desc">
              <Icon name="lucide:briefcase" />
              Software Engineering Specialist
            </p>
          </div>
        </div>
      </div>
    </div>
  </a-modal>

  <a-modal
    class="book-modal"
    v-model:visible="bookModalVisible"
    @ok="handleBookOk"
  >
    <div class="modal__header">
      <div class="modal__header-left">
        <a-button
          type="text"
          @click="(bookModalVisible = false), (visible = true)"
        >
          <Icon name="lucide:arrow-left" />
        </a-button>
        <h2 class="section__title">Book a session with Yu Jimin</h2>
      </div>
    </div>
    <div class="modal__info">
      <div class="modal__desc">
        <h4>About teacher</h4>
        <p>
          Yu Jimin is a seasoned software engineering specialist with over 10
          years of experience in the tech industry. He has worked with leading
          companies and has a deep understanding of software development
          methodologies, programming languages, and project management. Yu is
          passionate about mentoring and helping students achieve their career
          goals in the field of software engineering.
        </p>
      </div>
      <div class="modal__details">
        <h4>Contact Information</h4>
        <div class="modal__details-items">
          <div class="modal__details-item">
            <Icon name="lucide:mail" />
            <p>yujimin@naever.com</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:phone" />
            <p>+1 234 567 8901</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:map-pin" />
            <p>Seoul, South Korea</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:calendar" />
            <p>Feb 2, 2000</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:languages" />
            <p>English, Korean</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:clock" />
            <p>Available: Mon - Fri, 9 AM - 5 PM</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:globe" />
            <p>Asia, South Korea</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal__price">
      <div class="modal__price-hourly">
        <p>$50</p>
        <span>Hourly Rate</span>
      </div>
      <div class="modal__price-essay">
        <p>$24</p>
        <span>Essay Rate</span>
      </div>
    </div>
    <div class="modal__calendar"></div>
  </a-modal>

  <a-modal
    class="payment-modal"
    v-model:visible="paymentModalVisible"
    @ok="handlePaymentOk"
  >
    <div class="modal__header-left">
      <a-button
        type="text"
        @click="(paymentModalVisible = false), (bookModalVisible = true)"
      >
        <Icon name="lucide:arrow-left" />
      </a-button>
      <h2 class="section__title">Book a session with Yu Jimin</h2>
    </div>
    <div class="modal__body">
      <div class="modal__description">
        <p class="modal__label">Description for teacher</p>
        <a-textarea rows="4" placeholder="Description for teacher" />
      </div>
      <div class="modal__prices">
        <div class="modal__price-item">
          <p>Teacher price (per hour)</p>
          <span>$24</span>
        </div>
        <div class="modal__price-item">
          <p>Selected date</p>
          <span>19.10.2025</span>
        </div>
        <div class="modal__price-item">
          <p>Selected time</p>
          <span>10:00 - 11:00</span>
        </div>
        <div class="modal__price-total-item">
          <p>Total price</p>
          <span>$24</span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<style scoped>
.booking-page {
  padding: 24px 24px 120px 24px;
  background: var(--border);
  height: 100vh;
  overflow: auto;
}
.booking__body {
  padding: 24px;
  background: #ffffff;
  border-radius: 16px;
  margin-top: 16px;
}
.booking__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
tr td:last-child {
  text-align: left;
}
.university {
  display: flex;
  align-items: center;
  gap: 12px;
}
.university img {
  object-fit: contain;
}
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.modal__top {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}
.modal__search {
  position: relative;
  width: 100%;
}
.modal__search a-input {
  width: 100%;
  padding-right: 40px;
}
.modal__search span {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: var(--light-grey);
}
.modal__mid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 800px;
  overflow: auto;
}
.modal__item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.modal__item:hover {
  background: var(--border);
}
.modal__item-img {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}
.modal__item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.modal__item-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 6px;
}
.modal__item-desc {
  font-size: 12px;
  line-height: 18px;
  color: var(--light-grey);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.modal__header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.modal__header-left span {
  width: 20px;
  height: 20px;
}
.modal__header-left button {
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}
.modal__desc {
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: 16px;
}
.modal__desc h4 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 12px;
}
.modal__desc p {
  font-size: 16px;
  line-height: 24px;
  color: var(--dark);
}
.modal__details {
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: 16px;
}
.modal__details h4 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 16px;
}
.modal__details-items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 24px;
}
.modal__details-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.modal__details-item p {
  font-size: 14px;
  line-height: 20px;
  color: var(--dark);
}
.modal__details-item span {
  width: 18px;
  height: 18px;
  color: var(--light-grey);
}
.modal__price {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.modal__price-hourly,
.modal__price-essay {
  padding: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.modal__price-hourly p,
.modal__price-essay p {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
}
.modal__price-hourly span,
.modal__price-essay span {
  font-size: 14px;
  line-height: 20px;
}
.modal__price-hourly {
  background: var(--light-blue);
  color: var(--blue);
}
.modal__price-essay {
  background: var(--light-green);
  color: var(--green);
}
:deep(.ant-modal) {
  height: 100%;
}
.modal__calendar {
  border-top: 1px solid var(--border);
  margin-top: 24px;
}
.payment-modal .modal__header-left {
  margin-bottom: 24px;
}
.modal__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.modal__description .modal__label {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  margin-bottom: 8px;
}
.modal__prices {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 12px;
}
.modal__price-item,
.modal__price-total-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.modal__price-item::after,
.modal__price-total-item::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 100%;
  height: 1px;
  border: 1px dashed var(--border);
}
.modal__price-total-item {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
.modal__price-item p {
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
  background: white;
  position: relative;
  z-index: 2;
}
.modal__price-item span {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  background: white;
  position: relative;
  z-index: 2;
}
.modal__price-total-item {
  padding-top: 16px;
  border-top: 1px solid var(--border);
  margin-top: 8px;
}
.modal__price-total-item p {
  color: var(--black);
  font-weight: 400;
  background: white;
  position: relative;
  z-index: 2;
}
.modal__price-total-item span {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: var(--blue);
  background: white;
  position: relative;
  z-index: 2;
}
</style>
