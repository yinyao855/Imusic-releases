<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";
import SystemMessages from "@/views/Message/SystemMessages.vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const currentMessage = ref([]);
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

  <div class="m-auto" v-if="!showSystemMessage">
    <div class="text-white text-lg mt-10 text-center">创作周报</div>
    <table class="table mt-10 text-center w-1/2 inline-block m-auto">
      <thead>
      <tr>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(message, index) in createMessage" class="text-white hover:bg-gray-800"
          @click="activeShowSystemMessage(message)">
        <td>{{ message.send_date }}</td>
      </tr>
      </tbody>
    </table>
    <div class="text-white text-lg mt-10 text-center">听歌周报</div>
    <table class="table mb-32 mt-10 text-center w-1/2 inline-block m-auto">
      <thead>
      <tr>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(message, index) in playSongMessage" class="text-white">
        <td>{{ message.title }}</td>
        <td>{{ message.content }}</td>
        <td>{{ message.send_date }}</td>
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