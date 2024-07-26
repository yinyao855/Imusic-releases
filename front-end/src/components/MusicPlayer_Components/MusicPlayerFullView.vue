<script setup>
import {CurrentSongDetail, IsFullScreen} from "@/js/MusicPlayer.js";
</script>

<template>
<div class="w-screen h-screen" :style="CurrentSongDetail.gradient">
  <div class="btn btn-sm" @click="IsFullScreen=false">
    <img src="../icons/Return_Icon.svg" alt="返回">
  </div>
</div>
</template>

<style scoped>

</style>