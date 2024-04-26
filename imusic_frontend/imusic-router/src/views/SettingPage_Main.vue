<template>
  <div>
    <!-- 显示剩余时间 -->
    <span class="countdown font-mono text-2xl">
  <span :style="{ '--value': timeLeft }"></span>
</span>
    <!-- 你可以通过点击这个按钮来开始倒计时 -->
    <button @click="startCountdown">开始倒计时</button>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const timeLeft = ref(60);
let interval = null;

const startCountdown = () => {
  clearInterval(interval);
  timeLeft.value = 60;
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

</script>