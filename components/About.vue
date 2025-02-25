<template>
  <section
    id="About"
    class="relative bg-[url(~/assets/img/about.jpg)] bg-cover bg-fixed bg-center p-10 text-white md:mx-0 xl:bg-[url(~/assets/img/about2.jpg)]"
    ref="aboutUs"
  >
    <div class="absolute inset-0 w-full bg-black opacity-50"></div>
    <div class="container relative z-10 mx-auto space-y-10">
      <div class="space-y-10" data-aos="fade-up">
        <div class="flex justify-center">
          <img src="~/assets/img/t-about.png" alt="關於我們" />
        </div>
        <div class="space-y-6">
          <p>
            在繁忙的城市角落，DACA
            懷著一個簡單的夢想誕生——為人們和他們的毛孩創造一個溫暖的避風港。在這裡，清晨的第一縷陽光透過窗戶灑進，溫馨的空間裡彌漫著現烤麵包與香醇咖啡的氣息。
          </p>
          <p>
            餐廳的創始人是一對熱愛藝術與寵物的夫妻，他們希望打破傳統，打造一個不僅提供健康美味餐點，還能讓人與毛孩共享美好時光的場所。除了滿足味蕾，店內特別設有繪畫藝廊，讓顧客在品味佳餚的同時，也能沉浸於藝術創作的樂趣之中。無論是即興揮灑色彩，或是靜靜欣賞牆上展出的畫作，這裡都是一個能讓心靈自由馳騁的角落。
          </p>
          <p>
            DACA
            不僅僅是一家餐廳，更是一個充滿陽光、友善與美味的小天地，期待每位顧客的到來，與我們共同分享生活的美好。
          </p>
        </div>
      </div>
      <ul class="grid grid-cols-12 gap-4 md:gap-10 md:py-10 lg:gap-6 xl:gap-10">
        <li
          class="group relative col-span-12 cursor-pointer rounded-t-full bg-black bg-opacity-50 pt-10 transition-all duration-1000 hover:border-opacity-100 md:col-span-6 lg:col-span-3"
          data-aos="fade-up"
          @click="scrollToSection('Speciality')"
        >
          <div
            class="absolute inset-6 rounded-t-full border border-transparent transition-all duration-300 group-hover:inset-0 group-hover:border-white"
          ></div>
          <div
            class="flex flex-col items-center justify-center space-y-3 p-4 md:p-6"
          >
            <img class="w-[40%]" src="~/assets/img/diet.png" alt="特色料理" />
            <h3 class="text-2xl">特色料理</h3>
            <p>
              嚴選優質食材，匠心製作每一道料理，從健康沙拉到美味主餐，每一口都充滿用心與美味。
            </p>
          </div>
        </li>
        <li
          class="group relative col-span-12 cursor-pointer rounded-t-full bg-black bg-opacity-50 pt-10 transition-all duration-1000 hover:border-opacity-100 md:col-span-6 lg:col-span-3"
          data-aos="fade-up"
          @click="scrollToSection('PetFriendly')"
        >
          <div
            class="absolute inset-6 rounded-t-full border border-transparent transition-all duration-300 group-hover:inset-0 group-hover:border-white"
          ></div>
          <div
            class="flex flex-col items-center justify-center space-y-3 p-4 md:p-6"
          >
            <img class="w-[40%]" src="~/assets/img/pets.png" alt="寵物友善" />
            <h3 class="text-2xl">寵物友善</h3>
            <p>
              打造舒適的寵物友善空間，提供專屬寵物座位與友好環境，讓您與毛孩共享悠閒時光。
            </p>
          </div>
        </li>
        <li
          class="group relative col-span-12 cursor-pointer rounded-t-full bg-black bg-opacity-50 pt-10 transition-all duration-1000 hover:border-opacity-100 md:col-span-6 lg:col-span-3"
          data-aos="fade-up"
          @click="scrollToSection('Gallery')"
        >
          <div
            class="absolute inset-6 rounded-t-full border border-transparent transition-all duration-300 group-hover:inset-0 group-hover:border-white"
          ></div>
          <div
            class="flex flex-col items-center justify-center space-y-3 p-4 md:p-6"
          >
            <img class="w-[40%]" src="~/assets/img/paint.png" alt="繪畫藝廊" />
            <h3 class="text-2xl">繪畫藝廊</h3>
            <p>
              提供顏料與繪畫工具，讓您在享受美食的同時，也能揮灑創意，沉浸於藝術的樂趣之中。
            </p>
          </div>
        </li>
        <li
          class="group relative col-span-12 cursor-pointer rounded-t-full bg-black bg-opacity-50 pt-10 transition-all duration-1000 hover:border-opacity-100 md:col-span-6 lg:col-span-3"
          data-aos="fade-up"
          @click="scrollToSection('News')"
        >
          <div
            class="absolute inset-6 rounded-t-full border border-transparent transition-all duration-300 group-hover:inset-0 group-hover:border-white"
          ></div>
          <div
            class="flex flex-col items-center justify-center space-y-3 p-4 md:p-6"
          >
            <img
              class="w-[40%]"
              src="~/assets/img/balloons.png"
              alt="聚會包場"
            />
            <h3 class="text-2xl">聚會包場</h3>
            <p>
              無論是生日派對、團體聚會或特別活動，提供溫馨空間與客製化服務，讓歡聚時光更難忘。
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const { $gsap } = useNuxtApp() as { $gsap: typeof gsap };
const aboutUs = ref();

onMounted(() => {
  $gsap.to(aboutUs.value, {
    backgroundPosition: "center -100px", // 背景向下移動 100px
    ease: "none", // 沒有緩動效果，保持線性動畫
    scrollTrigger: {
      trigger: aboutUs.value,
      start: "top bottom", // 當區塊進入視窗底部時開始
      end: "bottom top", // 當區塊離開視窗頂部時結束
      scrub: true, // 滾動同步動畫
    },
  });
});

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth", // 平滑滾動
    });
  }
};
</script>

<style></style>
