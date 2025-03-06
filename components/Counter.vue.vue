<template>
  <div class="flex items-center">
    <button
      class="btn-outline flex h-8 w-8 items-center justify-center border text-2xl"
      @click="decrement"
    >
      -
    </button>
    <div class="flex h-8 w-16 items-center justify-center border border-black">
      {{ modelValue }}
    </div>
    <button
      class="btn-outline flex h-8 w-8 items-center justify-center border text-2xl"
      @click="increment"
    >
      +
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  count: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:count"]);

const modelValue = computed({
  get() {
    return props.count;
  },
  set(value) {
    emit("update:count", Number(value));
  },
});

const decrement = () => {
  emit("update:count", props.count - 1);
};

const increment = () => {
  emit("update:count", props.count + 1);
};
</script>

<style></style>
