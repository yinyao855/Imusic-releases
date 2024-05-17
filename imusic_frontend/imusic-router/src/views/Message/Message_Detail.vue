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
  let length = Message.value.length;
  for (let i = 0; i < length; ++i) {
    if (Message.value[i].sender === ForeignUser.value) {
      ShowMessage.value.push(Message.value[i]);
    }
  }
  length = ShowMessage.value.length;
  for (let i = 0; i < length; ++i) {
    ShowMessage.value[i]['direction'] = 0;
  }
}

const GetMessage = () => {
  emits('GetMessage');
}

const ChangeSize=()=>{
  emits('ChangeSize');
}

onMounted(GetInitData);
</script>

<template>
  <div class="w-full h-full px-4">
    <ButtonChangeSizeRight class="left-4 top-4" @fullsize="ChangeSize" v-model:token="token"></ButtonChangeSizeRight>
    <div class="h-12 w-full mb-4">
      <Input v-model:username="ForeignUser" v-model:token="token" @GetMessage="GetMessage"></Input>
    </div>

    <div class="w-full">
      <div :class="['chat', item.direction === 0 ? 'chat-start' : 'chat-end']" v-for="(item, index) in ShowMessage"
           :key="index">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="头像" :src="item.direction===0?OtherAvatar:MyAvatar"/>
          </div>
        </div>
        <div class="chat-header">
          {{ item.sender }}
          <time class="text-xs opacity-50">{{ item.send_date }}</time>
        </div>
        <div class="chat-bubble">{{ item.content }}</div>
      </div>
    </div>
    <div class="h-32"></div>
  </div>
</template>

<style scoped>

</style>