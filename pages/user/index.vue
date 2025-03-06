<template>
  <div>
    <div
      class="relative h-[400px] bg-[url('~/assets/img/userBanner.jpg')] bg-cover bg-center"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="hidden text-4xl">會員專區</h1>
        <img src="~/assets/img/t-user.png" alt="會員專區" />
      </div>
    </div>
    <div class="container mx-auto max-w-[1000px] px-4 py-10">
      <div class="flex justify-end">
        <button class="btn-outline px-16 py-4" @click="logout">會員登出</button>
      </div>
      <div class="grid grid-cols-2 gap-10">
        <div class="col-span-2 space-y-6 md:col-span-1">
          <h2 class="text-4xl">會員資訊</h2>
          <ClientOnly>
            <form
              class="grid grid-cols-2 gap-4"
              @submit.prevent="saveNewUserData"
            >
              <div class="col-span-1 space-y-2">
                <label>姓名:</label>
                <input
                  id="orderName"
                  class="w-full border border-black p-4"
                  type="text"
                  placeholder="姓名"
                  required
                  v-model="newUserData.name"
                  v-if="editMode"
                />
                <p v-else>{{ userStore.name }}</p>
              </div>
              <div class="col-span-1 space-y-2">
                <label>電話:</label>
                <input
                  id="orderName"
                  class="w-full border border-black p-4"
                  type="tel"
                  placeholder="電話"
                  required
                  v-model="newUserData.phone"
                  v-if="editMode"
                />
                <p v-else>{{ userStore.phone }}</p>
              </div>
              <div class="col-span-1 space-y-2">
                <label>Email:</label>
                <input
                  id="orderName"
                  class="w-full border border-black p-4"
                  type="email"
                  placeholder="Email"
                  required
                  v-model="newUserData.email"
                  v-if="editMode"
                />
                <p v-else>{{ userStore.email }}</p>
              </div>
              <div class="col-span-2 flex justify-center">
                <div class="flex w-full space-x-4" v-if="editMode">
                  <button
                    class="btn-outline w-full py-4"
                    @click="editMode = false"
                  >
                    取消
                  </button>
                  <button class="btn-primary-dark w-full py-4" type="submit">
                    保存
                  </button>
                </div>
                <button
                  class="btn-primary-dark w-full py-4"
                  @click="editMode = true"
                  v-else
                >
                  編輯
                </button>
              </div>
            </form>
          </ClientOnly>
        </div>
        <div class="col-span-2 space-y-6 md:col-span-1">
          <h2 class="text-4xl">歷史訂單</h2>
          <div v-if="orders.length">
            <ul class="space-y-4">
              <li
                class="cursor-pointer space-y-4 border p-4 shadow transition-shadow duration-300 hover:shadow-xl"
                v-for="order in orders"
                :key="order._id"
                @click="router.push(`/order/${order._id}`)"
              >
                <div class="flex w-full items-center space-x-4">
                  <img
                    class="h-1/3 w-1/3 md:h-20 md:w-20"
                    :src="order.cart[0].photo"
                    :alt="order.cart[0].title"
                  />
                  <div
                    class="w-full items-center justify-between space-y-2 md:flex md:space-y-0"
                  >
                    <div class="min-w-40 font-bold">
                      {{ order.cart[0].title }}
                    </div>
                    <div class="flex items-center justify-between space-x-2">
                      <span class="font-bold text-primary">
                        ${{ order.cart[0].price }}
                      </span>
                      <span> × {{ order.cart[0].count }}</span>
                    </div>
                  </div>
                </div>
                <div class="text-center" v-if="order.cart.length > 1">
                  （訂單尚有其它商品）
                </div>
                <div class="flex justify-between border-t border-black pt-4">
                  <div>訂單狀態: {{ order.status }}</div>
                  <div>
                    總金額：
                    <span class="font-bold text-primary">
                      ${{ getTotalPrice(order) }}</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="text-center" v-else>尚無訂單</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const { public: config } = useRuntimeConfig();
import { useUserStore } from "~/stores/user";
import { useAlertStore } from "~/stores/alert";
import { useLoadingStore } from "~/stores/loading";

const userStore = useUserStore();
const alertStore = useAlertStore();
const loadingStore = useLoadingStore();
const router = useRouter();

// 登出
interface LogoutRes {
  message: string;
}
const logout = async () => {
  try {
    loadingStore.loadingShow = true;
    const res = await $fetch<LogoutRes>(`${config.API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res) {
      sessionStorage.removeItem("accessToken");
      userStore.resetUserStore();
      router.push("/");
      alertStore.showAlert(res.message);
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response?._data?.message);
    loadingStore.loadingShow = false;
  }
};

// 修改會員資料
const editMode = ref(false);
const newUserData = ref({
  name: userStore.name,
  phone: userStore.phone,
  email: userStore.email,
});
interface PutUserRes {
  message: string;
}
const saveNewUserData = async () => {
  try {
    loadingStore.loadingShow = true;
    const token = sessionStorage.getItem("accessToken");
    const { name, phone, email } = newUserData.value;
    const res = await $fetch<PutUserRes>(`${config.API_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        name,
        phone,
        email,
      },
    });
    if (res) {
      userStore.name = name;
      userStore.phone = phone;
      userStore.email = email;
      editMode.value = false;
      alertStore.showAlert(res.message);
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response?._data?.message);
    loadingStore.loadingShow = false;
  }
};

// 取得訂單記錄
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
const orders = ref([] as Order[]);
const getOrders = async () => {
  try {
    loadingStore.loadingShow = true;
    const token = sessionStorage.getItem("accessToken");
    const res = await $fetch<Order[]>(`${config.API_BASE_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      orders.value = res;
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response?._data?.message);
    loadingStore.loadingShow = false;
  }
};

// 訂單總金額
const getTotalPrice = (order: Order) => {
  let sum = 0;
  order.cart.forEach((item) => {
    sum += item.price * item.count;
  });
  return sum;
};

onMounted(() => {
  getOrders();
});
</script>

<style></style>
