<script setup>
import {defineModel} from "vue"
import axios from "axios";
import buttonchangesize from './buttonchangesize.vue'

const needtoaddSongid = defineModel('needtoaddSongid')
const CurrentUser_SongListdata = defineModel('CurrentUser_SongListdata')
const emits = defineEmits(['CloseCurrentUser_SongList'])
const token=defineModel('token')
const addtosonglist = (index) => {
  const songlistid = CurrentUser_SongListdata.value[index].id;
  const formData = new FormData();
  formData.append('song_id', needtoaddSongid.value);
  formData.append('songlist_id', songlistid);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/songlists/addsong', formData)
      .then(response => {
        console.log(response.data);
        alert('歌曲添加成功');
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
const fullsize = () => {
  emits('CloseCurrentUser_SongList');
}
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
  <div class="w-full h-screen flex flex-col">
    <div class="w-full h-32 flex">
      <div class="text-4xl text-white text-center m-auto">我创建的歌单</div>
    </div>
    <div class="w-full flex h-full">
      <div class="mx-8 my-8 h-64 w-64" v-for="(item, index) in CurrentUser_SongListdata" :key="index">
        <div class="relative cursor-pointer h-4/5 aspect-square mx-auto" @click="addtosonglist(index)">
          <img :src="item.cover" alt="歌单封面" class="h-full aspect-square rounded-2xl">
          <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-2xl"></div>
        </div>
        <div class="text-center text-lg h-1/5 mx-auto text-white">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>