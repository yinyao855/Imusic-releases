<script setup>
import {defineModel, onMounted, ref} from "vue"
import axios from "axios";
import buttonchangesize from './ButtonChangeSizeRight.vue'
import CreateSongList from "@/views/CreatedSongList/CreateSongList.vue";
import MyAlert from "@/js/MyAlert.js";

const needtoaddSongid = defineModel('needtoaddSongid')
const needtoaddSongs = ref([]);
const CurrentUser_SongListdata = defineModel('CurrentUser_SongListdata')
const emits = defineEmits(['CloseCurrentUser_SongList'])
const token = defineModel('token')
const username = defineModel('username')
const showCreateNewSonglist = ref(false);

function addtosonglist(index) {
  const length = ref(0);
  length.value = needtoaddSongid.value.length;
  for (let i = 0; i < length.value; i++) {
    add(index, needtoaddSongid.value[i]);
  }
  MyAlert({type: 'alert-info', text: '歌曲添加成功'})
}

const add = (index, songid) => {
  const songlistid = CurrentUser_SongListdata.value[index].id;
  const formData = new FormData();
  formData.append('song_id', songid);
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
        // alert("歌曲添加成功")
      })
      .catch(error => {
        console.log(error.response.data);
        // alert("歌曲添加失败")
      })
}
const fullsize = () => {
  emits('CloseCurrentUser_SongList');
}
const CloseShowCreateNewSonglist = () => {
  showCreateNewSonglist.value = false;
}

function activeShowCreateNewSonglist() {
  const length = ref(0);
  length.value = needtoaddSongid.value.length;
  for (let i = 0; i < length.value; i++) {
    const instance = axios.create({
      baseURL: 'http://182.92.100.66:5000',
      timeout: 5000, // 设置请求超时时间
      headers: {
        'Authorization': `Bearer ${token.value}`,
      }
    });
    axios.defaults.withCredentials = true;
    instance.get("/songs/info/" + needtoaddSongid.value[i])
        .then(function (response) {
          if (response.data.success === true) {
            needtoaddSongs.value.push(response.data.data);
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
        })
  }
  showCreateNewSonglist.value = true;
}
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="showCreateNewSonglist">
      <CreateSongList v-model:token="token" v-model:username="username" v-model:Songs="needtoaddSongs"
                      @changesize="CloseShowCreateNewSonglist"></CreateSongList>
    </div>
  </transition>

  <buttonchangesize class="left-4 top-4" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
  <div class="w-full h-screen flex flex-col" v-if="!showCreateNewSonglist">
    <div class="w-full h-32 flex">
      <div class="text-4xl text-white text-center m-auto">我创建的歌单</div>
    </div>
    <div class="w-full flex flex-wrap">
      <div class="mx-8 h-72">
        <div class="relative cursor-pointer h-4/5 aspect-square mx-auto" @click="activeShowCreateNewSonglist">
          <div class="h-full aspect-square rounded-2xl bg-white">
            <svg class="h-24 w-24 text-red-500 m-auto top-1/3 relative" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-2xl"></div>
        </div>
        <div class="text-center text-lg h-1/5 mx-auto text-white">创建新歌单</div>
      </div>
      <div class="w-1/4 min-w-72" v-for="(item, index) in CurrentUser_SongListdata" :key="index">
        <div class="mx-8 h-72">
          <div class="relative cursor-pointer h-4/5 aspect-square mx-auto" @click="addtosonglist(index)">
            <img :src="item.cover" alt="歌单封面" class="h-full aspect-square rounded-2xl">
            <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-2xl"></div>
          </div>
          <div class="text-center text-lg h-1/5 mx-auto text-white">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>