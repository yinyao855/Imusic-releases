<script setup>
import {defineEmits, defineModel, ref} from "vue";
import CreatedSonglist from "@/views/CreatedSongList/CreatedSonglist.vue";
import axios from "axios";
// global variables
const token = defineModel('token')
const username = defineModel('username')
const HasLogin = defineModel('HasLogin')

// defineEmits(播放歌单全部歌曲，加入播放列表，立即播放)
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow'])

// v-model
const LikeSongList = defineModel('LikeSongList') // 用户喜欢的歌单

// 点击歌单后需要的属性
const showCurrentSongList = ref(false); // 是否展示选中的歌单信息页面（默认：否），选择歌单后为true
const currentUserSongList = ref([]); // 选中的歌单

// emits
const PlaySongList = (id) => {
  emits('PlaySongList', id);
}

function handlePlayAfter(id) {
  emits('handlePlayAfter', id)
}

function handlePlayNow(id) {
  emits('handlePlayNow', id)
}

// back: 不展示选中的歌单信息页面（回到选择创建的歌单的主界面）
function closeSonglist() {
  showCurrentSongList.value = false;
}

// choose: 展示选中的歌单信息页面（进入歌单信息界面）
function activeSonglist(index) {
  showCurrentSongList.value = true;
  currentUserSongList.value = LikeSongList.value[index]; // 保存选中的歌单
}
function getLikeSongList() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/like/songlists', {
    params: {
      'username': username.value
    }
  })
    .then((res) => {
      console.log(res.data)
      LikeSongList.value = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <!--  展示用户创建的歌单主界面-->
  <div class="bg-gray-95000 w-full h-full mb-48" v-if="!showCurrentSongList" @likeSongList="getLikeSongList">
    <!--    标题-->
    <!--    内容：喜欢的歌单（v-for依次输出喜欢的歌单）-->
    <div v-for="(songlist, index) in LikeSongList" class="all inline-block px-8 pb-6">
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
  <!--  展示选中的歌单信息页面（当showCurrentSongList==true）-->
  <CreatedSonglist :currentUserSongList="currentUserSongList" v-if="showCurrentSongList"
                   @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow"
                   @closeSonglist="closeSonglist" v-model:LikeSongList="LikeSongList"
                   v-model:token="token" v-model:username="username" v-model:HasLogin="HasLogin"></CreatedSonglist>
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