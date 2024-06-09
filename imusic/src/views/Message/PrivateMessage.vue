<template>
  <div class="w-full bg-zinc-900 flex h-full">

    <!-- component -->
    <div class="w-full mx-auto overflow-y-auto flex">
      <!-- Sidebar -->
      <div class="w-1/4 h-full bg-zinc-800">

        <!-- Sidebar Header -->
        <div class="p-4 flex justify-between items-center bg-zinc-700 h-14">
          <h1 class="text-xl text-white font-semibold">我的聊天</h1>
        </div>

        <!-- Contact List -->
        <div class="overflow-y-auto no-scrollbar h-full flex flex-col" style="max-height: 610px">
          <div class="flex items-center cursor-pointer hover:bg-gray-600/40 p-2 h-20 border-b border-b-gray-700"
               v-for="(chat, index) in Chats" :key="index" @click="GetDetailMessage(index)">
            <div class="h-12 aspect-square rounded-xl bg-gray-300 overflow-hidden mr-3">
              <img :src="chat.friend_avatar" alt="User Avatar" class="size-full">
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold">{{ chat.friend }}</h2>
              <p class="text-sm text-white w-40 truncate ..." v-if="chat.last_message">
                {{ chat.last_message.content }}</p>
            </div>
            <!--show time-->
            <div class="text-sm" v-if="chat.last_message">
              {{ messageStore.ChangeTime(chat.last_message.send_date) }}
            </div>
          </div>
          <!-- 无聊天记录时 -->
          <span class="loading loading-dots loading-lg m-auto" v-if="loading1"></span>
        </div>

      </div>

      <!-- Main Chat Area -->
      <div class="w-3/4">
        <!-- Chat Header -->
        <header class="bg-zinc-700 p-4 text-gray-700 h-14 flex items-center">
          <h1 class="text-xl text-white mx-auto">{{ friend }}</h1>
        </header>

        <!-- Chat Messages -->
        <div class="overflow-y-auto p-4 pb-8 flex flex-col"  style="height: 580px" ref="listContainer">
          <!-- 私聊消息 -->
          <div v-for="(message, index) in DetailMessage" :key="index">
            <!-- Incoming Message -->
            <div class="chat chat-start" v-if="message.sender!==username">
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img alt="User Avatar" :src="message.message_cover"/>
                </div>
              </div>
              <div class="chat-header">
                {{ message.sender }}
                <time class="text-xs opacity-50">{{ messageStore.ChangeTime(message.send_date) }}</time>
              </div>
              <div class="chat-bubble">
                {{ message.content }}
                <br>
                <button @click="getShare(message.id)"
                    v-if="message.content.includes('分享了')&&message.content.includes('给您')&&message.content.includes('快来听听吧！')"
                    class="btn btn-sm btn-info mt-3 inline-block">获取
                </button>
              </div>
              <div class="chat-footer opacity-50">
                {{ message.is_read ? '已读' : '未读' }}
              </div>
            </div>

            <!-- Outgoing Message -->
            <div class="chat chat-end" v-if="message.sender===username">
              <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                  <img alt="My Avatar" :src="message.message_cover"/>
                </div>
              </div>
              <div class="chat-header">
                {{ message.sender }}
                <time class="text-xs opacity-50">{{ messageStore.ChangeTime(message.send_date) }}</time>
              </div>
              <div class="chat-bubble chat-bubble-accent">{{ message.content }}</div>
              <div class="chat-footer opacity-50">
                {{ message.is_read ? '已读' : '未读' }}
              </div>
            </div>
          </div>

          <div v-if="DetailMessage.length === 0" class="mx-auto">
            快来开始聊天吧
          </div>

          <!-- 无消息时 -->
          <div class="m-auto" v-if="!ShowMessageDetail&&!loading">
            <svg class="icon m-auto fill-gray-600" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 width="200" height="200">
              <path
                  d="M794.69 954.76H508.8c-247.03 0-448-200.98-448-448s200.97-448 448-448 448 200.98 448 448c0
                  116.76-44.19 226.24-124.77 310.06v100.61c0 20.61-16.72 37.33-37.34 37.33zM508.8 133.42c-205.86
                  0-373.33 167.47-373.33 373.33S302.94 880.09 508.8 880.09h248.56v-78.68c0-10.1 4.09-19.76
                  11.33-26.8 73.15-70.98 113.44-166.1 113.44-267.86 0-205.85-167.47-373.33-373.33-373.33z"
              ></path>
              <path d="M308.17 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
              <path d="M508.8 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
              <path d="M709.42 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
            </svg>
          </div>
          <!-- 加载中 -->
          <span class="loading loading-dots loading-lg m-auto" v-if="loading"></span>

        </div>

        <!-- Chat Input -->
        <footer class="p-4 bg-zinc-900 flex" v-if="ShowMessageDetail">
          <div class="flex items-center my-auto w-full">
            <input type="text" placeholder="请输入消息..." v-model="SendContent"
                   class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                   @keydown.enter="sendMsg">
            <!--            <button class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" @click="sendMsg">Send</button>-->
            <button class="btn btn-outline btn-success px-4 py-2 ml-2" @click="sendMsg">发送(S)
            </button>
          </div>
        </footer>

      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, defineModel, ref, onUpdated} from "vue";
