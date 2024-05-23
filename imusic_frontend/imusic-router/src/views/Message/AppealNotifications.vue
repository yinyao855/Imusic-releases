<script setup>
import {computed, defineModel, onMounted, ref, watch} from "vue";
import {useMessageStore} from "@/stores/message.js";
import axios from "axios";
import Complain_Detail from "@/views/Message/Complain_Detail.vue";
import Appeal_Detail from "@/views/Message/Appeal_Detail.vue";
import AppealNotice from "@/views/Message/AppealNotice.vue";
import MyAlert from "@/js/MyAlert.js";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const Message = ref(computed(() => messageStore.MessageType7));
const hasMessage = ref(true);
const trueContent = ref([]);
const AppealType = ref([]);
const AppealDetail = ref([]);
const id = ref(0);
const Detail = ref({});
const MessageDetail = ref({});
const ShowAppealDetail = ref(false);
const ShowAppealNotice = ref(false);
const Loading= ref(false);
const ShowAppeal_Detail = () => {
  ShowAppealDetail.value = true;
}
const ShowAppeal_Notice = () => {
  ShowAppealNotice.value = true;
}
const close = () => {
  ShowAppealDetail.value = false;
  ShowAppealNotice.value = false;
}
function getAppealMessages() {
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
  AppealDetail.value = [];
  AppealType.value = [];
  AppealDetail.value.length = Message.value.length;
  trueContent.value = [];
  for(let i = 0;i<Message.value.length;i++) {
    if(Message.value[i].content.match(/\d+\s+/)) {
      trueContent.value.push('有新的申诉消息待处理');
      AppealType.value.push('申诉消息');
      getAppealDetail(i);
    }
    else{
      trueContent.value.push(Message.value[i].content);
      AppealType.value.push('申诉结果');
      AppealDetail.value.push({});
    }
  }
  Loading.value = false;
  console.log(AppealType.value);
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
        AppealDetail.value[index] = response.data.data;
        console.log(AppealDetail.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
};
function activeAppeal(index) {
  if(AppealType.value[index] === '申诉消息') {
    console.log(index)
    console.log(AppealDetail.value);
    console.log(AppealDetail.value[index]);
    Detail.value = AppealDetail.value[index];
    console.log(Detail.value);
    id.value = Message.value[index].id
    ShowAppeal_Detail();
  }
  else if(AppealType.value[index] === '申诉结果') {
    MessageDetail.value = Message.value[index];
    console.log(MessageDetail.value);
    ShowAppeal_Notice();
  }
  if(!Message.value[index].is_read) {
    messageStore.readMessage(Message.value[index].id, token.value);
    Message.value[index].is_read = true;
  }
}
async function DeleteMessage(index) {
  console.log(Message.value[index].id);
  console.log(token.value);
  try {
    await messageStore.deleteMessage(Message.value[index].id, token.value);
    MyAlert({type: 'alert-info', text: '删除成功'});
    console.log(Message.value);
    //删除Message.value[index];
    console.log(Message.value);
    Loading.value = true;
    //messageStore.refreshMessage(token.value);
  } catch (error) {
    MyAlert({type: 'alert-error', text: '删除失败'});
    messageStore.refreshMessage(token.value);
  }
}
onMounted(getAppealMessages)
watch(Message, () => {
  getAppealMessages();
})
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowAppealDetail">
      <Appeal_Detail v-model:AppealDetail="Detail" @closeAppeal="close" v-model:id="id"
                       v-model:token="token" v-model:username="username"></Appeal_Detail>
    </div>
  </transition>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowAppealNotice">
      <AppealNotice v-model:Message="MessageDetail" @closeAppeal="close"
                     v-model:token="token" v-model:username="username"></AppealNotice>
    </div>
  </transition>
  <div class="overflow-x-auto px-10" v-if="!ShowAppealDetail&&!ShowAppealNotice">
    <div class="w-full h-32 flex" v-if="!hasMessage">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <div class="w-full flex h-60" v-if="Loading">
      <span class="loading loading-spinner loading-lg m-auto"></span>
    </div>
    <table class="table" v-if="!Loading">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md cursor-pointer"
          v-for="(item, index) in Message" @click="activeAppeal(index)">
        <td class="w-28">
          <img :src="item.message_cover" alt="头像"
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
        <td class="w-20">
          <div class="inline pr-4">
            <svg class="icon fill-red-500 inline hover:fill-red-800" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" @click.stop="DeleteMessage(index)">
              <path
                  d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
              ></path>
              <path
                  d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
              ></path>
              <path
                  d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
              ></path>
              <path
                  d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
              ></path>
            </svg>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
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