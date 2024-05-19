<script setup>
import {onMounted, ref, watch} from "vue";
import Input from "@/components/Input.vue"
import axios from "axios";

const username = defineModel('username');
const token = defineModel('token');
const ForeignUser = defineModel('ForeignUser');
const ShowMessage = ref([]);
const MyAvatar = defineModel('MyAvatar');
const OtherAvatar = defineModel('OtherAvatar');
const emits = defineEmits(['ChangeSize']);
const CanChat=defineModel('CanChat');

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
  instance.get('/messages/private?friend=', {
    params:{
      'friend':ForeignUser.value
    }
  })
      .then((response) => {
        ShowMessage.value = response.data.data;
        length = ShowMessage.value.length;
        for (let i = 0; i < length; ++i) {
          if (ShowMessage.value[i]['sender'] === username.value)
            ShowMessage.value[i]['direction'] = 1;
          else
            ShowMessage.value[i]['direction'] = 0;
        }
      })
      .catch((error) => {
        console.log(error);
      });
}

const ChangeSize=()=>{
  emits('ChangeSize');
}

onMounted(GetInitData);
watch(ForeignUser,GetInitData);
</script>

<template>
  <div class="w-full h-dvh px-4">
    <div class="w-full h-4/5 overflow-auto">
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
        <div :class="['chat-bubble', item.direction === 1 ? 'chat-bubble-accent' : 'chat-bubble-info']">{{ item.content }}</div>
        <div class="chat-footer">
          <div class="chat-time text-gray-600 text-sm">{{ item.send_date }}
          </div>
        </div>
      </div>
    </div>
    <div class="h-12 w-full mb-4">
      <Input v-model:username="ForeignUser" v-model:token="token" @GetMessage="GetInitData" v-model:CanChat="CanChat"></Input>
    </div>
  </div>
</template>

<style scoped>

</style>