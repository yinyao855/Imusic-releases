<script setup>

import {computed, defineModel, onMounted, ref} from "vue";
import SystemNotifications from "@/views/Message/SystemNotifications.vue";
import axios from "axios";
import CommentNotifications from "@/views/Message/CommentNotifications.vue";
import SubscribeNotifications from "@/views/Message/SubscribeNotifications.vue";
import PrivateNotifications from "@/views/Message/PrivateNotifications.vue";
import Warning from "@/components/Warning.vue";
import AppealNotifications from "@/views/Message/AppealNotifications.vue";
import ComplainNotifications from "@/views/Message/ComplainNotifications.vue";

const NaviMode = ref('1');
const upload = ref('0');
const token = defineModel('token');
const Message = defineModel('Message');
const MessageType1 = defineModel('MessageType1');
const MessageType2 = defineModel('MessageType2');
const MessageType3 = defineModel('MessageType3');
const MessageType4 = defineModel('MessageType4');
const MessageType5 = defineModel('MessageType5');
const MessageType6 = defineModel('MessageType6');
const MessageType7 = defineModel('MessageType7');
const UserRole = defineModel('UserRole');
const emits = defineEmits(['GetMessage']);
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const NaviClass3 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '3',
}));
const NaviClass4 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '4',
}));
const NaviClass5 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '5',
}));
const NaviClass6 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '6',
}));
const NaviClass7 = computed(() => ({
  'text-base inline-block mx-3 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '7',
}));

const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(Count4);
}
const Count1 = ref(0)
const Count2 = ref(0);
const Count3 = ref(0);
const Count4 = ref(0);
const Count5 = ref(0);
const Count6 = ref(0);
const Count7 = ref(0);
const username = defineModel('username');
const HasLogin = defineModel('HasLogin');

const GetHasRead = () => {
  for (let i = 0; i < MessageType1.value.length; ++i) {
    if (MessageType1.value[i].is_read === false) {
      Count1.value++;
    }
  }
  for (let i = 0; i < MessageType2.value.length; ++i) {
    if (MessageType2.value[i].is_read === false) {
      Count2.value++;
    }
  }
  for (let i = 0; i < MessageType3.value.length; ++i) {
    if (MessageType3.value[i].is_read === false) {
      Count3.value++;
    }
  }
  for (let i = 0; i < MessageType4.value.length; ++i) {
    if (MessageType4.value[i].is_read === false) {
      Count4.value++;
    }
  }
  for (let i = 0; i < MessageType5.value.length; ++i) {
    if (MessageType5.value[i].is_read === false) {
      Count5.value++;
    }
  }
  for (let i = 0; i < MessageType6.value.length; ++i) {
    if (MessageType6.value[i].is_read === false) {
      Count6.value++;
    }
  }
  for (let i = 0; i < MessageType7.value.length; ++i) {
    if (MessageType7.value[i].is_read === false) {
      Count7.value++;
    }
  }
}

const GetMessage = () => {
  emits('GetMessage')
}

onMounted(GetHasRead)
</script>

<template>

  <div class="w-full h-full">
    <div class="w-full h-14 pl-6">
      <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">系统通知
        <svg v-if="Count1!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="4" height="4">
          <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"
          ></path>
        </svg>
      </div>
      <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">评论通知
        <svg v-if="Count2!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="4" height="4">
          <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"
          ></path>
        </svg>
      </div>
      <!--    <div :class="[NaviClass3, 'text-transition']" @click="changeNaviMode(3)" style="line-height: 56px">喜欢通知-->
      <!--      <svg v-if="Count3!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"-->
      <!--           xmlns="http://www.w3.org/2000/svg" width="4" height="4">-->
      <!--        <path-->
      <!--            d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"-->
      <!--        ></path>-->
      <!--      </svg>-->
      <!--    </div>-->
      <div :class="[NaviClass4, 'text-transition']" @click="changeNaviMode(4)" style="line-height: 56px">关注通知
        <svg v-if="Count4!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="4" height="4">
          <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"
          ></path>
        </svg>
      </div>
      <div :class="[NaviClass5, 'text-transition']" @click="changeNaviMode(5)" style="line-height: 56px">私信通知
        <svg v-if="Count5!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="4" height="4">
          <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"
          ></path>
        </svg>
      </div>
      <div v-if="UserRole==='admin'" :class="[NaviClass6, 'text-transition']" @click="changeNaviMode(6)" style="line-height: 56px">投诉通知
        <svg v-if="Count6!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="4" height="4">
          <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"
          ></path>
        </svg>
      </div>
      <div v-if="UserRole==='admin'" :class="[NaviClass7, 'text-transition']" @click="changeNaviMode(7)" style="line-height: 56px">申诉通知
        <svg v-if="Count7!==0" class="icon inline text-white my-auto" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="4" height="4">
          <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FC3227"
          ></path>
        </svg>
      </div>
    </div>
    <SystemNotifications v-if="NaviMode==='1'" v-model:token="token" v-model:username="username"
                         v-model:Message="MessageType1"
    ></SystemNotifications>
    <CommentNotifications v-if="NaviMode==='2'" v-model:token="token" v-model:username="username"
                          v-model:Message="MessageType2"
    ></CommentNotifications>
    <SubscribeNotifications v-if="NaviMode==='4'" v-model:token="token" v-model:username="username"
                            v-model:Message="MessageType4"
    ></SubscribeNotifications>
    <PrivateNotifications class="w-full" v-model:token="token" v-model:username="username"
                          v-model:Message="MessageType5" v-if="NaviMode==='5'" @GetMessage="GetMessage"
    ></PrivateNotifications>
    <ComplainNotifications class="w-full" v-model:token="token" v-model:username="username"
                          v-model:Message="MessageType6" v-if="NaviMode==='6'" @GetMessage="GetMessage"
    ></ComplainNotifications>
    <AppealNotifications class="w-full" v-model:token="token" v-model:username="username"
                          v-model:Message="MessageType7" v-if="NaviMode==='7'" @GetMessage="GetMessage"
    ></AppealNotifications>
  </div>
</template>

<style scoped>

</style>