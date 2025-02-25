<template>
  <div
    class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm"
    v-if="loadingStore.loadingShow"
  >
    <svg class="h-16 w-16 animate-spin" viewBox="0 0 50 50">
      <circle
        class="stroke-primary"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
        stroke-dasharray="100"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { useLoadingStore } from "../stores/loading";
const loadingStore = useLoadingStore();
</script>

<style></style>
