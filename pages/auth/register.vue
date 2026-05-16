<script setup>
import { message } from "ant-design-vue";

definePageMeta({
  layout: "auth",
});

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: "/images/login.webp",
      type: "image/webp",
    },
    {
      rel: "preload",
      as: "image",
      href: "/images/brand.svg",
      type: "image/svg+xml",
    },
  ],
});

const { register } = useAuth();
const { fetchCountries } = useCommon(); // ✅ Добавили
const { t } = useTranslations();

const username = ref("");
const email = ref("");
const fullName = ref("");
const password = ref("");
const confirmPassword = ref("");
const gender = ref("MALE");
const dateOfBirth = ref(null); // ✅ Изменили с "" на null для a-date-picker
const countryId = ref(null); // ✅ Изменили с 1 на null
const agree = ref(false);
const loading = ref(false);
const countriesLoading = ref(false);
const errors = ref({
  username: "",
  fullName: "",
  email: "",
  countryId: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
  agree: "",
});

// ✅ Добавили массив для стран
const countries = ref([]);
let countrySearchTimeout = null;

// ✅ Загружаем страны при монтировании
onMounted(async () => {
  await loadCountries();
});

const loadCountries = async (search = "") => {
  countriesLoading.value = true;

  try {
    countries.value = await fetchCountries(search);
  } catch (error) {
    console.error("Error loading countries:", error);
    message.error("Не удалось загрузить список стран");
  } finally {
    countriesLoading.value = false;
  }
};

const handleCountrySearch = (value) => {
  if (countrySearchTimeout) {
    clearTimeout(countrySearchTimeout);
  }

  countrySearchTimeout = setTimeout(() => {
    loadCountries(value.trim());
  }, 300);
};

const resetErrors = () => {
  errors.value = {
    username: "",
    fullName: "",
    email: "",
    countryId: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    agree: "",
  };
};

