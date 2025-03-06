export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    // 從 sessionStorage 中獲取 accessToken
    const accessToken = sessionStorage.getItem("accessToken");

    // 如果 accessToken 不存在，且目標頁面不是首頁，則導向首頁
    if (!accessToken && to.path !== "/") {
      return navigateTo("/");
    }
  }
});
