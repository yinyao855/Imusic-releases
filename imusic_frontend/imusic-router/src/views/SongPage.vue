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
            <div class="">
              <div>
                <h1 class="text-gray-200 inline-block">歌手</h1>
                <p class="inline-block mx-20 text-gray-500">{{ songData.singer }}</p>
              </div>
              <div>
                <h1 class="text-gray-200 inline-block">时长</h1>
                <p class="inline-block mx-20 text-gray-500"> {{ songData.duration }}</p></div>
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
                <p class="inline-block mx-20 text-gray-500 mb-36"> {{ songData.like }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider lg:divider-horizontal"></div>
      <div class="grid flex-grow h-full card rounded-box mb-28 place-items-center">
        <div v-for="lyric in lyrics" class="text-gray-300">
          <p>{{lyric}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>