<script setup>
import PageBanner from "@/components/PageBanner.vue";
import WeeklyCalendar from "@/components/booking/WeeklyCalendar.vue";
import { message } from "ant-design-vue";

import { ref } from "vue";

const { fetchMentors, fetchMentorById, fetchMentorTimeslots } = useMentors();
const { fetchUniversities, fetchFaculties } = useCommon();
const { createMeeting, fetchMeetings } = useMeetings();

const meetings = ref([]);
const meetingsLoading = ref(false);

const loadMeetings = async () => {
  meetingsLoading.value = true;
  try {
    const response = await fetchMeetings(0, 100);
    meetings.value = response.content;
  } catch (error) {
    console.error("Failed to load meetings:", error);
    message.error("Failed to load meetings");
  } finally {
    meetingsLoading.value = false;
  }
};

onMounted(async () => {
  mentors.value = await fetchMentors();
  await loadMeetings();
});
const universities = await fetchUniversities();
const faculties = await fetchFaculties();
const selectedUniversity = ref(null);
const selectedFaculty = ref(null);
const searchQuery = ref("");
const mentors = ref([]);
const availableSlots = ref([]);

const debouncedSearch = ref(searchQuery.value);
let searchTimeout;

watch(searchQuery, (newValue) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    debouncedSearch.value = newValue;
  }, 500);
});

watch([selectedUniversity, selectedFaculty, debouncedSearch], async () => {
  mentors.value = await fetchMentors(
    selectedUniversity.value,
    selectedFaculty.value,
    debouncedSearch.value
  );
});

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};

const bookModalVisible = ref(false);
const selectedMentor = ref(null);
const selectedSlots = ref([]);
const mentorLoading = ref(false);
const currentWeekRange = ref({ dateFrom: "", dateTo: "" });

const selectMentor = async (mentorId) => {
  mentorLoading.value = true;
  try {
    const mentorData = await fetchMentorById(mentorId);
    selectedMentor.value = mentorData;

    // Получаем текущую неделю
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Понедельник

    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const dateFrom = monday.toISOString().split("T")[0];
    const dateTo = sunday.toISOString().split("T")[0];

    currentWeekRange.value = { dateFrom, dateTo };

    // Загружаем доступные слоты
    await loadTimeslots(mentorId, dateFrom, dateTo);

    bookModalVisible.value = true;
    visible.value = false;
  } catch (error) {
    console.error("Failed to load mentor details:", error);
  } finally {
    mentorLoading.value = false;
  }
};

const loadTimeslots = async (mentorId, dateFrom, dateTo) => {
  try {
    const timeslotsData = await fetchMentorTimeslots(
      mentorId,
      dateFrom,
      dateTo
    );

    const slots = [];
    if (Array.isArray(timeslotsData)) {
      timeslotsData.forEach((item) => {
        if (item.date && Array.isArray(item.times)) {
          item.times.forEach((time) => {
            const timeWithoutSeconds = time.substring(0, 5);
            slots.push(`${item.date}T${timeWithoutSeconds}`);
          });
        }
      });
    }

    availableSlots.value = slots;
  } catch (error) {
    console.error("Failed to load timeslots:", error);
    availableSlots.value = [];
  }
};

const handleBookOk = () => {
  if (selectedSlots.value.length === 0) {
    message.warning("Please select at least one time slot");
    return;
  }
  paymentModalVisible.value = true;
  bookModalVisible.value = false;
};

const paymentModalVisible = ref(false);
const meetingDescription = ref("");
const bookingLoading = ref(false);

