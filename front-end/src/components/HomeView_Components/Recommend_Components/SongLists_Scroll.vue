<script setup>
import { HomeView_HotSongLists } from '@/js/BeforeEnterHomeView.js'
import { NavicatWidth, WindowWidth } from '@/js/NavicatStatus.js'
import { onMounted, onUnmounted, ref, watch } from 'vue'

//偏移量
const Offset = ref(2080)
//当前时间
const currentTime = ref(0)
//计时器
let timer = null
//当前索引
const CurrentIndex = ref(0)

//开始计时
const startTimer = () => {
  timer = setInterval(() => {
    currentTime.value++
  }, 1000) // 每秒钟增加1秒
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer)
})

//土方法解决，会浪费性能
const NextPhoto = () => {
  Offset.value += 208
  HomeView_HotSongLists.value.push(HomeView_HotSongLists.value[CurrentIndex.value])
  CurrentIndex.value++
}

const PrevPhoto=()=> {
  Offset.value -= 208;
}


//监测当前时间变化
watch(() => currentTime.value, () => {
  if (currentTime.value >= 3) {
    currentTime.value = 0
    NextPhoto()
  }
})
</script>

<template>
  <div class="relative px-6">
    <div :style="{width:`${WindowWidth-NavicatWidth}px`}" class="overflow-hidden">
      <div class="flex mt-2" :style="{ transform: `translateX(-${Offset}px)`,transition: `transform 0.5s ease` }">
        <div v-for="(SongList,index) in HomeView_HotSongLists" :key="index" class="mx-2 flex flex-wrap w-48">
          <img :src="SongList.cover" alt="歌单封面" class="aspect-square rounded-full w-48 cursor-pointer">
          <div class="text-center w-48 mt-2">{{ SongList.title }}</div>
        </div>
      </div>
    </div>
    <div class="absolute top-1/2 left-0 -translate-y-1/2">
      <img src="../../icons/Left_Photo_Icon.svg" class="h-6 w-6" alt="上一张" @click="PrevPhoto">
    </div>
    <div class="absolute top-1/2 right-0 -translate-y-1/2">
      <img src="../../icons/Left_Photo_Icon.svg" class="h-6 w-6 rotate-180" alt="下一张" @click="NextPhoto">
    </div>
  </div>
</template>

<style scoped>
</style>