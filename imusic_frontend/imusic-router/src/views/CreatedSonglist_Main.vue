<script setup>
import {defineEmits, defineModel, ref} from "vue";
import axios from "axios";
import CreatedSonglist from "@/views/CreatedSonglist.vue";

const createdSonglists = defineModel('createdSonglists')
const token = defineModel('token')
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow'])
const username = defineModel('username')
const showCurrentSongList = ref(false);
const currentUserSongList = ref([]);

const PlaySongList = (id) => {
  emits('PlaySongList', id);
}

function handlePlayAfter(index) {
  emits('handlePlayAfter', currentUserSongList.songs[index].id)
}

function handlePlayNow(index) {
  emits('handlePlayNow', currentUserSongList.songs[index].id)
}

function closeSonglist() {
  showCurrentSongList.value = false;
}

function activeSonglist(index) {
  showCurrentSongList.value = true;
  let SongListId = createdSonglists.value[index].id;
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songlists/info/' + SongListId;
  instance.get(web)
      .then(response => {
        currentUserSongList.value = response.data.data;
        currentUserSongList.value.create_date = extractDate(currentUserSongList.value.create_date);
        let length = currentUserSongList.value.songs.length;
        console.log(length);
        for (let i = 0; i < length; ++i) {
          currentUserSongList.value.songs[i].duration = gettime(currentUserSongList.value.songs[i].duration)
        }

      })
      .catch(error => {
        console.log(error.response.data);
      })
}

</script>

<template>
  <div class="bg-gray-95000 w-full h-full mb-48" v-if="!showCurrentSongList">
    <div class="w-full h-32 flex">
      <div class="text-4xl text-white text-center m-auto">我创建的歌单</div>
    </div>
    <div v-for="(songlist, index) in createdSonglists" class="all inline-block px-8 pb-6">
      <div @click="activeSonglist(index)" class="card bg-gray-300 cursor-pointer">
        <div class="content">
          <img src="../assets/cd.png" alt="Avatar" class="cd">
          <img :src="songlist.cover" alt="Avatar" class="cover">
        </div>
        <div class="text m-4 relative top-3/4 text-center">
          <h1>{{ songlist.title }}</h1>
        </div>
        <div class="overlay">
          <div class="overlay-text">
            <h1>{{ songlist.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreatedSonglist :currentUserSongList="currentUserSongList" v-model:showCurrentSongList="showCurrentSongList" v-if="showCurrentSongList"
                   @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow" @closeSonglist="closeSonglist"
                   v-model:token="token" v-model:username="username"></CreatedSonglist>
</template>

<style scoped>
.all:hover .text {
  opacity: 0;
}

.card {
  position: relative;
  width: 250px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.content {
  padding: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay-text {
  color: #fff;
  text-align: center;
}

.card:hover .overlay {
  opacity: 1;
}

.cd {
  width: 230px;
  position: absolute;
  top: 1%;
  transition: top 1s ease;
}

.cover {
  width: 230px;
  height: 230px;
  position: absolute;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
}

.card:hover .cd {
  top: 25%;
  animation: rotate 1.5s linear infinite;
}

.card:hover .text {
  opacity: 0;
}

@keyframes rotate {
  100% {
    transform: rotate(720deg);
  }
}
</style>