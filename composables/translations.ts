import { ref } from "vue";

const translations = ref<Record<string, string>>({});

export const useTranslations = () => {
  const loadTranslations = async () => {
    if (process.client) {
      try {
        const res = await fetch(
          "https://api.ivybek.com/api/v1/common/translations?type=STUDENT"
        );
        const data = await res.json();
        translations.value = data;
        localStorage.setItem("translations", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to load translations from API, using cache:", e);
        const stored = localStorage.getItem("translations");
        if (stored) {
          translations.value = JSON.parse(stored);
        }
      }
    }
  };

  const t = (key: string) => translations.value[key] || key;

  return { t, loadTranslations };
};
