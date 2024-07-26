<!--主界面-->
<template>
  <Transition name="slide">
    <MusicPlayerFullView class="fixed left-0 top-0 z-20" v-if="MusicPlayerVisible&&IsFullScreen"></MusicPlayerFullView>
  </Transition>
  <Transition name="slideBar">
    <MusicPlayer_Bar v-if="MusicPlayerVisible&&!IsFullScreen"></MusicPlayer_Bar>
  </Transition>

  <div class="w-full h-full flex bg-white" v-if="!IsFullScreen">
    <div class="h-screen">
      <Navicat></Navicat>
    </div>
    <div class="flex-1 h-full pl-2 bg-[#FAF7F5]">
      <router-view></router-view>
    </div>
  </div>

</template>

<script setup>
import Navicat from "@/components/Navicat.vue";
import MusicPlayer_Bar from "@/components/MusicPlayer_Components/MusicPlayer_Bar.vue";
import {GetPlayList, IsFullScreen, MusicPlayerVisible} from "@/js/MusicPlayer.js";
import {UserStore} from "@/stores/User.js";
import {watch} from "vue";
import MusicPlayerFullView from "@/components/MusicPlayer_Components/MusicPlayerFullView.vue";

watch(() => UserStore().State, GetPlayList)
</script>


<style>
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}


.slideBar-leave-active {
  transition: transform 0.5s ease;
}

.slideBar-enter-active {
  transition: transform 0.5s ease;
}

.slideBar-enter-from,
.slideBar-leave-to {
  transform: translateY(-100%);
}
</style>