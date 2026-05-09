export const useTranslations = () => {
  const apiBase = useApiBaseUrl();
  const translations = useState<Record<string, string>>(
    "translations",
    () => ({})
  );
  const translationsLoaded = useState<boolean>(
    "translations-loaded",
    () => false
  );

  const loadTranslations = async (force = false) => {
    if (translationsLoaded.value && !force) {
      return translations.value;
    }

    if (import.meta.client && !force && !Object.keys(translations.value).length) {
      const stored = localStorage.getItem("translations");
      if (stored) {
        try {
          translations.value = JSON.parse(stored);
          translationsLoaded.value = true;
        } catch (error) {
          console.error("Failed to parse cached translations:", error);
        }
      }
    }

    try {
      const data = await $fetch<Record<string, string>>(
        `${apiBase}/api/v1/common/translations?type=STUDENT`
      );

      translations.value = data || {};
      translationsLoaded.value = true;

      if (import.meta.client) {
        localStorage.setItem("translations", JSON.stringify(translations.value));
      }
    } catch (error) {
      if (!translationsLoaded.value) {
        translations.value = {};
      }

      if (import.meta.client && !translationsLoaded.value) {
        const stored = localStorage.getItem("translations");
        if (stored) {
          try {
            translations.value = JSON.parse(stored);
            translationsLoaded.value = true;
          } catch (parseError) {
            console.error("Failed to parse cached translations:", parseError);
          }
        }
      }

      if (!translationsLoaded.value) {
        throw error;
      }
    }

    return translations.value;
  };

  const t = (key: string) => translations.value[key] || key;

  return { t, loadTranslations };
};
