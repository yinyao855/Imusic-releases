<script setup>
import {CurrentSongDetail, IsFullScreen} from "@/js/MusicPlayer.js";
import Music_Card from "@/components/MusicPlayer_Components/MusicPlayerFullView_Components/Music_Card.vue";
</script>

<template>
  <div class="w-screen h-screen flex flex-row" :style="CurrentSongDetail.gradient">
    <div class="btn  btn-sm fixed top-2 left-2" @click="IsFullScreen=false">
      <img src="../icons/Return_Icon.svg" alt="返回">
    </div>
    <div class="w-1/2 h-full flex">
      <Music_Card class="m-auto"></Music_Card>
    </div>
  </div>
</template>

<style scoped>

</style>