<script setup>
import {computed, ref} from "vue";
import Search from "@/views/Search.vue";
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
  <div class="w-full h-14 pl-6">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">歌手</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">歌单</div>
    <Search></Search>
  </div>

</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}
</style>