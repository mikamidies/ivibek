export default defineNuxtPlugin(async () => {
  const { loadTranslations } = useTranslations();
  await loadTranslations();
});
