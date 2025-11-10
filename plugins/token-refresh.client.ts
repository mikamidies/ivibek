export default defineNuxtPlugin(() => {
  const { refresh, accessToken } = useAuth();

  let refreshAttempts = 0;
  const MAX_RETRY_ATTEMPTS = 3;

  setInterval(async () => {
    if (accessToken.value) {
      console.log("REFRESHING TOKEN...");

      const success = await refresh();

      if (!success) {
        refreshAttempts++;
        console.warn(`ERROR - ${refreshAttempts}/${MAX_RETRY_ATTEMPTS}`);
      } else {
        refreshAttempts = 0;
      }
    }
  }, 14 * 60 * 1000);
});
