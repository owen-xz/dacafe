<template>
  <section
    id="Banner"
    class="relative flex h-[100vh] items-center justify-center bg-[url('~/assets/img/banner.jpg')] bg-no-repeat"
    ref="banner"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="absolute flex justify-center px-5 text-center text-white transition-opacity duration-1000"
      :class="logoOpacity ? 'opacity-0' : 'opacity-100'"
      ref="logo"
    >
      <h1 class="mb-3 hidden text-5xl md:text-[96px]">DACA</h1>
      <img
        class="w-1/2 md:w-1/3 lg:w-1/4"
        src="~/assets/img/logo.png"
        alt="DACA"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const { $gsap } = useNuxtApp() as { $gsap: typeof gsap };

const banner = ref();
const logo = ref();
const logoOpacity = ref(true);

onMounted(() => {
  const targetY = window.innerHeight / 2 - 60 - logo.value.offsetHeight / 2;
  $gsap.to(logo.value, {
    y: targetY,
    ease: "none",
    scrollTrigger: {
      trigger: banner.value,
      start: "top top",
      end: "center top",
      scrub: true,
    },
  });
  logoOpacity.value = false;
});
</script>

<style>
#Banner {
  animation: move-bg 15s infinite ease; /* 啟用動畫 */
}
@keyframes move-bg {
  0% {
    background-size: auto 100vh;
    background-position: center;
  }
  40% {
    background-size: auto 130vh;
    background-position: 10% top;
  }
  60% {
    background-size: auto 110vh;
    background-position: 70% 80%;
  }
  100% {
    background-size: auto 100vh;
    background-position: center;
  }
}
@media (min-width: 768px) {
  @keyframes move-bg {
    0% {
      background-size: auto 100vh;
      background-position: center;
    }
    40% {
      background-size: auto 150vh;
      background-position: 10% top;
    }
    60% {
      background-size: auto 130vh;
      background-position: 70% 80%;
    }
    100% {
      background-size: auto 100vh;
      background-position: center;
    }
  }
}
@media (min-width: 1024px) {
  @keyframes move-bg {
    0% {
      background-size: 190vh;
      background-position: center;
    }
    40% {
      background-size: 250vh;
      background-position: left top;
    }
    60% {
      background-size: 210vh;
      background-position: 80% 70%;
    }
    100% {
      background-size: 190vh;
      background-position: center;
    }
  }
}
@media (min-width: 1280px) {
  @keyframes move-bg {
    0% {
      background-size: 100vw;
      background-position: center;
    }
    40% {
      background-size: 130vw;
      background-position: left top;
    }
    60% {
      background-size: 110vw;
      background-position: 80% 70%;
    }
    100% {
      background-size: 100vw;
      background-position: center;
    }
  }
}
</style>
