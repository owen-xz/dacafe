<template>
  <section
    class="relative bg-[url('~/assets/img/testimonial.jpg')] bg-cover bg-fixed bg-center p-10"
    id="Testimonial"
    ref="testimonial"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="container relative mx-auto grid grid-cols-12 text-white md:gap-10"
    >
      <div class="col-span-12 space-y-10 md:col-span-6" data-aos="fade-up">
        <div class="flex items-center">
          <img
            class="me-2 h-[40px] md:h-[80px]"
            src="~/assets/img/good.png"
            alt=""
          />
          <h2 class="text-2xl md:text-4xl">客戶評價</h2>
        </div>
        <swiper
          :modules="[Pagination, Autoplay]"
          :slides-per-view="1"
          :space-between="50"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          loop
          :breakpoints="{
            1280: { slidesPerView: 2 },
            1536: { slidesPerView: 3 },
          }"
        >
          <swiper-slide v-for="item in 5" :key="item">
            <div class="text-8xl">❛❛</div>
            <div class="h-[300px]">
              <div class="mb-10">
                這間餐廳真的讓人驚艷！餐點新鮮美味，擺盤用心，環境溫馨又舒適。服務人員親切友善，讓人賓至如歸。特別推薦他們的特色料理，每一口都充滿驚喜，絕對值得再訪！
              </div>
              <div class="flex items-center space-x-3">
                <img
                  class="h-[60px] w-[60px] rounded-full object-cover"
                  src="~/assets/img/man.jpg"
                  alt=""
                />
                <div>
                  <div class="font-bold">David</div>
                  <div class="inline">
                    <span
                      class="text-lg text-yellow-500"
                      v-for="item in 5"
                      :key="item"
                    >
                      <i class="bi bi-star-fill"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap-icons/font/bootstrap-icons.css";

const { $gsap } = useNuxtApp() as { $gsap: typeof gsap };

const testimonial = ref();
onMounted(() => {
  $gsap.to(testimonial.value, {
    backgroundPosition: "center -100px", // 背景向上移動 100px
    ease: "none", // 沒有緩動效果，保持線性動畫
    scrollTrigger: {
      trigger: testimonial.value,
      start: "top bottom", // 當區塊進入視窗底部時開始
      end: "bottom top", // 當區塊離開視窗頂部時結束
      scrub: true, // 滾動同步動畫
    },
  });
});
</script>

<style>
#Testimonial .swiper .swiper-pagination-bullet-active {
  background-color: #fff;
}
</style>
