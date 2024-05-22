<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref, computed, watch} from "vue";
import SongPage from "@/components/SongPage.vue";

// 从store中获取数据
import {useMessageStore} from "@/stores/message.js";
import MyAlert from "@/js/MyAlert.js";
const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const HasLogin = defineModel('HasLogin')
const Message = ref(computed(() => messageStore.MessageType2));
const userImage = ref([]);
const songId = ref(0);
const title = ref("");
const currentMessage = ref([]);
const ShowSong = ref(false);
const emits = defineEmits(["GetMessage", "readMessage", "handlePlayNow"]);

function handlePlayNow(id) {
  emits("handlePlayNow", id)
}

const CloseSong = () => {
  ShowSong.value = false;
}

const hasMessage = ref(true);
function getUserImage() {
  Message.value = messageStore.MessageType2;
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
  for (let index in Message.value) {
    let username = Message.value[index].sender;
    const instance = axios.create({
      baseURL: 'http://182.92.100.66:5000',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${token.value}`,
      }
    });
    axios.defaults.withCredentials = true;
    let url = '/users/info/' + username;
    instance.get(url, {})
        .then((response) => {
          userImage.value[index] = response.data.data.avatar;
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

function activeCommentMessage(index, content) {
  // 获取歌曲名
  const s1 = ref([]);
  const s2 = ref([]);
  s1.value = content.split("《");
  s2.value = s1.value[1].split("》");
  title.value = s2.value[0];
  getSongId();
  // 已读
  currentMessage.value = Message.value[index];
  if(currentMessage.value.is_read === false) {
    readMessage(currentMessage.value.id);
    currentMessage.value.is_read = true;
  }
}

function readMessage(messageId) {
  messageStore.readMessage(messageId, token.value);
}

function getSongId() {
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
          if (response.data.data[i].title === title.value) {
            songId.value = response.data.data[i].id;
            // 打开歌曲详细界面
            ShowSong.value = true;
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
}
async function DeleteMessage(index) {
  console.log(Message.value[index].id);
  console.log(token.value);
  try {
    await messageStore.deleteMessage(Message.value[index].id, token.value);
    MyAlert({type: 'alert-info', text: '删除成功'});
    messageStore.getMessage(token.value);

  } catch (error) {
    MyAlert({type: 'alert-warning', text: '删除失败'});
    messageStore.getMessage(token.value);
  }
}

onMounted(getUserImage)
watch(Message, getUserImage)
</script>
<template>
  <!--  展示歌曲详细信息界面（当ShowSong为true）-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-model:currentSongId="songId"
                @handlePlayNow="handlePlayNow" @CloseSong="CloseSong"
                v-model:username="username" v-model:token="token" v-model:HasLogin="HasLogin"></SongPage>
    </div>
  </transition>


  <div class="overflow-x-auto px-10" v-if="!ShowSong">
    <div class="w-full h-32 flex" v-if="!hasMessage">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" @click="activeCommentMessage(index, item.content)">
        <td class="w-28">
          <img :src="userImage[index]" alt="头像"
               class="h-14 rounded-xl aspect-square inline-block -ml-3"/>
          <svg v-if="!item.is_read" class="h-2 w-2 text-red-500 inline-block rounded-full align-top" width="24" height="24" viewBox="0 0 24 24" stroke-width="1"
               stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.sender }}</div>
          <div class="text-sm text-left opacity-50 truncate w-96">{{ item.content }}</div>
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
    <div class="w-full h-32"></div>
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