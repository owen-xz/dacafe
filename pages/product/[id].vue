<template>
  <div
    class="container mx-auto max-w-[1000px] space-y-3 p-10 pt-28"
    v-if="product"
  >
    <div class="flex space-x-2">
      <NuxtLink to="/">首頁</NuxtLink>
      <span>></span>
      <NuxtLink to="/product">商品列表</NuxtLink>
      <span>></span>
      <NuxtLink
        :to="{ path: '/product', query: { category: product.category } }"
      >
        {{ product.category }}
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="col-span-2 md:col-span-1">
        <div class="group relative cursor-pointer" @click="showLightbox(0)">
          <img class="w-full" :src="product.photos[0]" :alt="product.title" />
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
      <div class="col-span-2 space-y-6 md:col-span-1">
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p>{{ product.content }}</p>
        <div class="flex justify-between">
          <div class="text-3xl font-bold text-primary">
            NT${{ product.price }}
          </div>
          <Counter v-model:count="count" />
        </div>
        <div class="flex space-x-4">
          <button class="btn-outline w-full py-4" @click="addToCart">
            加入購物車
          </button>
          <button class="btn-primary-dark w-full py-4" @click="addToOrder">
            立即購買
          </button>
        </div>
      </div>
    </div>
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="product.photos"
      :index="currentIndex"
      @hide="hideLightbox"
    />
  </div>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import { useAlertStore } from "~/stores/alert";
import { useCartStore } from "~/stores/cart";
import Counter from "~/components/Counter.vue.vue";
import VueEasyLightbox from "vue-easy-lightbox";

const alertStore = useAlertStore();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();

interface Product {
  _id: string;
  title: string;
  content: string;
  photos: string[];
  price: number;
  category: string;
}
const product = ref(null as Product | null);
const { data } = await useAsyncData("product", () =>
  $fetch<Product>(`${config.API_BASE_URL}/product/${route.params.id}`),
);
if (data.value) {
  product.value = data.value;
}

// 加入購物車
interface Cart {
  id: string;
  name: string;
  photo: string;
  price: number;
  count: number;
}
const count = ref(1);
const addToCart = () => {
  const { _id, title, photos, price } = product.value as Product;

  // 判斷是否已在購物車
  const index = cartStore.cart.findIndex((item: Cart) => item.id === _id);
  if (index === -1) {
    cartStore.cart.push({
      id: _id,
      name: title,
      photo: photos[0],
      price,
      count: count.value,
    });
  } else {
    cartStore.cart[index].count += count.value;
  }
  localStorage.setItem("cart", JSON.stringify(cartStore.cart));
  alertStore.showAlert("加入購物車成功");
};

// 立即購買
const addToOrder = () => {
  alertStore.showAlert("立即購買將會清空目前的購物車", "confirm", () => {
    const { _id, title, photos, price } = product.value as Product;
    cartStore.cart = [];
    cartStore.cart.push({
      id: _id,
      name: title,
      photo: photos[0],
      price,
      count: count.value,
    });
    localStorage.setItem("cart", JSON.stringify(cartStore.cart));
    router.push("/order");
    alertStore.hideAlert();
  });
};

// lightbox
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

<style></style>