const validateForm = () => {
  resetErrors();

  if (!username.value.trim()) {
    errors.value.username = "Username is required";
  }

  if (!fullName.value.trim()) {
    errors.value.fullName = "Full name is required";
  }

  if (!email.value.trim()) {
    errors.value.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    errors.value.email = "Enter a valid email";
  }

  if (!countryId.value) {
    errors.value.countryId = "Country is required";
  }

  if (!dateOfBirth.value) {
    errors.value.dateOfBirth = "Date of birth is required";
  }

  if (!password.value) {
    errors.value.password = "Password is required";
  } else if (password.value.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Confirm your password";
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  if (!agree.value) {
    errors.value.agree = "You must accept the terms";
  }

  return !Object.values(errors.value).some(Boolean);
};

const handleRegister = async () => {
  if (!validateForm()) {
    message.error("Please fix the form errors");
    return;
  }

  loading.value = true;

  const result = await register({
    username: username.value,
    password: password.value,
    passwordConfirm: confirmPassword.value,
    fullName: fullName.value,
    gender: gender.value,
    dateOfBirth: dateOfBirth.value.format("YYYY-MM-DD"), // ✅ Форматируем дату
    email: email.value,
    countryId: countryId.value,
  });

  loading.value = false;

  if (result.success) {
    message.success("Регистрация успешна!");
    navigateTo("/");
  } else {
    message.error(result.error);
  }
};
</script>

<template>
  <div class="login-page auth">
    <div class="login__wrapper">
      <div class="login__img">
        <img
          src="/images/login.webp"
          alt="Register Illustration"
          width="500"
          height="500"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
        />
        <p class="login__type">{{ t("register.platform-type") }}</p>
      </div>
      <div class="login__body">
        <div class="login__logo">
          <img
            src="/images/brand.svg"
            alt="Logo"
            width="120"
            height="40"
            decoding="sync"
            fetchpriority="high"
          />
        </div>
        <div class="login__somewhat">
          <div class="login__header">
            <h4 class="login__title">{{ t("register.title") }}</h4>
            <p class="login__sub">
              {{ t("register.subtitle") }}
            </p>
          </div>
          <form class="login__form" @submit.prevent="handleRegister">
            <div class="login__items">
              <div>
                <a-input
                  v-model:value="username"
                  :placeholder="t('register.username')"
                  class="login__input"
                  :status="errors.username ? 'error' : ''"
                  :disabled="loading"
                  @input="errors.username = ''"
                />
                <p v-if="errors.username" class="login__error">
                  {{ errors.username }}
                </p>
              </div>
              <div>
                <a-input
                  v-model:value="fullName"
                  :placeholder="t('register.full-name')"
                  class="login__input"
                  :status="errors.fullName ? 'error' : ''"
                  :disabled="loading"
                  @input="errors.fullName = ''"
                />
                <p v-if="errors.fullName" class="login__error">
                  {{ errors.fullName }}
                </p>
              </div>
              <div>
                <a-input
                  v-model:value="email"
                  type="email"
                  :placeholder="t('register.email')"
                  class="login__input"
                  :status="errors.email ? 'error' : ''"
                  :disabled="loading"
                  @input="errors.email = ''"
                />
                <p v-if="errors.email" class="login__error">
                  {{ errors.email }}
                </p>
              </div>
              <div>
                <a-select
                  v-model:value="gender"
                  :placeholder="t('register.gender')"
                  class="login__input"
                  :disabled="loading"
                >
                  <a-select-option value="MALE">{{
                    t("register.gender-male")
                  }}</a-select-option>
                  <a-select-option value="FEMALE">{{
                    t("register.gender-female")
                  }}</a-select-option>
                </a-select>
              </div>

              <div>
                <a-select
                  v-model:value="countryId"
                  show-search
                  :placeholder="t('register.country')"
                  class="login__input"
                  :status="errors.countryId ? 'error' : ''"
                  :disabled="loading"
                  :loading="countriesLoading"
                  :filter-option="false"
                  @search="handleCountrySearch"
                  @change="errors.countryId = ''"
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
                <p v-if="errors.countryId" class="login__error">
                  {{ errors.countryId }}
                </p>
              </div>

              <div>
                <a-date-picker
                  v-model:value="dateOfBirth"
                  :placeholder="t('register.date-of-birth')"
                  class="login__input"
                  :status="errors.dateOfBirth ? 'error' : ''"
                  :disabled="loading"
                  format="DD/MM/YYYY"
                  style="width: 100%"
                  @change="errors.dateOfBirth = ''"
                />
                <p v-if="errors.dateOfBirth" class="login__error">
                  {{ errors.dateOfBirth }}
                </p>
              </div>

              <div>
                <a-input-password
                  v-model:value="password"
                  :placeholder="t('register.password')"
                  class="login__input"
                  :status="errors.password ? 'error' : ''"
                  :disabled="loading"
                  @input="errors.password = ''"
                />
                <p v-if="errors.password" class="login__error">
                  {{ errors.password }}
                </p>
              </div>
              <div>
                <a-input-password
                  v-model:value="confirmPassword"
                  :placeholder="t('register.confirm-password')"
                  class="login__input"
                  :status="errors.confirmPassword ? 'error' : ''"
                  :disabled="loading"
                  @input="errors.confirmPassword = ''"
                />
                <p v-if="errors.confirmPassword" class="login__error">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>

            <div>
              <div class="login__flexer">
                <a-checkbox
                  v-model:checked="agree"
                  class="login__checkbox"
                  @change="errors.agree = ''"
                >
                  {{ t("register.agree") }}
                </a-checkbox>
              </div>
              <p v-if="errors.agree" class="login__error">
                {{ errors.agree }}
              </p>
              <div class="login__buttons">
                <a-button
                  type="primary"
                  class="login__btn"
                  html-type="submit"
                  :loading="loading"
                >
                  {{ t("register.submit") }}
                </a-button>
                <div class="login__link">
                  <p>{{ t("register.have-account") }}</p>
                  <NuxtLink to="/auth/login" class="login__register">
                    {{ t("register.sign-in") }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  height: 100vh;
  background: #f3f4f6;
}
.login__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 40px;
  width: 100%;
}
.login__img {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 140px;
  background: var(--blue);
  border-radius: 24px;
  box-shadow: 0px 0px 34.8px 10px #ffffff8f inset;
}
.login__type {
  font-weight: 500;
  font-style: Medium;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  text-transform: uppercase;
  color: white;
  letter-spacing: 1px;
}
.login__img img {
  width: 480px;
  height: auto;
  object-fit: contain;
  object-position: center;
  mix-blend-mode: luminosity;
}
.login__body {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
}
.login__somewhat {
  min-width: 600px;
  max-width: 90%;
  margin: 0 auto;
}
.login__logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login__logo img {
  width: 292px;
  height: 98px;
  object-fit: contain;
  object-position: center;
}
.login__header {
  margin-bottom: 24px;
}
.login__items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.login__title {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
}
.login__sub {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--light-grey);
}
.login__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.login__input {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--border);
}
.login__error {
  margin-top: 6px;
  font-size: 12px;
  line-height: 16px;
  color: #ff4d4f;
}
.login__flexer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
.login__checkbox .ant-checkbox-inner {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}
.login__forgot {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--primary);
}
.login__buttons {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.login__btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
}
.login__link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--light-grey);
}
.login__register {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--black);
}
</style>
