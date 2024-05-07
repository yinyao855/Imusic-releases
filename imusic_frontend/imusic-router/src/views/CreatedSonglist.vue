<script setup>
// 展示歌单信息页面
import {defineEmits, defineModel, onMounted, ref} from "vue";
import axios from "axios";
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";
import SongPage from "@/views/SongPage.vue";
import Buttonchangesize from "@/components/buttonchangesize.vue";
import EditSonglist from "@/views/EditSonglist.vue";

// global variables
const token = defineModel('token')
const username = defineModel('username')

// defineEmits(播放歌单全部歌曲，加入播放列表，立即播放，关闭当前页面/回到上一个页面展示创建的歌单)
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow', 'closeSonglist'])

// props
const props = defineProps({
  currentUserSongList: Object, // 选中的歌单
})

// v-model
const CurrentUser_SongListdata = defineModel("createdSonglists"); // 用户创建的所有歌单

// EditSonglist需要的属性（用于修改歌单）
const showEditSonglist = ref(false); // 是否展示修改歌单信息页面（默认：否），点击修改的icon后为true
const cover = ref(null); // 存储当前歌单图片
const coverImageFileUrl = ref(''); // 存储当前歌单图片url，若修改了图片，可以直接展示新选择的图片即使还没完成修改

// SongPage需要的属性（用于歌曲详细信息）
const ShowSong = ref(false); // 是否展示歌曲信息页面（默认：否），点击查看歌曲详细信息后为true
const SongData = ref([]); // 存储要查看的歌曲信息
const lyrics = ref([]); // 存储要查看的歌曲的歌词（字符串数组）

// CurrentUser_SongList需要的属性（用于选择将歌曲加入哪个歌单）
const ShowCurrentUserSongList = ref(false); // 是否展示选择歌单页面（默认：否），点击加入歌单后为true
const needtoaddSongid = ref(1); // 存储需要加入歌单的歌曲id

const isFavoriteSonglist = ref(false);

// emits
const PlaySongList = (id) => {
  emits('PlaySongList', id);
}

function handlePlayAfter(index) {
  emits('handlePlayAfter', props.currentUserSongList.songs[index].id)
}

