export default defineNuxtPlugin(() => {
  const { logout, refresh } = useAuth();

  globalThis.$fetch = $fetch.create({
    async onResponseError({ response }) {
      if (response.status === 401) {
        const refreshed = await refresh();
        if (!refreshed) {
          logout();
        }
      }
    },
  });
});
