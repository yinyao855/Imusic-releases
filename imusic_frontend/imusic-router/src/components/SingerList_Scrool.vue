<template>
  <div class="swiper-container mt-3 mr-4 ml-5 relative overflow-hidden" style="height:27%" @mouseenter="stopAutoSwitch"
       @mouseleave="startAutoSwitch">
    <div class="flex w-full h-full" :style="wrapperStyle">
      <div class="flex-gro-0 flex-shrink-0  h-3/4 mx-8" v-for="(SongList, index) in SongLists" :key="index"
           @click="HandleIndex(index)">
        <div class="relative h-full cursor-pointer">
          <img :src="SongList.cover" :alt="`Slide ${index}`" class="h-full rounded-full aspect-square"/>
          <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-full"></div>
        </div>
        <div class="text-center text-white my-2">{{ SongList.title }}</div>
      </div>
    </div>
    <button class="swiper-button-prev btn left-2.5" @click="prevSlide">&lt;</button>
    <button class="swiper-button-next btn right-2.5" @click="nextSlide">&gt;</button>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, defineModel} from 'vue';

const SongLists = defineModel('songlists')
const currentIndex = ref(0);
const imgWidth = 230; // 轮播图图片宽度，根据实际调整
const transitionTime = 500; // 动画过渡时间，毫秒
const token=defineModel('token')

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * imgWidth}px)`,
  transition: `transform ${transitionTime / 1000}s ease`,
}));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % SongLists.value.length;
  if(currentIndex.value>=SongLists.value.length-4){
    currentIndex.value=0;
  }
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + SongLists.value.length) % SongLists.value.length;
  if(currentIndex.value>=SongLists.value.length-4){
    currentIndex.value=0;
  }
};

const index = defineModel('index');

const HandleIndex = (CurrentIndex) => {
  index.value = SongLists.value[CurrentIndex].id;
  console.log(index.value)
}

let intervalId;
const startAutoSwitch = () => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 3000); // 每3秒自动切换
};

const stopAutoSwitch = () => {
  clearInterval(intervalId);
};

onMounted(startAutoSwitch);
onUnmounted(stopAutoSwitch);
</script>


<style scoped>
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(31, 31, 31, 0.5);
  color: white;
  border: none;
  cursor: pointer;
}

</style>