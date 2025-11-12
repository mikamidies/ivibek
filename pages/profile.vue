<script setup>
definePageMeta({
  layoutTitle: "Profile",
});

import { message } from "ant-design-vue";
import dayjs from "dayjs";

const {
  user,
  updateProfile,
  updateProfileImage,
  updateAbout,
  accessToken,
  fetchUser,
} = useAuth();

const { fetchCountries } = useCommon();

const loading = ref(false);
const uploadLoading = ref(false);

const countries = ref([]);

const form = ref({
  fullName: "",
  email: "",
  dateOfBirth: null,
  gender: "MALE",
  countryId: null,
  timezone: "UTC",
});

const about = ref("");

watch(
  user,
  (newUser) => {
    if (newUser?.info) {
      form.value = {
        fullName: newUser.info.fullName || "",
        email: newUser.info.email || "",
        dateOfBirth: newUser.info.dateOfBirth
          ? dayjs(newUser.info.dateOfBirth)
          : null,
        gender: newUser.info.gender || "MALE",
        countryId: newUser.info.country?.id || null,
        timezone: newUser.info.timezone || "UTC",
      };
      about.value = newUser.about || "";
    }
  },
  { immediate: true }
);

const visible = ref(false);
const visibleDesc = ref(false);

const showModal = async () => {
  visible.value = true;

  try {
    const countriesData = await fetchCountries();
    countries.value = countriesData;
  } catch (error) {
    console.error("Error loading countries:", error);
  }
};

