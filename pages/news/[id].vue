<template>
  <div class="container mx-auto mt-16 space-y-3 p-10" v-if="news">
    <h1 class="text-3xl font-bold">{{ news.title }}</h1>
    <p>{{ dayjs(news.createdAt).format("YYYY/MM/DD HH:mm") }}</p>
    <img
      :src="photo"
      :alt="news.title"
      v-for="(photo, index) in news.photos"
      :index="index"
    />
    <p>{{ news.content }}</p>
    <div class="flex justify-center">
      <button class="btn-primary-dark px-10 py-4" @click="router.back">
        回上一頁
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import dayjs from "dayjs";

const route = useRoute();
const router = useRouter();

interface GetNewsRes {
  _id: string;
  title: string;
  content: string;
  photos: string[];
  createdAt: string;
}
const news = ref(null as GetNewsRes | null);
const { data } = await useAsyncData("news", () =>
  $fetch<GetNewsRes>(`${config.API_BASE_URL}/news/${route.params.id}`),
);
if (data.value) {
  news.value = data.value;
}

// 設定 Head
useHead({
  title: `${news.value?.title} - DACA輕食廚坊`,
  meta: [
    {
      name: "description",
      content:
        news.value?.content ||
        "探索 DACA輕食廚坊的美味商品，享受精緻輕食與現泡茶飲。",
    },
    {
      name: "keywords",
      content: `${news.value?.title}, 輕食, 美食, DACA輕食廚坊, 早午餐`,
    },
    { name: "author", content: "DACA輕食廚坊" },
    { property: "og:title", content: `${news.value?.title} - DACA輕食廚坊` },
    {
      property: "og:description",
      content:
        news.value?.content ||
        "探索 DACA輕食廚坊的美味商品，享受精緻輕食與現泡茶飲。",
    },
    {
      property: "og:image",
      content: news.value?.photos[0],
    },
    { property: "og:type", content: "news" },
    {
      property: "og:url",
      content: `https://dacafe.vercel.app/news/${route.params.id}`,
    },
  ],
});
</script>

<style></style>
