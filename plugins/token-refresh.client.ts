export default defineNuxtPlugin(() => {
  const { refresh, accessToken } = useAuth();

  setInterval(async () => {
    if (accessToken.value) {
      await refresh();
    }
  }, 14 * 60 * 1000);
});
