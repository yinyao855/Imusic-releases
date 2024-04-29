<script setup>
import {computed, defineModel, ref} from "vue";
import SongList_Scrool from "@/components/SongList_Scrool.vue";
const NaviMode = ref('1');
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}
const username = defineModel('username')

const HasLogin = defineModel('HasLogin')
</script>

<template>
  <div class="w-full h-14 pl-6">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">我的喜欢</div>
<!--    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px"></div>-->
  </div>
  <div v-if="NaviMode==='1'&&HasLogin">
    <div class="grid-col">
      <div class="text-2xl mx-4 text-white font-serif font-bold my-4">我喜欢的歌单</div>
      <div class="overflow-x-auto">
      <SongList_Scrool :songlists="songlists" :index="index" @changesonglist="changesonglist"></SongList_Scrool>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>