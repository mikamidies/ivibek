export default defineNuxtPlugin(() => {
  const { refresh } = useAuth();

  let isRefreshing = false;

  globalThis.$fetch = $fetch.create({
    async onResponseError({ response }) {
      if (response.status === 401 && !isRefreshing) {
        isRefreshing = true;

        try {
          await refresh();
        } finally {
          isRefreshing = false;
        }
      }
    },
  });
});