const handleOk = async () => {
  loading.value = true;

  try {
    const body = {
      fullName: form.value.fullName,
      email: form.value.email,
      dateOfBirth: dayjs(form.value.dateOfBirth).format("YYYY-MM-DD"),
      gender: form.value.gender,
      countryId: form.value.countryId,
      timezone: form.value.timezone,
    };

    await $fetch(`https://api.ivybek.com/api/v1/student/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        "Content-Type": "application/json",
      },
      body,
    });

    await fetchUser();
    message.success("Profile updated successfully!");
    visible.value = false;
  } catch (error) {
    console.error(error);
    message.error("Error updating profile");
  }

  loading.value = false;
};

const handleCancel = () => {
  visible.value = false;
};

const showModalDesc = () => {
  visibleDesc.value = true;
};

const handleOkDesc = async () => {
  loading.value = true;

  const result = await updateAbout(about.value);

  loading.value = false;

  if (result.success) {
    message.success("Description updated!");
    visibleDesc.value = false;
  } else {
    message.error(result.error || "Error updating description");
  }
};

const customRequest = async ({ file, onSuccess, onError }) => {
  uploadLoading.value = true;

  const result = await updateProfileImage(file);

  uploadLoading.value = false;

  if (result.success) {
    onSuccess("ok");
    message.success("Profile photo updated!");
  } else {
    onError(new Error(result.error));
    message.error(result.error);
  }
};

const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Only images are allowed!");
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error("Image must be smaller than 5MB!");
  }
  return isImage && isLt5M;
};

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const genderFormat = (gender) => {
  if (!gender) return "Not set";
  return gender === "MALE" ? "Male" : "Female";
};

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "Asia/Tashkent", label: "Asia/Tashkent (UTC+5)" },
  { value: "America/New_York", label: "America/New_York (UTC-5)" },
  { value: "Europe/London", label: "Europe/London (UTC+0)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (UTC+9)" },
  { value: "Australia/Sydney", label: "Australia/Sydney (UTC+11)" },
];
</script>

<template>
  <div class="profile-page">
    <div class="profile__top">
      <div class="profile__top-left">
        <div class="profile__img">
          <NuxtImg
            :src="user.image || '/images/default-person.jpg'"
            alt="person"
            width="80"
            height="80"
            format="webp"
          />
          <a-upload
            name="image"
            list-type="picture"
            :show-upload-list="false"
            :custom-request="customRequest"
            :before-upload="beforeUpload"
          >
            <button class="profile__img-edit" :disabled="uploadLoading">
              <a-spin v-if="uploadLoading" size="small" />
              <Icon v-else name="lucide:pencil" width="16" height="16" />
            </button>
          </a-upload>
        </div>
        <div v-if="user">
          <h3 class="profile__name">
            {{ user.info?.fullName || user.username }}
          </h3>
          <p class="profile__email">{{ user.info?.email || "Not set" }}</p>
          <p class="profile__apply">
            Joined {{ dayjs(user.joinedAt).format("MMM DD, YYYY") }}
          </p>
        </div>
      </div>
    </div>

    <div class="profile__grid">
      <div class="profile__details">
        <div class="profile__details-head">
          <h4 class="section__title">Personal Details</h4>
          <button class="profile__details-edit" @click="showModal">
            <Icon name="lucide:pencil" />
          </button>
        </div>
        <div class="profile__items" v-if="user">
          <div class="profile__item">
            <Icon name="lucide:user" />
            <p class="profile__item-text">{{ user.username }}</p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:mail" />
            <p class="profile__item-text">
              {{ user.info?.email || "Not set" }}
            </p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:user-2" />
            <p class="profile__item-text">
              {{ genderFormat(user.info?.gender) }}
            </p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:calendar-days" />
            <p class="profile__item-text">
              {{
                user.info?.dateOfBirth
                  ? dayjs(user.info.dateOfBirth).format("MMM DD, YYYY")
                  : "Not set"
              }}
            </p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:map-pin" />
            <p class="profile__item-text">
              {{ user.info?.country?.name || "Not set" }}
            </p>
          </div>
          <div class="profile__item">
            <Icon name="lucide:clock" />
            <p class="profile__item-text">
              {{ user.info?.timezone || "Not set" }}
            </p>
          </div>
        </div>
      </div>

      <div class="profile__about">
        <div class="profile__about-head">
          <h4 class="section__title">About Me</h4>
          <button class="profile__about-edit" @click="showModalDesc">
            <Icon name="lucide:pencil" />
          </button>
        </div>
        <div class="profile__about-text">
          {{ user?.about || "No description yet" }}
        </div>
      </div>
    </div>
  </div>

  <a-modal
    v-model:visible="visible"
    title="Edit Profile"
    @ok="handleOk"
    :confirm-loading="loading"
  >
    <template #footer>
      <a-button key="back" @click="handleCancel">Cancel</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        Save information
      </a-button>
    </template>
    <div class="form__wrapper">
      <a-form :model="form" layout="vertical">
        <a-form-item label="Full Name" name="fullName">
          <a-input
            v-model:value="form.fullName"
            placeholder="Enter your full name"
          />
        </a-form-item>

        <a-form-item label="Email" name="email">
          <a-input
            v-model:value="form.email"
            type="email"
            placeholder="Enter your email"
          />
        </a-form-item>

        <a-form-item label="Date of Birth" name="dateOfBirth">
          <a-date-picker
            v-model:value="form.dateOfBirth"
            style="width: 100%"
            format="DD/MM/YYYY"
          />
        </a-form-item>

        <a-form-item label="Gender" name="gender">
          <a-select
            v-model:value="form.gender"
            placeholder="Choose gender"
            :options="genderOptions"
          />
        </a-form-item>

        <a-form-item label="Country" name="countryId">
          <a-select
            v-model:value="form.countryId"
            show-search
            placeholder="Select a country"
            :filter-option="
              (input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
            "
            allow-clear
          >
            <a-select-option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
              :label="country.name"
            >
              {{ country.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Timezone" name="timezone">
          <a-select
            v-model:value="form.timezone"
            show-search
            placeholder="Select timezone"
            :options="timezones"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>

  <a-modal
    v-model:visible="visibleDesc"
    title="Change Description"
    @ok="handleOkDesc"
    :confirm-loading="loading"
  >
    <a-form-item label="About Me" name="about" class="long-form-item columner">
      <a-textarea
        v-model:value="about"
        rows="4"
        placeholder="Tell us about yourself"
        :autosize="{ minRows: 18, maxRows: 24 }"
      />
    </a-form-item>
  </a-modal>
</template>
<style scoped>
.columner {
  display: flex;
  flex-direction: column;
}
.columner :deep(.ant-col) {
  text-align: left !important;
}
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
  object-fit: cover;
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
  width: 16px;
  height: 16px;
  color: var(--light-grey);
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
