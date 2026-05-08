export default defineNuxtPlugin(async () => {
  const { loadTranslations } = useTranslations();

  try {
    await loadTranslations();
  } catch (error) {
    console.error("Failed to initialize translations:", error);
  }
});
