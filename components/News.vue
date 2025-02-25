<template>
  <section id="News" class="space-y-6 p-10 md:space-y-10" data-aos="fade-up">
    <div class="flex justify-center">
      <img src="~/assets/img/t-news.png" alt="最新消息" />
    </div>
    <swiper
      class="container mx-auto"
      :modules="[Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="10"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      loop
      :breakpoints="{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
    >
      <swiper-slide class="pb-16" v-for="item in news" :key="item._id">
        <div
          class="scale-95 shadow-lg transition-transform duration-300 hover:scale-100 hover:cursor-pointer"
        >
          <NuxtLink :to="`/news/${item._id}`">
            <img
              class="aspect-video object-cover"
              :src="item.photos[0]"
              :alt="item.title"
            />
            <div class="flex flex-col items-center space-y-5 bg-bg p-5">
              <div class="text-xl font-bold">{{ item.title }}</div>
              <p class="line-clamp-3 text-secondary">
                {{ item.content }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import { ref } from "vue";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";

interface GetNewsRes {
  _id: string;
  title: string;
  content: string;
  photos: string[];
  createdAt: string;
}
const news = ref([] as Array<GetNewsRes>);
const { data } = await useAsyncData("news", () =>
  $fetch<Array<GetNewsRes>>(`${config.API_BASE_URL}/news`),
);
if (data.value) {
  news.value = data.value;
}
</script>

<style>
#News .swiper .swiper-pagination-bullet-active {
  background-color: black;
}
</style>
