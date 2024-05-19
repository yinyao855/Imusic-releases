<script setup>
import {computed, defineModel, onMounted, ref} from "vue";
import {useMessageStore} from "@/stores/message.js";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const Message = ref(computed(() => messageStore.MessageType7));
const hasMessage = ref(true);

function getAppealMessages() {
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
}

onMounted(getAppealMessages)
</script>

<template>
  <div class="overflow-x-auto px-10">
    <div class="w-full h-32 flex" v-if="!hasMessage">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" @click="">
        <td class="w-28">
          <img src="" alt="头像"
               class="h-14 rounded-xl aspect-square inline-block"/>
          <svg v-if="!item.is_read" class="h-2 w-2 text-red-500 inline-block rounded-full align-top" width="24" height="24" viewBox="0 0 24 24" stroke-width="1"
               stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.sender }}</div>
          <div class="text-sm text-left opacity-50 truncate w-96">{{ item.content }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ item.send_date }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>