<script setup>

import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {onMounted, defineModel, defineEmits, defineProps, ref} from "vue";

const token = defineModel("token")
const props = defineProps({
  'currentMessage': Object,
});
const emits = defineEmits(["closeShowSystemMessage"]);

const messageArr = ref([])

function closeShowSystemMessage() {
  console.log(props.currentMessage)
  emits('closeShowSystemMessage');
}

function getMessageArr() {
  messageArr.value = props.currentMessage.content.split("。");
}

onMounted(getMessageArr)
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeShowSystemMessage" v-model:token="token"></buttonchangesize>
  <div>
    <div class="w-full h-14 flex">
      <div class="text-4xl text-indigo-200 text-center mx-auto">{{ props.currentMessage.title }}</div>
    </div>
    <table class="text-white m-auto w-3/5">
      <tbody>
      <hr class="pb-1">
      <hr class="pb-3">
      <tr class="h-32">
        <td>
          <div class="slide-right bg-fuchsia-300 from-black bg-gradient-to-r rounded-full animate-pulse"
               style="width: 600px">
            <svg class="inline-block align-middle mx-10 my-5 h-14 w-14 text-fuchsia-300" width="24" height="24"
                 viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
              <circle cx="11" cy="16" r="1"/>
              <polyline points="12 16 12 11 14 12"/>
            </svg>
            <p class="inline-block align-middle text-fuchsia-100" style="width: 400px">{{ messageArr[0] }}。</p>
          </div>
        </td>
      </tr>
      <tr class="h-32 text-right">
        <td>
          <div class="float-right bg-cyan-300 from-black bg-gradient-to-l rounded-full"
               style="width: 600px">
            <p class="inline-block align-middle text-cyan-100" style="width: 400px">{{ messageArr[1] }}。</p>
            <svg class="inline-block align-middle mx-10 my-5 h-14 w-14 text-cyan-300" width="24" height="24"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
        </td>
      </tr>
      <tr class="h-32">
        <td>
          <div class="bg-blue-300 from-black bg-gradient-to-r rounded-full animate-pulse" style="width: 600px">
            <svg class="inline-block align-middle mx-10 my-5 h-14 w-14 text-blue-300" width="24" height="24"
                 viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path
                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/>
            </svg>
            <p class="inline-block align-middle text-blue-100" style="width: 400px">{{ messageArr[2] }}。</p>
          </div>
        </td>
      </tr>
      <tr class="h-32 text-right">
        <td>
          <div class="float-right bg-pink-300 from-black bg-gradient-to-l rounded-full"
               style="width: 600px">
            <p class="inline-block align-middle text-pink-100" style="width: 400px">{{ messageArr[3] }}。</p>
            <svg class="inline-block align-middle mx-10 my-5 h-14 w-14 text-pink-300" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
        </td>
      </tr>
      <hr class="my-2">
      <tr class="h-5 text-center bg-sky-100">
        <td>
          <p class="inline-block align-middle text-sky-900">{{ messageArr[4] }}</p>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="h-32"></div>
</template>

<style scoped>

</style>