<script setup>

import { MusicPlayerVisible } from '@/js/MusicPlayer.js'
import { CommentMessageList } from '@/js/Message.js'
</script>

<template>
  <div class="w-full h-full">
    <div class="overflow-auto">
      <div class="h-32 w-full" v-for="(Message,index) in CommentMessageList" :key="index">
        <img :src="Message.Avatar" alt="头像"
             class="h-14 rounded-xl aspect-square inline-block -ml-3"/>
        <svg v-if="!Message.is_read" class="h-2 w-2 text-red-500 inline-block rounded-full align-top" width="24" height="24" viewBox="0 0 24 24" stroke-width="1"
             stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
      </div>
      {{CommentMessageList.length}}
      <div class="h-32 w-full" v-if="MusicPlayerVisible"></div>
    </div>
  </div>
</template>

<style scoped>

</style>