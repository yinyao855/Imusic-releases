<script setup>
// 展示歌单信息页面
import {defineEmits, defineModel, onMounted, ref} from "vue";
import axios from "axios";
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";
import SongPage from "@/components/SongPage.vue";
import Buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import EditSonglist from "@/views/EditSonglist.vue";
import Other_User_Data from "@/views/Explore/Other_User_Data.vue";
import Complaint from "@/components/Complaint.vue";

// global variables
const token = defineModel('token')
const username = defineModel('username')

// defineEmits(播放歌单全部歌曲，加入播放列表，立即播放，关闭当前页面/回到上一个页面展示创建的歌单)

// v-model
const currentSonglistId = defineModel("currentSonglistId")
const currentSongId = ref(0);

// SongPage需要的属性（用于歌曲详细信息）
const ShowSong = ref(false); // 是否展示歌曲信息页面（默认：否），点击查看歌曲详细信息后为true

// CurrentUser_SongList需要的属性（用于选择将歌曲加入哪个歌单）
const showCurrentSonglist = ref(false);
let currentUserSongList;
const createdSongLists = ref([])
const ShowCreatedSongList = ref(false); // 是否展示选择歌单页面（默认：否），点击加入歌单后为true
const needtoaddSongid = ref([]); // 存储需要加入歌单的歌曲id

const isFavoriteSonglist = ref(false);

const showUser = ref(false);

const showSelect = ref(false);

const showComplaint = ref(false);
const complaintType = ref("songlists")

// global function: 获取歌曲时长
const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}
const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}

/* 对歌单进行管理 */
// 获取用户收藏的歌单 isFavoriteSonglist

