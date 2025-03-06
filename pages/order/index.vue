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
    <div class="container mx-auto max-w-[1000px] px-4 py-10">
      <div class="grid grid-cols-2 gap-10">
        <div class="col-span-2 space-y-6 md:col-span-1">
          <h2 class="text-4xl">購物車資訊</h2>
          <ul class="space-y-4" v-if="cartStore.cart.length">
            <li
              class="flex items-center space-x-2"
              v-for="(item, index) in cartStore.cart"
              :key="item.id"
            >
              <img
                class="h-1/3 w-1/3 cursor-pointer md:h-20 md:w-20"
                :src="item.photo"
                :alt="item.name"
                @click="router.push(`/product/${item.id}`)"
              />
              <div
                class="w-full items-center justify-between space-y-2 md:flex md:space-y-0"
              >
                <div
                  class="min-w-40 cursor-pointer font-bold"
                  @click="router.push(`/product/${item.id}`)"
                >
                  {{ item.name }}
                </div>
                <div class="flex items-center justify-between space-x-2">
                  <span class="font-bold text-primary">${{ item.price }}</span>
                  <Counter
                    v-model:count="item.count"
                    @update:count="cartStore.updateCount(index, $event)"
                  />
                </div>
              </div>
            </li>
            <div class="border-t border-black py-4 text-end">
              總金額：
              <span class="font-bold text-primary"> ${{ totalPrice }}</span>
            </div>
          </ul>
          <div class="text-center" v-else>購物車尚無商品</div>
        </div>
        <div class="col-span-2 space-y-6 md:col-span-1">
          <h2 class="text-4xl">訂購人資訊</h2>
          <form class="grid grid-cols-2 gap-4" @submit.prevent="sendOrder">
            <ClientOnly>
              <button
                class="btn-primary-dark col-span-2 px-4 py-2"
                @click="setUserData"
                v-if="userStore.name"
              >
                帶入會員資料
              </button>
            </ClientOnly>
            <div class="col-span-1 space-y-2">
              <label for="orderName">姓名：</label>
              <input
                id="orderName"
                class="w-full border border-black p-4"
                type="text"
                placeholder="姓名"
                required
                v-model="orderData.name"
              />
            </div>
            <div class="col-span-1 space-y-2">
              <label for="orderName">電話：</label>
              <input
                class="w-full border border-black p-4"
                type="tel"
                placeholder="電話"
                required
                v-model="orderData.phone"
              />
            </div>
            <div class="col-span-1 space-y-2">
              <label for="orderName">電子郵件：</label>
              <input
                class="w-full border border-black p-4"
                type="email"
                placeholder="電子郵件"
                required
                v-model="orderData.email"
              />
            </div>
            <div class="col-span-1 space-y-2">
              <label for="orderName">預訂日期：</label>
              <VueDatePicker
                v-model="orderData.reservedTime"
                :ui="{ input: 'orderDateInput' }"
                :min-date="new Date()"
                select-text="選擇"
                cancel-text="取消"
                placeholder="預訂日期"
                required
              />
            </div>
            <div class="col-span-2 space-y-2">
              <label for="orderName">備註：</label>
              <textarea
                class="block w-full border border-black p-4"
                placeholder="留言給我們"
                v-model="orderData.note"
              ></textarea>
            </div>
            <div class="col-span-2 flex justify-end">
              <button class="btn-primary-dark px-10 py-4" type="submit">
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import { useCartStore } from "~/stores/cart";
import { useLoadingStore } from "~/stores/loading";
import { useAlertStore } from "~/stores/alert";
import { useUserStore } from "~/stores/user";
import Counter from "~/components/Counter.vue.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const cartStore = useCartStore();
const loadingStore = useLoadingStore();
const alertStore = useAlertStore();
const userStore = useUserStore();
const router = useRouter();

// 總金額
const totalPrice = computed(() => {
  let total = 0;
  cartStore.cart.forEach((item) => {
    total += item.price * item.count;
  });
  return total;
});

// 送出訂單
const orderData = ref({
  name: "",
  phone: "",
  email: "",
  note: "",
  reservedTime: "",
});
interface PostOrderRes {
  message: string;
}
const sendOrder = async () => {
  if (!cartStore.cart.length) {
    alertStore.showAlert("購物車尚無商品");
    return;
  }
  const { name, phone, email, note, reservedTime } = orderData.value;
  const cart = cartStore.cart.map((item) => ({
    productId: item.id,
    count: item.count,
  }));
  const postData = {
    cart,
    orderer: {
      name,
      phone,
      email,
    },
    note,
    reservedTime: reservedTime ? new Date(reservedTime).toISOString() : "",
  };
  try {
    loadingStore.loadingShow = true;
    const res = await $fetch<PostOrderRes | null>(
      `${config.API_BASE_URL}/order`,
      { method: "POST", body: postData },
    );
    if (res) {
      alertStore.showAlert("訂單新增成功", "alert", () => {
        router.push({ path: `/order/${res}` });
        cartStore.cart = [];
        localStorage.removeItem("cart");
        alertStore.hideAlert();
      });
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response?._data?.message);
    loadingStore.loadingShow = false;
  }
};

// 帶入會員資料
const setUserData = () => {
  orderData.value.name = userStore.name;
  orderData.value.phone = userStore.phone;
  orderData.value.email = userStore.email;
};
</script>

<style>
.orderDateInput {
  border-color: black !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  border-radius: 0 !important;
}
.orderDateInput:hover {
  border-color: black !important;
}
</style>
