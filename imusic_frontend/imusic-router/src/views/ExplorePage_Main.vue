<script setup>
import {computed, ref} from "vue";
import Singer_Show_Area from "@/views/Singer_Show_Area.vue";
import Search from "@/components/Search.vue";
import List_Show_Area from "@/views/List_Show_Area.vue";

const token=defineModel('token')
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
</script>

<template>
  <div class="w-full h-16 pl-6 fixed z-50 bg-zinc-900">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">歌手</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">歌单</div>
    <Search v-model:token="token"></Search>
  </div>
  <Singer_Show_Area v-if="NaviMode==='1'" v-model:token="token"></Singer_Show_Area>
  <List_Show_Area v-if="NaviMode==='2'" v-model:token="token"></List_Show_Area>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}
</style>