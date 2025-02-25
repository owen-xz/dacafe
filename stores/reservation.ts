import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservationDialogShow: false,
  }),
  actions: {},
});
