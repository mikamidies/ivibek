export default defineNuxtPlugin(() => {
  const { logout, refresh } = useAuth();

  globalThis.$fetch = $fetch.create({
    async onResponseError({ response }) {
      if (response.status === 401) {
        console.log("REFRESHING TOKEN DUE TO 401...");
        const refreshed = await refresh();
        if (!refreshed) {
          console.warn("UNABLE TO REFRESH TOKEN 401");
        }
      }
    },
  });
});
