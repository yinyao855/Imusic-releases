<script setup>
import {onMounted, defineModel, defineEmits, ref, watch, computed} from "vue";
import axios from "axios";
import Message_Detail from "@/views/Message/Message_Detail.vue";
import {useMessageStore} from "@/stores/message.js";

const messageStore = useMessageStore();

const token = defineModel("token");
const username = defineModel("username");
const PrivateMessage = ref([]);
const SubscribeMessage = ref(computed(() => messageStore.MessageType4));
const ShowedMessage = ref([]);
const MyAvatar = ref('');
const OtherAvatar = ref('');

const GetInitMessage = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/messages/chats')
      .then(response => {
        PrivateMessage.value = response.data.data;
        JudgeMessage();
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const JudgeMessage = () => {
  for (let i = 0; i < SubscribeMessage.value.length; ++i) {
    SubscribeMessage.value[i]['Has_Subscribe'] = false;
    ShowedMessage.value.push(SubscribeMessage.value[i]);
  }
  for (let i = 0; i < PrivateMessage.value.length; ++i) {
    for (let j = 0; j < SubscribeMessage.value.length; ++j) {
      if (PrivateMessage.value[i].friend === SubscribeMessage.value[j].sender) {
        SubscribeMessage.value[j].Has_Subscribe = true;
        SubscribeMessage.value[j].content = PrivateMessage.value[i].last_message.content;
        SubscribeMessage.value[j].send_date = PrivateMessage.value[i].last_message.send_date;
        ShowedMessage.value[j] = SubscribeMessage.value[j];
      }
    }
  }
  for (let i = 0; i < ShowedMessage.value.length; ++i) {
    ShowedMessage.value[i].send_date = messageStore.ChangeTime(ShowedMessage.value[i].send_date);
  }
}

const ShowMessageDetail = ref(false);

const GetMyAvatar = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/info/' + username.value)
      .then((response) => {
        MyAvatar.value = response.data.data.avatar;
        console.log(MyAvatar.value);
      })
      .catch((error) => {
        console.log(error);
      });
}

const ForeignUser = ref('');
const CanChat = ref(false);

const ActiveMessageDetail = (index) => {
  OtherAvatar.value = ShowedMessage.value[index].message_cover;
  ForeignUser.value = ShowedMessage.value[index].sender;
  CanChat.value = ShowedMessage.value[index].Has_Subscribe;
  ShowMessageDetail.value = true;
}

const ChangeSize = () => {
  ShowMessageDetail.value = false;
}


const ChangeSubscribeState=(index)=>{
  const formData=new FormData();
  ShowedMessage.value[index].Has_Subscribe=!ShowedMessage.value[index].Has_Subscribe;
  formData.append('username',ShowedMessage.value[index].sender);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/users/follow',formData)
      .then(response=>{
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}


onMounted(GetInitMessage);
onMounted(GetMyAvatar);
</script>

<template>
  <div class="flex h-full flex-1">
    <div class="overflow-x-auto w-1/2 px-4 pb-32 h-full">
      <table class="table w-full">
        <tbody>
        <tr class="text-white w-full transition duration-400 hover:bg-gray-600/40 rounded-md cursor-pointer"
            v-for="(item, index) in ShowedMessage" :key="index" @click="ActiveMessageDetail(index)">
          <td class="align-bottom">
            <img :src="item.message_cover" alt="头像" class="h-14 rounded-xl aspect-square inline">
            <svg v-if="!item.Has_Subscribe" @click="ChangeSubscribeState(index)" class="icon inline fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                  d="M821.673945 202.326055c-170.763199-170.761152-448.584692-170.761152-619.346867 0-170.763199 170.763199-170.763199 448.584692 0 619.346867 170.762175 170.763199 448.582645 170.763199 619.346867 0C992.435097 650.910747 992.435097 373.089253 821.673945 202.326055zM777.236873 777.234827c-146.255015 146.255015-384.239198 146.231479-530.472723 0-146.252968-146.255015-146.252968-384.217708 0.002047-530.470677 146.231479-146.231479 384.215662-146.255015 530.470677 0C923.468352 392.998699 923.468352 631.002324 777.236873 777.234827z"></path>
              <path
                  d="M735.871767 482.116389l-191.777815-0.310062 1.040702-190.250018c0.10847-17.274432-13.82589-31.343869-31.100322-31.452339-17.276479-0.110517-31.365358 13.845333-31.454386 31.100322l-1.062192 190.492542-188.921767-0.286526c-17.297968 0-31.321356 13.934361-31.321356 31.231305-0.023536 17.274432 13.957897 31.299867 31.233352 31.322379l188.656731 0.286526-1.01819 188.900278c-0.089028 17.297968 13.823843 31.341822 31.100322 31.454386 8.715499 0.042979 16.58984-3.452635 22.296819-9.159614 5.617951-5.615904 9.092076-13.381775 9.157567-21.940708l1.038656-189.146894 192.040804 0.312108c8.650007 0.019443 16.479323-3.474125 22.164812-9.157567 5.662977-5.662977 9.134031-13.472849 9.155521-22.075785C767.127631 496.161267 753.169735 482.159368 735.871767 482.116389z"></path>
            </svg>
            <svg v-if="item.Has_Subscribe" @click="ChangeSubscribeState(index)" class="icon inline fill-white" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24">
              <path
                  d="M453.461333 278.869333m-139.093333 0a139.093333 139.093333 0 1 0 278.186667 0 139.093333 139.093333 0 1 0-278.186667 0Z"
                  opacity=".3"></path>
              <path
                  d="M162.304 983.04A25.258667 25.258667 0 0 1 136.533333 955.733333a439.808 439.808 0 0 1 413.013334-409.6 25.429333 25.429333 0 0 1 26.965333 25.088 24.746667 24.746667 0 0 1-23.210667 24.917334A389.632 389.632 0 0 0 187.733333 959.829333a24.917333 24.917333 0 0 1-25.429333 23.210667z"
              ></path>
              <path
                  d="M558.762667 595.626667a277.333333 277.333333 0 1 1 276.309333-278.357334A276.650667 276.650667 0 0 1 558.762667 595.626667z m0-503.466667a226.133333 226.133333 0 1 0 225.109333 225.109333A226.474667 226.474667 0 0 0 558.762667 92.16z"
              ></path>
              <path
                  d="M596.992 792.576m25.088 0l239.616 0q25.088 0 25.088 25.088l0 0q0 25.088-25.088 25.088l-239.616 0q-25.088 0-25.088-25.088l0 0q0-25.088 25.088-25.088Z"
              ></path>
            </svg>
          </td>

          <td class="overflow-hidden">
            <div class="font-bold text-xl mb-2 flex justify-between">
              <span>{{ item.sender }}</span>
              <span class="text-sm opacity-50">{{ item.send_date }}</span>
            </div>
            <div class="text-sm w-96 opacity-50 truncate ...">{{ item.content }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="border-l border-gray-400 mb-32"></div>
    <div class="w-1/2 z-50 h-full flex" v-if="!ShowMessageDetail">
      <svg class="icon mx-auto my-auto fill-gray-600" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
           width="200" height="200">
        <path
            d="M794.69 954.76H508.8c-247.03 0-448-200.98-448-448s200.97-448 448-448 448 200.98 448 448c0 116.76-44.19 226.24-124.77 310.06v100.61c0 20.61-16.72 37.33-37.34 37.33zM508.8 133.42c-205.86 0-373.33 167.47-373.33 373.33S302.94 880.09 508.8 880.09h248.56v-78.68c0-10.1 4.09-19.76 11.33-26.8 73.15-70.98 113.44-166.1 113.44-267.86 0-205.85-167.47-373.33-373.33-373.33z"
        ></path>
        <path d="M308.17 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
        <path d="M508.8 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
        <path d="M709.42 506.76m-62.49 0a62.49 62.49 0 1 0 124.98 0 62.49 62.49 0 1 0-124.98 0Z"></path>
      </svg>
    </div>
    <div class="w-1/2 z-50 h-full" v-if="ShowMessageDetail">
      <Message_Detail v-model:username="username" v-model:token="token" v-model:ForeignUser="ForeignUser"
                      v-model:MyAvatar="MyAvatar"
                      v-model:OtherAvatar="OtherAvatar" @ChangeSize="ChangeSize"
                      v-model:CanChat="CanChat"></Message_Detail>
    </div>
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

.align-bottom img, .align-bottom svg {
  vertical-align: bottom;
}
</style>