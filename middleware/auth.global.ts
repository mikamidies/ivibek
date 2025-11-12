export default defineNuxtRouteMiddleware(async (to) => {
  const { accessToken, refresh } = useAuth();

  const publicPages = ["/auth/login", "/auth/register", "/auth/forgot"];

  if (publicPages.includes(to.path)) {
    return;
  }

  if (!accessToken.value) {
    return navigateTo("/auth/login");
  }

  if (isTokenExpired(accessToken.value, 10)) {
    const refreshed = await refresh();

    if (!refreshed || !accessToken.value) {
      return navigateTo("/auth/login");
    }
  }
});
