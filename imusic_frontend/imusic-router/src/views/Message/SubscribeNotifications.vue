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
const followings = ref([]);
const followMutual = ref([]);
const ShowMessage= ref(false);
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
function initFollowMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  followMutual.value=[];
  for (let i = 0; i < length.value; i++) {
    if (Message.value[i].type === 4) {
      followMessage.value.push(Message.value[i]);
      if (Message.value[i].is_read === false)
        readMessage(Message.value[i].id);
      let isMutual = false;
      for(let j=0;j<followings.value.length;j++)
      {
        if(followings.value[j].username===Message.value[i].sender)
        {
          isMutual = true;
          break;
        }
      }
      followMutual.value.push(isMutual);
    }
  }
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
        });
  }
}
function getFollowMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  followMutual.value=[];
  for (let i = 0; i < length.value; i++) {
    if (Message.value[i].type === 4) {
      followMessage.value[i]=(Message.value[i]);
      let isMutual = false;
      for(let j=0;j<followings.value.length;j++)
      {
        if(followings.value[j].username===Message.value[i].sender)
        {
          isMutual = true;
          break;
        }
      }
      followMutual.value[i]=(isMutual);
    }
  }
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

        });
  }
}
function getFollows() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/users/followings?username=' + username.value;
  instance.get(url, {})
      .then((response) => {
        followings.value = response.data.data;
        getFollowMessage();
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
        GetMessage();
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
function addFollow(index) {
  if(followMutual.value[index]===true)
  {
    ShowMessage.value=true;
    return;
  }
  const formData = new FormData();
  formData.append('username', followMessage.value[index].sender);

  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/users/follow', formData)
      .then(response => {

        if(response.data.message==='加关注成功')
        {
          followMutual.value[index]=true;
          alert('关注成功');

          ShowMessage.value=true;

          console.log(followMutual.value);
        }
        else {
          followMutual.value[index]=false;
          alert('取消关注成功');
        }
      })
      .catch(error => {

      })
}

const ChangeSize=()=>{
  ShowMessage.value=false;
}

onMounted(() => {
  getFollows();
  initFollowMessage();
  showMessageDetail(detailVisible.value);
})
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container z-50 ml-8 h-5/6" v-if="ShowMessage">
      <Message_Detail v-model:username="username" v-model:token="token" v-model:ForeignUser="followMessage[detailVisible].sender"
                      v-model:Message="Message" v-model:MyAvatar="MyAvatar"
                      v-model:OtherAvatar="userImage[detailVisible]" @GetMessage="GetMessage" @ChangeSize="ChangeSize"></Message_Detail>
    </div>
  </transition>
  <div class="w-full h-full flex divide-dashed" v-if="!ShowMessage">
    <div class="h-full w-2/5 border-r border-e border-gray-400 pl-4">
  <table class="table w-full h-20 text-center overflow-auto">
    <thead>
    <tr>
      <th></th>
      <th class="">关注者</th>
      <th class="">时间</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(message, index) in followMessage" class="text-white hover:bg-gray-700 h-full border-b-gray-500"
        :style="{ 'background-color': index === detailVisible ? '#4c4f56' : '' }" @click="showMessageDetail(index);getMyAvatar()">
      <td><button>
        <img :src="userImage[index]" alt="" class="w-16 h-16 rounded-full">
      </button></td>
      <td><p class="text-xl inline-block align-middle text-gray-100">{{ message.sender }}</p></td>
      <td class="text-gray-300 opacity-50 text-lg">{{ message.send_date }}</td>
    </tr>
    </tbody>
  </table>
      </div>
  <div class="w-3/5 h-full">
    <div class="w-full h-full px-4">
      <div class="w-full h-1/2 overflow-auto">
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
      <div class="text-xl text-gray-300 text-center bg-gray-800 my-10 w-2/3 mx-auto rounded-l">互相关注后可以发送消息</div>
      <div class="h-12 w-full mb-20">
        <div class="flex">
          <div class="group mx-auto">
            <div class="btn btn-md ml-4 text-white tracking-widest bg-orange-700 hover:bg-orange-800 transition:ease-in duration-300"
                @click="addFollow(detailVisible);">
              <p v-if="followMutual[detailVisible]!==true">关 注</p>
              <p v-if="followMutual[detailVisible]===true">进入聊天</p>
            </div>
          </div>
        </div>
      </div>
      <div class="h-32"></div>
    </div>
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