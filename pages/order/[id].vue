<template>
  <div>
    <div
      class="relative h-[400px] bg-[url('~/assets/img/orderBanner.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="hidden text-4xl">訂單資訊</h1>
        <img src="~/assets/img/t-order.png" alt="訂單資訊" />
      </div>
    </div>
    <div
      class="container mx-auto max-w-[1000px] space-y-10 px-4 py-10"
      v-if="order"
    >
      <div class="space-y-6">
        <h2 class="text-4xl">訂單資訊</h2>
        <div class="space-y-4">
          <p>訂單編號：{{ order._id }}</p>
          <p>訂單狀態：{{ order.status }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10">
        <div class="col-span-2 space-y-6 md:col-span-1">
          <h2 class="text-4xl">商品資訊</h2>
          <ul class="space-y-4">
            <li
              class="flex items-center space-x-2"
              v-for="(item, index) in order.cart"
              :key="item.productId"
            >
              <img
                class="h-1/3 w-1/3 cursor-pointer md:h-20 md:w-20"
                :src="item.photo"
                :alt="item.title"
                @click="router.push(`/product/${item.productId}`)"
              />
              <div
                class="w-full items-center justify-between space-y-2 md:flex md:space-y-0"
              >
                <div
                  class="min-w-40 cursor-pointer font-bold"
                  @click="router.push(`/product/${item.productId}`)"
                >
                  {{ item.title }}
                </div>
                <div class="flex items-center justify-between space-x-2">
                  <span class="font-bold text-primary">${{ item.price }}</span>
                  <span> × {{ item.count }}</span>
                </div>
              </div>
            </li>
            <div class="border-t border-black py-4 text-end">
              總金額：
              <span class="font-bold text-primary"> ${{ totalPrice }}</span>
            </div>
          </ul>
        </div>
        <div class="col-span-2 space-y-6 md:col-span-1">
          <h2 class="text-4xl">訂購人資訊</h2>
          <form class="grid grid-cols-2 gap-4">
            <div class="col-span-1 space-y-2">
              <label>姓名:</label>
              <p>{{ order.orderer.name }}</p>
            </div>
            <div class="col-span-1 space-y-2">
              <label>電話:</label>
              <p>{{ order.orderer.phone }}</p>
            </div>
            <div class="col-span-1 space-y-2">
              <label>電子郵件:</label>
              <p>{{ order.orderer.email }}</p>
            </div>
            <div class="col-span-1 space-y-2">
              <label>預訂日期:</label>
              <p>{{ dayjs(order.reservedTime).format("YYYY/MM/DD HH:mm") }}</p>
            </div>
            <div class="col-span-2 space-y-2">
              <label>備註:</label>
              <p>{{ order.note }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import dayjs from "dayjs";

const route = useRoute();
const router = useRouter();

interface Order {
  _id: string;
  cart: {
    productId: string;
    title: string;
    photo: string;
    price: number;
    count: number;
  }[];
  orderer: {
    name: string;
    phone: string;
    email: string;
  };
  note: string;
  reservedTime: string;
  status: string;
}
const order = ref(null as Order | null);
const { data } = await useAsyncData("order", () =>
  $fetch<Order>(`${config.API_BASE_URL}/order/${route.params.id}`),
);
if (data.value) {
  order.value = data.value;
}

// 總金額
const totalPrice = computed(() => {
  let total = 0;
  order.value?.cart.forEach((item) => {
    total += item.price * item.count;
  });
  return total;
});
</script>

<style></style>
