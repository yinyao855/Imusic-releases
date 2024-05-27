<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";
import SongPage from "@/components/SongPage.vue";

const emits = defineEmits(['handlePlayNow', 'handlePlayAfter', 'addToSongList'])
const token = defineModel('token')
const HasLogin = defineModel('HasLogin')
const tag_language = ref('默认');
const tag_theme = ref('默认')
const tag_scene = ref('默认');
const tag_mood = ref('默认');
const tag_style = ref('默认');
const Songs = ref([]);
const username = defineModel('username');
const SongLists = ref([]);
const mode1=ref(1);
const mode2=ref(1);
const mode3=ref(1);
const mode4=ref(1);
const mode5=ref(1);

const Class1_1 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode1.value !== 1,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode1.value === 1,
}));
const Class1_2 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode1.value !== 2,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode1.value === 2,
}));
const Class1_3 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode1.value !== 3,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode1.value === 3,
}));
const Class1_4 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode1.value !== 4,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode1.value === 4,
}));
const Class1_5 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode1.value !== 5,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode1.value === 5,
}));
const Class1_6 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300': mode1.value !== 6,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode1.value === 6,
}));



const Class2_1 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode2.value !== 1,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode2.value === 1,
}));
const Class2_2 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode2.value !== 2,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode2.value === 2,
}));
const Class2_3 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode2.value !== 3,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode2.value === 3,
}));
const Class2_4 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode2.value !== 4,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode2.value === 4,
}));
const Class2_5 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode2.value !== 5,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode2.value === 5,
}));
const Class2_6 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode2.value !== 6,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode2.value === 6,
}));


const Class3_1 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode3.value !== 1,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode3.value === 1,
}));
const Class3_2 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode3.value !== 2,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode3.value === 2,
}));
const Class3_3 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode3.value !== 3,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode3.value === 3,
}));
const Class3_4 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode3.value !== 4,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode3.value === 4,
}));
const Class3_5 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode3.value !== 5,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode3.value === 5,
}));
const Class3_6 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode3.value !== 6,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode3.value === 6,
}));


const Class4_1 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode4.value !== 1,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode4.value === 1,
}));
const Class4_2 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode4.value !== 2,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode4.value === 2,
}));
const Class4_3 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode4.value !== 3,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode4.value === 3,
}));
const Class4_4 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode4.value !== 4,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode4.value === 4,
}));
const Class4_5 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode4.value !== 5,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode4.value === 5,
}));
const Class4_6 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode4.value !== 6,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode4.value === 6,
}));


const Class5_1 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode5.value !== 1,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode5.value === 1,
}));
const Class5_2 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode5.value !== 2,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode5.value === 2,
}));
const Class5_3 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode5.value !== 3,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode5.value === 3,
}));
const Class5_4 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode5.value !== 4,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode5.value === 4,
}));
const Class5_5 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode5.value !== 5,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode5.value === 5,
}));
const Class5_6 = computed(() => ({
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode5.value !== 6,
  'w-1/3 text-xs block mb-2 text-blue-400 cursor-pointer': mode5.value === 6,
}));



const HandleStyle=(event,value)=>{
  mode5.value=value;
  tag_style.value=event.target.textContent.trim();
}

const HandleMood=(event,value)=>{
  mode4.value=value;
  tag_mood.value=event.target.textContent.trim();
}

const HandleLanguage=(event,value)=>{
  mode1.value=value;
  tag_language.value=event.target.textContent.trim();
}

const HandleTheme=(event,value)=>{
  mode2.value=value;
  console.log(mode2.value);
  tag_theme.value=event.target.textContent.trim();
}

