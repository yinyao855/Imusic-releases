<script setup>
// TODO：判断是否被下架，是否允许申述，若已申诉就不能再申诉，等待管理员申诉并收到申诉结果
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, onMounted, ref} from "vue";
import axios from "axios";

const token = defineModel('token')
const username = defineModel('username')
const id = defineModel('id')
const emits = defineEmits(["closeComplaint"])

const showForm = ref(false);

const complaintResult = defineModel("complaintResult")
const appealContent = ref("");

function closeAppeal() {
  emits('closeAppeal');
}

function getComplaintResult() {
  console.log(complaintResult.value)
}

function sendPostAppeal() {

}

onMounted(getComplaintResult)
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeAppeal"
                    v-model:token="token"></buttonchangesize>
  <div class="w-2/3 m-auto">
    <div class="w-full h-28 flex">
      <div class="text-4xl text-gray-400 text-center m-auto">审查结果</div>
    </div>
    <div class="text-white border border-yellow-500 rounded-lg p-3" style="height:260px; font-size: 18px">
      {{ complaintResult }}
    </div>
  </div>
  <hr class="mt-10 opacity-20">
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