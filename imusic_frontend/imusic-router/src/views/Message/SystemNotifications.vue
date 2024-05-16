<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";
import SystemMessages from "@/views/Message/SystemMessages.vue";

const token = defineModel("token");
const username = defineModel("username");

const Message = defineModel("Message");
const currentMessage = ref([]);
const systemMessage = defineModel("systemMessage");
const playSongMessage = defineModel("playSongMessage");
const createMessage = defineModel("createMessage");
const showSystemMessage = ref(false);

const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}

function activeShowSystemMessage(message) {
  currentMessage.value = message;
  showSystemMessage.value = true;
}

function closeShowSystemMessage() {
  showSystemMessage.value = false;
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

  <div class="m-auto w-4/5" v-if="!showSystemMessage">
    <div class="text-white text-lg mt-5 mb-3 text-center">系统通知</div>
    <table class="table m-auto w-4/5 text-center">
      <tbody>
      <tr v-for="(message, index) in systemMessage" class="text-white hover:bg-gray-800 h-16 border-b-gray-500"
          @click="activeShowSystemMessage(message)">
        <td>
          <svg v-if="message.title === '听歌周报'" class="h-8 w-8 mr-5 align-middle text-cyan-400 inline-block"
               viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path
                d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
          <svg v-if="message.title === '创作周报'" class="h-8 w-8 mr-5 align-middle text-pink-400 inline-block"
               width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <p class="inline-block align-middle text-gray-300">{{ message.title }}</p>
        </td>
        <td class="text-gray-500 opacity-30">{{ message.send_date }}</td>
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