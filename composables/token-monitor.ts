export const useTokenMonitor = () => {
  const { accessToken, refreshToken } = useAuth();

  const tokenHistory = ref<
    Array<{
      timestamp: Date;
      event: string;
      details?: any;
    }>
  >([]);

  const addEvent = (event: string, details?: any) => {
    tokenHistory.value.push({
      timestamp: new Date(),
      event,
      details,
    });

    if (tokenHistory.value.length > 50) {
      tokenHistory.value.shift();
    }

    console.log(`TOKEN EVENT: ${event}`, details || "");
  };

  const isTokenValid = computed(() => {
    return !!accessToken.value && accessToken.value.length > 0;
  });

  const hasRefreshToken = computed(() => {
    return !!refreshToken.value && refreshToken.value.length > 0;
  });

  const getStats = () => {
    const now = Date.now();
    const last15min = tokenHistory.value.filter(
      (e) => now - e.timestamp.getTime() < 15 * 60 * 1000
    );

    return {
      totalEvents: tokenHistory.value.length,
      eventsLast15Min: last15min.length,
      hasAccessToken: isTokenValid.value,
      hasRefreshToken: hasRefreshToken.value,
      lastEvent: tokenHistory.value[tokenHistory.value.length - 1],
    };
  };

  const printHistory = () => {
    console.group("TOKEN HISTORY");
    tokenHistory.value.forEach((event) => {
      console.log(
        `[${event.timestamp.toLocaleTimeString()}] ${event.event}`,
        event.details || ""
      );
    });
    console.groupEnd();
  };

  return {
    tokenHistory,
    addEvent,
    isTokenValid,
    hasRefreshToken,
    getStats,
    printHistory,
  };
};
