<template>
  <div class="swiper-container mt-3 mr-4 ml-5" style="height:27%" @mouseenter="stopAutoSwitch" @mouseleave="startAutoSwitch">
    <div class="swiper-wrapper w-full h-full" :style="wrapperStyle">
      <div class="swiper-slide h-3/4 mx-8" v-for="(songlist, index) in songlists" :key="index" @click="handleindex(index)">
        <div class="relative h-full">
          <img :src="songlist.cover" :alt="`Slide ${index}`" class="h-full rounded-2xl aspect-square" />
          <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-2xl"></div>
        </div>
        <div class="text-center text-white my-2">{{songlist.title}}</div>
      </div>
    </div>
    <button class="swiper-button-prev btn" @click="prevSlide">&lt;</button>
    <button class="swiper-button-next btn" @click="nextSlide">&gt;</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted ,defineModel} from 'vue';
const songlists=defineModel('songlists')
const emits=defineEmits(['changesonglist']);
const currentIndex = ref(0);
const imgWidth = 230; // 轮播图图片宽度，根据实际调整
const transitionTime = 500; // 动画过渡时间，毫秒

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * imgWidth}px)`,
  transition: `transform ${transitionTime / 1000}s ease`,
}));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % songlists.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + songlists.value.length) % songlists.value.length;
};

const index=defineModel('index');

const handleindex = (indexx) =>{
  index.value=songlists.value[indexx].id;
  emits('changesonglist');
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
.swiper-container {
  position: relative;
  overflow: hidden;
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  flex: 0 0 auto;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}
</style>