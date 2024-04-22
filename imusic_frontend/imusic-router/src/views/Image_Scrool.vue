<template>
  <div class="swiper-container mt-3 mr-4 ml-5" style="height:27%" @mouseenter="stopAutoSwitch" @mouseleave="startAutoSwitch">
    <div class="swiper-wrapper w-full h-full" :style="wrapperStyle">
      <div class="swiper-slide h-3/4 mx-8" v-for="(image, index) in imgs" :key="index">
        <img :src="image.src" :alt="`Slide ${index}`" class="h-full rounded-2xl">
        <div class="text-center text-white my-2">hello</div>
      </div>
    </div>
    <button class="swiper-button-prev" @click="prevSlide">&lt;</button>
    <button class="swiper-button-next" @click="nextSlide">&gt;</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const imgs = ref([
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
  { src: 'http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp' },
]); // 应配合实际路径使用
const currentIndex = ref(0);
const imgWidth = 100; // 轮播图图片宽度，根据实际调整
const transitionTime = 500; // 动画过渡时间，毫秒

const wrapperStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * imgWidth}px)`,
  transition: `transform ${transitionTime / 1000}s ease`,
}));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % imgs.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + imgs.value.length) % imgs.value.length;
};

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