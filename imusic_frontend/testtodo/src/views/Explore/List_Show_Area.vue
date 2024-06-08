<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";
import Songlist from "@/views/CreatedSongList/Songlist.vue";

const emits = defineEmits(['handlePlayNow', 'handlePlayAfter', 'addToSongList', 'PlaySongList'])
const token = defineModel('token')
const HasLogin = defineModel('HasLogin')
const tag_language = ref('默认');
const tag_theme = ref('默认')
const tag_scene = ref('默认');
const tag_mood = ref('默认');
const tag_style = ref('默认');
const SongLists = ref([]);
const username = defineModel('username');
const mode1 = ref(1);
const mode2 = ref(1);
const mode3 = ref(1);
const mode4 = ref(1);
const mode5 = ref(1);

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
  'w-1/3 text-white hover:text-blue-400 text-xs block mb-2 transition ease-in duration-300 cursor-pointer': mode1.value !== 6,
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


const HandleStyle = (event, value) => {
  mode5.value = value;
  tag_style.value = event.target.textContent.trim();
}

const HandleMood = (event, value) => {
  mode4.value = value;
  tag_mood.value = event.target.textContent.trim();
}

const HandleLanguage = (event, value) => {
  mode1.value = value;
  tag_language.value = event.target.textContent.trim();
}

const HandleTheme = (event, value) => {
  mode2.value = value;
  console.log(mode2.value);
  tag_theme.value = event.target.textContent.trim();
}

const HandleScene = (event, value) => {
  mode3.value = value;
  tag_scene.value = event.target.textContent.trim();
}

const updateSongs = () => {
  let web = '/search/songlists?'
  console.log(web);
  let flag = 0;
  if (tag_theme.value !== '默认') {
    if (web === '/search/songlists?') {
      web = web + 'tag_theme=' + tag_theme.value;
    } else {
      web = web + '&tag_theme=' + tag_theme.value;
    }
    flag = 1;
  }
  if (tag_language.value !== '默认') {
    if (web === '/search/songlists?') {
      web = web + 'tag_language=' + tag_language.value;
    } else {
      web = web + '&tag_language=' + tag_language.value;
    }
    flag = 1;
  }
  if (tag_scene.value !== '默认') {
    if (web === '/search/songlists?') {
      web = web + 'tag_scene=' + tag_scene.value;
    } else {
      web = web + '&tag_scene=' + tag_scene.value;
    }
    flag = 1;
  }
  if (tag_mood.value !== '默认') {
    if (web === '/search/songlists?') {
      web = web + 'tag_mood=' + tag_mood.value;
    } else {
      web = web + '&tag_mood=' + tag_mood.value;
    }
    flag = 1;
  }
  if (tag_style.value !== '默认') {
    if (web === '/search/songlists?') {
      web = web + 'tag_style=' + tag_style.value;
    } else {
      web = web + '&tag_style=' + tag_style.value;
    }
    flag = 1;
  }
  if (flag === 0) {
    GetInitSongLists();
    return;
  }
  console.log(web);
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
        SongLists.value = response.data.data;
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
const GetInitSongLists = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songlists/alldata')
      .then(response => {
        SongLists.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const ShowCurrentUser_SongList = ref(false);

const GetSongList = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = ref("");
  let str = SongListId.value + "";
  if(str.includes("sh")) {
    web.value = '/songlists/info/' + SongListId.value + "?username=" + username.value;
  } else {
    web.value = '/songlists/info/' + SongListId.value;
  }
  instance.get(web.value)
      .then(response => {
        SongList.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
const SongListId = ref(0);

const ShowSongList = (index) => {
  SongListId.value = SongLists.value[index].id;
  NeedShowSongList.value = true;
}

const handlePlayAfter = (id) => {
  emits('handlePlayAfter', id)
}

const handlePlayNow = (id) => {
  emits('handlePlayNow', id)
}
const SongList = ref([]);
const NeedShowSongList = ref(false);
const index = defineModel('index');


const PlaySongList = (id) => {
  emits('PlaySongList', id);
}

const closeSonglist = () => {
  NeedShowSongList.value = false;
}
onMounted(GetInitSongLists);
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2 h-screen" v-if="NeedShowSongList">
      <Songlist v-model:currentSonglistId="SongListId"
                @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                @handlePlayNow="handlePlayNow" @closeSonglist="closeSonglist"
                v-model:token="token" v-model:username="username" v-model:HasLogin="HasLogin"></Songlist>
      <div class="h-32"></div>
    </div>
  </transition>
  <div class="flex w-full h-full px-10" v-if="!ShowCurrentUser_SongList&&!NeedShowSongList">
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
        <span :class="Class4_2" @click="HandleMood($event,1)">伤感</span>
        <span :class="Class4_3" @click="HandleMood($event,1)">安静</span>
        <span :class="Class4_4" @click="HandleMood($event,1)">思念</span>
        <span :class="Class4_5" @click="HandleMood($event,1)">宣泄</span>
        <span :class="Class4_6" @click="HandleMood($event,1)">开心</span>
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
  <div class="mx-6" v-if="!ShowCurrentUser_SongList&&!NeedShowSongList">
    <div class="text-2xl text-white my-5">推荐歌单</div>
    <div class="w-full flex flex-wrap">
      <div class="w-1/4 min-w-72" v-for="(item, index) in SongLists" :key="index">
        <div class="mx-8 h-72">
          <div class="relative cursor-pointer h-4/5 aspect-square mx-auto" @click="ShowSongList(index)">
            <img :src="item.cover" alt="歌单封面" class="h-full aspect-square rounded-2xl">
            <div class="absolute inset-0 bg-gray-500 opacity-0 hover:opacity-50 transition-opacity rounded-2xl"></div>
          </div>
          <div class="text-center text-lg h-1/5 mx-auto text-white">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-32"></div>
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
  height: 100%;
}
</style>