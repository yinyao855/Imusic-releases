<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";
import SystemMessages from "@/views/Message/SystemMessages.vue";

const token = defineModel("token");
const username = defineModel("username");

const Message = defineModel("Message");
const currentMessage = ref([]);
// const systemMessage = defineModel("systemMessage");
// const playSongMessage = defineModel("playSongMessage");
// const createMessage = defineModel("createMessage");
const showSystemMessage = ref(false);

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
  console.log(currentMessage.value.id);
  showSystemMessage.value = true;
}

function closeShowSystemMessage() {
  showSystemMessage.value = false;
}

function readMessage(id) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('message_id', id);
  instance.post('/messages/read', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
</script>

<template>

  <transition name="slide" appear>
    <div class="transition-container-2" v-if="showSystemMessage">
      <SystemMessages :currentMessage="currentMessage"
                      @closeShowSystemMessage="closeShowSystemMessage"
                      v-model:token="token"></SystemMessages>
    </div>
  </transition>
  <div class="overflow-x-auto px-10" v-if="!showSystemMessage">
    <table class="table">
      <tbody>
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
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
          <div v-if="!item.is_read" class="text-red-500 inline-block " style="font-size: 50px">.</div>
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