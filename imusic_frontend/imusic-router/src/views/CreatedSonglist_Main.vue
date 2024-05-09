<script setup>
// 展示用户创建的歌单主界面
import {defineEmits, defineModel, ref} from "vue";
import CreatedSonglist from "@/views/CreatedSonglist.vue";
import axios from "axios";

// global variables
const token = defineModel('token')
const username = defineModel('username')

// defineEmits(播放歌单全部歌曲，加入播放列表，立即播放)
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow'])

// v-model
const createdSonglists = defineModel('createdSonglists') // 用户创建的歌单

// 点击歌单后需要的属性
const showCurrentSongList = ref(false); // 是否展示选中的歌单信息页面（默认：否），选择歌单后为true
const currentUserSongList = ref([]); // 选中的歌单
const currentSonglistId = ref(0);

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
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/songlists/info/" + createdSonglists.value[index].id)
      .then(function (response) {
        if (response.data.success === true) {
          showCurrentSongList.value = true;
          currentUserSongList.value = response.data.data; // 保存选中的歌单
          currentSonglistId.value = currentUserSongList.value.id;
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}
</script>

<template>
  <!--  展示用户创建的歌单主界面-->
  <div class="bg-gray-95000 w-full h-full mb-48" v-if="!showCurrentSongList">
    <!--    标题-->
    <div class="w-full h-32 flex">
      <div class="text-4xl text-white text-center m-auto">我创建的歌单</div>
    </div>
    <!--    内容：创建的歌单（v-for依次输出创建的歌单）-->
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
  <!--  展示选中的歌单信息页面（当showCurrentSongList==true）-->
  <CreatedSonglist v-model:currentSonglistId="currentSonglistId" v-if="showCurrentSongList"
                   @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                   @handlePlayNow="handlePlayNow" @closeSonglist="closeSonglist"
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