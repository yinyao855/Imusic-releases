<script setup>
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, onMounted, ref} from "vue";
import axios from "axios";

const token = defineModel('token')
const username = defineModel('username')
const messageId = defineModel('id')
const emits = defineEmits(["closeComplaint"])

const showForm = ref(false);

const complaintResult = defineModel("complaintResult")
const complaintId = ref(0);
const appealContent = ref("");

function closeAppeal() {
  emits('closeAppeal');
}

function getComplaintResult() {
  complaintId.value = parseInt(complaintResult.value);
  if (!isNaN(complaintId.value)) {
    complaintResult.value = complaintResult.value.split(' ')[1];
    showForm.value = true;
  }
}

function sendPostAppeal() {
  const formData = new FormData();
  formData.append("complaint_id", complaintId.value);
  formData.append("reason", appealContent.value);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/complaints/appeal', formData)
      .then(function (response) {
        if (response.data.success === true) {
          alert("申述成功");
          closeAppeal();
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
}

onMounted(getComplaintResult)
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeAppeal"
                    v-model:token="token"></buttonchangesize>
  <div class="w-2/3 m-auto">
    <div class="w-full h-28 flex">
      <div class="text-4xl text-gray-400 m-auto inline-block">
        <svg class="h-10 w-10 text-blue-500 align-sub inline-block" width="24" height="24" viewBox="0 0 24 24"
             stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <polyline points="3 9 12 15 21 9 12 3 3 9"/>
          <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"/>
          <line x1="3" y1="19" x2="9" y2="13"/>
          <line x1="15" y1="13" x2="21" y2="19"/>
        </svg>
        审查结果
      </div>
    </div>
    <div class="text-white border border-blue-900 rounded-lg p-3" style="height:260px; font-size: 18px">
      {{ complaintResult }}
    </div>
  </div>
  <hr v-if="showForm" class="mt-10 opacity-20">
  <div class="w-2/3 m-auto">
    <div v-if="showForm">
      <div class="w-full h-28 flex">
        <div class="text-4xl text-gray-400 text-center m-auto">申诉</div>
      </div>
      <div class="text-2xl text-white mt-5 mb-2">
        <svg class="inline-block mr-3 h-8 w-8 text-red-600" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="12" cy="12" r="9"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p class="inline-block">申述内容</p>
      </div>
      <textarea
          class="textarea textarea-error textarea-bordered bg-zinc-900 w-full text-white"
          placeholder="请写上申述的内容和原因..." v-model="appealContent"
          style="height:260px; font-size: 18px"></textarea>
      <div>
        <button @click="sendPostAppeal" class="mt-2 w-full flex justify-center bg-red-600 text-gray-100 p-4 rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-800 shadow-lg cursor-pointer transition ease-in duration-300">
          申述
        </button>
      </div>
    </div>
  </div>
  <div class="h-32"></div>
</template>

<style scoped>

</style>