export default defineNuxtPlugin(() => {
  const { refresh, accessToken, refreshToken } = useAuth();

  let lastActivity = Date.now();
  let refreshInterval: ReturnType<typeof setInterval> | null = null;

  const updateActivity = () => {
    lastActivity = Date.now();
  };

  const isUserActive = () => {
    const INACTIVITY_THRESHOLD = 30 * 60 * 1000; // 30 минут
    return Date.now() - lastActivity < INACTIVITY_THRESHOLD;
  };

  const checkAndRefreshToken = async () => {
    if (!accessToken.value || !refreshToken.value) {
      return;
    }

    if (!isUserActive()) {
      return;
    }

    if (shouldRefreshToken(accessToken.value)) {
      const timeLeft = getTokenExpiryTime(accessToken.value);
      console.log(
        `Token expires in ${Math.floor(timeLeft / 60)} minutes, refreshing...`
      );

      await refresh();
    } else {
      const timeLeft = getTokenExpiryTime(accessToken.value);
      console.log(`Token valid for ${Math.floor(timeLeft / 60)} minutes`);
    }
  };

  if (import.meta.client) {
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity, { passive: true });
    });

    refreshInterval = setInterval(() => {
      checkAndRefreshToken();
    }, 2 * 60 * 1000);

    setTimeout(() => {
      checkAndRefreshToken();
    }, 10000);

    window.addEventListener("beforeunload", () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
  }
});