const handlePaymentOk = async () => {
  if (selectedSlots.value.length === 0) {
    message.error("Please select at least one time slot");
    return;
  }

  bookingLoading.value = true;
  try {
    const selectedSlot = selectedSlots.value[0];
    const [date, time] = selectedSlot.split("_");

    const timeFrom = time;
    const timeHour = parseInt(time.split(":")[0]);
    const timeTo = `${(timeHour + 1).toString().padStart(2, "0")}:00`;

    const payload = {
      mentorId: selectedMentor.value.id,
      date: date,
      timeFrom: timeFrom,
      timeTo: timeTo,
      description: meetingDescription.value || "",
    };

    await createMeeting(payload);
    message.success("Meeting booked successfully!");

    paymentModalVisible.value = false;
    bookModalVisible.value = false;
    meetingDescription.value = "";
    selectedSlots.value = [];
    selectedMentor.value = null;
    availableSlots.value = [];

    await loadMeetings();
  } catch (error) {
    message.error(
      "Failed to book meeting: " + (error?.message || "Unknown error")
    );
  } finally {
    bookingLoading.value = false;
  }
};

const handleWeekChange = async ({ dateFrom, dateTo }) => {
  if (selectedMentor.value?.id) {
    currentWeekRange.value = { dateFrom, dateTo };
    await loadTimeslots(selectedMentor.value.id, dateFrom, dateTo);
  }
};

const calculateTotalPrice = () => {
  const hourlyRate = selectedMentor.value?.pricing?.meetingHourPrice || 24;
  return selectedSlots.value.length * hourlyRate;
};

const formatSlotForDisplay = (slot) => {
  const [date, time] = slot.split("_");
  return `${date} at ${time}`;
};
</script>

