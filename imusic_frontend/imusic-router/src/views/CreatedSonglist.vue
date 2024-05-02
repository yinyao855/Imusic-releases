<script setup>
import {defineEmits, defineModel, ref} from "vue";
import axios from "axios";
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";
import SongPage from "@/views/SongPage.vue";
import Buttonchangesize from "@/components/buttonchangesize.vue";
import EditSonglist from "@/views/EditSonglist.vue";

const props = defineProps({
  currentUserSongList: Object,
})
const token = defineModel('token')
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow', 'closeSonglist'])

const username = defineModel('username')
const CurrentUser_SongListdata = ref([]);
const ShowCurrentUserSongList = ref(false);
const ShowSong = ref(false)
const SongData = ref([])
const needtoaddSongid = ref(1);

const cover = ref(null);
const coverImageFileUrl = ref('');

const showEditSonglist = ref(false);

const lyrics = ref([]);

const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

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

function addToSongList(songid) {
  console.log(songid);
  GetCurrentUser_SongListdata();
  ShowCurrentUserSongList.value = true;
  needtoaddSongid.value = props.currentUserSongList.songs[songid].id;
}

function deleteFromSongList(songid) {
  needtoaddSongid.value = props.currentUserSongList.songs[songid].id;
  console.log(props.currentUserSongList.id);
  const formData = new FormData();
  formData.append('song_id', needtoaddSongid.value);
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

const GetCurrentUser_SongListdata = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/songlists', {
    params: {
      'username': username.value
    }
  })
      .then(response => {
        CurrentUser_SongListdata.value = response.data.data;
        console.log(CurrentUser_SongListdata);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const CloseCurrentUser_SongList = () => {
  ShowCurrentUserSongList.value = false;
}

function show_tag(tag) {
  if (tag === 'null' || tag === null) return false;
  return true;
}

function sendDeleteSonglist() {
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
          location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

function activeShowEditSonglist(imgUrl) {
  cover.value = imgUrl;
  coverImageFileUrl.value = imgUrl;
  showEditSonglist.value = true;
}

const CloseSong = () => {
  ShowSong.value = false;
}

const activeShowSong = (songid) => {
  SongData.value = props.currentUserSongList.songs[songid];
  console.log(SongData.value);
  ShowSong.value = true;
}

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

</script>

<template>
  <div v-if="!ShowCurrentUserSongList&!ShowSong">
    <buttonchangesize class="left-4 top-4" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
    <div v-if="!showEditSonglist">
      <div class="h-72 relative">
        <div class="bg-center bg-cover bg-blur w-full h-full absolute top-0 left-0"
             :style="{backgroundImage: 'url(' + props.currentUserSongList.cover + ')'}">
        </div>
        <div class="px-10 py-6 absolute top-0 w-full">
          <svg @click="sendDeleteSonglist"
               class="inline-block float-right h-8 w-8 cursor-pointer text-red-600 hover:text-red-800" width="24"
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
          <svg @click="activeShowEditSonglist(props.currentUserSongList.cover)"
               class="m-1 inline-block float-right h-7 w-7 cursor-pointer text-blue-700 hover:text-blue-900" width="24"
               height="24"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>
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
            <button
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
          </div>
        </div>
      </div>
      <div class="mt-3">
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
                <div class="menu">
                  <button class="font-bold text-xl">···</button>
                  <div class="menu_item font-bold right-7 -bottom-1 bg-gray-600 text-white opacity-90">
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
                    <div @click="addToSongList(index)"
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
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowCurrentUserSongList">
      <CurrentUser_SongList v-if="ShowCurrentUserSongList" v-model:CurrentUser_SongListdata="CurrentUser_SongListdata"
                            v-model:needtoaddSongid="needtoaddSongid"
                            @CloseCurrentUser_SongList="CloseCurrentUser_SongList"
                            v-model:token="token"></CurrentUser_SongList>
    </div>
  </transition>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-if="ShowSong" v-model:SongData="SongData"
                v-model:lyrics="lyrics"
                @CloseSong="CloseSong"
                v-model:token="token"></SongPage>
    </div>
  </transition>
  <EditSonglist :currentUserSongList="currentUserSongList" v-if="showEditSonglist"
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