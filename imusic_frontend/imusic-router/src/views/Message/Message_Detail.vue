<script setup>
import {onMounted, ref} from "vue";
import Input from "@/components/Input.vue"
import ButtonChangeSizeRight from "@/components/ButtonChangeSizeRight.vue";
import axios from "axios";

const username = defineModel('username');
const token = defineModel('token');
const ForeignUser = defineModel('ForeignUser');
const Message = defineModel('Message');
const ShowMessage = ref([]);
const MyAvatar = defineModel('MyAvatar');
const OtherAvatar = defineModel('OtherAvatar');
const emits = defineEmits(['GetMessage','ChangeSize']);

const GetInitData = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/messages/private?friend='+ForeignUser.value;
  instance.get(url, {})
      .then((response) => {
        ShowMessage.value = response.data.data;
        length = ShowMessage.value.length;
        for (let i = 0; i < length; ++i) {
          if (ShowMessage.value[i]['sender'] === username.value)
            ShowMessage.value[i]['direction'] = 1;
          else
            ShowMessage.value[i]['direction'] = 0;
        }
        changeTime();
      })
      .catch((error) => {
        console.log(error);
      });
}
function changeTime() {
  const length = ShowMessage.value.length;
  for (let i = 0; i < length; ++i) {
    let date = new Date(ShowMessage.value[i].send_date);
    let now = new Date();
    //当天
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
      //超过5h显示xx小时前
      if (now.getHours() - date.getHours() >= 5) {
        ShowMessage.value[i].send_date = (now.getHours() - date.getHours()) + '小时前';
      }
      //分钟相同显示刚刚
      else if (now.getMinutes() === date.getMinutes() && now.getHours() === date.getHours()&&now.getDate() - date.getDate()===0&&now.getMonth() - date.getMonth()===0&&now.getFullYear() - date.getFullYear()===0) {
        ShowMessage.value[i].send_date = '刚刚';
      }
      //10min内显示x分钟前
      else if ((now.getMinutes() - date.getMinutes() < 10&&now.getHours() - date.getHours()===0&&now.getDate() - date.getDate()===0&&now.getMonth() - date.getMonth()===0&&now.getFullYear() - date.getFullYear()===0)) {
        ShowMessage.value[i].send_date = (now.getMinutes() - date.getMinutes()) + '分钟前';
      }
      else if (now.getMinutes() + 60 - date.getMinutes() < 10&&now.getHours() - date.getHours()===1&&now.getDate() - date.getDate()===0&&now.getMonth() - date.getMonth()===0&&now.getFullYear() - date.getFullYear()===0){
        ShowMessage.value[i].send_date = (now.getMinutes() + 60 - date.getMinutes()) + '分钟前';
      }
      else{
        ShowMessage.value[i].send_date = date.getHours() + ':' + date.getMinutes();
        if(date.getMinutes()<10)
          ShowMessage.value[i].send_date = date.getHours() + ':0' + date.getMinutes();
      }
    }
    //前一天
    else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate() - 1) {
      ShowMessage.value[i].send_date = '昨天'+date.getHours() + ':' + date.getMinutes();
      if(date.getMinutes()<10)
        ShowMessage.value[i].send_date = '昨天'+date.getHours() + ':0' + date.getMinutes();
    }
    else
    {
      ShowMessage.value[i].send_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      if(date.getMinutes()<10)
        ShowMessage.value[i].send_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
  }
}
const shouldDisplayDate = (index) => {
  if (index === 0) return true; // Always display the date for the first message
  const currentMessageDate = new Date(ShowMessage.value[index].send_date);
  const previousMessageDate = new Date(ShowMessage.value[index - 1].send_date);
  const diffInMinutes = (currentMessageDate - previousMessageDate) / 1000 / 60;
  return diffInMinutes > 10;
};
const GetMessage = () => {
  emits('GetMessage');
}

const ChangeSize=()=>{
  emits('ChangeSize');
}

onMounted(GetInitData);
</script>

<template>
  <div class="w-full h-dvh px-4">
    <ButtonChangeSizeRight class="left-4 top-0" @fullsize="ChangeSize" v-model:token="token"></ButtonChangeSizeRight>
    <div class="w-full h-2/3 overflow-auto">
      <div :class="['chat', item.direction === 0 ? 'chat-start' : 'chat-end']" v-for="(item, index) in ShowMessage"
           :key="index">

        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="头像" :src="item.direction===0?OtherAvatar:MyAvatar"/>
          </div>
        </div>
        <div class="chat-header">
          {{ item.sender }}
        </div>
        <div class="chat-bubble chat-bubble-info">{{ item.content }}</div>
        <div class="chat-footer">
          <div class="chat-time text-gray-600 text-sm">{{ item.send_date }}
          </div>
        </div>
      </div>
    </div>
    <div class="h-12 w-full mb-4">
      <Input v-model:username="ForeignUser" v-model:token="token" @GetMessage="GetInitData"></Input>
    </div>
    <div class="h-32"></div>
  </div>
</template>

<style scoped>

</style>