import axios from "axios";
import {useMessageStore} from "@/stores/message.js";
import MyAlert from "@/js/MyAlert.js";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
// 聊天框
const Chats = ref([]);
// 聊天详细信息
const DetailMessage = ref([]);
// 当前聊天对象
const chat_index = ref(-1);

const friend = ref('');

const ShowMessageDetail = ref(false);
const loading = ref(false);
const loading1 = ref(false);

// 发送内容
const SendContent = ref('');

const GetChats = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  loading1.value = true;
  instance.get('/messages/chats')
      .then(response => {
        Chats.value = response.data.data;
        loading1.value = false;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const GetDetailMessage = (index) => {
  const friend_name = Chats.value[index].friend;
  chat_index.value = index;
  getMsg(friend_name);
}

const getMsg = (friend_in) => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  loading.value = true;
  instance({
    method: 'get',
    url: '/messages/private',
    params: {
      friend: friend_in
    }
  })
      .then(response => {
        DetailMessage.value = response.data.data;
        ShowMessageDetail.value = true;
        friend.value = friend_in;
        loading.value = false;
        readMsg();
        // 设置聊天框最近消息
        Chats.value[chat_index.value].last_message =
            DetailMessage.value[DetailMessage.value.length - 1];
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const sendMsg = () => {
  if (SendContent.value === '') {
    MyAlert({type: 'alert-warning', text: '发送内容不能为空'})
    return;
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('receiver', friend.value);
  formData.append('content', SendContent.value);
  instance.post('/messages/send', formData)
      .then(response => {
        console.log(response.data.success);
        SendContent.value = '';
        getMsg(friend.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const userFollow = (index) => {
  const formData = new FormData();
  formData.append('username', Chats.value[index].friend);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/users/follow', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
const readMsg = () => {
  //全部设为已读
  for (let i = 0; i < DetailMessage.value.length; ++i) {
    if (DetailMessage.value[i].sender !== username.value) {
      if (!DetailMessage.value[i].is_read) {
        messageStore.readMessage(DetailMessage.value[i].id, token.value);
        DetailMessage.value[i].is_read = true;
      }
    }
  }
}

// 获取分享歌单
function getShare(messageId) {
  const formData = new FormData();
  formData.append('message_id', messageId);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/share/handle', formData)
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          MyAlert({type: 'alert-info', text: '接受分享成功，请在【收藏的歌单】中查看'});
        } else {
          MyAlert({type: 'alert-warning', text: '此分享入口不存在或已失效，请重新分享'});
        }
        })
      .catch(error => {
        console.log(error.response.data);
      })
}

onMounted(GetChats);
// 实现自动滚动到底部
const listContainer = ref(null);

onUpdated(() => {
  listContainer.value.scrollTop = listContainer.value.scrollHeight;
});
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>