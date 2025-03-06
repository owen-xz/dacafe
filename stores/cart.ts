import { defineStore } from "pinia";

interface CartItem {
  id: string;
  name: string;
  photo: string;
  price: number;
  count: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as CartItem[],
  }),
  actions: {
    updateCount(index: number, newCount: number) {
      if (newCount <= 0) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].count = newCount;
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
