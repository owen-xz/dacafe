export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
      });
    });
  }
});
