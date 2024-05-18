<script setup>
import {computed, defineEmits, defineModel, onMounted, ref} from "vue";
import axios from "axios";
import SongPage from "@/components/SongPage.vue";
import Songlist from "@/views/CreatedSongList/Songlist.vue";

import {useMessageStore} from "@/stores/message.js";
const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const Message = ref(computed(() => messageStore.MessageType6));
const title = ref("");
const currentMessage = ref([]);
const image = ref([]);
const allId = ref([]);
const id = ref(0);
const ShowSong = ref(false);
const ShowSongList = ref(false);
const emits = defineEmits(["GetMessage", "readMessage"]);

function getTitle(index) {
  const s1 = ref([]);
  const s2 = ref([]);
  s1.value = Message.value[index].content.split("《");
  if (s1.value.length === 1) { // 歌单
    s1.value = Message.value[index].content.split("\"");
    title.value = s1.value[1];
  } else if (s1.value.length === 2) { // 歌曲
    s2.value = s1.value[1].split("》");
    title.value = s2.value[0];
  }
  return title.value;
}

function activeComplaintMessage(index, content) {
  const s = ref([]);
  s.value = Message.value[index].content.split("《");
  if (s.value.length === 1) { // 歌单
    title.value = getTitle(index);
    getSongListId(index);
  } else if (s.value.length === 2) { // 歌曲
    title.value = getTitle(index);
    getSongId(index);
  }
  // 已读
  currentMessage.value = Message.value[index];
  if (currentMessage.value.is_read === false) {
    readMessage(currentMessage.value.id);
    currentMessage.value.is_read = true;
  }
}

function readMessage(id) {
  messageStore.readMessage(id, token.value);
}

function getSongId(index) {
  id.value = allId.value[index];
  // 打开歌曲详细界面
  ShowSong.value = true;
}

function getSongListId(index) {
  id.value = allId.value[index];
  // 打开歌单详细界面
  ShowSongList.value = true;
}

function getData() {
  for (let index in Message.value) {
    const s = ref([]);
    s.value = Message.value[index].content.split("《");
    if (s.value.length === 1) { // 歌单
      title.value = getTitle(index);
      getSonglistData(index, title.value);
    } else if (s.value.length === 2) { // 歌曲
      title.value = getTitle(index);
      getSongData(index, title.value);
    }
  }
}

function getSongData(index, title) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/songs?username=' + username.value)
      .then(response => {
        const length = ref(0);
        length.value = response.data.data.length;
        for (let i = 0; i < length.value; i++) {
          if (response.data.data[i].title === title) {
            allId.value[index] = response.data.data[i].id;
            image.value[index] = response.data.data[i].cover;
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
}

function getSonglistData(index, title) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/songlists?username=' + username.value)
      .then(response => {
        const length = ref(0);
        length.value = response.data.data.length;
        for (let i = 0; i < length.value; i++) {
          if (response.data.data[i].title === title) {
            allId.value[index] = response.data.data[i].id;
            image.value[index] = response.data.data[i].cover;
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
}

const close = () => {
  ShowSong.value = false;
  ShowSongList.value = false;
}

onMounted(getData)
</script>

<template>
  <!--  展示歌曲详细信息界面（当ShowSong为true）-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-model:currentSongId="id"
                @handlePlayNow="handlePlayNow" @CloseSong="close"
                v-model:username="username" v-model:token="token"></SongPage>
    </div>
  </transition>

  <!--    展示选中的歌单信息页面（当showCurrentSongList==true）-->
  <transition name="slide" appear>
    <div class="transition-container z-50 ml-8" v-if="ShowSongList">
      <Songlist v-model:currentSonglistId="id"
                @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                @handlePlayNow="handlePlayNow" @closeSonglist="close"
                v-model:token="token" v-model:username="username"></Songlist>
    </div>
  </transition>


  <div class="overflow-x-auto px-10" v-if="!ShowSong&&!ShowSongList">
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" @click="activeComplaintMessage(index, item.content)">
        <td class="w-28">
          <img :src="image[index]" alt="头像"
               class="h-14 rounded-xl aspect-square inline-block"/>
          <div v-if="!item.is_read" class="text-red-500 inline-block" style="font-size: 50px">.</div>
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.title }}</div>
          <div class="text-sm text-left opacity-50 truncate w-96">{{ item.content }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ item.send_date }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
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