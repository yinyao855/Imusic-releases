<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from "@/views/Home.vue";
import {ref} from "vue";
const HasLogin=ref(false);


import { musicList1 } from "./js/lyrics.js";
import lyrics from "./js/lyrics.js";
import { gradient } from "./js/lyrics.js";
const curMusicIndex = ref(0);
</script>

<template>
  <Home v-model:HasLogin="HasLogin"
        v-model:curIndex="curMusicIndex"
        :musicList="musicList1"
        :gradient="gradient"
        :lyrics="lyrics"
        class="flex h-screen w-screen bg-black">
  </Home>
</template>

<style scoped>
</style>
