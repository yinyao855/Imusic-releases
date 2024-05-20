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
const Appeal=defineModel('AppealDetail')
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeAppeal"
                    v-model:token="token"></buttonchangesize>
  <div class="w-2/3 m-auto p-8 rounded-md">
    <div class="w-full h-16 flex">
      <div class="text-4xl text-cyan-600 inline-block m-auto">
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