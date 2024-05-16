<script setup>

import SongPage from "@/components/SongPage.vue";
import EditSong from "@/views/EditSong.vue";
import {computed, defineModel, onMounted, ref} from "vue";
import Search from "@/components/Search.vue";
import SystemNotifications from "@/views/Message/SystemNotifications.vue";
import axios from "axios";
import CommentNotifications from "@/views/Message/CommentNotifications.vue";
import LikeNotifications from "@/views/Message/LikeNotifications.vue";
import SubscribeNotifications from "@/views/Message/SubscribeNotifications.vue";
import PrivateNotifications from "@/views/Message/PrivateNotifications.vue";

const NaviMode = ref('1');
const upload = ref('0');
const token = defineModel('token')
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const NaviClass3 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '3',
}));
const NaviClass4 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '4',
}));
const NaviClass5 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '5',
}));

const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}
const username = defineModel('username')
const Message = ref([])
const HasLogin = defineModel('HasLogin')

function getMessage() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/messages/';
  instance.get(web)
      .then(response => {
        Message.value = response.data.data;
        console.log(Message.value);
      })
      .catch(error => {
        console.log(error.data);
        console.log(token.value)
      })
}

onMounted(getMessage);
</script>

<template>
  <div class="w-full h-14 pl-6">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">系统通知</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">评论通知</div>
    <div :class="[NaviClass3, 'text-transition']" @click="changeNaviMode(3)" style="line-height: 56px">喜欢通知</div>
    <div :class="[NaviClass4, 'text-transition']" @click="changeNaviMode(4)" style="line-height: 56px">关注通知</div>
    <div :class="[NaviClass5, 'text-transition']" @click="changeNaviMode(5)" style="line-height: 56px">私信通知</div>
  </div>
  <SystemNotifications v-if="NaviMode==='1'" v-model:token="token" v-model:username="username" v-model:Message="Message"
  ></SystemNotifications>
  <CommentNotifications v-if="NaviMode==='2'" v-model:token="token" v-model:username="username" v-model:Message="Message"
  ></CommentNotifications>
  <LikeNotifications v-if="NaviMode==='3'" v-model:token="token" v-model:username="username" v-model:Message="Message"
  ></LikeNotifications>
  <SubscribeNotifications v-if="NaviMode==='4'" v-model:token="token" v-model:username="username" v-model:Message="Message"
  ></SubscribeNotifications>
  <PrivateNotifications v-if="NaviMode==='5'" v-model:token="token" v-model:username="username" v-model:Message="Message"
  ></PrivateNotifications>
</template>

<style scoped>

</style>