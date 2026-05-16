const waitForStylesheets = async () => {
  const stylesheetLinks = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  );

  const stylesheetLoad = Promise.all(
    stylesheetLinks.map((link) => {
      if (link.sheet) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const finish = () => resolve();

        link.addEventListener("load", finish, { once: true });
        link.addEventListener("error", finish, { once: true });
      });
    }),
  );

  const fallback = new Promise<void>((resolve) => {
    window.setTimeout(resolve, 3000);
  });

  await Promise.race([stylesheetLoad, fallback]);
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    await waitForStylesheets();

    requestAnimationFrame(() => {
      document.documentElement.classList.remove("ivibek-booting");
    });
  });
});
