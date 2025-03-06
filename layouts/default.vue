<script lang="ts" setup>
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
const { public: config } = useRuntimeConfig();
import Alert from "~/components/Alert.vue";
import LoginDialog from "~/components/LoginDialog.vue";
import ReservationDialog from "~/components/ReservationDialog.vue";
import CartDialog from "~/components/CartDialog.vue";
import Loading from "~/components/Loading.vue";
import { useLoadingStore } from "../stores/loading";
import { useAlertStore } from "../stores/alert";
import { useDialogStore } from "../stores/dialog";
import { useCartStore } from "../stores/cart";
import { useUserStore } from "../stores/user";

const route = useRoute();
const router = useRouter();
const loadingStore = useLoadingStore();
const alertStore = useAlertStore();
const dialogStore = useDialogStore();
const cartStore = useCartStore();
const userStore = useUserStore();

// 內容高度
const footer = ref();
const contentHeight = computed(() => {
  return footer.value ? window.innerHeight - footer.value.offsetHeight : 0;
});

// header 顯示
const isHeaderShow = ref(true);
const isListShow = ref(false);
let lastScrollY = 0;
let isFirstScroll = true;
const handleScroll = () => {
  if (route.path !== "/") {
    isHeaderShow.value = true;
    return;
  }
  if (isFirstScroll) {
    isFirstScroll = false;
    return;
  }
  let currentScrollY = window.scrollY;
  if (!isListShow.value) {
    isHeaderShow.value = currentScrollY < lastScrollY;
  }
  lastScrollY = currentScrollY;
};

// header 捷徑滾動
const scrollToSection = (id: string) => {
  if (route.path !== "/") {
    if (id) {
      router.push({ path: "/", hash: `#${id}` });
    } else {
      router.push({ path: "/" });
    }
  } else {
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth", // 平滑滾動
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 平滑滾動
      });
    }
  }
  isListShow.value = false;
};

// 頁面跳轉
const goPage = (path: string) => {
  router.push(path);
  isListShow.value = false;
};

// 會員專區
const showUserDialog = () => {
  if (sessionStorage.getItem("accessToken")) {
    router.push("/user");
  } else {
    dialogStore.loginDialogShow = true;
  }
  isListShow.value = false;
};

// 取得會員資料
interface GetUserRes {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}
const getUserData = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    try {
      const res = await $fetch<GetUserRes>(`${config.API_BASE_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        const { name, phone, email, role } = res;
        userStore.name = name;
        userStore.phone = phone;
        userStore.email = email;
        userStore.role = role;
      }
    } catch (error: any) {
      console.log(error.response);
    }
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  AOS.init();
  if (localStorage.getItem("cart")) {
    cartStore.cart = JSON.parse(localStorage.getItem("cart") as string);
  }
  await getUserData();
  loadingStore.loadingShow = false;
  window.onload = () => {
    loadingStore.loadingShow = false;
  };
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div class="relative">
    <div class="lg:container">
      <div
        class="fixed top-0 z-50 flex w-full items-center justify-between bg-black bg-opacity-85 px-10 text-white transition-all duration-500"
        :class="isHeaderShow ? 'h-16' : 'h-0 overflow-hidden'"
      >
        <button
          class="h-full py-2 transition-all duration-500"
          @click="scrollToSection('')"
        >
          <img class="h-full" src="~/assets/img/logo-sm.png" alt="DACA" />
        </button>
        <ul
          class="absolute inset-0 top-16 z-50 overflow-hidden transition-all duration-500 lg:relative lg:top-0 lg:flex lg:h-auto"
          :class="` ${isListShow ? 'h-screen' : 'h-0'}`"
        >
          <li
            class="border-t border-secondary bg-black bg-opacity-85 transition-all duration-500 lg:border-none lg:bg-opacity-0"
          >
            <button
              class="w-screen px-6 py-2 lg:w-auto"
              @click="scrollToSection('About')"
            >
              關於我們
            </button>
          </li>
          <li
            class="border-t border-secondary bg-black bg-opacity-85 transition-all duration-500 lg:border-none lg:bg-opacity-0"
          >
            <button
              class="block w-screen px-6 py-2 text-center lg:w-auto"
              @click="goPage('/product')"
            >
              餐點列表
            </button>
          </li>
          <li
            class="border-t border-secondary bg-black bg-opacity-85 transition-all duration-500 lg:border-none lg:bg-opacity-0"
          >
            <button
              class="w-screen px-6 py-2 lg:w-auto"
              @click="scrollToSection('News')"
            >
              最新消息
            </button>
          </li>
          <li
            class="border-t border-secondary bg-black bg-opacity-85 transition-all duration-500 lg:border-none lg:bg-opacity-0"
          >
            <button
              class="w-screen px-6 py-2 lg:w-auto"
              @click="scrollToSection('Reservation')"
            >
              訂位資訊
            </button>
          </li>
        </ul>
        <div class="space-x-6">
          <button class="text-2xl" @click="showUserDialog">
            <i class="bi bi-person"></i>
          </button>
          <button class="relative" @click="dialogStore.cartDialogShow = true">
            <div
              class="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm"
              v-if="cartStore.cart.length > 0"
            >
              {{ cartStore.cart.length }}
            </div>
            <i class="bi bi-cart text-2xl"></i>
          </button>
          <button class="text-2xl lg:hidden" @click="isListShow = !isListShow">
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
    </div>
    <div :style="`min-height: ${contentHeight}px`">
      <slot />
    </div>

    <div
      class="grid grid-cols-2 space-y-10 bg-bgDark p-10 text-white md:space-y-0 md:p-20"
      ref="footer"
    >
      <div class="col-span-2 space-y-4 md:col-span-1">
        <img class="w-[100px]" src="~/assets/img/logo.png" alt="DACA" />
        <div class="flex space-x-4">
          <a
            href="https://www.facebook.com/p/DACA-Brunch-%E6%97%A9%E5%8D%88%E9%A4%90-100092573923369/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white text-2xl transition-colors duration-300 hover:border-primary hover:bg-primary"
          >
            <i class="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/daca_petfriendly/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white text-2xl transition-colors duration-300 hover:border-primary hover:bg-primary"
          >
            <i class="bi bi-instagram"></i>
          </a>
          <a
            href="https://www.threads.net/@daca_petfriendly"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white text-2xl transition-colors duration-300 hover:border-primary hover:bg-primary"
          >
            <i class="bi bi-threads"></i>
          </a>
        </div>
        <p>© 2023 DacaBrunch 版權所有</p>
      </div>
      <div
        class="col-span-2 flex flex-col justify-center space-y-3 md:col-span-1"
      >
        <h3 class="text-xl font-bold">草屯總店</h3>
        <p>地址：南投縣草屯鎮中興路166號</p>
        <p>電話：(049)231-3828</p>
        <p>Email：dacabrunch2023@gmail.com</p>
      </div>
    </div>
    <LoginDialog />
    <ReservationDialog />
    <CartDialog />
    <Alert />
    <Loading />
  </div>
</template>
