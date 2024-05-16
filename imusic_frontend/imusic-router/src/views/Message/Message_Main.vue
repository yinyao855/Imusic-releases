<script setup>

import SongPage from "@/components/SongPage.vue";
import EditSong from "@/views/EditSong.vue";
import {computed, defineModel, ref} from "vue";
import Search from "@/components/Search.vue";
const NaviMode = ref('1');
const upload = ref('0');
const token = defineModel('token')
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const NaviClass3 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '3',
}));
const NaviClass4 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '4',
}));
const NaviClass5 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '5',
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
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">系统通知</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">评论通知</div>
    <div :class="[NaviClass3, 'text-transition']" @click="changeNaviMode(3)" style="line-height: 56px">喜欢通知</div>
    <div :class="[NaviClass4, 'text-transition']" @click="changeNaviMode(4)" style="line-height: 56px">关注通知</div>
    <div :class="[NaviClass5, 'text-transition']" @click="changeNaviMode(5)" style="line-height: 56px">私信通知</div>


  </div>
</template>

<style scoped>

</style>