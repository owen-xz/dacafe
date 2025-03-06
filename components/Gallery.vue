<template>
  <section class="p-10" id="Gallery">
    <div class="container mx-auto space-y-6 md:space-y-10" data-aos="fade-up">
      <div class="flex justify-center">
        <img src="~/assets/img/t-paint.png" alt="繪畫藝廊" />
      </div>
      <div class="columns-2 gap-4 space-y-4 md:columns-3">
        <div
          v-for="(paint, index) in paints"
          :key="index"
          class="break-inside-avoidx group relative cursor-pointer"
          @click="showLightbox(index)"
        >
          <img :src="paint.url" alt="photo" class="w-full" />
          <div
            class="absolute inset-10 flex items-center justify-center border-2 border-transparent transition-all duration-300 group-hover:inset-4 group-hover:border-white"
          >
            <span
              class="text-2xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <i class="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>
      <button
        class="btn-outline w-full py-4"
        @click="getMorePaints"
        v-if="paints.length % 6 === 0"
      >
        查看更多
      </button>
    </div>
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="lightboxPaints"
      :index="currentIndex"
      @hide="hideLightbox"
    />
  </section>
</template>
<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import VueEasyLightbox from "vue-easy-lightbox";
import { useLoadingStore } from "~/stores/loading";

const loadingStore = useLoadingStore();

// 取得畫作
interface GetPaintsRes {
  _id: string;
  url: string;
}
const paints = ref([] as Array<GetPaintsRes>);
const { data } = await useAsyncData("paints", () =>
  $fetch<Array<GetPaintsRes>>(`${config.API_BASE_URL}/paints?offset=0`),
);
if (data.value) {
  paints.value = data.value;
}

const getMorePaints = async () => {
  if (paints.value.length % 6 !== 0) {
    return;
  }
  try {
    loadingStore.loadingShow = true;
    const res = await $fetch<Array<GetPaintsRes>>(
      `${config.API_BASE_URL}/paints?offset=${paints.value.length}`,
    );
    paints.value = [...paints.value, ...res];
    loadingStore.loadingShow = false;
  } catch (error) {}
};

// lightbox
const lightboxPaints = computed(() => {
  return paints.value.map((paint) => paint.url);
});
const visibleRef = ref(false);
const currentIndex = ref(0);
const showLightbox = (index: number) => {
  currentIndex.value = index;
  visibleRef.value = true;
};
const hideLightbox = () => {
  visibleRef.value = false;
};
</script>
