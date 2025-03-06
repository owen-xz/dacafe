import { useUserStore } from "~/stores/user";

export default defineNuxtPlugin((nuxtApp) => {
  const { public: config } = useRuntimeConfig();
  const userStore = useUserStore();

  // 刷新 Token
  interface PostRefreshRes {
    accessToken: string;
    name: string;
    phone: string;
    email: string;
    role: string;
  }
  const refreshToken = async () => {
    if (sessionStorage.getItem("accessToken")) {
      try {
        const res = await $fetch<PostRefreshRes>(
          `${config.API_BASE_URL}/refresh`,
          {
            method: "POST",
            credentials: "include", // 瀏覽器會自動帶上 HttpOnly Cookie
          },
        );
        if (res) {
          sessionStorage.setItem("accessToken", res.accessToken);
          userStore.name = res.name;
          userStore.phone = res.phone;
          userStore.email = res.email;
          userStore.role = res.role;
        } else {
          sessionStorage.removeItem("accessToken");
          userStore.resetUserStore();
          console.error("Refresh Token 無效，登出");
        }
      } catch (error) {
        console.error("Token 更新失敗:", error);
      }
    }
  };

  // Nuxt 啟動時自動嘗試刷新 Token
  nuxtApp.hook("app:created", async () => {
    await refreshToken();
  });
});
