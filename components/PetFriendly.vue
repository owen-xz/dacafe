<template>
  <section
    id="PetFriendly"
    class="space-y-6 bg-cover py-10 md:space-y-10 md:p-10"
    data-aos="fade-up"
  >
    <div class="flex justify-center">
      <img src="~/assets/img/t-petfriendly.png" alt="寵物友善" />
    </div>
    <div
      class="md-p-0 container mx-auto grid grid-cols-12 gap-6 px-10 md:px-0 lg:gap-10"
    >
      <div
        class="col-span-12 space-y-6 md:col-span-6 md:mx-0 lg:col-span-7 xl:col-span-8"
      >
        <ul class="space-y-4" id="petFriendlyList">
          <li
            class="group"
            data-aos="fade-right"
            data-aos-anchor="#petFriendlyList"
            @click="changeTab(1)"
          >
            <h3
              class="cursor-pointer bg-white p-3 transition-shadow duration-300 group-hover:shadow-lg"
              :class="
                nowTab === 1 ? 'text-primary shadow-lg' : 'text-black shadow-md'
              "
            >
              <span class="me-2">
                <i class="bi bi-lightbulb-fill"></i>
              </span>
              餐廳允許哪些種類的寵物進入？
            </h3>
            <p
              class="overflow-hidden border-l-4 border-primary text-secondary transition-all duration-300"
              :class="
                nowTab === 1
                  ? 'my-4 max-h-[200px] p-4'
                  : 'my-0 max-h-0 px-4 py-0'
              "
            >
              我們歡迎所有大小的犬隻、貓咪以及其他溫馴的小型寵物，例如兔子或豚鼠。若有特殊寵物，建議提前告知以確保適當安排。
            </p>
          </li>
          <li
            data-aos="fade-right"
            data-aos-anchor="#petFriendlyList"
            data-aos-delay="100"
            @click="changeTab(2)"
            class="group"
          >
            <h3
              class="cursor-pointer bg-white p-3 transition-shadow duration-300 group-hover:shadow-lg"
              :class="
                nowTab === 2 ? 'text-primary shadow-lg' : 'text-black shadow-md'
              "
            >
              <span class="me-2">
                <i class="bi bi-lightbulb-fill"></i>
              </span>
              餐廳是否提供寵物專屬的餐點或飲品？
            </h3>
            <p
              class="overflow-hidden border-l-4 border-primary text-secondary transition-all duration-300"
              :class="
                nowTab === 2
                  ? 'my-4 max-h-[200px] p-4'
                  : 'my-0 max-h-0 px-4 py-0'
              "
            >
              是的！我們特別推出多款寵物專屬健康餐點，例如狗狗造型蛋糕、無添加物肉泥，以及清涼的寵物飲品，讓毛孩和飼主一起享受用餐時光。
            </p>
          </li>
          <li
            data-aos="fade-right"
            data-aos-anchor="#petFriendlyList"
            data-aos-delay="200"
            @click="changeTab(3)"
            class="group"
          >
            <h3
              class="cursor-pointer bg-white p-3 transition-shadow duration-300 group-hover:shadow-lg"
              :class="
                nowTab === 3 ? 'text-primary shadow-lg' : 'text-black shadow-md'
              "
            >
              <span class="me-2">
                <i class="bi bi-lightbulb-fill"></i>
              </span>
              寵物需要佩戴牽繩或進行其他防護措施嗎？
            </h3>
            <p
              class="overflow-hidden border-l-4 border-primary text-secondary transition-all duration-300"
              :class="
                nowTab === 3
                  ? 'my-4 max-h-[200px] p-4'
                  : 'my-0 max-h-0 px-4 py-0'
              "
            >
              為了維持餐廳內的安全與秩序，我們要求所有寵物在餐廳內需佩戴牽繩或置於寵物包中。同時，請飼主確保毛孩保持安靜且友善。
            </p>
          </li>
          <li
            data-aos="fade-right"
            data-aos-anchor="#petFriendlyList"
            data-aos-delay="300"
            @click="changeTab(4)"
            class="group"
          >
            <h3
              class="cursor-pointer bg-white p-3 transition-shadow duration-300 group-hover:shadow-lg"
              :class="
                nowTab === 4 ? 'text-primary shadow-lg' : 'text-black shadow-md'
              "
            >
              <span class="me-2">
                <i class="bi bi-lightbulb-fill"></i>
              </span>
              餐廳是否有提供寵物相關設施？
            </h3>
            <p
              class="overflow-hidden border-l-4 border-primary text-secondary transition-all duration-300"
              :class="
                nowTab === 4
                  ? 'my-4 max-h-[200px] p-4'
                  : 'my-0 max-h-0 px-4 py-0'
              "
            >
              有的！我們設有寵物飲水站、專屬的休息區以及寵物友善洗手間，還提供免費的清潔用品，方便飼主即時清理意外狀況。
            </p>
          </li>
          <li
            data-aos="fade-right"
            data-aos-anchor="#petFriendlyList"
            data-aos-delay="400"
            @click="changeTab(5)"
            class="group"
          >
            <h3
              class="0 cursor-pointer bg-white p-3 transition-shadow duration-300 group-hover:shadow-lg"
              :class="
                nowTab === 5 ? 'text-primary shadow-lg' : 'text-black shadow-md'
              "
            >
              <span class="me-2">
                <i class="bi bi-lightbulb-fill"></i>
              </span>
              如果其他客人對寵物過敏或感到不適怎麼辦？
            </h3>
            <p
              class="overflow-hidden border-l-4 border-primary text-secondary transition-all duration-300"
              :class="
                nowTab === 5
                  ? 'my-4 max-h-[200px] p-4'
                  : 'my-0 max-h-0 px-4 py-0'
              "
            >
              我們設有寵物專區和一般區域，讓每位客人都能享受舒適的用餐環境。若有特殊需求，請提前告知我們的工作人員，我們會盡力協調安排。
            </p>
          </li>
        </ul>
      </div>
      <div class="col-span-6 hidden md:block lg:col-span-5 xl:col-span-4">
        <img
          class="h-[500px] w-full object-cover"
          src="~/assets/img/dog.jpg"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// 切換 tab
const nowTab = ref(1);
const changeTab = (tab: number) => {
  if (tab === nowTab.value) {
    nowTab.value = 0;
  } else {
    nowTab.value = tab;
  }
};
</script>
