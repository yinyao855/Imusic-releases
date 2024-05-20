<script setup>
import {computed, defineEmits, defineModel, onMounted, ref} from "vue";
import axios from "axios";
import SongPage from "@/components/SongPage.vue";
import Songlist from "@/views/CreatedSongList/Songlist.vue";

import {useMessageStore} from "@/stores/message.js";
import Complaint from "@/components/Complaint.vue";
import Appeal from "@/components/Appeal.vue";
import Complain_Detail from "@/views/Message/Complain_Detail.vue";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const HasLogin = defineModel('HasLogin')
const Message = ref(computed(() => messageStore.MessageType6));
const title = ref("");
const currentMessage = ref([]);
const image = ref([]); // 若是歌曲就存歌曲图片，歌单就是歌单图片，审查结果则为空
const allId = ref([]); // 若是歌曲就存歌曲songId，歌单就是歌单songlistId，审查结果就是messageId
const id = ref(0);
const complaintResult = ref("");
const ShowSong = ref(false);
const ShowSongList = ref(false);
const ShowAppeal = ref(false);
const ShowComplaintDetail = ref(false);
const emits = defineEmits(["GetMessage", "readMessage"]);
const trueContent = ref([]);
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

function activeComplaintMessage(index) {

  // 处理投诉，content为数字+' '+有新的投诉消息待处理
  //console.log(Message.value[index].content);
  if (Message.value[index].title === "投诉消息"&&Message.value[index].content.match(/\d+\s+有新的投诉消息待处理。/)) {
    id.value = Message.value[index].content.split(' ')[0];
    ShowComplaintDetail.value = true;
  }
  // 审查结果
  else if (Message.value[index].title === "审查结果") {
    id.value = allId.value[index];
    complaintResult.value = Message.value[index].content;
    ShowAppeal.value = true;
  }
  // 投诉消息
  else {
    id.value = allId.value[index];
    const s = ref([]);
    s.value = Message.value[index].content.split("《");
    if (s.value.length === 1) { // 投诉歌单
      title.value = getTitle(index);
      ShowSongList.value = true;
    } else if (s.value.length === 2) { // 投诉歌曲
      title.value = getTitle(index);
      ShowSong.value = true;
    }
  }
  // 已读
  currentMessage.value = Message.value[index];
  if (currentMessage.value.is_read === false) {
    readMessage(currentMessage.value.id);
    currentMessage.value.is_read = true;
  }
  console.log(currentMessage.value);
}

function readMessage(id) {
  messageStore.readMessage(id, token.value);
}

const hasMessage = ref(true);

function getData() {
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
  for (let index in Message.value) {
    if(Message.value[index].title === "投诉消息"&&Message.value[index].content.match(/\d+\s+有新的投诉消息待处理。/)){
      trueContent.value.push(Message.value[index].content.split(' ')[1]);
    }
    else if (Message.value[index].title === "审查结果") {
      allId.value[index] = Message.value[index].id;
      const complaintId = ref(0);
      complaintId.value = parseInt(Message.value[index].content);
      if (!isNaN(complaintId.value)) {
        const complaintContent = ref("");
        complaintContent.value = Message.value[index].content.split(' ')[1];
        trueContent.value.push(complaintContent.value);
      }
      else {
        trueContent.value.push(Message.value[index].content);
      }
      continue;
    }
    else {
      trueContent.value.push(Message.value[index].content);
    }
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
  ShowAppeal.value = false;
  ShowComplaintDetail.value = false;
}

onMounted(getData)
</script>

<template>
  <!--  展示歌曲详细信息界面（当ShowSong为true）-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-model:currentSongId="id" v-model:HasLogin="HasLogin"
                @handlePlayNow="handlePlayNow" @CloseSong="close"
                v-model:username="username" v-model:token="token"></SongPage>
    </div>
  </transition>

  <!--    展示选中的歌单信息页面（当showCurrentSongList==true）-->
  <transition name="slide" appear>
    <div class="transition-container" v-if="ShowSongList">
      <Songlist v-model:currentSonglistId="id"
                @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                @handlePlayNow="handlePlayNow" @closeSonglist="close"
                v-model:token="token" v-model:username="username"></Songlist>
    </div>
  </transition>

  <!--  申述-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowAppeal">
      <Appeal v-model:id="id" @closeAppeal="close" v-model:complaintResult="complaintResult"
              v-model:token="token" v-model:username="username"></Appeal>
    </div>
  </transition>
  <!--  处理投诉-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowComplaintDetail">
      <Complain_Detail v-model:id="id" @closeComplaint="close"
              v-model:token="token" v-model:username="username"></Complain_Detail>
    </div>
  </transition>

  <div class="overflow-x-auto px-10" v-if="!ShowSong&&!ShowSongList&&!ShowAppeal&&!ShowComplaintDetail">
    <div class="w-full h-32 flex" v-if="!hasMessage">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md cursor-pointer"
          v-for="(item, index) in Message" @click="activeComplaintMessage(index)">
        <td class="w-28">
          <img :src="image[index]" alt="头像" v-if="item.title === '投诉消息'"
               class="h-14 rounded-xl aspect-square inline-block"/>
          <svg v-if="item.title === '审查结果'"
               class="h-14 w-14 bg-gray-300 text-yellow-600 rounded-xl aspect-square align-middle inline-block"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <svg v-if="!item.is_read" class="h-2 w-2 text-red-500 inline-block rounded-full align-top" width="24" height="24" viewBox="0 0 24 24" stroke-width="1"
               stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.title }}</div>
          <div class="text-sm text-left opacity-50 truncate w-96">{{ trueContent[index] }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ item.send_date }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="h-32"></div>
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