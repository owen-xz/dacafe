import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alertShow: false,
    alertText: "",
    alertType: "",
    alertCallback: null as (() => Promise<void> | void) | null,
  }),
  actions: {
    showAlert(
      alertText: string,
      alertType: string = "alert",
      callback: () => Promise<void> | void = () => {
        this.hideAlert();
      },
    ) {
      this.alertText = alertText;
      this.alertType = alertType;
      this.alertCallback = callback;
      this.alertShow = true;
    },
    hideAlert() {
      this.alertShow = false;
      this.alertText = "";
      this.alertType = "";
      this.alertCallback = null;
    },
    async confirmAlert() {
      if (this.alertCallback) {
        await this.alertCallback();
      }
    },
  },
});
