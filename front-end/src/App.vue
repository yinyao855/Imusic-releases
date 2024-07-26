<script setup>
import TestView from './views/TestView.vue'
import MusicPlayer from "@/components/MusicPlayer_Components/MusicPlayer.vue";
import {MusicPlayerVisible} from "@/js/MusicPlayer.js";
</script>

<template>
  <router-view v-slot="{ Component }" class="w-screen h-screen">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  <MusicPlayer class="fixed"  v-if="MusicPlayerVisible"></MusicPlayer>
<!--  <TestView v-if="MusicPlayerVisible"></TestView>-->
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.use_font {
  font-family: 'TsangerYuYangT_W03_W03',sans-serif;
}

#app{
  font-family: 'TsangerYuYangT_W03_W03', sans-serif;
}
</style>
