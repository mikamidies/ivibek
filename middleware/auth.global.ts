export default defineNuxtRouteMiddleware(async (to) => {
  const { accessToken, refresh, fetchUser, user } = useAuth();

  const publicPages = ["/auth/login", "/auth/register", "/auth/forgot"];
  const studentPages = [
    "/",
    "/tasks",
    "/booking",
    "/essay-lab",
    "/verification",
    "/student/verification",
    "/teachers",
    "/profile",
  ];

  const normalizedPath =
    to.path.length > 1 ? to.path.replace(/\/$/, "") : to.path;

  const isStudentPage = studentPages.some((path) => {
    return normalizedPath === path || normalizedPath.startsWith(`${path}/`);
  });

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

  if (!user.value) {
    await fetchUser();
  }

  if (user.value?.role !== "VIP_STUDENT" && !isStudentPage) {
    return navigateTo("/");
  }
});
