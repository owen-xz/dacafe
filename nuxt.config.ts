// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      API_BASE_URL: "https://dacabe-owens-projects-3ea616dd.vercel.app/api",
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "DACA輕食廚坊 | 美味輕食 · 現泡茶飲 · 聚會包場", // 全局標題
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "DACA輕食廚坊提供精緻輕食、美式漢堡與現泡茶飲，讓您享受健康美味的餐點。無論是悠閒早午餐、好友聚會或包場活動，DACA都是您的理想選擇。",
        },
        {
          name: "keywords",
          content:
            "DACA輕食廚坊, 輕食, 早午餐, 美式漢堡, 拼盤, 手作餐點, 現泡茶飲, 聚會餐廳, 寵物友善餐廳, 包場服務, 咖啡廳, 餐廳推薦",
        },
        { name: "author", content: "DACA輕食廚坊" },
        { name: "robots", content: "index, follow" }, // 允許搜尋引擎索引
        // Open Graph (Facebook & LinkedIn)
        {
          property: "og:title",
          content: "DACA輕食廚坊 | 美味輕食 · 現泡茶飲 · 聚會包場",
        },
        {
          property: "og:description",
          content: "健康美味的輕食與現泡茶飲，適合早午餐、好友聚會與包場活動。",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://dacafe.vercel.app/" }, // 請替換成你的網站 URL
        // {
        //   property: "og:image",
        //   content: "https://yourwebsite.com/og-image.jpg",
        // }, // 代表性圖片
        // Twitter Meta Tags
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "DACA輕食廚坊 | 美味輕食 · 現泡茶飲 · 聚會包場",
        },
        {
          name: "twitter:description",
          content: "健康美味的輕食與現泡茶飲，適合早午餐、好友聚會與包場活動。",
        },
        // {
        //   name: "twitter:image",
        //   content: "https://yourwebsite.com/twitter-image.jpg",
        // },
      ],
    },
  },
  modules: ["@pinia/nuxt"],
});
