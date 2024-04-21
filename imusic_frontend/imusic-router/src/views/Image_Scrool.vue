<template>
  <div class="swiper-container mt-3 w-full" style="height:27%" @mouseenter="stopAutoSwitch" @mouseleave="startAutoSwitch">
    <div class="swiper-wrapper w-full h-1/4" :style="wrapperStyle">
      <div class="swiper-slide" v-for="(image, index) in imgs" :key="index">
        <img :src="image.src" :alt="`Slide ${index}`">
      </div>
    </div>
    <button class="swiper-button-prev" @click="prevSlide">&lt;</button>
    <button class="swiper-button-next" @click="nextSlide">&gt;</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const imgs = ref([
  { src: './1.jpg' },
  { src: './2.jpg' },
  { src: './3.jpg' },
  { src: './4.jpg' },
]); // 应配合实际路径使用
const currentIndex = ref(0);
const imgWidth = 600; // 轮播图图片宽度，根据实际调整
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