<script setup>
// 展示歌曲详细信息界面
import {defineModel, defineEmits, onMounted, ref} from "vue";
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import axios from "axios";

import Complaint from "@/components/Complaint.vue";
import Warning from "@/components/Warning.vue";
import Other_User_Data from "@/views/Explore/Other_User_Data.vue";

// global variables
const token = defineModel('token')
const username = defineModel('username')
const WarningShow = ref(false);
const message = ref('');
const HasLogin = defineModel('HasLogin');
const showComment = ref(true);
const showComplaint = ref(false);
const complaintType = ref("songs")
// defineEmits(关闭当前页面/回到上一个页面展示歌单)
const emits = defineEmits(['handlePlayNow', 'CloseSong'])

const CloseWarning = () => {
  WarningShow.value = false;
}

// v-model
let songData;
const currentSongId = defineModel("currentSongId")
const lyrics = ref([]) // 存储歌词（字符串数组）
const showCurrentSong = ref(false);

const isFavoriteSong = ref(false);
const likes = ref(0);

const isSubscribe = ref(false);

const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}


// 收藏此歌单
function addFavoriteSong() {
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
  const formData = new FormData();
  formData.append('song_id', currentSongId.value);
  instance.post('/like/songs/add', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSong.value = true;
          songData.like++;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 取消收藏此歌单
function deleteFavoriteSong() {
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
  const formData = new FormData();
  formData.append('song_id', currentSongId.value);
  instance.post('/like/songs/delete', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSong.value = false;
          songData.like--;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 获取歌曲详细信息
function getSongData() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/songs/info/" + currentSongId.value)
      .then(function (response) {
        if (response.data.success === true) {
          songData = response.data.data;
          fetchAndFormatLyrics(songData.lyric)
          showCurrentSong.value = true;
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 从歌词url解析歌词，存储到字符串数组中lyrics
const fetchAndFormatLyrics = async (lrcUrl) => {
  try {
    const response = await axios.get(lrcUrl);
    const lines = response.data.split("\n");
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;

    lines.forEach((line) => {
      const match = timeRegex.exec(line);
      if (match) {
        const text = {
          time: `${match[1]}:${match[2]}.${match[3]}`,
          text: match[4].trim()
        };
        lyrics.value.push(text);
      }
    });
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
};



// 判断是否需要展示该标签（若值为空表示没有此标签，不用展示false）
function show_tag(tag) {
  if (tag === 'null' || tag === null) return false;
  return true;
}

function getSubscribeUser() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/followings', {
    params: {
      'username': username.value
    }
  })
      .then(response => {
        let length = response.data.data.length;
        for (let i = 0; i < length; ++i) {
          if (response.data.data[i].username === songData.uploader) {
            isSubscribe.value = true;
            break;
          }
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
const showUser = ref(false);
function activeShowUser() {
  showUser.value = true;
}
function CloseUserDetail() {
  showUser.value = false;
}
function closeComplaint() {
  showComplaint.value = false;
}

onMounted(getSongData)
onMounted(getSubscribeUser);
</script>

<template>
  <div class="w-full absolute top-5 left-1/2 transform -translate-x-1/2" v-if="WarningShow">
    <Warning :message="message" @CloseWarning="CloseWarning" class="mx-auto" v-model:token="token"
             v-model:Warningshow="WarningShow"></Warning>
  </div>

  <transition name="slide" appear>
    <div class="transition-container-2" v-if="showComplaint">
      <Complaint v-model:complaintType="complaintType"
                 v-model:id="songData.id" v-model:title="songData.title"
                 @closeComplaint="closeComplaint"
                 v-model:token="token" v-model:username="username"></Complaint>
    </div>
  </transition>
  <transition name="slide" appear>
    <div class="transition-container" v-if="showUser">
      <Other_User_Data class="w-screen mb-32" v-model:token="token" v-model:ShowUsername="songData.uploader"
                       v-model:username="username" @changesize="CloseUserDetail"
                       ></Other_User_Data>
    </div>
  </transition>

  <!--  回到歌单界面-->

  <!--  歌曲详细信息新界面-->
  <div v-if="showCurrentSong&&!showComplaint" class="mx-20">
    <div class="inline-block mt-5">
      <img :src="songData.cover" alt="歌曲封面"
           class="mr-10 h-72 w-72 aspect-square rounded-xl border-gray-300 border-e-2 border-b-2">
    </div>
    <div class="inline-block align-top mt-10">
      <div>
        <h1 class="text-4xl text-white ">{{ songData.title }}</h1>
        <p class="text-gray-500 ml-1 mt-1">歌手：{{ songData.singer }}</p>
      </div>
      <div class="inline-block tooltip-left tooltip" data-tip="用户详情">
        <svg @click="activeShowUser" class="cursor-pointer h-4 w-4 text-white inline-block mr-1" width="24"
             height="24" viewBox="0 0 24 24"
             stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
        </svg>
        <p @click="activeShowUser" class="cursor-pointer mt-2 text-white inline-block">
          {{ songData.uploader }} ·</p>
      </div>
      <p class="ml-2 text-gray-300 inline-block">{{ extractDate(songData.upload_date) }} </p>
      <!--            标签-->
      <div>
        <div class="inline-block my-3 opacity-60">
          <div v-if="show_tag(songData.tag_theme)"
               class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
            {{ songData.tag_theme }}
          </div>
          <div v-if="show_tag(songData.tag_scene)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">
            {{ songData.tag_scene }}
          </div>
          <div v-if="show_tag(songData.tag_mood)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">
            {{ songData.tag_mood }}
          </div>
          <div v-if="show_tag(songData.tag_style)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">
            {{ songData.tag_style }}
          </div>
          <div v-if="show_tag(songData.tag_language)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">
            {{ songData.tag_language }}
          </div>
        </div>
      </div>
      <div>
        <details class="dropdown m-2 cursor-pointer">
          <summary class="text-white">简介</summary>
          <ul class="m-1 p-2 shadow menu dropdown-content z-[1] bg-base-100 text-gray-600 rounded-box w-96">
            <li><a>{{
                songData.introduction === 'null' || songData.introduction === null ? '无简介' : songData.introduction
              }}</a></li>
          </ul>
        </details>
      </div>
    </div>
    <hr class="my-5">
    <div class="mt-10 ml-5">
      <div class="text-gray-700 my-5" style="font-size:25px">歌词：</div>
      <div v-if="lyrics.length === 0" class="text-gray-300 mt-1">
        <p>[ 无歌词 ]</p>
      </div>
      <div v-for="lyric in lyrics" class="text-gray-300 mt-1">
        <p>{{ lyric.text }}</p>
      </div>
    </div>
    <!--    <hr class="my-20">-->
    <!--    <div v-if="showComment" class="">-->
    <!--      <div class="w-full overflow-hidden mx-auto my-auto pr-20" style="height:600px">-->
    <!--        <transition name="all transition-duration: 300ms">-->
    <!--          <Comment :token="token" :id="currentSongId" v-model:showComment="showComment" v-model:songID="currentSongId"-->
    <!--                   v-model:WarningShow="WarningShow" v-model:message="message" v-model:username="username"></Comment>-->
    <!--        </transition>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
  <div class="h-40"></div>
</template>

<style scoped>
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