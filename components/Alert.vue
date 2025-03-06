<script lang="ts" setup>
import { useAlertStore } from "~/stores/alert";

const alertStore = useAlertStore();
</script>
<template>
  <div
    class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded border border-black bg-white"
    v-if="alertStore.alertShow"
  >
    <div class="space-y-4 p-4">
      <div>
        {{ alertStore.alertText }}
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="btn-outline px-10 py-4"
          @click="alertStore.hideAlert"
          v-if="alertStore.alertType === 'confirm'"
        >
          取消
        </button>
        <button
          class="px-10 py-4"
          :class="
            alertStore.alertType === 'confirm'
              ? 'btn-primary-dark'
              : 'btn-outline'
          "
          @click="alertStore.confirmAlert"
        >
          確定
        </button>
      </div>
    </div>
  </div>
</template>
