<template>
  <NavTab :tabs="tabs" :components="components" v-model:username="username" v-model:token="token"></NavTab>
</template>

<script setup>
import SystemNotifications from "@/views/Message/SystemNotifications.vue";
import CommentNotifications from "@/views/Message/CommentNotifications.vue";
import SubscribeNotifications from "@/views/Message/SubscribeNotifications.vue";
import PrivateNotifications from "@/views/Message/PrivateNotifications.vue";
import AppealNotifications from "@/views/Message/AppealNotifications.vue";
import ComplainNotifications from "@/views/Message/ComplainNotifications.vue";
import NavTab from "@/components/NavTab.vue";
import {computed, ref} from "vue";

import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore();

const tabs = [
  '系统通知',
  '评论通知',
  '关注通知',
  '私信',
  '投诉通知',
  '申诉通知'
];

const components = [
    SystemNotifications,
    CommentNotifications,
    SubscribeNotifications,
    PrivateNotifications,
    ComplainNotifications,
    AppealNotifications,
]

// 一些基本信息
// const token = ref(computed(() => userStore.token));
// const username = ref(computed(() => userStore.username));
const token = defineModel('token');
const username = defineModel('username')
const HasLogin = defineModel('HasLogin');
const UserRole = defineModel('UserRole');

console.log('message main get token' + token.value);
</script>