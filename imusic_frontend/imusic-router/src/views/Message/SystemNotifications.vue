<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref, computed} from "vue";
import SystemMessages from "@/views/Message/SystemMessages.vue";

const token = defineModel("token");
const username = defineModel("username");

// 处理消息
import {useMessageStore} from "@/stores/message.js";
const messageStore = useMessageStore();
const Message = ref(computed(() => messageStore.MessageType1));
const currentMessage = ref([]);
// const systemMessage = defineModel("systemMessage");
// const playSongMessage = defineModel("playSongMessage");
// const createMessage = defineModel("createMessage");
const showSystemMessage = ref(false);
// const emits = defineEmits(["GetMessage", "readMessage"]);

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  return `${year}年${formattedMonth}月${formattedDay}日`;
}

function activeShowSystemMessage(index) {
  currentMessage.value = Message.value[index];
  if(currentMessage.value.is_read === false) {
    readMessage(currentMessage.value.id);
    currentMessage.value.is_read = true;
  }
  // console.log(currentMessage.value.id);
  showSystemMessage.value = true;
}

function closeShowSystemMessage() {
  showSystemMessage.value = false;
}

function readMessage(id) {
  messageStore.readMessage(id, token.value);
}

const hasMessage = ref(true);
function getSystemMessages() {
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
}

onMounted(getSystemMessages)
</script>

<template>

  <transition name="slide" appear>
    <div class="transition-container-2 cursor-default" v-if="showSystemMessage">
      <SystemMessages :currentMessage="currentMessage"
                      @closeShowSystemMessage="closeShowSystemMessage"
                      v-model:token="token"></SystemMessages>
    </div>
  </transition>
  <div class="overflow-x-auto px-10" v-if="!showSystemMessage">
    <div class="w-full h-32 flex" v-if="!hasMessage">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <table class="table">
      <tbody>
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md cursor-pointer"
          v-for="(item, index) in Message" :key="index" @click="activeShowSystemMessage(index)">
        <td class="w-24">
          <svg v-if="item.title === '听歌周报'" class="h-10 w-10 align-middle text-cyan-400 inline-block"
               viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path
                d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
          <svg v-if="item.title === '创作周报'" class="h-10 w-10 align-middle text-pink-400 inline-block"
               width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <svg v-if="!item.is_read" class="h-2 w-2 text-red-500 inline-block rounded-full align-top" width="24" height="24" viewBox="0 0 24 24" stroke-width="1"
               stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </td>
        <td class="align-middle">
          <div class="font-bold text-xl">{{ item.title }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ formatDateTime(item.send_date) }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="h-32"></div>
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