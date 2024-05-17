<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref, withModifiers} from "vue";
import Message_Detail from "@/views/Message/Message_Detail.vue";
import ButtonChangeSizeRight from "@/components/ButtonChangeSizeRight.vue";
import Input from "@/components/Input.vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const followMessage = ref([])
const userImage = ref([])
const MyAvatar = ref();
const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}
const messageDetail = ref([]);
const detailVisible = ref(0);
const showMessageDetail = (index) => {
  let sender = followMessage.value[index].sender;
  //查找Message中两人的聊天记录
  messageDetail.value = [];
  for (let i = 0; i < Message.value.length; i++) {
    if (Message.value[i].sender === sender) {
      messageDetail.value.push(Message.value[i]);
      //direction为0表示对方发的消息
      messageDetail.value[messageDetail.value.length - 1]['direction'] = 0;
    }
    if (Message.value[i].receiver === sender) {
      messageDetail.value.push(Message.value[i]);
      //direction为1表示自己发的消息
      messageDetail.value[messageDetail.value.length - 1]['direction'] = 1;
    }
    detailVisible.value = index;
  }
}
function getFollowMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  for (let i = 0; i < length.value; i++) {
    if (Message.value[i].type === 4) {
      followMessage.value.push(Message.value[i]);
      if (Message.value[i].is_read === false)
        readMessage(Message.value[i].id);
    }
  }
  console.log(followMessage.value);
  for (let index in followMessage.value) {
    let username = followMessage.value[index].sender;
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
          console.log(error.response.data);
        });
  }
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
  const formData=new FormData();
  formData.append('message_id',id);
  instance.post('/messages/read?message_id='+id)
      .then(response=>{
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}
function getMyAvatar()
{
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/users/info/' + username.value;
  instance.get(url, {})
      .then((response) => {
        MyAvatar.value = response.data.data.avatar;
      })
      .catch((error) => {
        console.log(error);
      });
}
const GetMessage=()=>{
  emits('GetMessage');
}

onMounted(() => {
  getFollowMessage();
  showMessageDetail(detailVisible.value);
})
</script>

<template>
  <div class="w-full h-full flex">
  <table class="table w-2/5 h-1/6 text-center overflow-auto">
    <thead>
    <tr>
      <th></th>
      <th class="">关注者</th>
      <th class="">日期</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(message, index) in followMessage" class="text-white hover:bg-gray-700 h-full border-b-gray-500"
        :style="{ 'background-color': index === detailVisible ? '#4c4f56' : '' }" @click="showMessageDetail(index);getMyAvatar()">
      <td><button>
        <img :src="userImage[index]" alt="" class="w-16 h-16 rounded-full">
      </button></td>
      <td><p class="text-xl inline-block align-middle text-gray-100">{{ message.sender }}</p></td>
      <td class="text-gray-300 opacity-30">{{ message.send_date }}</td>
    </tr>
    </tbody>
  </table>
    <div class="h-32 flex"></div>
  <div class="w-3/5 h-full">
    <div class="w-full h-full px-4">
      <div class="w-full h-2/3 overflow-auto">
        <div :class="['chat', item.direction === 0 ? 'chat-start' : 'chat-end']" v-for="(item, index) in messageDetail"
             :key="index">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img alt="头像" :src="item.direction===0?userImage[detailVisible]:MyAvatar"/>
            </div>
          </div>
          <div class="chat-header">
            {{ item.sender }}
            <time class="text-xs opacity-50">{{ item.send_date }}</time>
          </div>
          <div class="chat-bubble">{{ item.content}}</div>
        </div>
      </div>
      <div class="h-12 w-full mb-4">
        <Input v-model:username="username" v-model:token="token" @GetMessage="GetMessage"></Input>
      </div>
      <div class="h-32"></div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>