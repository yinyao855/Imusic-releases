<script setup>
import {defineModel} from "vue"
const needtoaddSongid=defineModel('needtoaddSongid')
const CurrentUser_SongListdata = defineModel('CurrentUser_SongListdata')
</script>

<template>
  <div class="mx-auto text-white text-3xl py-4 w-full text-center" style="height:10%">我创建的歌单</div>
  <div class="w-full flex" style="height:90%">
    <div class="w-full" v-for="(item, index) in CurrentUser_SongListdata" :key="index">
      <div class="w-1/4">
        <img :src="item.cover" alt="歌单封面" class="w-full" @click="addtosonglist(index)">
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>