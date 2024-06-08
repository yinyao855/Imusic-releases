<template>
  <NavTab :tabs="tabs" :components="components" :unReads="unReads" v-model:username="username" v-model:token="token"
          @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
          @handlePlayNow="handlePlayNow"></NavTab>
</template>

<script setup>
import SystemNotifications from "@/views/Message/SystemNotifications.vue";
import CommentNotifications from "@/views/Message/CommentNotifications.vue";
import AppealNotifications from "@/views/Message/AppealNotifications.vue";
import ComplainNotifications from "@/views/Message/ComplainNotifications.vue";
import NavTab from "@/components/NavTab.vue";
import {computed, defineEmits, ref} from "vue";

import {useUserStore} from "@/stores/user.js";
import PrivateMessage from "@/views/Message/PrivateMessage.vue";
import {useMessageStore} from "@/stores/message.js";

const userStore = useUserStore();
const messageStore = useMessageStore();

const emits = defineEmits(["PlaySongList", "handlePlayAfter", "handlePlayNow"]);

// emits
const PlaySongList = (id) => {
  emits('PlaySongList', id);
}

function handlePlayAfter(id) {
  emits('handlePlayAfter', id)
}

function handlePlayNow(id) {
  emits('handlePlayNow', id)
}

const tabs = [
  '系统通知',
  '评论通知',
  '我的私信',
  '投诉通知',
  '申诉通知'
];

const components = [
  SystemNotifications,
  CommentNotifications,
  PrivateMessage,
  ComplainNotifications,
  AppealNotifications,
];

const unReads1 = computed(() => messageStore.unReads1);
const unReads2 = computed(() => messageStore.unReads2);
const unReads4 = computed(() => messageStore.unReads4);
const unReads6 = computed(() => messageStore.unReads6);
const unReads7 = computed(() => messageStore.unReads7);
const unReads = [
  unReads1,
  unReads2,
  unReads4,
  unReads6,
  unReads7,
]

// 一些基本信息
const token = ref(computed(() => userStore.token));
const username = ref(computed(() => userStore.username));
// const token = defineModel('token');
// const username = defineModel('username')
const HasLogin = defineModel('HasLogin');
const UserRole = defineModel('UserRole');

console.log('message main get token' + token.value);
</script>