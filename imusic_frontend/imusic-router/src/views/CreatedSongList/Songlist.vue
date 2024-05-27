<script setup>
// 展示歌单信息页面
import {computed, defineEmits, defineModel, onMounted, ref} from "vue";
import axios from "axios";
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";
import SongPage from "@/components/SongPage.vue";
import Buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import EditSonglist from "@/views/EditSonglist.vue";
import Other_User_Data from "@/views/Explore/Other_User_Data.vue";
import Complaint from "@/components/Complaint.vue";
import SharePage from "@/components/SharePage.vue";
import MyAlert from "@/js/MyAlert.js";
import {useUserStore} from "@/stores/user.js";

// global variables
const userStore = useUserStore();
const HasLogin = ref(computed(() => userStore.isLogin))
const token = defineModel('token')
const username = defineModel('username')

// defineEmits(播放歌单全部歌曲，加入播放列表，立即播放，关闭当前页面/回到上一个页面展示创建的歌单)
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow', 'closeSonglist'])

// v-model
const currentSonglistId = defineModel("currentSonglistId")
const currentSongId = ref(0);

// SongPage需要的属性（用于歌曲详细信息）
const ShowSong = ref(false); // 是否展示歌曲信息页面（默认：否），点击查看歌曲详细信息后为true

// CurrentUser_SongList需要的属性（用于选择将歌曲加入哪个歌单）
const loading = ref(true);
let currentUserSongList;
const createdSongLists = ref([])
const ShowCreatedSongList = ref(false); // 是否展示选择歌单页面（默认：否），点击加入歌单后为true
const needtoaddSongid = ref([]); // 存储需要加入歌单的歌曲id

const isFavoriteSonglist = ref(false);

const showUser = ref(false);

const showSelect = ref(false);

const showComplaint = ref(false);
const complaintType = ref("songlists")
const showSharePage = ref(false);
const shareType = ref("songlist")

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

