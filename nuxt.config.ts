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
      htmlAttrs: {
        class: "ivibek-booting",
      },
      title: "Ivybek",
      meta: [{ name: "description", content: "Ivybek - students consulting" }],
      style: [
        {
          innerHTML: `
html.ivibek-booting body {
  margin: 0;
  min-height: 100vh;
  background: #f8fafc;
}
html.ivibek-booting #__nuxt {
  visibility: hidden;
}
html.ivibek-booting body::before,
html.ivibek-booting body::after {
  position: fixed;
  z-index: 2147483647;
  left: 50%;
  pointer-events: none;
}
html.ivibek-booting body::before {
  content: "";
  top: 50%;
  width: 36px;
  height: 36px;
  margin: -26px 0 0 -18px;
  border: 3px solid #dbeafe;
  border-top-color: #2b7fff;
  border-radius: 50%;
  animation: ivibekBootSpin 0.8s linear infinite;
}
html.ivibek-booting body::after {
  content: "Ivybek";
  top: calc(50% + 24px);
  transform: translateX(-50%);
  color: #101828;
  font: 600 15px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
@keyframes ivibekBootSpin {
  to {
    transform: rotate(360deg);
  }
}
          `,
        },
      ],
      noscript: [
        {
          innerHTML:
            '<style>html.ivibek-booting #__nuxt{visibility:visible}html.ivibek-booting body::before,html.ivibek-booting body::after{display:none}</style>',
        },
      ],
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
