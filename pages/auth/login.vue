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

const { login } = useAuth();

const username = ref("");
const password = ref("");
const loading = ref(false);
const errors = ref({
  username: "",
  password: "",
});

const resetErrors = () => {
  errors.value = {
    username: "",
    password: "",
  };
};

const validateForm = () => {
  resetErrors();

  if (!username.value.trim()) {
    errors.value.username = "Username is required";
  }

  if (!password.value) {
    errors.value.password = "Password is required";
  }

  return !Object.values(errors.value).some(Boolean);
};

const handleLogin = async () => {
  if (!validateForm()) {
    message.error("Please fix the form errors");
    return;
  }

  loading.value = true;

  const result = await login(username.value, password.value);

  loading.value = false;

  if (result.success) {
    message.success("Вход выполнен успешно!");
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
        <p class="login__type">Platform for Students</p>
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
            <h4 class="login__title">Log in</h4>
            <p class="login__sub">Welcome back please enter your details.</p>
          </div>
          <form class="login__form" @submit.prevent="handleLogin">
            <div>
              <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="login__input"
                :class="{ 'login__input-error': errors.username }"
                :disabled="loading"
                autocomplete="username"
                @input="errors.username = ''"
              />
              <p v-if="errors.username" class="login__error">
                {{ errors.username }}
              </p>
            </div>
            <div>
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="login__input"
                :class="{ 'login__input-error': errors.password }"
                :disabled="loading"
                autocomplete="current-password"
                @input="errors.password = ''"
              />
              <p v-if="errors.password" class="login__error">
                {{ errors.password }}
              </p>
            </div>
            <div class="login__buttons">
              <button
                class="login__btn"
                type="submit"
                :disabled="loading"
              >
                {{ loading ? "Loading..." : "Log in" }}
              </button>
              <div class="login__link">
                <p>Don't have an account?</p>
                <NuxtLink to="/auth/register" class="login__register">
                  Sign up
                </NuxtLink>
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
}
.login__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
.login__logo img {
  width: 292px;
  height: 98px;
  object-fit: contain;
  object-position: center;
}
.login__somewhat {
  min-width: 480px;
  max-width: 90%;
  margin: 0 auto;
}
.login__header {
  margin-bottom: 16px;
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
  border: 1px solid #d0d5dd;
  background: #fff;
  padding: 0 14px;
  font-size: 14px;
  line-height: 20px;
  color: var(--black);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.login__input::placeholder {
  color: #98a2b3;
}
.login__input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(43, 127, 255, 0.12);
}
.login__input-error {
  border-color: #ff4d4f;
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
  color: #fff;
  background: var(--blue);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.login__btn:disabled {
  opacity: 0.7;
  cursor: wait;
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
