<script setup>
const props = defineProps({
  type: String,
  text: String,
});
</script>

<template>
  <div class="fixed top-5 left-1/2" style="transform: translate(-50%);z-index: 9999;">
    <div role="alert" :class="['alert', 'shadow-lg', type]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<style>
@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


@keyframes slideUp {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.alert {
  /* 其他样式 */
  animation: slideDown 0.3s ease-in-out;
}
.alert.hide {
  animation: slideUp 0.3s ease-in-out;
}
</style>