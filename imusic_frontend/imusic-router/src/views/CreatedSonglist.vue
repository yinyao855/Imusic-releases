<script setup>
import {defineEmits, defineModel, ref} from "vue";
import axios from "axios";
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";
import SongPage from "@/views/SongPage.vue";
import Buttonchangesize from "@/components/buttonchangesize.vue";

const props = defineProps({
  currentUserSongList: Object,
})
const token = defineModel('token')
const emits = defineEmits(['PlaySongList', 'handlePlayAfter', 'handlePlayNow', 'closeSonglist'])

const username = defineModel('username')
const CurrentUser_SongListdata = ref([]);
const ShowCurrentUser_SongList = ref(false);
const ShowSong = ref(false)
const SongData = ref([])
const needtoaddSongid = ref(1);

const cover = ref(null);
const coverImageFileUrl = ref('');

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
  ShowCurrentUser_SongList.value = true;
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
  ShowCurrentUser_SongList.value = false;
}

const onCoverFileChange = (event) => {
  cover.value = event.target.files[0];
  const files = event.target.files || event.dataTransfer.files;
  createImage(files[0]);
};

const createImage = (file) => {
  fileToBase64(file).then(function (base64) {
    coverImageFileUrl.value = base64;// 输出文件的 base64 形式
  }).catch(function (error) {
    console.error('Error:', error.data);
  });
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
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
        console.log("error");
      });
}

