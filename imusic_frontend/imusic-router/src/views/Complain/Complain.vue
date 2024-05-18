<script setup>
import {defineModel, defineEmits, onMounted, ref} from "vue";
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import Warning from "@/components/Warning.vue";
import axios from "axios";
import P from "particles.vue3";
const token = defineModel('token')
const username = defineModel('username')
const currentSongId = defineModel('currentSongId')
const WarningShow = defineModel('WarningShow')
const message = defineModel('message')
const complainContent = ref('');
// defineEmits(关闭当前页面/回到上一个页面展示歌单)
const emits = defineEmits(['CloseComplain'])
const fullsize = () => {
  emits('CloseComplain');
}
const submitComplain = () => {

  if (complainContent.value === '') {
    alert('请输入投诉原因');
    return;
  }
  let formData = new FormData();

  formData.append('song_id', currentSongId.value);
  formData.append('content', complainContent.value);

  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/songs/complaint', formData, {
  })
      .then(response => {
        alert('投诉成功');
        console.log(response.data);
        emits('CloseComplain');
      })
      .catch(error => {
        alert('投诉失败')
        console.log(currentSongId.value);
        console.error(error.response ? error.response : error);
      });
};
const CloseWarning=()=>{
  WarningShow.value=false;
}
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="fullsize" v-model:token="token"></buttonchangesize>
  <div class="w-2/3 h-full mx-auto">
    <div class="formx2 my-auto mx-auto flexible bg-zinc-900 w-full h-full">
      <div class="flex-column text-2xl">
        <div class="text-white">*投诉原因</div>
      </div>
      <div class="inputForm bg-zinc-900">
        <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
              d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
          ></path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="请输入投诉具体原因" v-model="complainContent">
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <button class="mt-5 w-full flex justify-center bg-blue-600 text-white p-4  rounded-full
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-800 shadow-lg cursor-pointer transition ease-in duration-300 tracking-widest"
              @click="submitComplain">
        投 诉
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>