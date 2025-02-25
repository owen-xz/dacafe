<script lang="ts" setup>
const { public: config } = useRuntimeConfig();
import { ref, watch, nextTick } from "vue";
import { useAlertStore } from "~/stores/alert";
import { useReservationStore } from "~/stores/reservation";
import { useLoadingStore } from "~/stores/loading";
import dayjs from "dayjs";

const alertStore = useAlertStore();
const reservationStore = useReservationStore();
const loadingStore = useLoadingStore();

// 開啟時 focus input
const telInputFormBtn = ref();
const telInput = ref();
watch(
  () => reservationStore.reservationDialogShow,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        telInput.value.value = "";
        telInput.value.focus();
      });
    }
  },
);

// 查看是否已訂位
const reservationData = ref({
  id: "",
  name: "",
  phone: "",
  email: "",
  note: "",
  reservedTime: "",
});
interface GetReservationRes {
  _id: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  reservedTime: string;
  status: string;
}
const checkIsReserved = async () => {
  try {
    loadingStore.loadingShow = true;
    const res = await $fetch<GetReservationRes | null>(
      `${config.API_BASE_URL}/reservation/${reservationData.value.phone}`,
    );
    if (res) {
      reservationData.value = {
        id: res._id,
        name: res.name,
        phone: res.phone,
        email: res.email,
        note: res.note,
        reservedTime: res.reservedTime,
      };
    } else {
      reservationStore.reservationDialogShow = false;
      alertStore.showAlert("尚無訂位記錄，或訂位已過期");
    }
    loadingStore.loadingShow = false;
  } catch (error: any) {
    alertStore.showAlert(error.response._data.message);
  }
};

// 取消訂位
interface PutReservationRes {
  message: string;
}
const cancelReserved = async () => {
  alertStore.showAlert("確定取消此訂位嗎？", "confirm", async () => {
    try {
      loadingStore.loadingShow = true;
      const res = await $fetch<PutReservationRes | null>(
        `${config.API_BASE_URL}/reservation/${reservationData.value.id}`,
        {
          method: "PUT",
          body: {
            status: "cancelled",
          },
        },
      );
      if (res) {
        hideReservationDialog();
        alertStore.showAlert(res.message);
      }
      loadingStore.loadingShow = false;
    } catch (error: any) {
      alertStore.showAlert(error.response._data.message);
    }
  });
};

// 關閉 dialog
const hideReservationDialog = () => {
  reservationData.value = {
    id: "",
    name: "",
    phone: "",
    email: "",
    note: "",
    reservedTime: "",
  };
  reservationStore.reservationDialogShow = false;
};
</script>
<template>
  <div
    class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded border border-black bg-white p-4"
    v-if="reservationStore.reservationDialogShow"
  >
    <div class="space-y-4" v-if="!reservationData.id">
      <div>訂位記錄查詢</div>
      <form @submit.prevent="checkIsReserved">
        <input
          class="w-full border border-black p-4"
          type="tel"
          ref="telInput"
          required
          placeholder="訂位電話"
          v-model="reservationData.phone"
        />
        <button type="submit" ref="telInputFormBtn"></button>
      </form>
      <div class="flex justify-center space-x-4">
        <button class="btn-outline w-full py-4" @click="hideReservationDialog">
          取消
        </button>
        <button class="btn w-full py-4" @click="telInputFormBtn.click()">
          確定
        </button>
      </div>
    </div>
    <div class="space-y-4" v-else>
      <div>您的訂位資訊：</div>
      <ul class="space-y-2">
        <li>姓名：{{ reservationData.name }}</li>
        <li>電話：{{ reservationData.phone }}</li>
        <li>Email：{{ reservationData.email }}</li>
        <li>備註：{{ reservationData.note || "無" }}</li>
        <li>
          訂位日期：{{
            dayjs(reservationData.reservedTime).format("YYYY/MM/DD HH:mm")
          }}
        </li>
      </ul>
      <div class="flex justify-center space-x-4">
        <button class="btn-outline px-10 py-4" @click="hideReservationDialog">
          關閉
        </button>
        <button class="btn px-10 py-4" @click="cancelReserved">取消訂位</button>
      </div>
    </div>
  </div>
</template>
