// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: "https://emanuelmarquessf.github.io/lolSkinViewer",
    buildAssetsDir: "",
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["vue3-carousel-nuxt"],
  carousel: {
    prefix: "MyPrefix",
  },
});
