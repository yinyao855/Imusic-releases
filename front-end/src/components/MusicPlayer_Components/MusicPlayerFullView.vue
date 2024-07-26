<script setup>
import {CurrentSongDetail, IsFullScreen} from "@/js/MusicPlayer.js";
</script>

<template>
  <div class="w-screen h-screen flex flex-row" :style="CurrentSongDetail.gradient">
    <div class="btn  btn-sm fixed top-2 left-2" @click="IsFullScreen=false">
      <img src="../icons/Return_Icon.svg" alt="返回">
    </div>
    <div class="w-1/2 h-full flex">

    </div>
  </div>
</template>

<style scoped>

</style>