function sendEditSonglist(id) {
  showEditSonglist.value = false;
  // const tag_theme = currentUserSongList.tag_theme;
  // const tag_scene = currentUserSongList.tag_scene;
  // const tag_mood = currentUserSongList.tag_mood;
  // const tag_style = currentUserSongList.tag_style;
  // const tag_language = currentUserSongList.tag_language;
  const formData = new FormData();
  formData.append('title', props.currentUserSongList.title);
  formData.append('cover', cover.value);
  formData.append('introduction', props.currentUserSongList.introduction);
  formData.append('owner', props.currentUserSongList.owner);
  formData.append('tag_theme', props.currentUserSongList.tag_theme);
  formData.append('tag_scene', props.currentUserSongList.tag_scene);
  formData.append('tag_mood', props.currentUserSongList.tag_mood);
  formData.append('tag_style', props.currentUserSongList.tag_style);
  formData.append('tag_language', props.currentUserSongList.tag_language);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/songlists/update/' + id, formData)
      .then(function (response) {
        if (response.data.success === true) {
          window.alert("edit success");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

const showEditSonglist = ref(false);

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
  <buttonchangesize class="left-4 top-4" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
  <div v-if="!ShowCurrentUser_SongList&!ShowSong">
    <div class="h-72 relative">
      <div class="bg-center bg-cover bg-blur w-full h-full absolute top-0 left-0"
           :style="{backgroundImage: 'url(' + props.currentUserSongList.cover + ')'}">
      </div>
      <div class="p-5 absolute w-full">
        <svg v-show="!showEditSonglist" @click="sendDeleteSonglist"
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
        <svg v-show="!showEditSonglist" @click="activeShowEditSonglist(props.currentUserSongList.cover)"
             class="m-1 inline-block float-right h-7 w-7 cursor-pointer text-blue-700 hover:text-blue-900" width="24"
             height="24"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
        </svg>
        <button @click="sendEditSonglist(props.currentUserSongList.id)" v-show="showEditSonglist" class="btn m-1 inline-block float-right ">完成
        </button>
        <div class="inline-block" v-show="!showEditSonglist">
          <img :src="props.currentUserSongList.cover" class="img_songlist shadow-2xl">
        </div>
        <div class="inline-block " v-show="showEditSonglist">
          <div>
            <div class="grid grid-cols-1 space-y-2">
              <div class="flex items-center justify-center w-full">
                <label
                    class="flex flex-col rounded-3xl border-4 border-dashed w-full h-52 group text-center transition ease-in duration-300"
                    for="CoverUpLoad">
                  <div class="h-full content-center mx-auto">
                    <img :src="coverImageFileUrl" class="img_songlist shadow-2xl" alt="图像">
                  </div>
                  <div class="absolute m-16">
                    <svg class="icon fill-gray-300 transition hover:fill-gray-400" viewBox="0 0 1194 1024"
                         xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                      <path
                          d="M152.62673094 991.65443843a51.27435943 51.27435943 0 0 1-52.15426311-48.79463341l102.38873717-552.73919819v-1.5198328c0-27.67695563 23.35743091-50.15448278 52.23425434-50.15448278h843.90717007c28.31688465 0 51.51433311 21.75760687 52.3942369 48.79463253l-102.38873725 552.73919807v1.5198328a51.27435943 51.27435943 0 0 1-52.31424564 50.15448382H152.62673094z m636.80995128-262.85108717c13.27853904 0 26.47708777-15.91824934 30.95659499-31.83649784 0-15.91824934-4.47950719-37.11591754-13.27854002-47.67475592L657.05124401 447.87425375c-17.59806379-21.19766814-44.15514285-21.19766814-61.75320652 0L445.23454444 649.2920975C431.95600436 659.85093594 431.95600436 681.04860501 431.95600436 696.96685342c0 15.91824934 13.27853904 31.83649781 30.87660374 31.83649784h105.98834157v132.46542936c0 21.19766814 13.1985478 37.11591754 30.87660377 37.11591755h61.75320656c17.67805497 0 30.87660377-15.91824934 30.87660375-37.11591755V728.80335124H789.51667344zM202.94119625 271.81362032c-37.83583785 0-68.71244156 28.95681469-68.79243277 64.47290816L32.95989401 868.70796219V97.03284595C33.03988525 61.59674467 60.63684963 32.79991158 94.79309279 32.79991158H403.95908469l92.70980156 96.46938842h463.46901844c34.15624311 0 61.83319876 28.79683219 61.83319876 64.31292572V271.97360282H202.94119625z"
                          fill="">
                      </path>
                    </svg>
                  </div>
                  <input type="file" @change="onCoverFileChange" id="CoverUpLoad" class="absolute opacity-0"
                         accept="image/jpeg, image/png, image/gif, image/webp">
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="inline-block ml-7 align-top" v-show="!showEditSonglist">
          <div>
            <h1 class="mt-2 text-white font-extrabold text-3xl">{{ props.currentUserSongList.title }}</h1>
            <p class="mt-2 text-white">{{ props.currentUserSongList.owner }} · {{ props.currentUserSongList.create_date }}</p>
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
        <div v-show="showEditSonglist" class="inline-block ml-7 align-top">
          <div class="flex-column text-md">
            <div class="text-white">*歌曲名</div>
          </div>
          <div class="inputForm bg-zinc-900">
            <svg t="1713779846725" class="icon fill-white transition" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="5635" width="24" height="24">
              <path
                  d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
                  p-id="5636"></path>
            </svg>
            <input type="text" class="input bg-zinc-900 text-white" placeholder="请输入歌单名"
                   v-model="props.currentUserSongList.title">
          </div>
          <div class="flex-column text-md">
            <div class="text-white">介绍</div>
          </div>
          <div class="inputForm bg-zinc-900">
            <svg t="1713789997854" class="icon fill-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 p-id="9038" width="24" height="24">
              <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="white" p-id="9039"></path>
              <path
                  d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z"
                  fill="white" p-id="9040"></path>
            </svg>
            <input type="text" class="input bg-zinc-900 text-white" placeholder="请为你的歌曲写一点介绍"
                   v-model="props.currentUserSongList.introduction">
          </div>
          <div class="inline-block mt-5">
            <select v-model="props.currentUserSongList.tag_theme"
                    class="text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-blue-200 text-blue-700 rounded-full">
              <option :value="null">-- 主题 --</option>
              <option>背景音乐</option>
              <option>经典老歌</option>
              <option>KTV金曲</option>
              <option>游戏配乐</option>
              <option>电影配乐</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="props.currentUserSongList.tag_scene"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-green-200 text-green-700 rounded-full">
              <option :value="null">-- 场景 --</option>
              <option>咖啡馆</option>
              <option>运动</option>
              <option>睡前</option>
              <option>旅行</option>
              <option>派对</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="props.currentUserSongList.tag_mood"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-red-200 text-red-700 rounded-full">
              <option :value="null">-- 心情 --</option>
              <option>伤感</option>
              <option>安静</option>
              <option>思念</option>
              <option>宣泄</option>
              <option>开心</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="props.currentUserSongList.tag_style"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-orange-200 text-orange-700 rounded-full">
              <option :value="null">-- 风格 --</option>
              <option>摇滚</option>
              <option>民谣</option>
              <option>轻音乐</option>
              <option>电音</option>
              <option>流行</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="props.currentUserSongList.tag_language"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-purple-200 text-purple-700 rounded-full">
              <option :value="null">-- 语言 --</option>
              <option>英语</option>
              <option>日语</option>
              <option>粤语</option>
              <option>国语</option>
              <option>韩语</option>
            </select>
          </div>
        </div>
        <div class="mt-3">
          <button @click="PlaySongList(props.currentUserSongList.id)"
                  class="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full">
            <svg class="h-5 w-5 inline-block align-sub text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <p class="inline-block">Play All</p>
          </button>
          <button class="mr-3 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-16 rounded-full inline-block">
            <svg class="h-5 w-5 text-white inline-block align-sub" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            收藏歌单
            ({{ props.currentUserSongList.like }})
          </button>
          <!--        <div class="menu top-3">-->
          <!--          <button>-->
          <!--            <svg class="h-8 w-8 text-gray-200 mb-1 hover:text-gray-500" width="24" height="24"-->
          <!--                 viewBox="0 0 24 24" stroke-width="2"-->
          <!--                 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
          <!--              <path stroke="none" d="M0 0h24v24H0z"/>-->
          <!--              <circle cx="12" cy="12" r="9"/>-->
          <!--              <line x1="8" y1="12" x2="8" y2="12.01"/>-->
          <!--              <line x1="12" y1="12" x2="12" y2="12.01"/>-->
          <!--              <line x1="16" y1="12" x2="16" y2="12.01"/>-->
          <!--            </svg>-->
          <!--          </button>-->
          <!--          <div class="menu_item top-0 left-8">-->
          <!--            <div class="inline-block ml-5 mr-3">-->
          <!--              <svg class="h-8 w-8 cursor-pointer text-blue-600 hover:text-blue-800" width="24" height="24"-->
          <!--                   viewBox="0 0 24 24"-->
          <!--                   xmlns="http://www.w3.org/2000/svg" fill="none"-->
          <!--                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">-->
          <!--                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>-->
          <!--              </svg>-->
          <!--            </div>-->
          <!--            <div class="inline-block" @click="sendDeleteSonglist">-->
          <!--              <svg class="h-8 w-8 cursor-pointer text-red-500 hover:text-red-700" width="24" height="24"-->
          <!--                   viewBox="0 0 24 24" stroke-width="2"-->
          <!--                   stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
          <!--                <path stroke="none" d="M0 0h24v24H0z"/>-->
          <!--                <line x1="4" y1="7" x2="20" y2="7"/>-->
          <!--                <line x1="10" y1="11" x2="10" y2="17"/>-->
          <!--                <line x1="14" y1="11" x2="14" y2="17"/>-->
          <!--                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>-->
          <!--                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>-->
          <!--              </svg>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </div>
    </div>
    <div class="mt-3 overflow-auto">
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
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowCurrentUser_SongList">
      <CurrentUser_SongList v-if="ShowCurrentUser_SongList" v-model:CurrentUser_SongListdata="CurrentUser_SongListdata"
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
  float: left;
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