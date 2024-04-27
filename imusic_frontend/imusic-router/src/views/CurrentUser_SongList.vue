<script setup>
import {defineModel} from "vue"
const needtoaddSongid=defineModel('needtoaddSongid')
const CurrentUser_SongListdata = defineModel('CurrentUser_SongListdata')
</script>

<template>
  <div class="w-full h-screen flex flex-col">
      <div class="w-full h-32 flex">
        <div class="text-4xl text-white text-center m-auto">我创建的歌单</div>
      </div>
      <div class="w-full flex h-full">
        <div class="mx-8 my-8 h-64 w-64" v-for="(item, index) in CurrentUser_SongListdata" :key="index">
          <div class="relative cursor-pointer h-4/5 aspect-square mx-auto">
            <img :src="item.cover" alt="歌单封面" class="h-full aspect-square rounded-2xl" @click="addtosonglist(index)">
            <!-- 这是悬停时显示的蒙版 -->
            <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-2xl"></div>
          </div>
          <div class="text-center text-lg h-1/5 mx-auto text-white">{{ item.title }}</div>
        </div>
      </div>
  </div>
</template>

<style scoped>

</style>