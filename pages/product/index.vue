<template>
  <div>
    <div
      class="relative h-[400px] bg-[url('~/assets/img/productBanner.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="hidden text-4xl">餐點列表</h1>
        <img src="~/assets/img/t-products.png" alt="餐點列表" />
      </div>
    </div>
    <div class="container mx-auto space-y-4 pb-10 md:px-4 md:pt-10">
      <div class="space-y-4 md:flex md:space-y-0">
        <ul class="sticky top-16 z-20 grid grid-cols-3 md:hidden">
          <li
            class="col-span-1 flex cursor-pointer justify-center border py-4 shadow"
            :class="
              nowCategory === category ? 'bg-primary text-white' : 'bg-white'
            "
            v-for="category in categories"
            :key="category"
            @click="changeCategory(category)"
          >
            {{ category }}
          </li>
        </ul>
        <div>
          <ul class="sticky top-20 z-20 hidden w-[200px] md:block">
            <li
              class="col-span-3 flex cursor-pointer justify-center border py-4 shadow"
              :class="
                nowCategory === category ? 'bg-primary text-white' : 'bg-white'
              "
              v-for="category in categories"
              :key="category"
              @click="changeCategory(category)"
            >
              {{ category }}
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-12 gap-6 px-4">
          <NuxtLink
            class="group relative col-span-12 cursor-pointer overflow-hidden border shadow md:col-span-6 lg:col-span-4"
            v-for="product in products"
            :key="product._id"
            :to="`/product/${product._id}`"
          >
            <div
              class="absolute -left-10 -top-2 z-10 -rotate-45 bg-primary px-10 pb-2 pt-5 text-white"
            >
              {{ product.category }}
            </div>
            <div class="overflow-hidden">
              <img
                class="transition-transform duration-300 group-hover:scale-110"
                :src="product.photos[0]"
                alt="product.title"
              />
            </div>
            <div class="flex justify-between p-4 text-xl">
              <h3 class="font-bold">{{ product.title }}</h3>
              <span class="font-bold text-primary">${{ product.price }}</span>
            </div>
          </NuxtLink>
          <button
            class="btn-primary-dark col-span-12 py-4"
            v-if="products.length % 12 === 0"
            @click="getProducts(nowCategory as string)"
          >
            載入更多
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import { useLoadingStore } from "~/stores/loading";

const loadingStore = useLoadingStore();
const route = useRoute();
const router = useRouter();

// 取得分類
const categories = ref([] as string[]);
const nowCategory = ref(route.query.category || "全部");
const categoryData = await useAsyncData("category", () =>
  $fetch<string[]>(`${config.API_BASE_URL}/category`),
);
if (categoryData.data.value) {
  categories.value = ["全部", ...categoryData.data.value];
}

// 取得商品
interface Product {
  _id: string;
  title: string;
  content: string;
  photos: string[];
  price: number;
  category: string;
}
const products = ref([] as Array<Product>);
const productsData = await useAsyncData("products", () =>
  $fetch<Array<Product>>(
    `${config.API_BASE_URL}/products?offset=0&category=${nowCategory.value === "全部" ? "" : nowCategory.value}`,
  ),
);
if (productsData.data.value) {
  products.value = productsData.data.value;
}

// 切換分類 & 載入更多
const changeCategory = async (category: string) => {
  if (category !== nowCategory.value) {
    await getProducts(category);
    router.replace({ path: "/product", query: { category: category } });
  }
};
const getProducts = async (category: string) => {
  try {
    loadingStore.loadingShow = true;
    let offset = 0;
    if (category === nowCategory.value) {
      offset = products.value.length;
    }
    const searchCategory = category === "全部" ? "" : category;
    const res = await $fetch<Array<Product>>(
      `${config.API_BASE_URL}/products?offset=${offset}&category=${searchCategory}`,
    );
    if (category === nowCategory.value) {
      products.value = [...products.value, ...res];
    } else {
      nowCategory.value = category;
      products.value = res;
      window.scrollTo(0, 0);
    }
    loadingStore.loadingShow = false;
  } catch (error) {}
};

// 設定 Head
useHead({
  title: "商品列表 - DACA輕食廚坊",
  meta: [
    {
      name: "description",
      content:
        "探索 DACA輕食廚坊的美味商品，包括輕食拼盤、手作美式漢堡、現泡茶飲等，讓您享受健康與美味。",
    },
    {
      name: "keywords",
      content: "輕食, 漢堡, 茶飲, 美食, DACA輕食廚坊, 早餐, 早午餐",
    },
    { name: "author", content: "DACA輕食廚坊" },
    { property: "og:title", content: "商品列表 - DACA輕食廚坊" },
    {
      property: "og:description",
      content: "發掘我們的輕食拼盤、美式漢堡與現泡茶飲，享受健康美味。",
    },
    {
      property: "og:image",
      content: "https://i.imgur.com/HZE78Q4.png",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://dacafe.vercel.app/product" },
  ],
});
</script>

<style></style>
