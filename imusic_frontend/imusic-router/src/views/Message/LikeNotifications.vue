<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const likeMessage = ref([]);
const userImage = ref([]);

const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}

function getLikeMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  for (let i = 0; i < length.value; i++) {
    if (Message.value[i].type === 3) {
      likeMessage.value.push(Message.value[i]);
    }
  }
  for (let index in likeMessage.value) {
    let username = likeMessage.value[index].sender;
    const instance = axios.create({
      baseURL: 'http://182.92.100.66:5000',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${token.value}`,
      }
    });
    axios.defaults.withCredentials = true;
    let url = '/users/info/' + username;
    instance.get(url, {})
        .then((response) => {
          userImage.value[index] = response.data.data.avatar;
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

onMounted(getLikeMessage)
</script>

<template>
  <div class="text-white text-lg mt-5 mb-3 text-center">喜欢通知</div>
  <table class="table m-auto w-4/5 text-center">
    <thead>
    <tr>
      <th></th>
      <th class="">用户</th>
      <th class="">作品</th>
      <th class="">日期</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(message, index) in likeMessage" class="text-white hover:bg-gray-800 h-16 border-b-gray-500">
      <td><button>
        <img :src="userImage[index]" alt="" class="w-8 h-8 rounded-full">
      </button></td>
      <td><p class="inline-block align-middle text-gray-300">{{ message.sender }}</p></td>
      <td><p class="inline-block align-middle text-gray-300"></p></td>
      <td class="text-gray-500 opacity-30">{{ message.send_date }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>