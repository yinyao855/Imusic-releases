<script setup>

import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, onMounted, ref} from "vue";
import axios from "axios";
import SongPage from "@/components/SongPage.vue";
import SongPageForShow from "@/components/SongPageForShow.vue";
import SongListPageForShow from "@/components/SongListPageForShow.vue";
import Songlist from "@/views/CreatedSongList/Songlist.vue";
import Input from "@/components/Input.vue";

const token = defineModel('token')
const username = defineModel('username')
const id = defineModel('id')
const emits = defineEmits(["closeComplaint"])
const is_remove = ref(false)
const reason = ref('')
const closeComplaint = () => {
  emits('closeComplaint')
}

const ComplaintDetail = ref('');
const getComplaintDetail = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/complaints/review?complaint_id=' + id.value;
  instance.get(web)
      .then(response => {
        ComplaintDetail.value = response.data.data;
        console.log(ComplaintDetail.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
};
const HandleComplaint = () => {
  const formData = new FormData();
  if (reason.value === '') {
    alert('请输入处理理由');
    return;
  }
  formData.append('is_remove', is_remove.value);
  formData.append('reason', reason.value);
  formData.append('complaint_id', id.value);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/complaints/handle', formData)
      .then(response => {
        reason.value = '';
        alert('处理成功');
        closeComplaint();
      })
      .catch(error => {
        console.log(error.data);
      })
}
onMounted(() => {
  getComplaintDetail();
});

</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeComplaint"
                    v-model:token="token"></buttonchangesize>
  <div class="card w-4/5 m-auto">
    <div class="w-full h-18 flex">
      <div class="text-3xl text-gray-400 text-center m-auto">处理投诉</div>
    </div>
    <div class="w-full flex mt-1">
      <div class="card w-full shadow m-0">
        <div class="card-body">
          <h2 class="card-title">投诉原因</h2>
          <p class="max-h-40 overflow-y-auto">{{ComplaintDetail.content}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="card w-4/5 text-neutral-content mx-auto my-0 bg-zinc-800 hover:bg-zinc-700">

    <div class="card-body items-center text-center text-xl">
      <p v-if="ComplaintDetail.object_type==='song'">是否删除歌曲</p>
      <p v-if="ComplaintDetail.object_type==='songlist'">是否删除歌单</p>
      <div class="card-actions justify-end">
        <div class="join">
          <input class="join-item btn" type="radio" name="options" aria-label="保留" value="false" v-model="is_remove"/>
          <input class="join-item btn" type="radio" name="options" aria-label="删除" value="true" v-model="is_remove"/>
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
        <button class="w-1/6 btn text-white text-lg" @click="HandleComplaint">提交</button>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="h-full w-full">
  <SongPageForShow v-if="ComplaintDetail.object_type==='song'" v-model:currentSongId="ComplaintDetail.object_id"
            v-model:username="username" v-model:token="token"></SongPageForShow>
    <SongListPageForShow v-if="ComplaintDetail.object_type==='songlist'" v-model:currentSonglistId="ComplaintDetail.object_id"
              v-model:token="token" v-model:username="username"></SongListPageForShow>
  </div>
  <div class="h-32"></div>

</template>

<style scoped>

</style>