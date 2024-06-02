<script setup>
import {ref} from "vue";

const show = ref(false);

function expandCard() {
  show.value = !show.value;
}

const title = "Imusic 开发团队"
//TODO: 这个介绍太简单了，可以多写一点
const text = "我们是一个有趣的团队~"

</script>

<template>
  <div class="card">
    <div
        class="relative bg-black w-[500px] group transition-all duration-700 aspect-video flex items-center justify-center"
        @click="expandCard" v-if="!show">
      <div
          class="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16">
        <p class="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
          Imusic 开发团队
        </p>
        <p class="px-10 text-[10px] sm:text-[12px] text-gray-700">
          欢迎了解我们团队的成员！
        </p>
        <p class="font-serif text-[10px] sm:text-[12px] text-gray-700">
          点击开启
        </p>
        <p class="font-sans text-[10px] text-gray-700 pt-5">CHAMPS-ELYSEES</p>
      </div>
      <button
          class="seal bg-rose-500 text-red-800 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center
          font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)]
          group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900">
        SMKY
      </button>
      <div
          class="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]"></div>
      <div
          class="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]"></div>
      <div
          class="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"></div>
      <div
          class="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"></div>
    </div>
  </div>

  <div class="paper flex flex-col items-center p-6 overflow-y-auto no-scrollbar" v-if="show">
    <div class="absolute right-8 hover:glass" @click="expandCard">
      <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <path
            d="M119.233957 66.85913l837.898911 837.898911-52.368365 52.368365-837.898911-837.898911 52.368365-52.368365Z"
            fill="#CCCCCC"></path>
        <path
            d="M957.140461 119.233957l-837.898911 837.898911-52.368365-52.368365 837.898911-837.898911 52.368365 52.368365Z"
            fill="#CCCCCC"></path>
      </svg>
    </div>

    <p class="text-4xl font-semibold text-gray-500 font-serif">
      {{ title }}
    </p>
    <br>
    <p class="px-10 text-lg text-gray-700">
      {{ text }}
    </p>
    <br>
    <figure>
      <img src="../assets/AboutUS.jpg" alt="关于我们" class="h-[360px] aspect-auto"/>
      <figcaption class="flex justify-center">全体成员</figcaption>
      <figcaption class="flex justify-center">从左至右依次为牛梓涵，张旖霜，薛惠天，卢思文和尹耀</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.paper {
  position: relative;
  box-sizing: border-box;
  width: 800px;
  height: 600px;
  background: #ffffff linear-gradient(#ffffff 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;
}

.paper::before,
.paper::after {
  position: absolute;
  content: "";
  bottom: 10px;
  width: 40%;
  height: 10px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.7);
  z-index: -1;
  transition: all 0.3s ease;
}

.paper::before {
  left: 15px;
  transform: skew(-5deg) rotate(-5deg);
}

.paper::after {
  right: 15px;
  transform: skew(5deg) rotate(5deg);
}

.paper:hover::before,
.paper:hover::after {
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.4);
}
</style>