<script setup>
// 展示用户创建的歌单主界面
import {defineEmits, defineModel, onMounted, ref} from "vue";
import CreatedSonglist from "@/views/CreatedSongList/CreatedSonglist.vue";
import axios from "axios";
import LikeSongs_Area from "@/views/CreatedSongList/LikeSongs_Area.vue";
import Warning from "@/components/Warning.vue";

// global variables
const token = defineModel('token')
const username = defineModel('username')
const HasLogin = defineModel('HasLogin');
const message = ref('错误消息');
const WarningShow = ref(false);
const CloseWarning = () => {
  WarningShow.value = false;
}

// defineEmits(播放歌单全部歌曲，加入播放列表，立即播放)
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow', 'PlayLikeSongs'])

// 点击歌单后需要的属性
const createdSonglists = ref([]);
const showCurrentSongList = ref(false); // 是否展示选中的歌单信息页面（默认：否），选择歌单后为true
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
  getCreatedSonglists();
  showCurrentSongList.value = false;
}

// choose: 展示选中的歌单信息页面（进入歌单信息界面）
function activeSonglist(index) {
  currentSonglistId.value = createdSonglists.value[index].id;
  showCurrentSongList.value = true;
}

const LikeSongCover = ref('./LikeSongs.webp');
const ShowLikeSongs = ref(false);
const ActiveLikeSongs = () => {
  console.log('hello');
  ShowLikeSongs.value = true;
}

const CloseLikeSongs = () => {
  ShowLikeSongs.value = false;
}

const PlayLikeSongs = () => {
  emits('PlayLikeSongs');
}

function getCreatedSonglists() {
  if (HasLogin.value === false) {
    message.value = '请先登录';
    WarningShow.value = true;
    return;
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/users/songlists?username=" + username.value)
      .then(function (response) {
        if (response.data.success === true) {
          createdSonglists.value = response.data.data;
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

onMounted(getCreatedSonglists);
</script>

<template>
  <div class="w-full absolute top-0 left-1/2 transform -translate-x-1/2" v-if="WarningShow">
    <Warning :message="message" @CloseWarning="CloseWarning" class="mx-auto" v-model:token="token"></Warning>
  </div>
  <transition name="slide" appear>
    <div class="transition-container z-50 ml-8" v-if="ShowLikeSongs">
      <LikeSongs_Area class="w-screen mb-32" v-model:LikeSongsCover="LikeSongCover" v-model:username="username"
                      @changesize="CloseLikeSongs" @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow"
                      v-model:token="token" @PlayLikeSongs="PlayLikeSongs"></LikeSongs_Area>
    </div>
  </transition>
  <!--  展示选中的歌单信息页面（当showCurrentSongList==true）-->
  <transition name="slide" appear>
    <div class="transition-container-2 z-50" v-if="showCurrentSongList">
      <CreatedSonglist class="w-screen mb-32" v-model:currentSonglistId="currentSonglistId"
                       @refresh="getCreatedSonglists"
                       @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                       @handlePlayNow="handlePlayNow" @changesize="closeSonglist"
                       v-model:token="token" v-model:username="username"></CreatedSonglist>
    </div>
  </transition>


  <!--  展示用户创建的歌单主界面-->
  <div class="w-full h-full mb-32" v-if="!showCurrentSongList&&!ShowLikeSongs">
    <!--    标题-->
    <div class="w-full h-32 flex">
      <div class="text-4xl text-white text-center m-auto">我创建的歌单</div>
    </div>
    <div class="all inline-block px-8 pb-6">
      <div @click="ActiveLikeSongs" class="card bg-gray-300 cursor-pointer">
        <div class="content">
          <img src="../../assets/cd.png" alt="Avatar" class="cd">
          <img :src="LikeSongCover" alt="封面" class="cover">
        </div>
        <div class="text m-4 relative top-3/4 text-center">
          <h1>我喜欢的歌曲</h1>
        </div>
        <div class="overlay">
          <div class="overlay-text">
            <h1>我喜欢的歌曲</h1>
          </div>
        </div>
      </div>
    </div>
    <!--    内容：创建的歌单（v-for依次输出创建的歌单）-->
    <div v-for="(songlist, index) in createdSonglists" class="all inline-block px-8 pb-6">
      <div @click="activeSonglist(index)" class="card bg-gray-300 cursor-pointer">
        <div class="content">
          <img src="../../assets/cd.png" alt="Avatar" class="cd">
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
  <div class="mb-8">
    、
  </div>
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


.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.transition-container {
  right: 0;
  top: 0;
  height: 100%
}


.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}
</style>