export default defineNuxtPlugin(() => {
  const { fetchUser, accessToken } = useAuth();
  const route = useRoute();

  if (accessToken.value && !route.path.startsWith("/auth")) {
    fetchUser().catch((error) => {
      console.error("Failed to initialize user session:", error);
    });
  }
});
