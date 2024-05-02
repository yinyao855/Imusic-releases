<script setup>
import {defineModel, ref} from "vue";
import buttonchangesize from "@/components/buttonchangesize.vue";
import axios from "axios";

const songData = defineModel('SongData')
const emits = defineEmits(['CloseSong'])
const token = defineModel('token')
const lyrics = defineModel('lyrics')
const fullsize = () => {
  emits('CloseSong');
}
const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
  <div>
    <div>
      <h1 class="text-4xl text-white text-center my-5">{{ songData.title }}</h1>
    </div>
    <div class="my-10 flex flex-col w-full lg:flex-row">
      <div class="grid flex-grow h-full card rounded-box place-items-center">
        <div class="">
          <div class="">
            <img :src="songData.cover" alt="歌曲封面"
                 class="h-56 w-56 aspect-square rounded-xl border-gray-300 border-e-2 border-b-2">
            <div class="mt-5 text-white">
              <svg class="icon fill-white my-auto inline-block align-sub mr-8 ml-2"
                   viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path
                    d="M744.0384 131.6864a209.5104 209.5104 0 0 1 190.976 124.8256c0.4096 0.9216 0.8192 1.9968 1.28 3.1232a241.0496 241.0496 0 0 1 15.0016 59.1872v0.9728a230.4 230.4 0 0 1 1.9456 30.72A247.04 247.04 0 0 1 880.64 526.0288l-363.52 363.52a9.0624 9.0624 0 0 1-6.5536 2.7136 8.9088 8.9088 0 0 1-6.3488-2.56l-359.0656-358.912a252.16 252.16 0 0 1-74.496-184.32v-0.3584A250.4704 250.4704 0 0 1 87.04 259.9424a208.896 208.896 0 0 1 259.6864-116.1216 217.856 217.856 0 0 1 111.36 93.1328A59.8528 59.8528 0 0 0 510.0032 266.24H517.12l6.8608-1.6896a61.696 61.696 0 0 0 34.0992-22.4256l1.792-2.4064 1.536-2.6112a198.912 198.912 0 0 1 21.76-30.1568l0.512-0.5632 0.512-0.5632c2.4064-2.8672 4.7616-5.5296 7.2192-8.0896 1.4336-1.536 3.072-3.2768 3.8912-3.9936l0.8192-0.8192 0.8192-0.768c2.9696-2.9696 5.12-5.12 7.68-7.2192 4.0448-3.5328 7.424-6.2976 10.24-8.4992l0.6144-0.4608 0.5632-0.4608c2.8672-2.2528 6.3488-4.6592 10.24-7.3728s8.2944-5.4272 11.776-7.424c3.5328-2.048 7.0656-3.9424 10.5984-5.7344a210.944 210.944 0 0 1 93.952-22.2208m0-57.4464A268.1856 268.1856 0 0 0 624.2816 102.4c-4.5568 2.304-9.1648 4.8128-13.7728 7.4752s-9.9328 6.144-14.8992 9.3696-9.5744 6.5536-14.1824 10.24-9.216 7.2704-13.6192 11.1104-7.424 6.656-11.0592 10.24c-2.5088 2.304-4.8128 4.8128-7.1168 7.2704-3.2256 3.4816-6.2976 6.912-9.3696 10.5472a258.048 258.048 0 0 0-28.16 38.8608 3.3792 3.3792 0 0 1-2.0992 1.3312 2.6624 2.6624 0 0 1-2.4576-1.3312 275.2512 275.2512 0 0 0-141.5168-117.76A266.24 266.24 0 0 0 34.0992 237.3632v0.3584a314.2144 314.2144 0 0 0 70.656 333.7216l358.9632 358.912a66.56 66.56 0 0 0 93.952 0l363.776-363.52a305.152 305.152 0 0 0 89.6-216.32 280.832 280.832 0 0 0-2.5088-38.2976 299.1616 299.1616 0 0 0-19.1488-74.8544c-0.3584-0.768-0.5632-1.3312-0.768-1.8944a266.9568 266.9568 0 0 0-244.6336-161.2288z"
                ></path>
              </svg>
              <p class="inline-block"> {{ songData.like }} </p>
            </div>
            <div class="mx-5">
              <div>
                <h1 class="text-gray-200 inline-block mt-5">歌手</h1>
                <p class="inline-block mx-20 text-gray-500">{{ songData.singer }}</p>
              </div>
              <div>
                <h1 class="text-gray-200 inline-block">时长</h1>
                <p class="inline-block mx-20 text-gray-500"> {{ gettime(songData.duration) }}</p></div>
              <div>
                <h1 class="text-gray-200 inline-block">上传者</h1>
                <p class="inline-block mx-16 text-gray-500"> {{ songData.uploader }}</p>
              </div>
              <div>
                <h1 class="text-gray-200 inline-block">上传日期</h1>
                <p class="inline-block mx-11 text-gray-500"> {{ songData.upload_date }}</p>
              </div>
              <div>
                <h1 class="text-gray-200 inline-block">收藏</h1>
                <p class="inline-block mx-20 text-gray-500"> {{ songData.like }}</p>
              </div>
            </div>
            <div>
              <details class="dropdown m-2 cursor-pointer">
                <summary class="text-white">简介</summary>
                <ul class="m-1 p-2 shadow menu dropdown-content z-[1] bg-base-100 text-gray-600 rounded-box w-96">
                  <li><a>{{
                      songData.introduction === 'null' || songData.introduction === null ? '无简介' : songData.introduction
                    }}</a></li>
                </ul>
              </details>
            </div>
          </div>
        </div>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow h-full card rounded-box mb-28 place-items-center mr-16 py-8">
        <div v-for="lyric in lyrics" class="text-gray-300">
          <p>{{ lyric }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>