import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 導入需要的插件

// 註冊 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// 定義 GSAP 的類型
declare module "#app" {
  interface NuxtApp {
    $gsap: typeof gsap;
  }
}

// 將 GSAP 提供給整個應用程式
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("gsap", gsap);
});
