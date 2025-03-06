<template>
  <section id="Speciality" class="overflow-hidden">
    <div class="relative grid h-screen w-screen grid-cols-2" ref="speciality">
      <div class="panel relative order-1 col-span-2 md:col-span-1">
        <div class="h-[25vh] md:h-[50vh]">
          <img
            class="img-a h-full w-full object-cover"
            src="~/assets/img/brunch.jpg"
            alt="DACA拼盤"
          />
        </div>
        <div
          class="text-box text-b absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-primary p-10 text-white opacity-0"
        >
          <h3 class="text-center text-4xl font-bold">精選沙拉</h3>
          <p class="md:hidden">健康與美味的完美結合！</p>
          <p class="hidden max-w-[500px] md:block">
            提供清爽生菜沙拉與溫沙拉兩種選擇，搭配鮮嫩蔬菜與特調醬料，還可選擇薑黃飯或全蔬菜組合，營養均衡，滿足您的健康飲食需求！
          </p>
        </div>
      </div>
      <div class="panel relative order-2 col-span-2 md:col-span-1">
        <div class="h-[25vh] md:h-[50vh]">
          <img
            class="img-b h-full w-full object-cover"
            src="~/assets/img/salad.jpg"
            alt="精選沙拉"
          />
        </div>
        <div
          class="text-box text-a absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-primary p-10 text-white opacity-0"
        >
          <h3 class="text-center text-4xl font-bold">DACA拼盤</h3>
          <p class="md:hidden">為您的味蕾帶來多層次享受！</p>
          <p class="hidden max-w-[500px] md:block">
            DACA
            拼盤匯聚多樣美味，提供滿足感十足的用餐體驗。特色吐司搭配多汁肉品與蛋品，營養滿分；酥脆薯條或冰烤地瓜滿足解饞需求，再配上清爽沙拉，均衡健康。無論早午餐或輕食時光，都是最佳選擇！
          </p>
        </div>
      </div>
      <div class="panel relative order-4 col-span-2 md:order-3 md:col-span-1">
        <div class="h-[25vh] md:h-[50vh]">
          <img
            class="img-c h-full w-full object-cover"
            src="~/assets/img/curry.jpg"
            alt="秘製咖喱"
          />
        </div>
        <div
          class="text-box text-d absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-primary p-10 text-white opacity-0"
        >
          <h3 class="text-center text-4xl font-bold">美式漢堡</h3>
          <p class="md:hidden">經典風味，一口品味美國精神！</p>
          <p class="hidden max-w-[500px] md:block">
            我們的美式漢堡採用手工新鮮肉品，口感紮實多汁，搭配香濃起司、爽脆生菜、鮮甜番茄與酸黃瓜，層次豐富。外酥內軟的漢堡麵包完美包裹美味，每一口都是經典美式風味，無論獨享或分享，都令人滿足！
          </p>
        </div>
      </div>
      <div class="panel relative order-3 col-span-2 md:order-4 md:col-span-1">
        <div class="h-[25vh] md:h-[50vh]">
          <img
            class="img-d h-full w-full object-cover"
            src="~/assets/img/burger.jpg"
            alt="美式漢堡"
          />
        </div>
        <div
          class="text-box text-c absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-primary p-10 text-white opacity-0"
        >
          <h3 class="text-center text-4xl font-bold">秘製咖喱</h3>
          <p class="md:hidden">滿足重口味的絕佳選擇！</p>
          <p class="hidden max-w-[500px] md:block">
            微辣醇厚的咖喱醬融合多種香料，搭配當季時蔬與金黃薑黃飯，帶來濃郁辛香與異國風味，專為重口味愛好者打造，每一口都令人回味無窮！
          </p>
        </div>
      </div>
      <div
        class="title absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 border-4 border-white bg-black p-6"
      >
        <img
          class="relative"
          src="~/assets/img/t-speciality.png"
          alt="特色料理"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AOS from "aos";

const { $gsap } = useNuxtApp() as { $gsap: typeof gsap };

const speciality = ref();

onMounted(() => {
  $gsap
    .timeline({
      scrollTrigger: {
        trigger: speciality.value,
        pin: true, // 固定區塊
        scrub: 1, // 平滑滾動
        start: "top top",
        end: "+=500%", // 控制動畫範圍
        onEnter: () => {
          AOS.refresh(); // 刷新 AOS
        },
      },
    })
    .to(".title", { opacity: 0, duration: 1 }, "step1") // 淡出title
    .to(".img-b, .img-c", { opacity: 0, duration: 1 }, "step1") // 淡出B & C
    .to(".text-a, .text-d", { opacity: 1, duration: 1 }, "step1") // 淡入A & D文字
    .to(".img-a, .img-d", { opacity: 0, duration: 1 }, "step2") // 淡出A & D
    .to(".img-b, .img-c", { opacity: 1, duration: 1 }, "step2") // 淡出B & C
    .to(".text-a, .text-d", { opacity: 0, duration: 1 }, "step2") // 淡出A & D文字
    .to(".text-b, .text-c", { opacity: 1, duration: 1 }, "step2") // 淡入B & C文字
    .to(".img-a, .img-d", { opacity: 1, duration: 1 }, "step3") // 淡入A & D
    .to(".text-b, .text-c", { opacity: 0, duration: 1 }, "step3") // 淡出B & C文字
    .to(".title", { opacity: 1, duration: 1 }, "step3"); // 淡入title
});
</script>

<style></style>