<template>
  <div class="booking-page">
    <PageBanner
      titleProps="Booking"
      backgroundProps="#0092B8"
      iconProps="/page-icons/booking.png"
    />

    <div class="booking__body">
      <div class="booking__header">
        <h2 class="section__title">Testing overview</h2>

        <a-button class="add__btn" @click="showModal">
          <Icon name="lucide:plus" /> Add
        </a-button>
      </div>
      <div class="booking__content">
        <a-spin :spinning="meetingsLoading">
          <table v-if="meetings.length > 0">
            <thead>
              <tr>
                <th>Mentor</th>
                <th>University</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="meeting in meetings" :key="meeting.id">
                <td class="mentor">
                  <NuxtImg
                    v-if="meeting.mentor.image"
                    :src="meeting.mentor.image"
                    alt="Mentor"
                    width="24px"
                    height="24px"
                  />
                  <Icon v-else name="lucide:user" />
                  {{ meeting.mentor.fullName || "N/A" }}
                </td>
                <td>{{ meeting.mentor.university.name || "N/A" }}</td>
                <td>{{ meeting.date }}</td>
                <td>{{ meeting.timeFrom }} - {{ meeting.timeTo }}</td>
                <td>
                  <span
                    class="status"
                    :class="{
                      'status-pending': meeting.status === 'PENDING_PAYMENT',
                      'status-confirmed': meeting.status === 'CONFIRMED',
                      'status-completed': meeting.status === 'COMPLETED',
                      'status-cancelled': meeting.status === 'CANCELLED',
                    }"
                  >
                    {{
                      meeting.status
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <a-empty v-else description="No meetings found" />
        </a-spin>
      </div>
    </div>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk">
    <div class="modal__header">
      <h2 class="section__title">Add Booking</h2>
    </div>
    <div class="modal__body">
      <!-- <div class="modal__top">
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
      </div> -->
      <div class="modal__mid">
        <div
          class="modal__item"
          v-for="item in mentors"
          :key="item.id"
          @click="selectMentor(item.id)"
        >
          <div class="modal__item-img">
            <NuxtImg
              :src="item.image"
              alt="Harvard University"
              width="56px"
              height="56px"
            />
          </div>
          <div class="modal__item-content">
            <h3 class="modal__item-title">{{ item.fullName }}</h3>
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
    :okText="'Continue'"
    :cancelText="'Cancel'"
    :okButtonProps="{ disabled: selectedSlots.length === 0 }"
  >
    <div class="modal__header">
      <div class="modal__header-left">
        <a-button
          type="text"
          @click="(bookModalVisible = false), (visible = true)"
        >
          <Icon name="lucide:arrow-left" />
        </a-button>
        <h2 class="section__title">
          Book a session with {{ selectedMentor?.info.fullName }}
        </h2>
      </div>
    </div>
    <div class="modal__info">
      <div class="modal__desc">
        <h4>About teacher</h4>
        <p>
          {{ selectedMentor?.about }}
        </p>
      </div>
      <div class="modal__details">
        <h4>Contact Information</h4>
        <div class="modal__details-items">
          <div class="modal__details-item">
            <Icon name="lucide:mail" />
            <p>{{ selectedMentor?.info.email }}</p>
          </div>
          <!-- <div class="modal__details-item">
            <Icon name="lucide:phone" />
            <p>{{ selectedMentor?.info.phone }}</p>
          </div> -->
          <div class="modal__details-item">
            <Icon name="lucide:map-pin" />
            <p>{{ selectedMentor?.info.country.name }}</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:calendar" />
            <p>{{ selectedMentor?.info.dateOfBirth }}</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:building-2" />
            <p>{{ selectedMentor?.info.university.name }}</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:graduation-cap" />
            <p>{{ selectedMentor?.info.faculty.name }}</p>
          </div>
          <div class="modal__details-item">
            <Icon name="lucide:user" />
            <p>{{ selectedMentor?.info.gender }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal__price">
      <div class="modal__price-hourly">
        <p>$ {{ selectedMentor?.pricing.meetingHourPrice }}</p>
        <span>Hourly Rate</span>
      </div>
    </div>
    <div class="modal__calendar">
      <WeeklyCalendar
        :mentor-id="selectedMentor?.id"
        :available-slots="availableSlots"
        v-model:selectedSlots="selectedSlots"
        @week-change="handleWeekChange"
      />
    </div>
  </a-modal>

  <a-modal
    class="payment-modal"
    v-model:visible="paymentModalVisible"
    :ok-button-props="{ loading: bookingLoading }"
    @ok="handlePaymentOk"
    :okText="'Confirm Booking'"
    :cancelText="'Cancel'"
  >
    <div class="modal__header-left">
      <a-button
        type="text"
        @click="
          (paymentModalVisible = false),
            (bookModalVisible = true),
            (meetingDescription = '')
        "
      >
        <Icon name="lucide:arrow-left" />
      </a-button>
      <h2 class="section__title">
        Book a session with {{ selectedMentor?.info.fullName }}
      </h2>
    </div>
    <div class="modal__body">
      <div class="modal__description">
        <p class="modal__label">Description for teacher</p>
        <a-textarea
          v-model:value="meetingDescription"
          rows="4"
          placeholder="Describe the purpose of the meeting or any specific topics you'd like to discuss"
        />
      </div>
      <div class="modal__prices">
        <div class="modal__price-item">
          <p>Teacher price (per hour)</p>
          <span>${{ selectedMentor?.hourlyRate || 24 }}</span>
        </div>
        <div class="modal__price-item">
          <p>Selected slots</p>
          <span
            >{{ selectedSlots.length }} hour{{
              selectedSlots.length > 1 ? "s" : ""
            }}</span
          >
        </div>
        <div class="modal__price-item" v-if="selectedSlots.length > 0">
          <p>Dates & Times</p>
          <span class="slots-list">
            <span v-for="slot in selectedSlots" :key="slot" class="slot-item">
              {{ formatSlotForDisplay(slot) }}
            </span>
          </span>
        </div>
        <div class="modal__price-total-item">
          <p>Total price</p>
          <span>${{ calculateTotalPrice() }}</span>
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
.university,
.mentor {
  display: flex;
  align-items: center;
  gap: 12px;
}
.university img,
.mentor img {
  object-fit: contain;
  border-radius: 50%;
}
.status {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
}
.status-pending {
  background: var(--light-yellow);
  color: var(--yellow);
}
.status-confirmed {
  background: var(--light-blue);
  color: var(--blue);
}
.status-completed {
  background: var(--light-green);
  color: var(--green);
}
.status-cancelled {
  background: #fee;
  color: #c33;
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
}
.payment-modal .modal__body {
  gap: 16px;
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
.slots-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}
.slot-item {
  display: block;
  font-size: 12px;
  line-height: 16px;
}
</style>
