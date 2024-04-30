// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: "",
    buildAssetsDir: "",
    head: {
      title: 'League Skin Viewer',
      link: [
        { rel: "icon", type: "image/png", href: "/lolIcon.svg" }
      ]
    }
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
