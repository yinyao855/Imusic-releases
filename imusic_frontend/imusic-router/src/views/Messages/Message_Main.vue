<template>
  <div role="tablist" class="tabs tabs-lifted tabs-lg bg-zinc-600">

    <input type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="'系统通知 (' + unReads1 + ')'" checked/>
    <div role="tabpanel" class="tab-content bg-zinc-900 border-base-300 rounded-box p-6">
      <SystemNotifications v-model:token="token" v-model:username="username"/>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="'评论通知 (' + unReads2 + ')'"/>
    <div role="tabpanel" class="tab-content bg-zinc-900 border-base-300 rounded-box p-6">
      <CommentNotifications v-model:token="token" v-model:username="username"/>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="'关注通知 (' + unReads4 + ')'"/>
    <div role="tabpanel" class="tab-content bg-zinc-900 border-base-300 rounded-box p-6">
      <SubscribeNotifications v-model:token="token" v-model:username="username"/>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="私信"/>
    <div role="tabpanel" class="tab-content bg-zinc-900 border-base-300 rounded-box p-6">
      <PrivateNotifications v-model:token="token" v-model:username="username"/>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="'投诉通知 (' + unReads6 + ')'"/>
    <div role="tabpanel" class="tab-content bg-zinc-900 border-base-300 rounded-box p-6">
      <ComplainNotifications v-model:token="token" v-model:username="username"/>
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="'申诉通知 (' + unReads7 + ')'"/>
    <div role="tabpanel" class="tab-content bg-zinc-900 border-base-300 rounded-box p-6">
      <AppealNotifications v-model:token="token" v-model:username="username"/>
    </div>
  </div>
</template>

<script setup>
import SystemNotifications from "@/views/Message/SystemNotifications.vue";
import CommentNotifications from "@/views/Message/CommentNotifications.vue";
import SubscribeNotifications from "@/views/Message/SubscribeNotifications.vue";
import PrivateNotifications from "@/views/Message/PrivateNotifications.vue";
import AppealNotifications from "@/views/Message/AppealNotifications.vue";
import ComplainNotifications from "@/views/Message/ComplainNotifications.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useMessageStore} from "@/stores/message.js";

// 一些基本信息
const token = defineModel('token');
const UserRole = defineModel('UserRole');
const username = defineModel('username');
const HasLogin = defineModel('HasLogin');

const messageStore = useMessageStore();
const unReads1 = computed(() => messageStore.unReads1);
const unReads2 = computed(() => messageStore.unReads2);
const unReads4 = computed(() => messageStore.unReads4);
const unReads6 = computed(() => messageStore.unReads6);
const unReads7 = computed(() => messageStore.unReads7);


</script>