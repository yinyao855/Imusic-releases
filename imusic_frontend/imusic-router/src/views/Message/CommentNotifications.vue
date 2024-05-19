<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref, computed} from "vue";
import SongPage from "@/components/SongPage.vue";

// 从store中获取数据
import {useMessageStore} from "@/stores/message.js";
const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const Message = ref(computed(() => messageStore.MessageType2));
const userImage = ref([]);
const songId = ref(0);
const title = ref("");
const currentMessage = ref([]);
const ShowSong = ref(false);
const emits = defineEmits(["GetMessage", "readMessage"]);

const CloseSong = () => {
  ShowSong.value = false;
}

const hasMessage = ref(true);
function getUserImage() {
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

onMounted(getUserImage)

</script>
<template>
  <!--  展示歌曲详细信息界面（当ShowSong为true）-->
  <!--TODO: handlePlayNow找不到声明-->
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSong">
      <SongPage v-model:currentSongId="songId"
                @handlePlayNow="handlePlayNow" @CloseSong="CloseSong"
                v-model:username="username" v-model:token="token"></SongPage>
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
               class="h-14 rounded-xl aspect-square inline-block"/>
          <div v-if="!item.is_read" class="text-red-500 inline-block" style="font-size: 50px">.</div>
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.sender }}</div>
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