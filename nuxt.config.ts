export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "https://dev-api.ivybek.com",
    },
  },

  app: {
    head: {
      title: "Ivybek",
      meta: [{ name: "description", content: "Ivybek - students consulting" }],
    },
  },

  css: [
    "ant-design-vue/dist/antd.css",
    "@/assets/css/antd-overrides.css",
    "@/assets/css/main.css",
  ],

  modules: ["@nuxt/fonts", "nuxt-icon", "@nuxt/image"],

  fonts: {
    provider: "google",
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin", "cyrillic"],
    },
    families: [{ name: "Inter", provider: "google" }],
  },
});
