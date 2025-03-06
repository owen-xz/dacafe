import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    reservationDialogShow: false,
    loginDialogShow: false,
    cartDialogShow: false,
    userDialogShow: false,
  }),
  actions: {},
});
