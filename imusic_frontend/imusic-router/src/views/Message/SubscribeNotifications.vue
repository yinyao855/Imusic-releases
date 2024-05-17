<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const followMessage = ref([])
const userImage = ref([])
const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}

function getFollowMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  for (let i = 0; i < length.value; i++) {
    if (Message.value[i].type === 4) {
      followMessage.value.push(Message.value[i]);
      readMessage(Message.value[i].id)
    }
  }
  for (let index in followMessage.value) {
    let username = followMessage.value[index].sender;
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
function readMessage(id) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/messages/read?message_id=' + id;
  instance.get(url, {})
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
}
onMounted(getFollowMessage)
</script>

<template>
  <div class="text-white text-lg mt-5 mb-3 text-center">关注通知</div>
  <table class="table m-auto w-4/5 text-center">
    <thead>
    <tr>
      <th></th>
      <th class="">关注者</th>
      <th class="">日期</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(message, index) in followMessage" class="text-white hover:bg-gray-800 h-16 border-b-gray-500">
      <td><button>
        <img :src="userImage[index]" alt="" class="w-8 h-8 rounded-full">
      </button></td>
      <td><p class="inline-block align-middle text-gray-300">{{ message.sender }}</p></td>
      <td class="text-gray-500 opacity-30">{{ message.send_date }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>