<script setup>
import {computed, defineModel, onMounted, ref} from "vue";
import {useMessageStore} from "@/stores/message.js";
import axios from "axios";
import Complain_Detail from "@/views/Message/Complain_Detail.vue";
import Appeal_Detail from "@/views/Message/Appeal_Detail.vue";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const Message = ref(computed(() => messageStore.MessageType7));
const hasMessage = ref(true);
const trueContent = ref([]);
const AppealDetail = ref([]);
const id = ref(0);
const Detail = ref({});
const ShowAppealDetail = ref(false);
const ShowAppeal_Detail = () => {
  ShowAppealDetail.value = true;
}
const close = () => {
  ShowAppealDetail.value = false;
}
function getAppealMessages() {
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
  for(let i = 0; i < Message.value.length; i++) {
    trueContent.value.push(Message.value[i].content.split(' ')[1]);
    getAppealDetail(i);
  }
  console.log(trueContent.value);
}
const getAppealDetail = (index) => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/complaints/appeals/review?message_id=' + Message.value[index].id;
  instance.get(web)
      .then(response => {
        AppealDetail.value.push(response.data.data);
        console.log(AppealDetail.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
};
function activeAppeal(index) {
  console.log(AppealDetail.value[index]);
  Detail.value=AppealDetail.value[index];
  console.log(Detail.value);
  id.value=Message.value[index].id
  ShowAppeal_Detail();
}

onMounted(getAppealMessages)
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowAppealDetail">
      <Appeal_Detail v-model:AppealDetail="Detail" @closeAppeal="close" v-model:id="id"
                       v-model:token="token" v-model:username="username"></Appeal_Detail>
    </div>
  </transition>
  <div class="overflow-x-auto px-10" v-if="!ShowAppealDetail">
    <div class="w-full h-32 flex" v-if="!hasMessage">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md cursor-pointer"
          v-for="(item, index) in Message" @click="activeAppeal(index)">
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
          <div class="text-sm text-left opacity-50 truncate w-96">{{ trueContent[index] }}</div>
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