<script setup>
import {computed, defineEmits, defineModel, onMounted, ref, watch} from "vue";
import axios from "axios";
import SongPage from "@/components/SongPage.vue";
import Songlist from "@/views/CreatedSongList/Songlist.vue";

import {useMessageStore} from "@/stores/message.js";
import Complaint from "@/components/Complaint.vue";
import Appeal from "@/components/Appeal.vue";
import Complain_Detail from "@/views/Message/Complain_Detail.vue";
import MyAlert from "@/js/MyAlert.js";

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
const emits = defineEmits(["GetMessage", "readMessage", "PlaySongList", "handlePlayAfter", "handlePlayNow"]);
const trueContent = ref([]);
const Loading= ref(true);

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

async function activeComplaintMessage(index) {

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
      if(await getSonglistInformation(allId.value[index]))
      {
        MyAlert({type: 'alert-warning', text: '歌曲已被下架，暂时无法查看'});
        return;
      }
      if(image.value[index] === undefined)
      {
        MyAlert({type: 'alert-warning', text: '歌曲已被下架，暂时无法查看'});
        return;
      }
      title.value = getTitle(index);
      ShowSongList.value = true;
    } else if (s.value.length === 2) { // 投诉歌曲
      if(await getSongInformation(allId.value[index]))
      {
        MyAlert({type: 'alert-warning', text: '歌曲已被下架，暂时无法查看'});
        return;
      }
      if(image.value[index] === undefined)
      {
        MyAlert({type: 'alert-warning', text: '歌曲已被下架，暂时无法查看'});

        return;
      }
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
  //清空trueContent
  trueContent.value = [];
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
  Loading.value = false;
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
        allId.value[index] = undefined;
        image.value[index] = undefined;
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
        allId.value[index] = undefined;
        image.value[index] = undefined;
        console.log(error);
      })
}

const close = () => {
  ShowSong.value = false;
  ShowSongList.value = false;
  ShowAppeal.value = false;
  ShowComplaintDetail.value = false;
}
async function getSongInformation(id) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/songs/info/" + id)
      .then(response => {
        console.log(response.data);
        return false;
      })
      .catch(error => {
        console.log(error.response.data)
        return true;
      })
}
async function getSonglistInformation(id) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = ref("");
  let str = id.value + "";
  if(str.includes("sh")) {
    web.value = '/songlists/info/' + id.value + "?username=" + username.value;
  } else {
    web.value = '/songlists/info/' + id.value;
  }
  instance.get(web.value)
      .then(function (response) {
        return false;
      })
      .catch(function (error) {
        return true;
      })
}
async function DeleteMessage(index) {
  console.log(Message.value[index].id);
  console.log(token.value);
  try {
    await messageStore.deleteMessage(Message.value[index].id, token.value);
    MyAlert({type: 'alert-info', text: '删除成功'});
    Loading.value = true;
    //messageStore.refreshMessage(token.value);
  } catch (error) {
    MyAlert({type: 'alert-error', text: '删除失败'});
    messageStore.refreshMessage(token.value);
  }
}
onMounted(getData)
watch(Message, () => {
  getData();
  getSongInformation();
  getSonglistInformation();
})
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
    <div class="w-full flex h-60" v-if="Loading">
      <span class="loading loading-spinner loading-lg m-auto"></span>
    </div>
    <table class="table" v-if="!Loading">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md cursor-pointer"
          v-for="(item, index) in Message" @click="activeComplaintMessage(index)">
        <td class="w-28">
          <svg v-if="item.title === '投诉消息'"
               class="h-14 w-14 bg-gray-300 text-yellow-600 rounded-xl aspect-square align-middle inline-block"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
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
          {{ messageStore.ChangeTime(item.send_date) }}
        </td>
        <td class="w-20">
          <div class="inline pr-4">
            <svg class="icon fill-red-500 inline hover:fill-red-800" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" @click.stop="DeleteMessage(index)">
              <path
                  d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
              ></path>
              <path
                  d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
              ></path>
              <path
                  d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
              ></path>
              <path
                  d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
              ></path>
            </svg>
          </div>
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