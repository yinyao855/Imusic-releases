<script setup>

import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, onMounted, ref} from "vue";
import axios from "axios";
import SongPageForShow from "@/components/SongPageForShow.vue";
import SongListPageForShow from "@/components/SongListPageForShow.vue";
import Input from "@/components/Input.vue";

const token = defineModel('token')
const username = defineModel('username')
const id=defineModel('id')
const emits = defineEmits(["closeAppeal"])
const is_recover = ref(false)
const reason = ref('')
const closeAppeal = () => {
  emits('closeAppeal')
}
const Appeal=defineModel('AppealDetail')

const HandleAppeal = () => {
  const formData = new FormData();
  if (reason.value === '') {
    alert('请输入处理理由');
    return;
  }
  formData.append('is_remove', is_recover.value);
  formData.append('reason', reason.value);
  formData.append('message_id', id.value);
  console.log(id.value)
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/complaints/appeals/handle', formData)
      .then(response => {
        console.log(is_recover.value)
        reason.value = '';
        console.log(response.data);
        alert('处理成功');
        closeAppeal();
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
onMounted(() => {
});

</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeAppeal"
                    v-model:token="token"></buttonchangesize>
  <div class="card w-4/5 m-auto">
    <div class="w-full h-18 flex cursor-default">
      <div class="text-3xl text-gray-400 text-center mx-auto my-2">处理申诉</div>
    </div>
    <div class="w-full flex mt-1 cursor-default">
      <div class="card w-full shadow m-0 border-solid border-2 border-sky-500">
        <div class="card-body">
          <h2 class="card-title">投诉原因</h2>
          <p class="max-h-40 overflow-y-auto">{{Appeal.complaint.content}}</p>
          <h2 class="card-title">申诉原因</h2>
          <p class="max-h-40 overflow-y-auto">{{Appeal.reason}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="card w-4/5 text-neutral-content mx-auto mt-2 bg-zinc-800 hover:bg-zinc-700">

    <div class="card-body items-center text-center text-xl">
      <p v-if="Appeal.complaint.object_type==='song'">是否恢复歌曲</p>
      <p v-if="Appeal.complaint.object_type==='songlist'">是否恢复歌单</p>
      <div class="card-actions justify-end">
        <div class="join">
          <input class="join-item btn" type="radio" name="options" aria-label="恢复" value="true" v-model="is_recover"/>
          <input class="join-item btn" type="radio" name="options" aria-label="下架" value="false" v-model="is_recover"/>
        </div>
      </div>
    </div>
    <div class="w-5/6 mx-auto flex mb-5">
      <div class="inputForm w-full">
        <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
              d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
          ></path>
        </svg>
        <input type="text" class="input ml-2" placeholder="处理理由" v-model="reason">
        <button class="w-1/6 btn text-white text-lg" @click="HandleAppeal">提交</button>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="h-full w-full cursor-default">
    <SongPageForShow v-if="Appeal.complaint.object_type==='song'" v-model:currentSongId="Appeal.complaint.object_id"
                     v-model:username="username" v-model:token="token"></SongPageForShow>
    <SongListPageForShow v-if="Appeal.complaint.object_type==='songlist'" v-model:currentSonglistId="Appeal.complaint.object_id"
                         v-model:token="token" v-model:username="username"></SongListPageForShow>
  </div>
  <div class="h-32"></div>

</template>

<style scoped>

</style>