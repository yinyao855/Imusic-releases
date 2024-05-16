<script setup>
import {onMounted, defineModel, defineEmits, ref, watch} from "vue";
import axios from "axios";
import Message_Detail from "@/views/Message/Message_Detail.vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const ClassifiedMessage = ref([]);


function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份从 0 开始，所以要加 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 格式化月份和日期，确保在数字小于 10 时前面补零
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;

  // 返回格式化后的日期时间字符串
  return `${year}年${formattedMonth}月${formattedDay}日 ${hours}:${minutes}`;
}


const Classify = () => {
  for (let i = 0; i < Message.value.length; ++i) {
    let flag = false;
    for (let j = 0; j < ClassifiedMessage.value.length; ++j) {
      if (ClassifiedMessage.value[j].sender === Message.value[i].sender) {
        if (Message.value[i].send_date > ClassifiedMessage.value[j].send_date) {
          let avatar = Message.value[i].avatar;
          ClassifiedMessage.value[j] = Message.value[i];
          Message.value[i]['avatar'] = avatar;
          ClassifiedMessage.value[j].send_date = formatDateTime(ClassifiedMessage.value[j].send_date);
        }
        flag = true;
        break;
      }
    }
    if (flag === false) {
      ClassifiedMessage.value.push(Message.value[i]);
      const instance = axios.create({
        baseURL: 'http://182.92.100.66:5000',
        timeout: 5000, // 设置请求超时时间
        headers: {
          'Authorization': `Bearer ${token.value}`,
        }
      });
      axios.defaults.withCredentials = true;
      instance.get('/users/info/' + Message.value[i].sender)
          .then(response => {
            console.log("ok");
            let length = ClassifiedMessage.value.length;
            length = length - 1;
            ClassifiedMessage.value[length]['avatar'] = response.data.data.avatar;
            ClassifiedMessage.value[length].send_date = formatDateTime(ClassifiedMessage.value[length].send_date);
          })
          .catch(error => {
            console.log(error.response.data);
          })
      instance.get('/users/info/' + username.value)
          .then(response => {
            MyAvatar.value = response.data.data.avatar;
          })
          .catch(error => {
            console.log(error.response.data);
          })
    }
  }
}
const ShowMessageDetail = ref(false);
const ForeignUser = ref('');
const MyAvatar = ref('');
const OtherAvatar = ref('');

const ActiveMessageDetail = (index) => {
  ForeignUser.value = ClassifiedMessage.value[index].sender;
  console.log(ForeignUser.value);
  ShowMessageDetail.value = true;
  OtherAvatar.value = ClassifiedMessage.value[index].avatar;
}
onMounted(Classify)
watch(Message, Classify)
</script>

<template>
  <div class="w-full h-full" v-if="ShowMessageDetail">
    <Message_Detail v-model:username="username" v-model:token="token" v-model:ForeignUser="ForeignUser"
                    v-model:Message="Message" v-model:MyAvatar="MyAvatar"
                    v-model:OtherAvatar="OtherAvatar"></Message_Detail>
  </div>
  <div class="overflow-x-auto px-10" v-if="!ShowMessageDetail">
    <table class="table">
      <tbody>
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in ClassifiedMessage" :key="index" @click="ActiveMessageDetail(index)">
        <td class="w-24">
          <img :src="item.avatar" alt="头像" class="h-14 rounded-xl aspect-square">
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.sender }}</div>
          <div class="text-sm opacity-50 truncate ...">{{ item.content }}</div>
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