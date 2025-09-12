export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "IVYBEK",
      meta: [{ name: "description", content: "Ivybek - students consulting" }],
    },
  },

  css: ["@/assets/css/main.css"],

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
