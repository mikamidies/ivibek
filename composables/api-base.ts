export const useApiBaseUrl = () => {
  const config = useRuntimeConfig();
  return (config.public.apiBaseUrl || "https://dev-api.ivybek.com").replace(
    /\/$/,
    "",
  );
};
