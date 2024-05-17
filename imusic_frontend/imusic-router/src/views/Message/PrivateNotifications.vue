<script setup>
import {onMounted, defineModel, defineEmits, ref, watch} from "vue";
import axios from "axios";
import Message_Detail from "@/views/Message/Message_Detail.vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = ref([]);
const Message_null=ref([]);
const emits=defineEmits(['GetMessage']);

function initMessage() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/messages/chats';
  instance.get(url, {})
      .then((response) => {
        Message.value= response.data.data;
        //last_message为空的friend最后显示
        for (let i = 0; i < Message.value.length; ++i) {
          if (Message.value[i].last_message === null) {
            Message_null.value.push(Message.value[i]);
            Message.value.splice(i, 1);
          }
        }
        console.log(Message.value);
        //按时间降序排序
        Message.value.sort((a, b) => {
          return new Date(b.last_message.send_date) - new Date(a.last_message.send_date);
        });
        changeTime();
        //read未读消息
        for (let i = 0; i < Message.value.length; ++i) {
          if (Message.value[i].last_message.is_read === false) {
            readMessage(Message.value[i].laast_message.id);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
  instance.post('/messages/read',formData)
      .then(response=>{
        console.log(response.data);
        GetMessage();
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}
function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  return `${year}年${formattedMonth}月${formattedDay}日 ${hours}:${minutes<10?'0'+minutes:minutes}`;
}
function changeTime() {
  const length = Message.value.length;
  for (let i = 0; i < length; ++i) {
    let date = new Date(Message.value[i].last_message.send_date);
    let now = new Date();
    //当天
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
      //超过5h显示xx小时前
      if (now.getHours() - date.getHours() >= 5) {
        Message.value[i].last_message.send_date = (now.getHours() - date.getHours()) + '小时前';
      }
      //分钟相同显示刚刚
      else if (now.getMinutes() === date.getMinutes() && now.getHours() === date.getHours()&&now.getDate() - date.getDate()===0&&now.getMonth() - date.getMonth()===0&&now.getFullYear() - date.getFullYear()===0) {
        Message.value[i].last_message.send_date = '刚刚';
      }
      //10min内显示x分钟前
      else if ((now.getMinutes() - date.getMinutes() < 10&&now.getHours() - date.getHours()===0&&now.getDate() - date.getDate()===0&&now.getMonth() - date.getMonth()===0&&now.getFullYear() - date.getFullYear()===0)) {
        Message.value[i].last_message.send_date = (now.getMinutes() - date.getMinutes()) + '分钟前';
      }
      else if (now.getMinutes() + 60 - date.getMinutes() < 10&&now.getHours() - date.getHours()===1&&now.getDate() - date.getDate()===0&&now.getMonth() - date.getMonth()===0&&now.getFullYear() - date.getFullYear()===0){
        Message.value[i].last_message.send_date = (now.getMinutes() + 60 - date.getMinutes()) + '分钟前';
      }
      else{
        Message.value[i].last_message.send_date = date.getHours() + ':' + date.getMinutes();
        if(date.getMinutes()<10)
          Message.value[i].last_message.send_date = date.getHours() + ':0' + date.getMinutes();
      }
    }
    //前一天
    else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate() - 1) {
      Message.value[i].last_message.send_date = '昨天'+date.getHours() + ':' + date.getMinutes();
      if(date.getMinutes()<10)
        Message.value[i].last_message.send_date = '昨天'+date.getHours() + ':0' + date.getMinutes();
    }
    else
    {
      Message.value[i].last_message.send_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      if(date.getMinutes()<10)
        Message.value[i].last_message.send_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }
}


const ShowMessageDetail = ref(false);
const ForeignUser = ref('');
const MyAvatar = ref('');
const OtherAvatar = ref('');

const ActiveMessageDetail = (index) => {
  //若在Message_null中点击，index为Message_null中的index
  if(index>=Message.value.length){
    index=index-Message.value.length;
    ForeignUser.value=Message_null.value[index].friend;
    console.log(ForeignUser.value);
    ShowMessageDetail.value = true;
    OtherAvatar.value = Message_null.value[index].friend_avatar;
    console.log(OtherAvatar.value);
  }
  //ForeignUser是sender和receiver中非username的
  else {
    ForeignUser.value=Message.value[index].friend;
    //console.log(ForeignUser.value);
    ShowMessageDetail.value = true;
    OtherAvatar.value = Message.value[index].friend_avatar;
    //console.log(OtherAvatar.value);
  }

}

const GetMessage=()=>{
  emits('GetMessage');
}

const ChangeSize=()=>{
  ShowMessageDetail.value=false;
}


onMounted(initMessage)
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container z-50 ml-8 h-5/6" v-if="ShowMessageDetail">
      <Message_Detail v-model:username="username" v-model:token="token" v-model:ForeignUser="ForeignUser"
                      v-model:Message="Message" v-model:MyAvatar="MyAvatar"
                      v-model:OtherAvatar="OtherAvatar" @GetMessage="GetMessage" @ChangeSize="ChangeSize"></Message_Detail>
    </div>
  </transition>
  <div class="overflow-x-auto px-10" v-if="!ShowMessageDetail">
    <table class="table">
      <tbody>
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" :key="index" @click="ActiveMessageDetail(index)">
        <td class="w-24">
          <img :src="item.friend_avatar" alt="头像" class="h-14 rounded-xl aspect-square">
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ForeignUser}}</div>
          <div class="text-sm opacity-50 truncate ...">{{ item.last_message.content }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ item.last_message.send_date }}
        </td>
      </tr>
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message_null" :key="index" @click="ActiveMessageDetail(index+Message.length)">
        <td class="w-24">
          <img :src="item.friend_avatar" alt="头像" class="h-14 rounded-xl aspect-square">
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.friend}}</div>
          <div class="text-sm opacity-50 truncate ...">快和你的朋友发送第一条消息吧！</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          暂无消息
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
</style>