<script setup>
import {onMounted, defineModel, defineEmits, ref, watch, computed} from "vue";
import axios from "axios";
import Message_Detail from "@/views/Message/Message_Detail.vue";
import {useMessageStore} from "@/stores/message.js";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const PrivateMessage = ref([]);
const SubscribeMessage = ref(computed(() => messageStore.MessageType4));
const ShowedMessage = ref([]);
const MyAvatar = ref('');
const OtherAvatar = ref('');

const GetInitMessage = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/messages/chats')
      .then(response => {
        PrivateMessage.value = response.data.data;
        JudgeMessage();
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const JudgeMessage = () => {
  for (let i = 0; i < SubscribeMessage.value.length; ++i) {
    SubscribeMessage.value[i]['Has_Subscribe'] = false;
    ShowedMessage.value.push(SubscribeMessage.value[i]);
  }
  for (let i = 0; i < PrivateMessage.value.length; ++i) {
    for (let j = 0; j < SubscribeMessage.value.length; ++j) {
      if (PrivateMessage.value[i].friend === SubscribeMessage.value[j].sender) {
        SubscribeMessage.value[j].Has_Subscribe = true;
        SubscribeMessage.value[j].content = PrivateMessage.value[i].last_message.content;
        SubscribeMessage.value[j].send_date = PrivateMessage.value[i].last_message.send_date;
        ShowedMessage.value[j] = SubscribeMessage.value[j];
      }
    }
  }
  for (let i = 0; i < ShowedMessage.value.length; ++i) {
    ShowedMessage.value[i].send_date = messageStore.ChangeTime(ShowedMessage.value[i].send_date);
  }
}

const ShowMessageDetail = ref(false);

const GetMyAvatar = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/info/' + username.value)
      .then((response) => {
        MyAvatar.value = response.data.data.avatar;
        console.log(MyAvatar.value);
      })
      .catch((error) => {
        console.log(error);
      });
}

const ForeignUser = ref('');
const CanChat = ref(false);

const ActiveMessageDetail = (index) => {
  OtherAvatar.value = ShowedMessage.value[index].friend_avatar;
  ForeignUser.value = ShowedMessage.value[index].sender;
  CanChat.value = ShowedMessage.value[index].Has_Subscribe;
  ShowMessageDetail.value = true;
}

const ChangeSize = () => {
  ShowMessageDetail.value = false;
}


onMounted(GetInitMessage);
onMounted(GetMyAvatar);
</script>

<template>
  <div class="flex h-full">
    <div class="overflow-x-auto w-1/2 px-4 pb-32 h-full">
      <table class="table w-full">
        <tbody>
        <tr class="text-white w-full transition duration-400 hover:bg-gray-600/40 rounded-md cursor-pointer"
            v-for="(item, index) in ShowedMessage" :key="index" @click="ActiveMessageDetail(index)">
          <td>
            <img :src="item.friend_avatar" alt="头像" class="h-14 rounded-xl aspect-square">
          </td>
          <td class="overflow-hidden">
            <div class="font-bold text-xl mb-2 flex justify-between">
              <span>{{ item.sender }}</span>
              <span class="text-sm opacity-50">{{ item.send_date }}</span>
            </div>
            <div class="text-sm w-96 opacity-50 truncate ...">{{ item.content }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="border-l border-gray-400 mb-32"></div>
    <div class="w-1/2 z-50 h-full flex" v-if="!ShowMessageDetail">
      <svg class="icon mx-auto my-auto fill-gray-600" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
           width="200" height="200">
        <path
            d="M794.69 954.76H508.8c-247.03 0-448-200.98-448-448s200.97-448 448-448 448 200.98 448 448c0 116.76-44.19 226.24-124.77 310.06v100.61c0 20.61-16.72 37.33-37.34 37.33zM508.8 133.42c-205.86 0-373.33 167.47-373.33 373.33S302.94 880.09 508.8 880.09h248.56v-78.68c0-10.1 4.09-19.76 11.33-26.8 73.15-70.98 113.44-166.1 113.44-267.86 0-205.85-167.47-373.33-373.33-373.33z"
        ></path>
        <path d="M308.17 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
        <path d="M508.8 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
        <path d="M709.42 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
      </svg>
    </div>
    <div class="w-1/2 z-50 h-full" v-if="ShowMessageDetail">
      <Message_Detail v-model:username="username" v-model:token="token" v-model:ForeignUser="ForeignUser"
                      v-model:MyAvatar="MyAvatar"
                      v-model:OtherAvatar="OtherAvatar" @ChangeSize="ChangeSize"
                      v-model:CanChat="CanChat"></Message_Detail>
    </div>
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
</style>