import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    phone: "",
    email: "",
    role: "",
  }),
  actions: {
    resetUserStore() {
      this.name = "";
      this.phone = "";
      this.email = "";
      this.role = "";
    },
  },
});
