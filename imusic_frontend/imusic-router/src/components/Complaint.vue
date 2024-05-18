<script setup>
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, ref} from "vue";
import axios from "axios";

const token = defineModel('token')
const username = defineModel('username')
const complaintType = defineModel('complaintType')
const id = defineModel('id')
const title = defineModel('title')
const emits = defineEmits(["closeComplaint"])

const content = ref("");

function closeComplaint() {
  emits('closeComplaint');
}

function sendPostComplaint() {
  console.log(id.value)
  const idType = ref("");
  if (complaintType.value==='songs') {
    idType.value = 'song_id';
  } else if (complaintType.value==='songlists') {
    idType.value = 'songlist_id';
  }
  const formData = new FormData();
  formData.append(idType.value, id.value);
  formData.append("content", content.value);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/' + complaintType.value + '/complaint', formData)
      .then(function (response) {
        if (response.data.success === true) {
          alert("投诉成功");
          closeComplaint();
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
}
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeComplaint"
                    v-model:token="token"></buttonchangesize>
  <div class="w-2/3 m-auto">
    <div class="w-full h-32 flex">
      <div v-if="complaintType==='songs'" class="text-4xl text-white text-center m-auto">投诉歌曲： {{ title }}</div>
      <div v-if="complaintType==='songlists'" class="text-4xl text-white text-center m-auto">投诉歌单： {{ title }}</div>
    </div>
    <div>
      <div class="text-2xl text-white mt-5 mb-2">

        <svg class="inline-block mr-3 h-8 w-8 text-red-600" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="12" cy="12" r="9"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p class="inline-block">投诉内容</p>
      </div>
      <textarea
          class="textarea textarea-error textarea-bordered bg-zinc-900 w-full text-white"
          placeholder="请写上投诉的内容和原因..." v-model="content"
          style="height:260px; font-size: 18px"></textarea>
    </div>
    <div>
      <button @click="sendPostComplaint" class="mt-2 w-full flex justify-center bg-red-600 text-gray-100 p-4 rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-800 shadow-lg cursor-pointer transition ease-in duration-300">
        投诉
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>