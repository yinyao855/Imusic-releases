<script setup>
import {computed, ref} from "vue";
import Singer_Show_Area from "@/views/Explore/Songs_Show_Area.vue";
import Search from "@/components/Search.vue";
import List_Show_Area from "@/views/Explore/List_Show_Area.vue";
import User_Show_Area from "@/views/Explore/User_Show_Area.vue";
import SongPage from "@/components/SongPage.vue";

const token = defineModel('token')
const emits = defineEmits(['handlePlayAfter', 'handlePlayNow', 'PlaySongList']);
const NaviMode = ref('1');
const HasLogin = defineModel('HasLogin')
const username = defineModel('username');
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-3 px-3 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-3 px-3 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const NaviClass3 = computed(() => ({
  'text-base inline-block mx-3 px-3 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '3',
}));
const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}

const handlePlayAfter = (index) => {
  emits('handlePlayAfter', index);
}

const PlaySongList = (id) => {
  console.log(id);
  emits('PlaySongList', id);
}

const handlePlayNow = (index) => {
  emits('handlePlayNow', index);
}
</script>

<template>
  <div class="w-full h-16 pl-6 fixed z-50 bg-zinc-900">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">  歌 曲  </div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">  歌 单  </div>
    <div :class="[NaviClass3, 'text-transition']" @click="changeNaviMode(3)" style="line-height: 56px">  用 户  </div>
  </div>
  <div class="w-full mt-16">
    <Singer_Show_Area v-model:username="username" v-if="NaviMode==='1'" v-model:token="token" @PlaySongList="PlaySongList"
                      @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow" v-model:HasLogin="HasLogin"></Singer_Show_Area>
    <List_Show_Area v-if="NaviMode==='2'" v-model:token="token" v-model:username="username" v-model:HasLogin="HasLogin"
                    @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow" @PlaySongList="PlaySongList"></List_Show_Area>
    <User_Show_Area v-if="NaviMode==='3'" v-model:username="username" v-model:token="token"
                    @handlePlayNow="handlePlayNow" @handlePlayAfter="handlePlayAfter"
                    @PlaySongList="PlaySongList"></User_Show_Area>
  </div>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}
</style>