const HandleScene=(event,value)=>{
  mode3.value=value;
  tag_scene.value=event.target.textContent.trim();
}
const GetMySongList = () => {
  console.log(username.value);
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
      username: username.value
    }
  })
      .then(response => {
        SongLists.value = response.data.data;
        console.log(SongLists.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

const handlePlayNow = (id) => {
  emits('handlePlayNow', id);
}


const handlePlayAfter = (id) => {
  emits('handlePlayAfter', id);
}
const NeedToAddSongId = ref([]);

const updateSongs = () => {
  let web = '/songs/query?'
  console.log(web);
  let flag = 0;
  if (tag_theme.value !== '默认') {
    if (web === '/songs/query?') {
      web = web + 'tag_theme=' + tag_theme.value;
    } else {
      web = web + '&tag_theme=' + tag_theme.value;
    }
    flag = 1;
  }
  if (tag_language.value !== '默认') {
    if (web === '/songs/query?') {
      web = web + 'tag_language=' + tag_language.value;
    } else {
      web = web + '&tag_language=' + tag_language.value;
    }
    flag = 1;
  }
  if (tag_scene.value !== '默认') {
    if (web === '/songs/query?') {
      web = web + 'tag_scene=' + tag_scene.value;
    } else {
      web = web + '&tag_scene=' + tag_scene.value;
    }
    flag = 1;
  }
  if (tag_mood.value !== '默认') {
    if (web === '/songs/query?') {
      web = web + 'tag_mood=' + tag_mood.value;
    } else {
      web = web + '&tag_mood=' + tag_mood.value;
    }
    flag = 1;
  }
  if (tag_style.value !== '默认') {
    if (web === '/songs/query?') {
      web = web + 'tag_style=' + tag_style.value;
    } else {
      web = web + '&tag_style=' + tag_style.value;
    }
    flag = 1;
  }
  if (flag === 0) {
    GetInitSongs();
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
  console.log(web);
  instance.get(web)
      .then(response => {
        Songs.value = response.data.data;
        let length = Songs.value.length;
        for (let i = 0; i < length; ++i) {
          Songs.value[i].duration = gettime(Songs.value[i].duration);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
watch(tag_language, () => {
  updateSongs();
});
watch(tag_style, () => {
  updateSongs();
});
watch(tag_theme, () => {
  updateSongs();
});
watch(tag_scene, () => {
  updateSongs();
});
watch(tag_mood, () => {
  updateSongs();
});
const GetInitSongs = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songs/alldata')
      .then(response => {
        Songs.value = response.data.data;
        let length = Songs.value.length;
        for (let i = 0; i < length; ++i) {
          Songs.value[i].duration = gettime(Songs.value[i].duration);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const ShowCurrentUser_SongList = ref(false);

const addToSongList = (index) => {
  NeedToAddSongId.value = [Songs.value[index].id];
  GetMySongList();
  ShowCurrentUser_SongList.value = true;
}

const CloseCurrentUser_SongList = () => {
  ShowCurrentUser_SongList.value = false;
}

const SongId=ref(0);
const NeedShowSongDetail=ref(false);
const NeedShowComplain=ref(false);
const ShowSongDetail=(index)=>{
  SongId.value=Songs.value[index].id;
  NeedShowSongDetail.value=true;
}

const CloseSongPage=()=>{
  NeedShowSongDetail.value=false;
}
onMounted(GetInitSongs);
</script>

<template>

  <transition name="slide" appear>
    <div class="transition-container-2" v-if="NeedShowSongDetail">
      <SongPage  v-model:currentSongId="SongId"
                 @handlePlayNow="handlePlayNow" @CloseSong="CloseSongPage"
                 v-model:username="username" v-model:token="token" v-model:HasLogin="HasLogin"></SongPage>
    </div>
  </transition>


  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowCurrentUser_SongList&&!NeedShowSongDetail">
      <CurrentUser_SongList v-model:CurrentUser_SongListdata="SongLists" v-model:needtoaddSongid="NeedToAddSongId"
                            v-model:token="token" v-model:username="username"
                            @CloseCurrentUser_SongList="CloseCurrentUser_SongList"></CurrentUser_SongList>
    </div>
  </transition>
  <div class="flex w-full h-full px-10" v-if="!ShowCurrentUser_SongList&&!NeedShowSongDetail&&!NeedShowComplain">
    <div class="w-1/5 border-r border-gray-400 px-4 pb-6">
      <div class="text-sm pb-4">语言</div>
      <div class="flex flex-wrap ml-6">
        <span :class="Class1_1" @click="HandleLanguage($event,1)">默认</span>
        <span :class="Class1_2" @click="HandleLanguage($event,2)">英语</span>
        <span :class="Class1_3" @click="HandleLanguage($event,3)">日语</span>
        <span :class="Class1_4" @click="HandleLanguage($event,4)">粤语</span>
        <span :class="Class1_5" @click="HandleLanguage($event,5)">国语</span>
        <span :class="Class1_6" @click="HandleLanguage($event,6)">韩语</span>
      </div>
    </div>
    <div class="w-1/5 border-r border-gray-400 pl-4">
      <div class="text-sm pb-4">主题</div>
      <div class="flex flex-wrap ml-6">
        <span :class="Class2_1" @click="HandleTheme($event,1)">默认</span>
        <span :class="Class2_2" @click="HandleTheme($event,2)">背景音乐</span>
        <span :class="Class2_3" @click="HandleTheme($event,3)">经典老歌</span>
        <span :class="Class2_4" @click="HandleTheme($event,4)">KTV金曲</span>
        <span :class="Class2_5" @click="HandleTheme($event,5)">游戏配乐</span>
        <span :class="Class2_6" @click="HandleTheme($event,6)">电影配乐</span>
      </div>
    </div>
    <div class="w-1/5 border-r border-gray-400 pl-4">
      <div class="text-sm pb-4">场景</div>
      <div class="flex flex-wrap ml-6">
        <span :class="Class3_1" @click="HandleScene($event,1)">默认</span>
        <span :class="Class3_2" @click="HandleScene($event,2)">咖啡馆</span>
        <span :class="Class3_3" @click="HandleScene($event,3)">运动</span>
        <span :class="Class3_4" @click="HandleScene($event,4)">睡前</span>
        <span :class="Class3_5" @click="HandleScene($event,5)">旅行</span>
        <span :class="Class3_6" @click="HandleScene($event,6)">派对</span>
      </div>
    </div>
    <div class="w-1/5 border-r border-gray-400 pl-4">
      <div class="text-sm pb-4">心情</div>
      <div class="flex flex-wrap ml-6">
        <span :class="Class4_1" @click="HandleMood($event,1)">默认</span>
        <span :class="Class4_2" @click="HandleMood($event,2)">伤感</span>
        <span :class="Class4_3" @click="HandleMood($event,3)">安静</span>
        <span :class="Class4_4" @click="HandleMood($event,4)">思念</span>
        <span :class="Class4_5" @click="HandleMood($event,5)">宣泄</span>
        <span :class="Class4_6" @click="HandleMood($event,6)">开心</span>
      </div>
    </div>
    <div class="w-1/5 pl-4">
      <div class="text-sm pb-4">风格</div>
      <div class="flex flex-wrap ml-6">
        <span :class="Class5_1" @click="HandleStyle($event,1)">默认</span>
        <span :class="Class5_2" @click="HandleStyle($event,2)">摇滚</span>
        <span :class="Class5_3" @click="HandleStyle($event,3)">民谣</span>
        <span :class="Class5_4" @click="HandleStyle($event,4)">轻音乐</span>
        <span :class="Class5_5" @click="HandleStyle($event,5)">电音</span>
        <span :class="Class5_6" @click="HandleStyle($event,6)">流行</span>
      </div>
    </div>
  </div>
<!--  <hr class="w-full border border-gray-500 my-2" v-if="!ShowCurrentUser_SongList">-->
  <div class="mx-6" v-if="!ShowCurrentUser_SongList&&!NeedShowSongDetail&&!NeedShowComplain">
    <div class="text-2xl text-white my-5">推荐歌曲</div>
    <table class="table mb-32">
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">歌手</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold">时长</th>
        <th class="text-left text-sm font-semibold"></th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Songs" :key="index">
        <td @click="handlePlayNow(item.id);">
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.cover"
                     alt="Avatar Tailwind CSS Component"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.title }}</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td @click="handlePlayNow(item.id);">
          {{ item.singer }}
        </td>
        <td @click="handlePlayNow(item.id);">{{ item.uploader }}</td>
        <td @click="handlePlayNow(item.id);">{{ item.duration }}</td>
        <th>
          <div
              class="dropdown dropdown-left dropdown-top my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm border-none"
              data-tip="播放列表">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white"></path>
            </svg>
            <ul tabindex="0" class="dropdown-content z-50 menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm"
                style="width:300px">
              <li class="z-50">
                <div class="z-50">
                  <img :src="item.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                  <a class="font-semibold text-sm">{{ item.title }}</a>
                  <br>
                  <a class="block text-gray-600 text-xs mr-0">{{ item.singer }}</a>
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold z-50" @click="handlePlayNow(item.id);">
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
                <div class="text-sm font-semibold" @click="handlePlayAfter(item.id)">
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
                <div class="text-sm font-semibold" @click="addToSongList(index)">
                  <svg class="icon fill-white" viewBox="0 0 1024 1024"
                       xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path
                        d="M853.333 437.336H512q-0.786 0-1.57-0.039-0.785-0.038-1.567-0.115-0.781-0.077-1.558-0.192-0.777-0.116-1.548-0.269-0.77-0.153-1.532-0.344-0.762-0.191-1.514-0.419-0.752-0.228-1.492-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.707q-0.692-0.37-1.366-0.774-0.674-0.404-1.327-0.84-0.653-0.436-1.284-0.904t-1.239-0.967q-0.607-0.498-1.189-1.026-0.582-0.527-1.137-1.083-0.556-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.499-0.607-0.967-1.238-0.468-0.63-0.904-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.707-1.403-0.336-0.71-0.636-1.436t-0.565-1.466q-0.265-0.74-0.493-1.491-0.228-0.752-0.419-1.514-0.19-0.762-0.344-1.532-0.153-0.77-0.269-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.115-1.566-0.039-0.785-0.039-1.57 0-0.786 0.038-1.57 0.04-0.785 0.116-1.567 0.077-0.781 0.192-1.558 0.116-0.777 0.269-1.548 0.153-0.77 0.344-1.532 0.19-0.762 0.419-1.514 0.228-0.752 0.493-1.492 0.264-0.74 0.565-1.465 0.3-0.726 0.636-1.436t0.707-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.436-0.653 0.904-1.284t0.967-1.239q0.498-0.607 1.026-1.189 0.527-0.582 1.083-1.137 0.555-0.556 1.137-1.083 0.582-0.528 1.19-1.026 0.607-0.499 1.238-0.967 0.63-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.366-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636t1.465-0.565q0.74-0.265 1.492-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.532-0.343 0.77-0.153 1.548-0.269 0.777-0.115 1.558-0.192 0.782-0.077 1.567-0.116 0.784-0.038 1.57-0.038h341.333q0.786 0 1.571 0.038 0.784 0.039 1.566 0.116 0.782 0.077 1.559 0.192 0.777 0.116 1.547 0.269 0.771 0.153 1.533 0.344 0.762 0.19 1.513 0.419 0.752 0.228 1.492 0.493 0.739 0.264 1.465 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.693 0.37 1.367 0.775 0.673 0.403 1.327 0.84 0.653 0.436 1.284 0.904t1.238 0.967q0.607 0.498 1.189 1.026 0.582 0.527 1.138 1.083 0.555 0.555 1.083 1.137 0.527 0.582 1.026 1.19 0.498 0.607 0.966 1.238 0.468 0.63 0.904 1.284 0.437 0.653 0.841 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.706 1.403 0.336 0.71 0.636 1.436 0.301 0.726 0.566 1.465 0.264 0.74 0.492 1.492 0.228 0.752 0.419 1.514 0.191 0.762 0.344 1.532 0.154 0.77 0.269 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.116 1.567 0.038 0.784 0.038 1.57 0 0.785-0.038 1.57-0.039 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.269 1.547-0.153 0.77-0.344 1.532-0.191 0.762-0.419 1.514-0.228 0.752-0.492 1.491-0.265 0.74-0.566 1.466-0.3 0.726-0.636 1.436t-0.706 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.841 1.327-0.436 0.653-0.904 1.284t-0.966 1.239q-0.499 0.607-1.026 1.189-0.528 0.582-1.083 1.137-0.556 0.556-1.138 1.083-0.582 0.528-1.189 1.026-0.607 0.499-1.238 0.967-0.631 0.468-1.284 0.904-0.654 0.436-1.327 0.84-0.674 0.404-1.367 0.774t-1.403 0.707q-0.71 0.335-1.436 0.636-0.726 0.3-1.465 0.565-0.74 0.265-1.492 0.493-0.751 0.228-1.513 0.419-0.762 0.19-1.533 0.344-0.77 0.153-1.547 0.269-0.777 0.115-1.559 0.192-0.782 0.077-1.566 0.115-0.785 0.039-1.571 0.039z m32-32q0 0.785-0.038 1.57-0.039 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.269 1.547-0.153 0.77-0.344 1.532-0.191 0.762-0.419 1.514-0.228 0.752-0.492 1.491-0.265 0.74-0.566 1.466-0.3 0.726-0.636 1.436t-0.706 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.841 1.327-0.436 0.653-0.904 1.284t-0.966 1.239q-0.499 0.607-1.026 1.189-0.528 0.582-1.083 1.137-0.556 0.556-1.138 1.083-0.582 0.528-1.189 1.026-0.607 0.499-1.238 0.967-0.631 0.468-1.284 0.904-0.654 0.436-1.327 0.84-0.674 0.404-1.367 0.774t-1.403 0.707q-0.71 0.335-1.436 0.636-0.726 0.3-1.465 0.565-0.74 0.265-1.492 0.493-0.751 0.228-1.513 0.419-0.762 0.19-1.533 0.344-0.77 0.153-1.547 0.269-0.777 0.115-1.559 0.192-0.782 0.077-1.566 0.115-0.785 0.039-1.571 0.039-0.785 0-1.57-0.039-0.784-0.038-1.566-0.115-0.782-0.077-1.559-0.192-0.777-0.116-1.548-0.269-0.77-0.153-1.532-0.344-0.762-0.191-1.514-0.419-0.752-0.228-1.491-0.493-0.74-0.264-1.466-0.565-0.725-0.3-1.435-0.636-0.711-0.336-1.403-0.707-0.693-0.37-1.367-0.774t-1.327-0.84q-0.653-0.436-1.284-0.904t-1.238-0.967q-0.608-0.498-1.19-1.026-0.582-0.527-1.137-1.083-0.556-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.498-0.607-0.966-1.238-0.468-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.706-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.565-1.466-0.265-0.74-0.493-1.491-0.228-0.752-0.419-1.514-0.191-0.762-0.344-1.532-0.153-0.77-0.268-1.548-0.116-0.777-0.193-1.559-0.077-0.781-0.115-1.566-0.039-0.785-0.039-1.57 0-0.786 0.039-1.57 0.038-0.785 0.115-1.567 0.077-0.781 0.193-1.558 0.115-0.777 0.268-1.548 0.153-0.77 0.344-1.532 0.191-0.762 0.419-1.514 0.228-0.752 0.493-1.492t0.565-1.465q0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.498-0.607 1.026-1.189 0.527-0.582 1.083-1.137 0.555-0.556 1.137-1.083 0.582-0.528 1.19-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.367-0.775 0.692-0.37 1.403-0.706 0.71-0.336 1.435-0.636 0.726-0.3 1.466-0.565 0.739-0.265 1.491-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.532-0.343 0.771-0.153 1.548-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.116 0.785-0.038 1.57-0.038 0.786 0 1.571 0.038 0.784 0.039 1.566 0.116 0.782 0.077 1.559 0.192 0.777 0.116 1.547 0.269 0.771 0.153 1.533 0.344 0.762 0.19 1.513 0.419 0.752 0.228 1.492 0.493 0.739 0.264 1.465 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.693 0.37 1.367 0.775 0.673 0.403 1.327 0.84 0.653 0.436 1.284 0.904t1.238 0.967q0.607 0.498 1.189 1.026 0.582 0.527 1.138 1.083 0.555 0.555 1.083 1.137 0.527 0.582 1.026 1.19 0.498 0.607 0.966 1.238 0.468 0.63 0.904 1.284 0.437 0.653 0.841 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.706 1.403 0.336 0.71 0.636 1.436 0.301 0.726 0.566 1.465 0.264 0.74 0.492 1.492 0.228 0.752 0.419 1.514 0.191 0.762 0.344 1.532 0.154 0.77 0.269 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.116 1.567 0.038 0.784 0.038 1.57z m-341.333 0q0 0.785-0.038 1.57-0.04 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.116 0.776-0.269 1.547-0.153 0.77-0.344 1.532-0.19 0.762-0.419 1.514-0.228 0.752-0.493 1.491-0.264 0.74-0.565 1.466-0.3 0.726-0.636 1.436t-0.707 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.84 1.327-0.436 0.653-0.904 1.284t-0.967 1.239q-0.498 0.607-1.026 1.189-0.527 0.582-1.083 1.137-0.555 0.556-1.137 1.083-0.582 0.528-1.19 1.026-0.607 0.499-1.238 0.967-0.63 0.468-1.284 0.904-0.653 0.436-1.327 0.84-0.673 0.404-1.366 0.774-0.693 0.37-1.403 0.707-0.71 0.335-1.436 0.636-0.726 0.3-1.466 0.565-0.74 0.265-1.49 0.493-0.753 0.228-1.515 0.419-0.762 0.19-1.532 0.344-0.77 0.153-1.548 0.269-0.777 0.115-1.558 0.192-0.782 0.077-1.567 0.115-0.784 0.039-1.57 0.039t-1.57-0.039q-0.785-0.038-1.567-0.115-0.781-0.077-1.558-0.192-0.777-0.116-1.548-0.269-0.77-0.153-1.532-0.344-0.762-0.191-1.514-0.419-0.752-0.228-1.492-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.707q-0.692-0.37-1.366-0.774-0.674-0.404-1.327-0.84-0.653-0.436-1.284-0.904t-1.239-0.967q-0.607-0.498-1.189-1.026-0.582-0.527-1.137-1.083-0.556-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.499-0.607-0.967-1.238-0.468-0.63-0.904-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.707-1.403-0.336-0.71-0.636-1.436t-0.565-1.466q-0.265-0.74-0.493-1.491-0.228-0.752-0.419-1.514-0.19-0.762-0.344-1.532-0.153-0.77-0.269-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.115-1.566-0.039-0.785-0.039-1.57 0-0.786 0.038-1.57 0.04-0.785 0.116-1.567 0.077-0.781 0.192-1.558 0.116-0.777 0.269-1.548 0.153-0.77 0.344-1.532 0.19-0.762 0.419-1.514 0.228-0.752 0.493-1.492 0.264-0.74 0.565-1.465 0.3-0.726 0.636-1.436t0.707-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.436-0.653 0.904-1.284t0.967-1.239q0.498-0.607 1.026-1.189 0.527-0.582 1.083-1.137 0.555-0.556 1.137-1.083 0.582-0.528 1.19-1.026 0.607-0.499 1.238-0.967 0.63-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.366-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636t1.465-0.565q0.74-0.265 1.492-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.532-0.343 0.77-0.153 1.548-0.269 0.777-0.115 1.558-0.192 0.782-0.077 1.567-0.116 0.784-0.038 1.57-0.038t1.57 0.038q0.785 0.039 1.567 0.116 0.781 0.077 1.558 0.192 0.777 0.116 1.548 0.269 0.77 0.153 1.532 0.344 0.762 0.19 1.514 0.419 0.752 0.228 1.491 0.493 0.74 0.264 1.466 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.692 0.37 1.366 0.775 0.674 0.403 1.327 0.84 0.653 0.436 1.284 0.904t1.239 0.967q0.607 0.498 1.189 1.026 0.582 0.527 1.137 1.083 0.556 0.555 1.083 1.137 0.528 0.582 1.026 1.19 0.499 0.607 0.967 1.238 0.468 0.63 0.904 1.284 0.437 0.653 0.84 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.707 1.403 0.336 0.71 0.636 1.436t0.565 1.465q0.265 0.74 0.493 1.492 0.228 0.752 0.419 1.514 0.19 0.762 0.344 1.532 0.153 0.77 0.269 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.115 1.567 0.039 0.784 0.039 1.57zM853.333 245.336H512q-0.786 0-1.57-0.039-0.785-0.038-1.567-0.115-0.781-0.077-1.558-0.192-0.777-0.116-1.548-0.269-0.77-0.153-1.532-0.344-0.762-0.191-1.514-0.419-0.752-0.228-1.492-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.707q-0.692-0.37-1.366-0.774-0.674-0.404-1.327-0.84-0.653-0.436-1.284-0.904t-1.239-0.967q-0.607-0.498-1.189-1.026-0.582-0.527-1.137-1.083-0.556-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.499-0.607-0.967-1.238-0.468-0.63-0.904-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.707-1.403-0.336-0.71-0.636-1.436t-0.565-1.466q-0.265-0.74-0.493-1.491-0.228-0.752-0.419-1.514-0.19-0.762-0.344-1.532-0.153-0.77-0.269-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.115-1.566-0.039-0.785-0.039-1.57 0-0.786 0.038-1.57 0.04-0.785 0.116-1.567 0.077-0.781 0.192-1.558 0.116-0.777 0.269-1.548 0.153-0.77 0.344-1.532 0.19-0.762 0.419-1.514 0.228-0.752 0.493-1.492 0.264-0.74 0.565-1.465 0.3-0.726 0.636-1.436t0.707-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.436-0.653 0.904-1.284t0.967-1.239q0.498-0.607 1.026-1.189 0.527-0.582 1.083-1.137 0.555-0.556 1.137-1.083 0.582-0.528 1.19-1.026 0.607-0.499 1.238-0.967 0.63-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.366-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636t1.465-0.565q0.74-0.265 1.492-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.532-0.343 0.77-0.153 1.548-0.269 0.777-0.115 1.558-0.192 0.782-0.077 1.567-0.116 0.784-0.038 1.57-0.038h341.333q0.786 0 1.571 0.038 0.784 0.039 1.566 0.116 0.782 0.077 1.559 0.192 0.777 0.116 1.547 0.269 0.771 0.153 1.533 0.344 0.762 0.19 1.513 0.419 0.752 0.228 1.492 0.493 0.739 0.264 1.465 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.693 0.37 1.367 0.775 0.673 0.403 1.327 0.84 0.653 0.436 1.284 0.904t1.238 0.967q0.607 0.498 1.189 1.026 0.582 0.527 1.138 1.083 0.555 0.555 1.083 1.137 0.527 0.582 1.026 1.19 0.498 0.607 0.966 1.238 0.468 0.63 0.904 1.284 0.437 0.653 0.841 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.706 1.403 0.336 0.71 0.636 1.436 0.301 0.726 0.566 1.465 0.264 0.74 0.492 1.492 0.228 0.752 0.419 1.514 0.191 0.762 0.344 1.532 0.154 0.77 0.269 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.116 1.567 0.038 0.784 0.038 1.57 0 0.785-0.038 1.57-0.039 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.269 1.547-0.153 0.77-0.344 1.532-0.191 0.762-0.419 1.514-0.228 0.752-0.492 1.491-0.265 0.74-0.566 1.466-0.3 0.726-0.636 1.436t-0.706 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.841 1.327-0.436 0.653-0.904 1.284t-0.966 1.239q-0.499 0.607-1.026 1.189-0.528 0.582-1.083 1.137-0.556 0.556-1.138 1.083-0.582 0.528-1.189 1.026-0.607 0.499-1.238 0.967-0.631 0.468-1.284 0.904-0.654 0.436-1.327 0.84-0.674 0.404-1.367 0.774t-1.403 0.707q-0.71 0.335-1.436 0.636-0.726 0.3-1.465 0.565-0.74 0.265-1.492 0.493-0.751 0.228-1.513 0.419-0.762 0.19-1.533 0.344-0.77 0.153-1.547 0.269-0.777 0.115-1.559 0.192-0.782 0.077-1.566 0.115-0.785 0.039-1.571 0.039z m32-32q0 0.785-0.038 1.57-0.039 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.269 1.547-0.153 0.77-0.344 1.532-0.191 0.762-0.419 1.514-0.228 0.752-0.492 1.491-0.265 0.74-0.566 1.466-0.3 0.726-0.636 1.436t-0.706 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.841 1.327-0.436 0.653-0.904 1.284t-0.966 1.239q-0.499 0.607-1.026 1.189-0.528 0.582-1.083 1.137-0.556 0.556-1.138 1.083-0.582 0.528-1.189 1.026-0.607 0.499-1.238 0.967-0.631 0.468-1.284 0.904-0.654 0.436-1.327 0.84-0.674 0.404-1.367 0.774t-1.403 0.707q-0.71 0.335-1.436 0.636-0.726 0.3-1.465 0.565-0.74 0.265-1.492 0.493-0.751 0.228-1.513 0.419-0.762 0.19-1.533 0.344-0.77 0.153-1.547 0.269-0.777 0.115-1.559 0.192-0.782 0.077-1.566 0.115-0.785 0.039-1.571 0.039-0.785 0-1.57-0.039-0.784-0.038-1.566-0.115-0.782-0.077-1.559-0.192-0.777-0.116-1.548-0.269-0.77-0.153-1.532-0.344-0.762-0.191-1.514-0.419-0.752-0.228-1.491-0.493-0.74-0.264-1.466-0.565-0.725-0.3-1.435-0.636-0.711-0.336-1.403-0.707-0.693-0.37-1.367-0.774t-1.327-0.84q-0.653-0.436-1.284-0.904t-1.238-0.967q-0.608-0.498-1.19-1.026-0.582-0.527-1.137-1.083-0.556-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.498-0.607-0.966-1.238-0.468-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.706-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.565-1.466-0.265-0.74-0.493-1.491-0.228-0.752-0.419-1.514-0.191-0.762-0.344-1.532-0.153-0.77-0.268-1.548-0.116-0.777-0.193-1.559-0.077-0.781-0.115-1.566-0.039-0.785-0.039-1.57 0-0.786 0.039-1.57 0.038-0.785 0.115-1.567 0.077-0.781 0.193-1.558 0.115-0.777 0.268-1.548 0.153-0.77 0.344-1.532 0.191-0.762 0.419-1.514 0.228-0.752 0.493-1.492t0.565-1.465q0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.498-0.607 1.026-1.189 0.527-0.582 1.083-1.137 0.555-0.556 1.137-1.083 0.582-0.528 1.19-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.367-0.775 0.692-0.37 1.403-0.706 0.71-0.336 1.435-0.636 0.726-0.3 1.466-0.565 0.739-0.265 1.491-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.532-0.343 0.771-0.153 1.548-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.116 0.785-0.038 1.57-0.038 0.786 0 1.571 0.038 0.784 0.039 1.566 0.116 0.782 0.077 1.559 0.192 0.777 0.116 1.547 0.269 0.771 0.153 1.533 0.344 0.762 0.19 1.513 0.419 0.752 0.228 1.492 0.493 0.739 0.264 1.465 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.693 0.37 1.367 0.775 0.673 0.403 1.327 0.84 0.653 0.436 1.284 0.904t1.238 0.967q0.607 0.498 1.189 1.026 0.582 0.527 1.138 1.083 0.555 0.555 1.083 1.137 0.527 0.582 1.026 1.19 0.498 0.607 0.966 1.238 0.468 0.63 0.904 1.284 0.437 0.653 0.841 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.706 1.403 0.336 0.71 0.636 1.436 0.301 0.726 0.566 1.465 0.264 0.74 0.492 1.492 0.228 0.752 0.419 1.514 0.191 0.762 0.344 1.532 0.154 0.77 0.269 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.116 1.567 0.038 0.784 0.038 1.57z m-341.333 0q0 0.785-0.038 1.57-0.04 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.116 0.776-0.269 1.547-0.153 0.77-0.344 1.532-0.19 0.762-0.419 1.514-0.228 0.752-0.493 1.491-0.264 0.74-0.565 1.466-0.3 0.726-0.636 1.436t-0.707 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.84 1.327-0.436 0.653-0.904 1.284t-0.967 1.239q-0.498 0.607-1.026 1.189-0.527 0.582-1.083 1.137-0.555 0.556-1.137 1.083-0.582 0.528-1.19 1.026-0.607 0.499-1.238 0.967-0.63 0.468-1.284 0.904-0.653 0.436-1.327 0.84-0.673 0.404-1.366 0.774-0.693 0.37-1.403 0.707-0.71 0.335-1.436 0.636-0.726 0.3-1.466 0.565-0.74 0.265-1.49 0.493-0.753 0.228-1.515 0.419-0.762 0.19-1.532 0.344-0.77 0.153-1.548 0.269-0.777 0.115-1.558 0.192-0.782 0.077-1.567 0.115-0.784 0.039-1.57 0.039t-1.57-0.039q-0.785-0.038-1.567-0.115-0.781-0.077-1.558-0.192-0.777-0.116-1.548-0.269-0.77-0.153-1.532-0.344-0.762-0.191-1.514-0.419-0.752-0.228-1.492-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.707q-0.692-0.37-1.366-0.774-0.674-0.404-1.327-0.84-0.653-0.436-1.284-0.904t-1.239-0.967q-0.607-0.498-1.189-1.026-0.582-0.527-1.137-1.083-0.556-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.499-0.607-0.967-1.238-0.468-0.63-0.904-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.707-1.403-0.336-0.71-0.636-1.436t-0.565-1.466q-0.265-0.74-0.493-1.491-0.228-0.752-0.419-1.514-0.19-0.762-0.344-1.532-0.153-0.77-0.269-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.115-1.566-0.039-0.785-0.039-1.57 0-0.786 0.038-1.57 0.04-0.785 0.116-1.567 0.077-0.781 0.192-1.558 0.116-0.777 0.269-1.548 0.153-0.77 0.344-1.532 0.19-0.762 0.419-1.514 0.228-0.752 0.493-1.492 0.264-0.74 0.565-1.465 0.3-0.726 0.636-1.436t0.707-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.436-0.653 0.904-1.284t0.967-1.239q0.498-0.607 1.026-1.189 0.527-0.582 1.083-1.137 0.555-0.556 1.137-1.083 0.582-0.528 1.19-1.026 0.607-0.499 1.238-0.967 0.63-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.366-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636t1.465-0.565q0.74-0.265 1.492-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.532-0.343 0.77-0.153 1.548-0.269 0.777-0.115 1.558-0.192 0.782-0.077 1.567-0.116 0.784-0.038 1.57-0.038t1.57 0.038q0.785 0.039 1.567 0.116 0.781 0.077 1.558 0.192 0.777 0.116 1.548 0.269 0.77 0.153 1.532 0.344 0.762 0.19 1.514 0.419 0.752 0.228 1.491 0.493 0.74 0.264 1.466 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.692 0.37 1.366 0.775 0.674 0.403 1.327 0.84 0.653 0.436 1.284 0.904t1.239 0.967q0.607 0.498 1.189 1.026 0.582 0.527 1.137 1.083 0.556 0.555 1.083 1.137 0.528 0.582 1.026 1.19 0.499 0.607 0.967 1.238 0.468 0.63 0.904 1.284 0.437 0.653 0.84 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.707 1.403 0.336 0.71 0.636 1.436t0.565 1.465q0.265 0.74 0.493 1.492 0.228 0.752 0.419 1.514 0.19 0.762 0.344 1.532 0.153 0.77 0.269 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.115 1.567 0.039 0.784 0.039 1.57zM853.355 842.664H170.687q-0.785 0-1.57-0.038-0.784-0.039-1.566-0.116-0.782-0.077-1.559-0.192-0.777-0.116-1.547-0.269-0.77-0.153-1.533-0.344-0.762-0.19-1.514-0.419-0.751-0.228-1.491-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.706q-0.693-0.37-1.367-0.775-0.674-0.403-1.327-0.84-0.653-0.436-1.284-0.904-0.63-0.468-1.238-0.967-0.607-0.498-1.19-1.026-0.581-0.527-1.137-1.083-0.555-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.498-0.607-0.966-1.238-0.468-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.673-0.774-1.366-0.37-0.693-0.706-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.565-1.465-0.265-0.74-0.493-1.492-0.228-0.752-0.418-1.514-0.191-0.762-0.345-1.532-0.153-0.77-0.268-1.548-0.115-0.777-0.192-1.558-0.077-0.782-0.116-1.567-0.038-0.784-0.038-1.57 0-0.785 0.038-1.57 0.039-0.785 0.116-1.566 0.077-0.782 0.192-1.56 0.115-0.776 0.268-1.547 0.154-0.77 0.345-1.532 0.19-0.762 0.418-1.514 0.228-0.752 0.493-1.491 0.265-0.74 0.565-1.466 0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.692 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.499-0.607 1.026-1.189 0.528-0.582 1.083-1.137 0.556-0.556 1.138-1.083 0.582-0.528 1.189-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904t1.327-0.84q0.674-0.404 1.367-0.774t1.403-0.707q0.71-0.335 1.436-0.636 0.725-0.3 1.465-0.565 0.74-0.265 1.491-0.493 0.752-0.228 1.514-0.419 0.762-0.19 1.533-0.344 0.77-0.153 1.547-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.115 0.785-0.039 1.57-0.039h682.668q0.784 0 1.57 0.039 0.784 0.038 1.566 0.115 0.782 0.077 1.558 0.192 0.778 0.116 1.548 0.269 0.77 0.153 1.533 0.344 0.761 0.191 1.514 0.419 0.75 0.228 1.49 0.493 0.74 0.264 1.466 0.565 0.726 0.3 1.435 0.636 0.71 0.336 1.404 0.707 0.692 0.37 1.367 0.774 0.673 0.404 1.327 0.84 0.652 0.436 1.284 0.904 0.63 0.468 1.237 0.967 0.607 0.498 1.19 1.026 0.582 0.527 1.137 1.083 0.557 0.555 1.083 1.137 0.529 0.582 1.027 1.19 0.497 0.607 0.966 1.238 0.467 0.63 0.904 1.284 0.437 0.653 0.84 1.327 0.404 0.674 0.774 1.366 0.37 0.693 0.707 1.403 0.335 0.71 0.636 1.436 0.3 0.726 0.566 1.466 0.264 0.74 0.492 1.491 0.229 0.752 0.42 1.514 0.19 0.762 0.344 1.532 0.153 0.77 0.268 1.548 0.115 0.777 0.192 1.559 0.077 0.781 0.115 1.566 0.04 0.785 0.04 1.57 0 0.786-0.04 1.57-0.038 0.785-0.115 1.567-0.077 0.781-0.192 1.558t-0.269 1.548q-0.154 0.77-0.344 1.532-0.19 0.762-0.418 1.514-0.228 0.752-0.493 1.492-0.266 0.74-0.566 1.465-0.3 0.726-0.636 1.436-0.337 0.71-0.707 1.403-0.37 0.693-0.774 1.366-0.404 0.674-0.84 1.327-0.437 0.653-0.904 1.284-0.469 0.631-0.966 1.239-0.499 0.607-1.027 1.189-0.526 0.582-1.082 1.137-0.555 0.556-1.137 1.083-0.584 0.528-1.19 1.026-0.607 0.499-1.238 0.967-0.632 0.468-1.284 0.904-0.654 0.437-1.327 0.84-0.675 0.404-1.368 0.775-0.692 0.37-1.403 0.706-0.71 0.336-1.435 0.636-0.726 0.3-1.466 0.565-0.74 0.265-1.49 0.493-0.753 0.228-1.514 0.42-0.763 0.19-1.533 0.343-0.77 0.153-1.548 0.269-0.776 0.115-1.558 0.192-0.783 0.077-1.567 0.116-0.784 0.038-1.57 0.038z m32-32q0 0.786-0.04 1.57-0.038 0.785-0.115 1.567-0.077 0.781-0.192 1.558t-0.269 1.548q-0.154 0.77-0.344 1.532-0.19 0.762-0.418 1.514-0.228 0.752-0.493 1.492-0.266 0.74-0.566 1.465-0.3 0.726-0.636 1.436-0.337 0.71-0.707 1.403-0.37 0.693-0.774 1.366-0.404 0.674-0.84 1.327-0.437 0.653-0.904 1.284-0.469 0.631-0.966 1.239-0.499 0.607-1.027 1.189-0.526 0.582-1.082 1.137-0.555 0.556-1.137 1.083-0.584 0.528-1.19 1.026-0.607 0.499-1.238 0.967-0.632 0.468-1.284 0.904-0.654 0.437-1.327 0.84-0.675 0.404-1.368 0.775-0.692 0.37-1.403 0.706-0.71 0.336-1.435 0.636-0.726 0.3-1.466 0.565-0.74 0.265-1.49 0.493-0.753 0.228-1.514 0.42-0.763 0.19-1.533 0.343-0.77 0.153-1.548 0.269-0.776 0.115-1.558 0.192-0.783 0.077-1.567 0.116-0.784 0.038-1.57 0.038t-1.57-0.038q-0.784-0.039-1.567-0.116-0.781-0.077-1.558-0.192-0.778-0.116-1.548-0.269-0.77-0.153-1.533-0.344-0.761-0.19-1.512-0.419-0.753-0.228-1.493-0.493-0.74-0.264-1.464-0.565-0.726-0.3-1.437-0.636-0.71-0.336-1.403-0.706-0.692-0.37-1.366-0.775-0.673-0.403-1.327-0.84-0.654-0.436-1.284-0.904-0.632-0.468-1.239-0.967-0.606-0.498-1.188-1.026-0.582-0.527-1.139-1.083-0.554-0.555-1.082-1.137t-1.027-1.19q-0.497-0.607-0.965-1.238-0.469-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.673-0.774-1.366-0.37-0.693-0.707-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.564-1.465-0.264-0.74-0.493-1.492-0.227-0.752-0.418-1.514-0.192-0.762-0.346-1.532-0.152-0.77-0.267-1.548-0.115-0.777-0.192-1.558-0.077-0.782-0.116-1.567-0.038-0.784-0.038-1.57 0-0.785 0.038-1.57t0.115-1.566q0.077-0.782 0.192-1.56 0.115-0.776 0.268-1.547 0.154-0.77 0.346-1.532 0.19-0.762 0.418-1.514 0.229-0.752 0.493-1.491 0.264-0.74 0.564-1.466 0.302-0.726 0.638-1.436t0.706-1.403q0.37-0.692 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284 0.467-0.631 0.965-1.239 0.5-0.607 1.027-1.189 0.528-0.582 1.082-1.137 0.557-0.556 1.139-1.083 0.582-0.528 1.188-1.026 0.607-0.499 1.239-0.967 0.63-0.468 1.284-0.904t1.327-0.84q0.673-0.404 1.366-0.774 0.693-0.37 1.404-0.707 0.71-0.335 1.436-0.636 0.724-0.3 1.464-0.565 0.74-0.265 1.493-0.493 0.75-0.228 1.512-0.419 0.763-0.19 1.534-0.344 0.77-0.153 1.547-0.269 0.777-0.115 1.558-0.192 0.783-0.077 1.567-0.115 0.784-0.039 1.57-0.039 0.785 0 1.57 0.039 0.784 0.038 1.567 0.115 0.782 0.077 1.558 0.192 0.778 0.116 1.548 0.269 0.77 0.153 1.533 0.344 0.761 0.191 1.514 0.419 0.75 0.228 1.49 0.493 0.74 0.264 1.466 0.565 0.726 0.3 1.435 0.636 0.71 0.336 1.404 0.707 0.692 0.37 1.367 0.774 0.673 0.404 1.327 0.84 0.652 0.436 1.284 0.904 0.63 0.468 1.237 0.967 0.607 0.498 1.19 1.026 0.582 0.527 1.137 1.083 0.557 0.555 1.083 1.137 0.529 0.582 1.027 1.19 0.497 0.607 0.966 1.238 0.467 0.63 0.904 1.284 0.437 0.653 0.84 1.327 0.404 0.674 0.774 1.366 0.37 0.693 0.707 1.403 0.335 0.71 0.636 1.436 0.3 0.726 0.566 1.466 0.264 0.74 0.492 1.491 0.229 0.752 0.42 1.514 0.19 0.762 0.344 1.532 0.153 0.77 0.268 1.548 0.115 0.777 0.192 1.559 0.077 0.781 0.115 1.566 0.04 0.785 0.04 1.57z m-682.668 0q0 0.786-0.038 1.57-0.039 0.785-0.116 1.567-0.077 0.781-0.192 1.558t-0.268 1.548q-0.154 0.77-0.345 1.532-0.19 0.762-0.418 1.514-0.228 0.752-0.493 1.492t-0.565 1.465q-0.301 0.726-0.637 1.436t-0.706 1.403q-0.37 0.693-0.774 1.366-0.404 0.674-0.84 1.327-0.437 0.653-0.905 1.284t-0.966 1.239q-0.499 0.607-1.026 1.189-0.528 0.582-1.083 1.137-0.556 0.556-1.138 1.083-0.582 0.528-1.189 1.026-0.607 0.499-1.238 0.967-0.631 0.468-1.284 0.904-0.653 0.437-1.327 0.84-0.674 0.404-1.367 0.775-0.693 0.37-1.403 0.706-0.71 0.336-1.436 0.636-0.725 0.3-1.465 0.565-0.74 0.265-1.491 0.493-0.752 0.228-1.514 0.42-0.762 0.19-1.533 0.343-0.77 0.153-1.547 0.269-0.777 0.115-1.559 0.192-0.782 0.077-1.566 0.116-0.785 0.038-1.57 0.038-0.786 0-1.57-0.038-0.785-0.039-1.567-0.116-0.782-0.077-1.559-0.192-0.777-0.116-1.547-0.269-0.77-0.153-1.533-0.344-0.762-0.19-1.514-0.419-0.751-0.228-1.491-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.706q-0.693-0.37-1.367-0.775-0.674-0.403-1.327-0.84-0.653-0.436-1.284-0.904-0.63-0.468-1.238-0.967-0.607-0.498-1.19-1.026-0.581-0.527-1.137-1.083-0.555-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.498-0.607-0.966-1.238-0.468-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.673-0.774-1.366-0.37-0.693-0.706-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.565-1.465-0.265-0.74-0.493-1.492-0.228-0.752-0.418-1.514-0.191-0.762-0.345-1.532-0.153-0.77-0.268-1.548-0.115-0.777-0.192-1.558-0.077-0.782-0.116-1.567-0.038-0.784-0.038-1.57 0-0.785 0.038-1.57 0.039-0.785 0.116-1.566 0.077-0.782 0.192-1.56 0.115-0.776 0.268-1.547 0.154-0.77 0.345-1.532 0.19-0.762 0.418-1.514 0.228-0.752 0.493-1.491 0.265-0.74 0.565-1.466 0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.692 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.499-0.607 1.026-1.189 0.528-0.582 1.083-1.137 0.556-0.556 1.138-1.083 0.582-0.528 1.189-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904t1.327-0.84q0.674-0.404 1.367-0.774t1.403-0.707q0.71-0.335 1.436-0.636 0.725-0.3 1.465-0.565 0.74-0.265 1.491-0.493 0.752-0.228 1.514-0.419 0.762-0.19 1.533-0.344 0.77-0.153 1.547-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.115 0.785-0.039 1.57-0.039 0.786 0 1.57 0.039 0.785 0.038 1.567 0.115 0.782 0.077 1.559 0.192 0.777 0.116 1.547 0.269 0.77 0.153 1.533 0.344 0.762 0.191 1.514 0.419 0.751 0.228 1.491 0.493 0.74 0.264 1.465 0.565 0.726 0.3 1.436 0.636t1.403 0.707q0.693 0.37 1.367 0.774t1.327 0.84q0.653 0.436 1.284 0.904 0.63 0.468 1.238 0.967 0.607 0.498 1.19 1.026 0.581 0.527 1.137 1.083 0.555 0.555 1.083 1.137 0.528 0.582 1.026 1.19 0.498 0.607 0.966 1.238 0.468 0.63 0.905 1.284 0.436 0.653 0.84 1.327 0.404 0.674 0.774 1.366 0.37 0.693 0.706 1.403 0.336 0.71 0.637 1.436 0.3 0.726 0.565 1.466 0.265 0.74 0.493 1.491 0.228 0.752 0.418 1.514 0.191 0.762 0.345 1.532 0.153 0.77 0.268 1.548 0.115 0.777 0.192 1.559 0.077 0.781 0.116 1.566 0.038 0.785 0.038 1.57zM853.355 629.336H170.687q-0.785 0-1.57-0.039-0.784-0.038-1.566-0.115-0.782-0.077-1.559-0.192-0.777-0.116-1.547-0.269-0.77-0.153-1.533-0.344-0.762-0.191-1.514-0.419-0.751-0.228-1.491-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.707q-0.693-0.37-1.367-0.774t-1.327-0.84q-0.653-0.436-1.284-0.904-0.63-0.468-1.238-0.967-0.607-0.498-1.19-1.026-0.581-0.527-1.137-1.083-0.555-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.498-0.607-0.966-1.238-0.468-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.706-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.565-1.466-0.265-0.74-0.493-1.491-0.228-0.752-0.418-1.514-0.191-0.762-0.345-1.532-0.153-0.77-0.268-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.116-1.566-0.038-0.785-0.038-1.57 0-0.786 0.038-1.57 0.039-0.785 0.116-1.567 0.077-0.781 0.192-1.558t0.268-1.548q0.154-0.77 0.345-1.532 0.19-0.762 0.418-1.514 0.228-0.752 0.493-1.492t0.565-1.465q0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.499-0.607 1.026-1.189 0.528-0.582 1.083-1.137 0.556-0.556 1.138-1.083 0.582-0.528 1.189-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.367-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636 0.725-0.3 1.465-0.565 0.74-0.265 1.491-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.533-0.343 0.77-0.153 1.547-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.116 0.785-0.038 1.57-0.038h682.668q0.784 0 1.57 0.038 0.784 0.039 1.566 0.116 0.782 0.077 1.558 0.192 0.778 0.116 1.548 0.269 0.77 0.153 1.533 0.344 0.761 0.19 1.514 0.419 0.75 0.228 1.49 0.493 0.74 0.264 1.466 0.565 0.726 0.3 1.435 0.636 0.71 0.336 1.404 0.706 0.692 0.37 1.367 0.775 0.673 0.403 1.327 0.84 0.652 0.436 1.284 0.904 0.63 0.468 1.237 0.967 0.607 0.498 1.19 1.026 0.582 0.527 1.137 1.083 0.557 0.555 1.083 1.137 0.529 0.582 1.027 1.19 0.497 0.607 0.966 1.238 0.467 0.63 0.904 1.284 0.437 0.653 0.84 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.707 1.403 0.335 0.71 0.636 1.436 0.3 0.726 0.566 1.465 0.264 0.74 0.492 1.492 0.229 0.752 0.42 1.514 0.19 0.762 0.344 1.532 0.153 0.77 0.268 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.115 1.567 0.04 0.784 0.04 1.57 0 0.785-0.04 1.57-0.038 0.785-0.115 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.269 1.547-0.154 0.77-0.344 1.532-0.19 0.762-0.418 1.514-0.228 0.752-0.493 1.491-0.266 0.74-0.566 1.466-0.3 0.726-0.636 1.436-0.337 0.71-0.707 1.403-0.37 0.692-0.774 1.366-0.404 0.674-0.84 1.327-0.437 0.653-0.904 1.284-0.469 0.631-0.966 1.239-0.499 0.607-1.027 1.189-0.526 0.582-1.082 1.137-0.555 0.556-1.137 1.083-0.584 0.528-1.19 1.026-0.607 0.499-1.238 0.967-0.632 0.468-1.284 0.904-0.654 0.436-1.327 0.84-0.675 0.404-1.368 0.774-0.692 0.37-1.403 0.707-0.71 0.335-1.435 0.636-0.726 0.3-1.466 0.565-0.74 0.265-1.49 0.493-0.753 0.228-1.514 0.419-0.763 0.19-1.533 0.344-0.77 0.153-1.548 0.269-0.776 0.115-1.558 0.192-0.783 0.077-1.567 0.115-0.784 0.039-1.57 0.039z m32-32q0 0.785-0.04 1.57-0.038 0.785-0.115 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.269 1.547-0.154 0.77-0.344 1.532-0.19 0.762-0.418 1.514-0.228 0.752-0.493 1.491-0.266 0.74-0.566 1.466-0.3 0.726-0.636 1.436-0.337 0.71-0.707 1.403-0.37 0.692-0.774 1.366-0.404 0.674-0.84 1.327-0.437 0.653-0.904 1.284-0.469 0.631-0.966 1.239-0.499 0.607-1.027 1.189-0.526 0.582-1.082 1.137-0.555 0.556-1.137 1.083-0.584 0.528-1.19 1.026-0.607 0.499-1.238 0.967-0.632 0.468-1.284 0.904-0.654 0.436-1.327 0.84-0.675 0.404-1.368 0.774-0.692 0.37-1.403 0.707-0.71 0.335-1.435 0.636-0.726 0.3-1.466 0.565-0.74 0.265-1.49 0.493-0.753 0.228-1.514 0.419-0.763 0.19-1.533 0.344-0.77 0.153-1.548 0.269-0.776 0.115-1.558 0.192-0.783 0.077-1.567 0.115-0.784 0.039-1.57 0.039t-1.57-0.039q-0.784-0.038-1.567-0.115-0.781-0.077-1.558-0.192-0.778-0.116-1.548-0.269-0.77-0.153-1.533-0.344-0.761-0.191-1.512-0.419-0.753-0.228-1.493-0.493-0.74-0.264-1.464-0.565-0.726-0.3-1.437-0.636-0.71-0.336-1.403-0.707-0.692-0.37-1.366-0.774-0.673-0.404-1.327-0.84-0.654-0.436-1.284-0.904-0.632-0.468-1.239-0.967-0.606-0.498-1.188-1.026-0.582-0.527-1.139-1.083-0.554-0.555-1.082-1.137t-1.027-1.19q-0.497-0.607-0.965-1.238-0.469-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.707-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.564-1.466-0.264-0.74-0.493-1.491-0.227-0.752-0.418-1.514-0.192-0.762-0.346-1.532-0.152-0.77-0.267-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.116-1.566-0.038-0.785-0.038-1.57 0-0.786 0.038-1.57 0.038-0.785 0.115-1.567 0.077-0.781 0.192-1.558t0.268-1.548q0.154-0.77 0.346-1.532 0.19-0.762 0.418-1.514 0.229-0.752 0.493-1.492t0.564-1.465q0.302-0.726 0.638-1.436t0.706-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284 0.467-0.631 0.965-1.239 0.5-0.607 1.027-1.189 0.528-0.582 1.082-1.137 0.557-0.556 1.139-1.083 0.582-0.528 1.188-1.026 0.607-0.499 1.239-0.967 0.63-0.468 1.284-0.904 0.654-0.437 1.327-0.84 0.673-0.404 1.366-0.775 0.693-0.37 1.404-0.706 0.71-0.336 1.436-0.636 0.724-0.3 1.464-0.565 0.74-0.265 1.493-0.493 0.75-0.228 1.512-0.42 0.763-0.19 1.534-0.343 0.77-0.153 1.547-0.269 0.777-0.115 1.558-0.192 0.783-0.077 1.567-0.116 0.784-0.038 1.57-0.038 0.785 0 1.57 0.038 0.784 0.039 1.567 0.116 0.782 0.077 1.558 0.192 0.778 0.116 1.548 0.269 0.77 0.153 1.533 0.344 0.761 0.19 1.514 0.419 0.75 0.228 1.49 0.493 0.74 0.264 1.466 0.565 0.726 0.3 1.435 0.636 0.71 0.336 1.404 0.706 0.692 0.37 1.367 0.775 0.673 0.403 1.327 0.84 0.652 0.436 1.284 0.904 0.63 0.468 1.237 0.967 0.607 0.498 1.19 1.026 0.582 0.527 1.137 1.083 0.557 0.555 1.083 1.137 0.529 0.582 1.027 1.19 0.497 0.607 0.966 1.238 0.467 0.63 0.904 1.284 0.437 0.653 0.84 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.707 1.403 0.335 0.71 0.636 1.436 0.3 0.726 0.566 1.465 0.264 0.74 0.492 1.492 0.229 0.752 0.42 1.514 0.19 0.762 0.344 1.532 0.153 0.77 0.268 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.115 1.567 0.04 0.784 0.04 1.57z m-682.668 0q0 0.785-0.038 1.57-0.039 0.785-0.116 1.566-0.077 0.782-0.192 1.56-0.115 0.776-0.268 1.547-0.154 0.77-0.345 1.532-0.19 0.762-0.418 1.514-0.228 0.752-0.493 1.491-0.265 0.74-0.565 1.466-0.301 0.726-0.637 1.436t-0.706 1.403q-0.37 0.692-0.774 1.366-0.404 0.674-0.84 1.327-0.437 0.653-0.905 1.284t-0.966 1.239q-0.499 0.607-1.026 1.189-0.528 0.582-1.083 1.137-0.556 0.556-1.138 1.083-0.582 0.528-1.189 1.026-0.607 0.499-1.238 0.967-0.631 0.468-1.284 0.904t-1.327 0.84q-0.674 0.404-1.367 0.774t-1.403 0.707q-0.71 0.335-1.436 0.636-0.725 0.3-1.465 0.565-0.74 0.265-1.491 0.493-0.752 0.228-1.514 0.419-0.762 0.19-1.533 0.344-0.77 0.153-1.547 0.269-0.777 0.115-1.559 0.192-0.782 0.077-1.566 0.115-0.785 0.039-1.57 0.039-0.786 0-1.57-0.039-0.785-0.038-1.567-0.115-0.782-0.077-1.559-0.192-0.777-0.116-1.547-0.269-0.77-0.153-1.533-0.344-0.762-0.191-1.514-0.419-0.751-0.228-1.491-0.493-0.74-0.264-1.465-0.565-0.726-0.3-1.436-0.636t-1.403-0.707q-0.693-0.37-1.367-0.774t-1.327-0.84q-0.653-0.436-1.284-0.904-0.63-0.468-1.238-0.967-0.607-0.498-1.19-1.026-0.581-0.527-1.137-1.083-0.555-0.555-1.083-1.137-0.528-0.582-1.026-1.19-0.498-0.607-0.966-1.238-0.468-0.63-0.905-1.284-0.436-0.653-0.84-1.327-0.404-0.674-0.774-1.366-0.37-0.693-0.706-1.403-0.336-0.71-0.637-1.436-0.3-0.726-0.565-1.466-0.265-0.74-0.493-1.491-0.228-0.752-0.418-1.514-0.191-0.762-0.345-1.532-0.153-0.77-0.268-1.548-0.115-0.777-0.192-1.559-0.077-0.781-0.116-1.566-0.038-0.785-0.038-1.57 0-0.786 0.038-1.57 0.039-0.785 0.116-1.567 0.077-0.781 0.192-1.558t0.268-1.548q0.154-0.77 0.345-1.532 0.19-0.762 0.418-1.514 0.228-0.752 0.493-1.492t0.565-1.465q0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.499-0.607 1.026-1.189 0.528-0.582 1.083-1.137 0.556-0.556 1.138-1.083 0.582-0.528 1.189-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.367-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636 0.725-0.3 1.465-0.565 0.74-0.265 1.491-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.533-0.343 0.77-0.153 1.547-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.116 0.785-0.038 1.57-0.038 0.786 0 1.57 0.038 0.785 0.039 1.567 0.116 0.782 0.077 1.559 0.192 0.777 0.116 1.547 0.269 0.77 0.153 1.533 0.344 0.762 0.19 1.514 0.419 0.751 0.228 1.491 0.493 0.74 0.264 1.465 0.565 0.726 0.3 1.436 0.636t1.403 0.706q0.693 0.37 1.367 0.775 0.674 0.403 1.327 0.84 0.653 0.436 1.284 0.904 0.63 0.468 1.238 0.967 0.607 0.498 1.19 1.026 0.581 0.527 1.137 1.083 0.555 0.555 1.083 1.137 0.528 0.582 1.026 1.19 0.498 0.607 0.966 1.238 0.468 0.63 0.905 1.284 0.436 0.653 0.84 1.327 0.404 0.673 0.774 1.366 0.37 0.693 0.706 1.403 0.336 0.71 0.637 1.436 0.3 0.726 0.565 1.465 0.265 0.74 0.493 1.492 0.228 0.752 0.418 1.514 0.191 0.762 0.345 1.532 0.153 0.77 0.268 1.548 0.115 0.777 0.192 1.558 0.077 0.782 0.116 1.567 0.038 0.784 0.038 1.57zM138.688 426.669V213.336q0-0.786 0.038-1.57 0.039-0.785 0.116-1.567 0.077-0.781 0.192-1.558t0.268-1.548q0.154-0.77 0.345-1.532 0.19-0.762 0.418-1.514 0.228-0.752 0.493-1.492t0.565-1.465q0.301-0.726 0.637-1.436t0.706-1.403q0.37-0.693 0.774-1.366 0.404-0.674 0.84-1.327 0.437-0.653 0.905-1.284t0.966-1.239q0.499-0.607 1.026-1.189 0.528-0.582 1.083-1.137 0.556-0.556 1.138-1.083 0.582-0.528 1.189-1.026 0.607-0.499 1.238-0.967 0.631-0.468 1.284-0.904 0.653-0.437 1.327-0.84 0.674-0.404 1.367-0.775 0.693-0.37 1.403-0.706 0.71-0.336 1.436-0.636 0.725-0.3 1.465-0.565 0.74-0.265 1.491-0.493 0.752-0.228 1.514-0.42 0.762-0.19 1.533-0.343 0.77-0.153 1.547-0.269 0.777-0.115 1.559-0.192 0.782-0.077 1.566-0.116 0.785-0.038 1.57-0.038 1.118 0 2.233 0.078t2.222 0.233q1.107 0.156 2.2 0.388 1.093 0.233 2.167 0.54 1.075 0.31 2.125 0.691 1.05 0.383 2.071 0.837 1.021 0.455 2.008 0.98 0.987 0.525 1.935 1.117l170.667 106.667q0.666 0.416 1.31 0.865 0.645 0.448 1.268 0.928 0.622 0.48 1.22 0.989 0.598 0.51 1.17 1.048t1.116 1.104q0.546 0.566 1.062 1.157 0.516 0.592 1.003 1.209 0.488 0.616 0.944 1.256 0.455 0.64 0.88 1.3 0.424 0.662 0.815 1.343 0.392 0.68 0.748 1.38 0.358 0.7 0.68 1.416 0.324 0.717 0.61 1.448 0.287 0.731 0.538 1.476 0.252 0.744 0.466 1.5 0.214 0.756 0.39 1.521 0.176 0.766 0.315 1.539 0.14 0.773 0.24 1.552 0.1 0.779 0.163 1.562t0.087 1.568q0.024 0.786 0.009 1.57-0.016 0.786-0.069 1.57-0.053 0.784-0.143 1.564-0.093 0.78-0.223 1.555-0.128 0.775-0.296 1.542-0.168 0.768-0.373 1.526-0.206 0.759-0.447 1.506-0.243 0.747-0.52 1.482-0.279 0.734-0.594 1.454-0.314 0.72-0.663 1.424-0.349 0.704-0.732 1.39-0.382 0.685-0.798 1.352-0.963 1.54-2.094 2.96-1.132 1.423-2.416 2.707-1.284 1.284-2.706 2.415-1.42 1.13-2.96 2.094L187.648 453.805q-0.667 0.417-1.352 0.8-0.686 0.383-1.39 0.732-0.704 0.349-1.424 0.663-0.72 0.314-1.454 0.593-0.735 0.278-1.482 0.52-0.748 0.242-1.506 0.447-0.758 0.205-1.526 0.373-0.767 0.167-1.542 0.297-0.775 0.13-1.555 0.22-0.78 0.093-1.564 0.146-0.784 0.053-1.57 0.068-0.785 0.014-1.57-0.01-0.785-0.023-1.568-0.086-0.783-0.062-1.562-0.163-0.78-0.101-1.552-0.24-0.774-0.14-1.539-0.315-0.765-0.177-1.521-0.391-0.756-0.214-1.5-0.465-0.745-0.25-1.476-0.537-0.732-0.288-1.448-0.61-0.716-0.323-1.416-0.68-0.7-0.357-1.38-0.75-0.682-0.39-1.343-0.814-0.661-0.424-1.3-0.88-0.64-0.456-1.257-0.943-0.616-0.487-1.208-1.004-0.592-0.516-1.157-1.061-0.566-0.546-1.104-1.118-0.539-0.572-1.048-1.17-0.51-0.597-0.99-1.22-0.479-0.622-0.928-1.267-0.448-0.645-0.864-1.311-0.593-0.947-1.118-1.934-0.524-0.987-0.979-2.008-0.455-1.021-0.837-2.071-0.382-1.05-0.69-2.125-0.309-1.074-0.541-2.167-0.232-1.094-0.388-2.2-0.155-1.107-0.233-2.222-0.078-1.115-0.078-2.233z m64 0h-32l-16.96-27.136 170.666-106.666 16.96 27.136-16.96 27.136-170.667-106.667 16.96-27.136h32v213.333z"
                    ></path>
                  </svg>
                  添加到歌单
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="ShowSongDetail(index)">
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
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
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
  height:100%;
}
</style>