const fullsize = () => {
  emits('closeSonglist');
}

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
function getFavoriteSonglists() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/like/songlists?username=" + username.value)
      .then(function (response) {
        if (response.data.success === true) {
          let length = response.data.data.length;
          for (let i = 0; i < length; ++i) {
            if (response.data.data[i].id === currentSonglistId.value) {
              isFavoriteSonglist.value = true;
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 获取用户创建的歌单
function getCreatedSonglists() {
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
          createdSongLists.value = response.data.data;
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 获取歌单信息
function getSonglistData() {
  console.log(currentSonglistId.value)
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = ref("");
  let str = currentSonglistId.value + "";
  if(str.includes("sh")) {
    web.value = '/songlists/info/' + currentSonglistId.value + "?username=" + username.value;
  } else {
    web.value = '/songlists/info/' + currentSonglistId.value;
  }
  instance.get(web.value)
      .then(function (response) {
        if (response.data.success === true) {
          currentUserSongList = response.data.data;
          loading.value = false;
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 收藏此歌单
function addFavoriteSonglist() {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
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
  formData.append('songlist_id', currentSonglistId.value);
  instance.post('/like/songlists/add', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSonglist.value = true;
          currentUserSongList.like++;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 取消收藏此歌单
function deleteFavoriteSonglist() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('songlist_id', currentSonglistId.value);
  instance.post('/like/songlists/delete', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSonglist.value = false;
          currentUserSongList.like--;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

/* 对该歌单中的歌曲进行管理 */

// 存储选择加入歌单的歌曲id，进入选择歌单界面（ShowCreatedSongList为true）
function activeAddToSongList(songid) {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  ShowCreatedSongList.value = true;
  needtoaddSongid.value = [songid];
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
  if(token.value === "") {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  showUser.value = true;
}

function CloseUserDetail() {
  showUser.value = false;
}

function activeSelect() {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  showSelect.value = true;
}

function finishSelect() {
  if (needtoaddSongid.value.length === 0) {
    MyAlert({type: 'alert-warning', text: '还未选择歌曲'});
    return;
  }
  showSelect.value = false;
  ShowCreatedSongList.value = true;
}

function cancelSelect() {
  showSelect.value = false;
  needtoaddSongid.value = [];
}

function activeShowComplaint() {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  showComplaint.value = true;
}

function closeComplaint() {
  showComplaint.value = false;
}

function activeSharePage() {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  showSharePage.value = true;
}

function closeSharePage() {
  showSharePage.value = false;
}

onMounted(getFavoriteSonglists);
onMounted(getCreatedSonglists);
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
                @handlePlayNow="handlePlayNow" @CloseSong="CloseSong"
                v-model:username="username" v-model:token="token" v-model:HasLogin="HasLogin"></SongPage>
    </div>
  </transition>
  <!--  展示用户信息界面-->
  <transition name="slide" appear>
    <div class="transition-container" v-if="showUser">
      <Other_User_Data class="w-screen mb-32" v-model:token="token" v-model:ShowUsername="currentUserSongList.owner"
                       v-model:username="username" @changesize="CloseUserDetail"
                       @handlePlayNow="handlePlayNow" @handlePlayAfter="handlePlayAfter"
                       @PlaySongList="PlaySongList"></Other_User_Data>
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

  <transition name="slide" appear>
    <div class="transition-container-2" v-if="showSharePage">
      <SharePage v-model:id="currentUserSongList.id" v-model:title="currentUserSongList.title"
          @closeSharePage="closeSharePage" v-model:shareType="shareType"
          v-model:token="token" v-model:username="username"></SharePage>
    </div>
  </transition>

  <div class="w-1 m-auto my-40" v-if="loading">
    <span class="loading loading-dots loading-lg"></span>
  </div>

  <div v-if="!loading&&!ShowCreatedSongList&&!ShowSong&&!showComplaint&&!showSharePage&&!showUser">
    <!--      展示歌单信息-->
    <div class="h-80 relative">
      <div class="bg-center bg-cover bg-blur w-full h-full absolute top-0 left-0"
           :style="{backgroundImage: 'url(' + currentUserSongList.cover + ')'}">
      </div>
      <!--      对歌单进行的操作-->
      <div class="px-8 py-3 absolute top-0 w-full">
        <!--    回到选择歌单界面-->
        <buttonchangesize class="" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
        <div
            class="float-right dropdown dropdown-bottom transition duration-400 border-none z-50">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
               width="32" height="32" tabindex="0" role="button">
            <path
                d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                fill="white"></path>
          </svg>
          <ul tabindex="0"
              class="dropdown-content z-50 text-white text-sm"
              style="width:50px">
            <li class="py-2">
              <!--          分享歌单-->
              <div class="cursor-pointer h-8 w-8 p-1 bg-gray-300 hover:bg-green-500 rounded-lg tooltip tooltip-left"
                   data-tip="分享">
                <svg @click="activeSharePage" class="h-6 w-6 align-top text-green-600 hover:text-green-800" width="24"
                     height="24"
                     viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="6" r="3"/>
                  <circle cx="18" cy="18" r="3"/>
                  <line x1="8.7" y1="10.7" x2="15.3" y2="7.3"/>
                  <line x1="8.7" y1="13.3" x2="15.3" y2="16.7"/>
                </svg>
              </div>
            </li>
            <li class="">
              <!--          投诉歌单-->
              <div class="cursor-pointer h-8 w-8 p-1 bg-gray-300 hover:bg-yellow-500 rounded-lg tooltip tooltip-left"
                   data-tip="投诉">
                <svg @click="activeShowComplaint"
                     class="h-6 w-6 align-top text-yellow-600 hover:text-yellow-800" width="24" height="24"
                     viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <circle cx="12" cy="12" r="9"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
            </li>
          </ul>
        </div>
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
        <div class="mt-3">
          <!--            播放歌单中所有歌曲-->
          <button @click="PlaySongList(currentUserSongList.id)"
                  class="mr-3 bg-blue-500 hover:bg-blue-700 text-white button font-bold py-2 w-32 rounded-xl">
            <svg class="h-5 w-5 inline-block align-sub text-white" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <p class="inline-block">播放全部</p>
          </button>
          <!--          收藏歌单-->
          <button @click="addFavoriteSonglist" v-if="!isFavoriteSonglist"
                  class="mr-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 w-32 rounded-xl inline-block">
            <svg class="h-5 w-5 text-white inline-block align-sub" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            收藏歌单
            ({{ currentUserSongList.like }})
          </button>
          <button @click="deleteFavoriteSonglist" v-if="isFavoriteSonglist"
                  class="mr-1 bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 w-32 rounded-xl inline-block">
            <svg class="h-5 w-5 fill-white inline-block align-sub" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            取消收藏
            ({{ currentUserSongList.like }})
          </button>
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
            <th class="text-sm font-semibold float-right mr-0 mt-3 w-24">
              <!--          批量处理-->
              <button @click="activeSelect" v-if="!showSelect"
                      class="ml-3 btn btn-xs p-0 px-1 rounded bg-blue-500 hover:bg-blue-700 text-white border-none">
                <p class="inline-block">批量处理</p>
              </button>
              <button @click="finishSelect" v-if="showSelect"
                      class="mr-1 btn btn-xs p-0 px-1 rounded bg-blue-500 hover:bg-blue-700 text-white border-none">
                <p class="inline-block">加入歌单</p>
              </button>
              <button @click="cancelSelect" v-if="showSelect"
                      class="btn btn-xs p-0 px-1 rounded bg-gray-300 hover:bg-gray-500 text-white border-none">
                <p class="inline-block">取消</p>
              </button>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(song, index) in currentUserSongList.songs"
              class="text-white transition duration-400 hover:bg-gray-600/40">
            <td class="pl-3 p-1 hover:cursor-pointer" @click="handlePlayNow(song.id)">
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
                    <div class="text-sm font-semibold z-50" @click="handlePlayNow(song.id);">
                      <svg class="icon ml-1" viewBox="0 0 1024 1024"
                           xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                        <path
                            d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
                            fill="white"></path>

                      </svg>
                      立即播放
                    </div>
                  </li>
                  <li>
                    <div class="text-sm font-semibold" @click="handlePlayAfter(song.id)">
                      <svg class="icon" viewBox="0 0 1024 1024"
                           xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                        <path
                            d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
                            fill="white"></path>
                      </svg>
                      添加到播放列表
                    </div>
                  </li>
                  <li>
                    <div class="text-sm font-semibold z-50" @click="activeAddToSongList(song.id)">
                      <svg class="icon" viewBox="0 0 24 24" stroke="currentColor"
                           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"
                           fill="white">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      加入歌单
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
    <div class="h-1"></div>
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