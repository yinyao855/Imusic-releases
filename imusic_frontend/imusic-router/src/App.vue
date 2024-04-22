<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {ref} from "vue";
const HasLogin=ref(false);




import { musicList } from "./js/lyrics.js";
import lyrics from "./js/lyrics.js";
import { gradient } from "./js/lyrics.js";
const curMusicIndex = ref(0);
</script>

<template>
  <div class="flex h-screen w-screen bg-black">
    <router-view v-model:HasLogin="HasLogin" 
    v-model:curIndex="curMusicIndex"
    :musicList="musicList"
    :gradient="gradient"
    :lyrics="lyrics">
    </router-view>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-250%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
