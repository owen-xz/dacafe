<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import { useAlertStore } from "~/stores/alert";
import { useDialogStore } from "~/stores/dialog";
import { useLoadingStore } from "~/stores/loading";
import { useUserStore } from "~/stores/user";

const alertStore = useAlertStore();
const dialogStore = useDialogStore();
const loadingStore = useLoadingStore();
const userStore = useUserStore();

// 開啟時 focus input
const loginInputFormBtn = ref();
const emailInput = ref();
watch(
  () => dialogStore.loginDialogShow,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        emailInput.value.focus();
      });
    }
  },
);

// 登入
const loginData = ref({
  email: "",
  password: "",
});
interface LoginRes {
  accessToken: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}
const login = async () => {
  try {
    const { email, password } = loginData.value;
    loadingStore.loadingShow = true;
    const res = await $fetch<LoginRes>(`${config.API_BASE_URL}/login`, {
      method: "POST",
      body: {
        email,
        password,
      },
      credentials: "include", // 讓後端在 Set-Cookie 時可作用
    });
    if (res) {
      sessionStorage.setItem("accessToken", res.accessToken);
      userStore.name = res.name;
      userStore.phone = res.phone;
      userStore.email = res.email;
      userStore.role = res.role;
      hideLoginDialog();
      alertStore.showAlert("登入成功");
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response?._data?.message);
    loadingStore.loadingShow = false;
  }
};

// 註冊
const signupMode = ref(false);
const signupInputFormBtn = ref();
const signupData = ref({
  name: "",
  phone: "",
  email: "",
  password: "",
});
interface SignupRes {
  message: string;
}
const signup = async () => {
  try {
    const { name, phone, email, password } = signupData.value;
    loadingStore.loadingShow = true;
    const res = await $fetch<SignupRes>(`${config.API_BASE_URL}/signup`, {
      method: "POST",
      body: {
        name,
        phone,
        email,
        password,
      },
    });
    if (res) {
      signupMode.value = false;
      alertStore.showAlert(res.message);
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response?._data?.message);
    loadingStore.loadingShow = false;
  }
};

// 關閉註冊模式
const hideSignupMode = () => {
  signupData.value = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };
  signupMode.value = false;
};

// 關閉 dialog
const hideLoginDialog = () => {
  loginData.value = {
    email: "",
    password: "",
  };
  dialogStore.loginDialogShow = false;
};
</script>
<template>
  <div
    class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded border border-black bg-white p-4"
    v-if="dialogStore.loginDialogShow"
  >
    <div class="space-y-4" v-if="signupMode">
      <div>會員註冊</div>
      <form class="space-y-2" @submit.prevent="signup">
        <div>
          <label for="signupName">姓名</label>
          <input
            class="w-full border border-black p-4"
            id="signupName"
            type="text"
            required
            placeholder="姓名"
            v-model="signupData.name"
          />
        </div>
        <div>
          <label for="signupPhone">電話</label>
          <input
            class="w-full border border-black p-4"
            id="signupPhone"
            type="tel"
            required
            placeholder="電話"
            v-model="signupData.phone"
          />
        </div>
        <div>
          <label for="signupEmail">Email</label>
          <input
            class="w-full border border-black p-4"
            id="signupEmail"
            type="email"
            required
            placeholder="Email"
            v-model="signupData.email"
          />
        </div>
        <div>
          <label for="signupPassword">密碼</label>
          <input
            class="w-full border border-black p-4"
            id="sugnupPassword"
            type="password"
            required
            placeholder="密碼"
            v-model="signupData.password"
          />
        </div>
        <button class="hidden" type="submit" ref="signupInputFormBtn"></button>
      </form>
      <div class="flex justify-center space-x-4">
        <button class="btn-outline w-full py-4" @click="hideSignupMode">
          取消
        </button>
        <button
          class="btn-primary-dark w-full py-4"
          @click="signupInputFormBtn.click()"
        >
          註冊
        </button>
      </div>
    </div>
    <div class="space-y-4" v-else>
      <div>會員登入</div>
      <form class="space-y-2" @submit.prevent="login">
        <div>
          <label for="loginEmail">Email</label>
          <input
            class="w-full border border-black p-4"
            id="loginEmail"
            type="email"
            ref="emailInput"
            required
            placeholder="Email"
            v-model="loginData.email"
          />
        </div>
        <div>
          <label for="loginPassword">密碼</label>
          <input
            class="w-full border border-black p-4"
            id="loginPassword"
            type="password"
            required
            placeholder="密碼"
            v-model="loginData.password"
          />
        </div>
        <button class="hidden" type="submit" ref="loginInputFormBtn"></button>
      </form>
      <div>
        沒有帳號嗎？
        <button class="cursor-pointer underline" @click="signupMode = true">
          立即註冊
        </button>
      </div>
      <div class="flex justify-center space-x-4">
        <button class="btn-outline w-full py-4" @click="hideLoginDialog">
          取消
        </button>
        <button
          class="btn-primary-dark w-full py-4"
          @click="loginInputFormBtn.click()"
        >
          登入
        </button>
      </div>
    </div>
  </div>
</template>