// 获取歌单信息
function getSonglistData() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/songlists/info/" + currentSonglistId.value + "?username=" + username.value)
      .then(function (response) {
        if (response.data.success === true) {
          currentUserSongList = response.data.data;
          showCurrentSonglist.value = true;
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}


// back: 不展示选择歌单页面（回到歌单的主界面）
const CloseCurrentUser_SongList = () => {
  needtoaddSongid.value = [];
  ShowCreatedSongList.value = false;
}

// 存储歌曲信息，进入歌曲详细信息界面（ShowSong为true）
const activeShowSong = (index) => {
  currentSongId.value = currentUserSongList.songs[index].id;
  ShowSong.value = true;
}

// back: 不展示歌曲详细信息页面（回到歌单的主界面）
const CloseSong = () => {
  ShowSong.value = false;
}

// 判断是否需要展示该标签（若值为空表示没有此标签，不用展示false）
function show_tag(tag) {
  if (tag === 'null' || tag === null) return false;
  return true;
}

function activeShowUser() {
  showUser.value = true;
}

function CloseUserDetail() {
  showUser.value = false;
}
function closeComplaint() {
  showComplaint.value = false;
}

onMounted(getSonglistData);
</script>

<template>
  <!--  展示选择加入的歌单界面(当ShowCreatedSongList为true)-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowCreatedSongList">
      <CurrentUser_SongList v-model:CurrentUser_SongListdata="createdSongLists"
                            v-model:needtoaddSongid="needtoaddSongid"
                            @CloseCurrentUser_SongList="CloseCurrentUser_SongList"
                            v-model:token="token" v-model:username="username"></CurrentUser_SongList>
    </div>
  </transition>
  <!--  展示歌曲详细信息界面（当ShowSong为true）-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-model:currentSongId="currentSongId"
                @CloseSong="CloseSong"
                v-model:username="username" v-model:token="token"></SongPage>
    </div>
  </transition>
  <!--  展示用户信息界面-->
  <transition name="slide" appear>
    <div class="transition-container" v-if="showUser">
      <Other_User_Data class="w-screen mb-32" v-model:token="token" v-model:ShowUsername="currentUserSongList.owner"
                       v-model:username="username" @changesize="CloseUserDetail"></Other_User_Data>
    </div>
  </transition>

  <transition name="slide" appear>
    <div class="transition-container-2" v-if="showComplaint">
      <Complaint v-model:complaintType="complaintType"
                 v-model:id="currentUserSongList.id" v-model:title="currentUserSongList.title"
                 @closeComplaint="closeComplaint"
                 v-model:token="token" v-model:username="username"></Complaint>
    </div>
  </transition>
  <div v-if="showCurrentSonglist&&!ShowCreatedSongList&&!ShowSong&&!showComplaint&&!showUser">
    <!--      展示歌单信息-->
    <div class="h-48 relative">
      <!--      对歌单进行的操作-->
      <div class="px-8 py-3 absolute top-0 w-full">
        <!--    回到选择歌单界面-->
        <div class="inline-block">
          <img :src="currentUserSongList.cover" class="img_songlist shadow-2xl">
        </div>
        <div class="inline-block ml-7 align-top">
          <div>
            <h1 class="mt-2 text-white font-extrabold text-3xl">{{ currentUserSongList.title }}</h1>
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
                {{ currentUserSongList.owner }} ·</p>
            </div>
            <p class="mt-2 ml-2 text-white inline-block">{{ extractDate(currentUserSongList.create_date) }} </p>
          </div>
          <!--            标签-->
          <div class="mt-3 inline-block">
            <div v-if="show_tag(currentUserSongList.tag_theme)"
                 class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
              {{ currentUserSongList.tag_theme }}
            </div>
            <div v-if="show_tag(currentUserSongList.tag_scene)"
                 class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">
              {{ currentUserSongList.tag_scene }}
            </div>
            <div v-if="show_tag(currentUserSongList.tag_mood)"
                 class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">
              {{ currentUserSongList.tag_mood }}
            </div>
            <div v-if="show_tag(currentUserSongList.tag_style)"
                 class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">
              {{ currentUserSongList.tag_style }}
            </div>
            <div v-if="show_tag(currentUserSongList.tag_language)"
                 class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">
              {{ currentUserSongList.tag_language }}
            </div>
          </div>
          <div>
            <details class="dropdown mt-3">
              <summary class="text-gray-200">简介</summary>
              <ul class="m-1 p-2 dropdown-content z-[1] text-gray-300 w-96">
                <li><a>{{
                    currentUserSongList.introduction === 'null' || currentUserSongList.introduction === null ? '无简介' : currentUserSongList.introduction
                  }}</a></li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
    <!--      展示歌单中的所有歌曲-->
    <div class="mt-6">
      <hr class="mx-5 border-gray-500">
      <div class="mt-3 m-5">
        <table class="w-full mb-32">
          <thead>
          <tr class="h-10 text-white">
            <th class="text-left p-3 text-sm font-semibold">歌名</th>
            <th class="text-center text-sm font-semibold">演唱者</th>
            <th class="text-center text-sm font-semibold">时长</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(song, index) in currentUserSongList.songs"
              class="text-white transition duration-400 hover:bg-gray-600/40">
            <td class="pl-3 p-1 hover:cursor-pointer">
              <img :src="song.cover" class="img_song inline-block mr-3">
              <p class="inline-block">{{ song.title }}</p>
            </td>
            <td class="text-center">{{ song.singer }}</td>
            <td class="text-center">{{ gettime(song.duration) }}</td>
            <td>
              <div v-if="showSelect"
                   class="z-0 float-right mr-7 my-auto">
                <input type="checkbox" :value="song.id" v-model="needtoaddSongid" class="checkbox checkbox-info">
              </div>
              <div v-if="!showSelect"
                   class="z-0 float-right mr-3 dropdown dropdown-left dropdown-top my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm border-none"
                   data-tip="更多">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                     width="32" height="32" tabindex="0" role="button">
                  <path
                      d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                      fill="white"></path>
                </svg>
                <ul tabindex="0"
                    class="dropdown-content z-50 menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm"
                    style="width:300px">
                  <li class="z-50">
                    <div class="z-50">
                      <img :src="song.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                      <a class="font-semibold text-sm">{{ song.title }}</a>
                      <br>
                      <a class="block text-gray-600 text-xs mr-0">{{ song.singer }}</a>
                    </div>
                  </li>
                  <li>
                    <div class="text-sm font-semibold" @click="activeShowSong(index)">
                      <svg class="icon fill-white" viewBox="0 0 1024 1024"
                           xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                        <path
                            d="M501.5 109.38a403.52 403.52 0 0 1 285.32 688.84 403.52 403.52 0 0 1-570.66-570.66 400.94 400.94 0 0 1 285.34-118.18m0-64C243.3 45.38 34 254.7 34 512.88S243.3 980.4 501.5 980.4 969 771.08 969 512.88 759.68 45.38 501.5 45.38z"
                        ></path>
                        <path
                            d="M501.5 291.16a7.64 7.64 0 1 1-7.64 7.64 7.64 7.64 0 0 1 7.64-7.64m0-64a71.64 71.64 0 1 0 71.62 71.64 71.64 71.64 0 0 0-71.62-71.64zM501.5 418.18a59.38 59.38 0 0 0-59.38 59.38V768a59.36 59.36 0 0 0 59.38 59.36A59.36 59.36 0 0 0 560.86 768V477.56a59.36 59.36 0 0 0-59.36-59.38z"
                        ></path>
                      </svg>
                      详细信息
                    </div>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img_songlist {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}

.img_song {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.bg-blur {
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(19px);
  -moz-filter: blur(19px);
  -o-filter: blur(19px);
  -ms-filter: blur(19px);
  filter: blur(19px);
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