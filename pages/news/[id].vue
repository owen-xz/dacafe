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
</script>

<style></style>
