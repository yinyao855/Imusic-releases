<script setup>
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, onMounted, ref} from "vue";
import axios from "axios";
import SongPageForShow from "@/components/SongPageForShow.vue";
import SongListPageForShow from "@/components/SongListPageForShow.vue";
import Input from "@/components/Input.vue";

const token = defineModel('token')
const username = defineModel('username')
const MessageDetail = defineModel('Message')
const emits = defineEmits(["closeAppeal"])
const closeAppeal = () => {
  emits('closeAppeal')
}
const Appeal = defineModel('AppealDetail')
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeAppeal"
                    v-model:token="token"></buttonchangesize>
  <div class="w-2/3 m-auto p-8 rounded-md">
    <div class="w-full h-16 flex">
      <div class="text-4xl text-cyan-600 inline-block m-auto">
        <svg t="1716216341489" class="h-10 w-10 text-cyan-600 align-sub inline-block" viewBox="0 0 1024 1024"
             version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2688" width="16" height="16">
          <path
              d="M473.5 534.2l89.8 89.8 25.6 102.6L832.5 483 730 457.2 473.5 200.8 447.9 98.2 204.3 341.8l102.6 25.6 89.8 89.8-192.4 192.4c-14.2 14.2-14.2 37.1 0 51.3l25.6 25.6c14.2 14.2 37.1 14.2 51.3 0l192.3-192.3zM764.1 837.6H401.5c-25 0-45.3 20.3-45.3 45.3 0 25 20.3 45.3 45.3 45.3h362.6c25 0 45.3-20.3 45.3-45.3 0.1-25-20.2-45.3-45.3-45.3z"
              p-id="2689" fill="#1296db">
          </path>
        </svg>
        申诉结果
      </div>
    </div>
    <div class="text-gray-400 border border-cyan-400 rounded-lg p-3" style="height:260px; font-size: 18px">
      {{ MessageDetail.content }}
    </div>
  </div>
  <div class="h-32"></div>

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


.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}
</style>