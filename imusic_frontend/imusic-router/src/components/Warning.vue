<script setup>
import {defineEmits, onMounted, onUnmounted, ref,} from 'vue';

const props = defineProps({
  message: String,
});
const token=defineModel('token')
const emit = defineEmits(['CloseWarning']);
const CloseWarning = () => {
  emit('CloseWarning');
}
// 新增一个状态来控制Warning组件是否显示
const isWarningVisible = defineModel('Warningshow');

let timer = null;

onMounted(() => {
  // 设置一个定时器，在15秒后隐藏Warning组件
  timer = setTimeout(() => {
    isWarningVisible.value = false;
  }, 7000);
});

onUnmounted(() => {
  // 清除定时器
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<template>
  <transition name="fade">
  <div class="warning" v-if="isWarningVisible">
    <div class="warning__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
        <path fill="#393a37" d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z"></path>
      </svg>
    </div>
    <div class="warning__title">{{ props.message }}</div>
    <div class="warning__close" @click="CloseWarning">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20">
        <path fill="#393a37"
              d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path>
      </svg>
    </div>
  </div>
  </transition>
</template>

<style scoped>
@import url('../css/Warning.css');
</style>