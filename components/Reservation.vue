<template>
  <section id="Reservation" class="grid grid-cols-2 bg-bgDark">
    <div class="col-span-2 lg:col-span-1">
      <iframe
        class="h-full min-h-[500px] w-full lg:min-h-fit"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.616190983711!2d120.68228897479868!3d23.974008580156084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346931e2de0d0f9d%3A0x78bc89e21d417e6b!2zREFDQSDovJXpo5_lu5rlnYot6I2J5bGv54m56Imy5LiL5Y2I6Iy2fOi8lemjn-S4i-WNiOiMtnzovJXpo5_pu57lv4N86LyV6aOf5rKZ5ouJ6aSQfOaOqOiWpueGseWjk-WQkOWPuHzmjqjolqblkpblk6npo6985Lq65rCj5ZKW5ZOpfOeGsemWgOWSluWTqQ!5e0!3m2!1szh-TW!2stw!4v1736331428797!5m2!1szh-TW!2stw"
        width="600"
        height="450"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
    <div
      class="col-span-2 space-y-6 p-10 text-white md:space-y-10 lg:col-span-1"
    >
      <div class="flex items-center justify-center">
        <h2 class="text-2xl md:text-4xl">立即訂位</h2>
      </div>
      <form class="grid grid-cols-2 gap-4" @submit.prevent="sendReserved">
        <button
          class="btn-primary col-span-2 px-4 py-2"
          @click="setUserData"
          v-if="isUser"
        >
          帶入會員資料
        </button>
        <input
          class="col-span-1 bg-black p-4"
          type="text"
          placeholder="姓名"
          required
          v-model="reservationData.name"
        />
        <VueDatePicker
          v-model="reservationData.reservedTime"
          :ui="{ input: 'reservationDateInput' }"
          :min-date="new Date()"
          select-text="選擇"
          cancel-text="取消"
          placeholder="訂位日期"
          required
        />
        <input
          class="col-span-1 bg-black p-4"
          type="tel"
          placeholder="電話"
          required
          v-model="reservationData.phone"
        />
        <input
          class="col-span-1 bg-black p-4"
          type="email"
          placeholder="電子郵件"
          required
          v-model="reservationData.email"
        />
        <textarea
          class="col-span-2 bg-black p-4"
          placeholder="留言給我們"
          v-model="reservationData.note"
        ></textarea>
        <div class="col-span-2 flex justify-end">
          <button class="btn-primary px-10 py-4" type="submit">送出訂位</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useAlertStore } from "~/stores/alert";
import { useLoadingStore } from "~/stores/loading";
import { useUserStore } from "~/stores/user";

const alertStore = useAlertStore();
const loadingStore = useLoadingStore();
const userStore = useUserStore();

const reservationData = ref({
  name: "",
  phone: "",
  email: "",
  note: "",
  reservedTime: "",
});
interface PostReservationRes {
  message: string;
}
const sendReserved = async () => {
  const { reservedTime, ...others } = reservationData.value;
  const postData = {
    ...others,
    reservedTime: reservedTime ? new Date(reservedTime).toISOString() : "",
  };
  try {
    loadingStore.loadingShow = true;
    const res = await $fetch<PostReservationRes | null>(
      `${config.API_BASE_URL}/reservation`,
      { method: "POST", body: postData },
    );
    if (res) {
      reservationData.value = {
        name: "",
        phone: "",
        email: "",
        note: "",
        reservedTime: "",
      };
      alertStore.showAlert(res.message);
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response._data.message);
    loadingStore.loadingShow = false;
  }
};

// 帶入會員資料
const isUser = ref(false);
const setUserData = () => {
  reservationData.value.name = userStore.name;
  reservationData.value.phone = userStore.phone;
  reservationData.value.email = userStore.email;
};

onMounted(() => {
  if (sessionStorage.getItem("accessToken")) {
    isUser.value = true;
  }
});
</script>

<style>
.reservationDateInput {
  background-color: black !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  border: none !important;
  color: white !important;
}
.reservationDateInput::placeholder {
  color: white !important;
}
</style>
