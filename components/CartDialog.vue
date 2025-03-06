<script lang="ts" setup>
import { useDialogStore } from "~/stores/dialog";
import { useCartStore } from "~/stores/cart";
import Counter from "./Counter.vue.vue";

const dialogStore = useDialogStore();
const cartStore = useCartStore();
const router = useRouter();

// 頁面跳轉
const goPage = (page: string) => {
  router.push({ path: `/${page}` });
  dialogStore.cartDialogShow = false;
};
</script>
<template>
  <div
    class="fixed left-1/2 top-1/2 z-50 min-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded border border-black bg-white p-4"
    v-if="dialogStore.cartDialogShow"
  >
    <div class="space-y-4">
      <div>您的購物車</div>
      <ul class="space-y-4" v-if="cartStore.cart.length">
        <li
          class="flex items-center space-x-2"
          v-for="(item, index) in cartStore.cart"
          :key="item.id"
        >
          <img class="h-16 w-16" :src="item.photo" alt="item.name" />
          <div class="w-full items-center justify-between space-y-2 md:flex">
            <div class="min-w-40 font-bold">{{ item.name }}</div>
            <div class="flex items-center justify-between space-x-2">
              <span class="font-bold text-primary">${{ item.price }}</span>
              <Counter
                v-model:count="item.count"
                @update:count="cartStore.updateCount(index, $event)"
              />
            </div>
          </div>
        </li>
      </ul>
      <p class="text-center" v-else>購物車尚無商品</p>
      <div class="flex justify-center space-x-4">
        <button
          class="btn-outline w-full py-4"
          @click="dialogStore.cartDialogShow = false"
        >
          關閉
        </button>
        <button
          class="btn-primary-dark w-full py-4"
          @click="goPage('order')"
          v-if="cartStore.cart.length"
        >
          前往結賬
        </button>
        <button
          class="btn-primary-dark w-full py-4"
          @click="goPage('product')"
          v-else
        >
          前往訂餐
        </button>
      </div>
    </div>
  </div>
</template>