function handlePlayNow(index) {
  emits('handlePlayNow', props.currentUserSongList.songs[index].id)
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

/* 对歌单进行管理 */
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
            if (response.data.data[i].id === props.currentUserSongList.id) {
              isFavoriteSonglist.value = true;
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 收藏此歌单
function addFavoriteSonglist() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('songlist_id', props.currentUserSongList.id);
  instance.post('/like/songlists/add', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSonglist.value = true;
          window.alert("success");
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
  formData.append('songlist_id', props.currentUserSongList.id);
  instance.post('/like/songlists/delete', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSonglist.value = false;
          window.alert("success");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 删除此歌单
function deleteSonglist() {
  console.log("delete " + props.currentUserSongList.id)
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.delete('/songlists/delete/' + props.currentUserSongList.id)
      .then(function (response) {
        if (response.data.success === true) {
          window.alert("delete success");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 存储歌单图片，进入修改歌单界面（showEditSonglist为true）
function activeShowEditSonglist(imgUrl) {
  cover.value = imgUrl;
  coverImageFileUrl.value = imgUrl;
  showEditSonglist.value = true;
}


/* 对该歌单中的歌曲进行管理 */

// 存储选择加入歌单的歌曲id，进入选择歌单界面（ShowCurrentUserSongList为true）
function activeAddToSongList(index) {
  ShowCurrentUserSongList.value = true;
  needtoaddSongid.value = props.currentUserSongList.songs[index].id;
}

// back: 不展示选择歌单页面（回到歌单的主界面）
const CloseCurrentUser_SongList = () => {
  ShowCurrentUserSongList.value = false;
}

// 将歌曲从当前歌单删除
function deleteFromSongList(index) {
  const needtodeleteSongid = ref(1);
  needtodeleteSongid.value = props.currentUserSongList.songs[index].id;
  console.log(props.currentUserSongList.id);
  const formData = new FormData();
  formData.append('song_id', needtodeleteSongid.value);
  formData.append('songlist_id', props.currentUserSongList.id);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/songlists/delsong', formData)
      .then(response => {
        console.log(response.data);
        alert('歌曲删除成功');
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

// 存储歌曲信息，进入歌曲详细信息界面（ShowSong为true）
const activeShowSong = (index) => {
  SongData.value = props.currentUserSongList.songs[index];
  ShowSong.value = true;
}

// back: 不展示歌曲详细信息页面（回到歌单的主界面）
const CloseSong = () => {
  ShowSong.value = false;
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
        const text = match[4].trim();
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

onMounted(getFavoriteSonglists);
</script>

<template>
  <div v-if="!ShowCurrentUserSongList&!ShowSong">
    <!--  展示歌单主界面-->
    <div v-if="!showEditSonglist">
      <!--      展示歌单信息-->
      <div class="h-80 relative">
        <div class="bg-center bg-cover bg-blur w-full h-full absolute top-0 left-0"
             :style="{backgroundImage: 'url(' + props.currentUserSongList.cover + ')'}">
        </div>
        <!--        对歌单进行的操作-->
        <div class="px-8 py-3 absolute top-0 w-full">
          <!--    回到选择歌单界面-->
          <buttonchangesize class="" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
          <!--          删除歌单-->
          <div class="inline-block float-right cursor-pointer h-8 w-8 p-1 bg-gray-300 hover:bg-red-500 rounded-lg">
            <svg @click="deleteSonglist"
                 class="inline-block h-6 w-6 align-top text-red-600 hover:text-red-800" width="24"
                 height="24"
                 viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
            </svg>
          </div>
          <!--          修改歌单信息-->
          <div class="inline-block float-right cursor-pointer h-8 w-8 p-1 mr-1 bg-gray-300 hover:bg-blue-500 rounded-lg">
            <svg @click="activeShowEditSonglist(props.currentUserSongList.cover)"
                 class="inline-block h-6 w-6 align-top text-blue-600 hover:text-blue-800" width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
            </svg>
          </div>
          <div class="inline-block">
            <img :src="props.currentUserSongList.cover" class="img_songlist shadow-2xl">
          </div>
          <div class="inline-block ml-7 align-top">
            <div>
              <h1 class="mt-2 text-white font-extrabold text-3xl">{{ props.currentUserSongList.title }}</h1>
              <p class="mt-2 text-white">{{ props.currentUserSongList.owner }} · {{
                  props.currentUserSongList.create_date
                }}</p>
            </div>
            <div>
              <details class="text-white text-sm">
                <summary class="mt-3 text-white font-bold">介绍</summary>
                <div class="mt-3 absolute">
                  {{ props.currentUserSongList.introduction }}
                </div>
              </details>
            </div>
            <!--            标签-->
            <div class="mt-16 inline-block">
              <div v-if="show_tag(props.currentUserSongList.tag_theme)"
                   class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
                {{ props.currentUserSongList.tag_theme }}
              </div>
              <div v-if="show_tag(props.currentUserSongList.tag_scene)"
                   class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">
                {{ props.currentUserSongList.tag_scene }}
              </div>
              <div v-if="show_tag(props.currentUserSongList.tag_mood)"
                   class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">
                {{ props.currentUserSongList.tag_mood }}
              </div>
              <div v-if="show_tag(props.currentUserSongList.tag_style)"
                   class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">
                {{ props.currentUserSongList.tag_style }}
              </div>
              <div v-if="show_tag(props.currentUserSongList.tag_language)"
                   class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">
                {{ props.currentUserSongList.tag_language }}
              </div>
            </div>
          </div>
          <div class="mt-3">
            <!--            播放歌单中所有歌曲-->
            <button @click="PlaySongList(props.currentUserSongList.id)"
                    class="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full">
              <svg class="h-5 w-5 inline-block align-sub text-white" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor"
                   stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <p class="inline-block">Play All</p>
            </button>
            <button @click="addFavoriteSonglist" v-if="!isFavoriteSonglist"
                    class="mr-3 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-16 rounded-full inline-block">
              <svg class="h-5 w-5 text-white inline-block align-sub" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor"
                   stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              收藏歌单
              ({{ props.currentUserSongList.like }})
            </button>
            <button @click="deleteFavoriteSonglist" v-if="isFavoriteSonglist"
                    class="mr-3 bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-16 rounded-full inline-block">
              <svg class="h-5 w-5 fill-white inline-block align-sub" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor"
                   stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              取消收藏
              ({{ props.currentUserSongList.like }})
            </button>
          </div>
        </div>
      </div>
      <!--      展示歌单中的所有歌曲-->
      <div class="mt-6">
        <hr class="mx-5 border-gray-500">
        <div class="mt-3 m-5">
          <table class="w-full mb-32">
            <thead class="">
            <tr class="h-10 text-white">
              <th class="text-left p-3 text-sm font-semibold">歌名</th>
              <th class="text-center text-sm font-semibold">演唱者</th>
              <th class="text-center text-sm font-semibold">时长</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(song, index) in props.currentUserSongList.songs"
                class="text-white transition duration-400 hover:bg-gray-600/40">
              <td class="pl-3 p-1 hover:cursor-pointer" @click="handlePlayNow(index)">
                <img :src="song.cover" class="img_song inline-block mr-3">
                <p class="inline-block">{{ song.title }}</p>
              </td>
              <td class="text-center">{{ song.singer }}</td>
              <td class="text-center">{{ gettime(song.duration) }}</td>
              <td>
                <!--                对歌曲进行的操作-->
                <div class="menu">
                  <button class="font-bold text-xl">···</button>
                  <div class="menu_item font-bold right-7 -bottom-1 bg-gray-600 text-white opacity-90">
                    <!--                    查看歌曲信息(SongPage)-->
                    <div @click="activeShowSong(index); fetchAndFormatLyrics(song.lyric)"
                         class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                      <p>
                        <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                        查看歌曲信息
                      </p>
                    </div>
                    <!--                    加入播放列表-->
                    <div @click="handlePlayAfter(index)"
                         class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                      <p>
                        <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" width="24" height="24"
                             viewBox="0 0 24 24" stroke-width="2"
                             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z"/>
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        加入播放列表
                      </p>
                    </div>
                    <!--                    加入歌单(CurrentUser_Songlist)-->
                    <div @click="activeAddToSongList(index)"
                         class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                      <p>
                        <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        </svg>
                        加入歌单
                      </p>
                    </div>
                    <!--                  <div-->
                    <!--                      class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">-->
                    <!--                    <p>-->
                    <!--                      <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" viewBox="0 0 24 24" fill="none"-->
                    <!--                           stroke="currentColor"-->
                    <!--                           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
                    <!--                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>-->
                    <!--                        <polyline points="7 10 12 15 17 10"/>-->
                    <!--                        <line x1="12" y1="15" x2="12" y2="3"/>-->
                    <!--                      </svg>-->
                    <!--                      下载-->
                    <!--                    </p>-->
                    <!--                  </div>-->
                    <!--                  <div-->
                    <!--                      class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">-->
                    <!--                    <p>-->
                    <!--                      <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" viewBox="0 0 24 24" fill="none"-->
                    <!--                           stroke="currentColor"-->
                    <!--                           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
                    <!--                        <circle cx="18" cy="5" r="3"/>-->
                    <!--                        <circle cx="6" cy="12" r="3"/>-->
                    <!--                        <circle cx="18" cy="19" r="3"/>-->
                    <!--                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>-->
                    <!--                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>-->
                    <!--                      </svg>-->
                    <!--                      分享-->
                    <!--                    </p>-->
                    <!--                  </div>-->
                    <!--                  <div-->
                    <!--                      class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">-->
                    <!--                    <p>-->
                    <!--                      <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" viewBox="0 0 24 24" fill="none"-->
                    <!--                           stroke="currentColor"-->
                    <!--                           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
                    <!--                        <path-->
                    <!--                            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>-->
                    <!--                        <line x1="12" y1="9" x2="12" y2="13"/>-->
                    <!--                        <line x1="12" y1="17" x2="12.01" y2="17"/>-->
                    <!--                      </svg>-->
                    <!--                      举报-->
                    <!--                    </p>-->
                    <!--                  </div>-->
                    <!--                    从歌单中移除-->
                    <div @click="deleteFromSongList(index)"
                         class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                      <p>
                        <svg class="ml-5 h-5 w-5 text-black inline-block align-sub" width="24" height="24"
                             viewBox="0 0 24 24" stroke-width="2"
                             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z"/>
                          <line x1="4" y1="7" x2="20" y2="7"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                        </svg>
                        从歌单中移除
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--  展示选择加入的歌单界面(当ShowCurrentUserSongList为true)-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowCurrentUserSongList">
      <CurrentUser_SongList v-if="ShowCurrentUserSongList" v-model:CurrentUser_SongListdata="CurrentUser_SongListdata"
                            v-model:needtoaddSongid="needtoaddSongid"
                            @CloseCurrentUser_SongList="CloseCurrentUser_SongList"
                            v-model:token="token"></CurrentUser_SongList>
    </div>
  </transition>
  <!--  展示歌曲详细信息界面（当ShowSong为true）-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-if="ShowSong" v-model:SongData="SongData" v-model:username="username"
                v-model:lyrics="lyrics"
                @CloseSong="CloseSong"
                v-model:token="token"></SongPage>
    </div>
  </transition>
  <!--  展示修改歌单信息界面（当showEditSonglist为true）-->
  <EditSonglist :currentUserSongList="currentUserSongList" v-if="showEditSonglist"
                @deleteFromSongList="deleteFromSongList"
                v-model:showEditSonglist="showEditSonglist"
                v-model:cover="cover" v-model:coverImageFileUrl="coverImageFileUrl"
                v-model:token="token" v-model:username="username"></EditSonglist>
</template>

<style scoped>
.bg_img {
  margin: 0;
  height: 330px;
  background-size: cover;
  filter: blur(30px);
  float: left;
  width: 100%;
}

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

.menu {
  position: relative;
  display: inline-block;
}

.menu_item {
  display: none;
  position: absolute;
  min-width: 160px;
  border-radius: 8px;
}

.menu:hover .menu_item {
  display: block;
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
</style>