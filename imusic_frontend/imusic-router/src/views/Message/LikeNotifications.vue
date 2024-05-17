<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const userImage = ref([]);

function getLikeMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  for (let index in Message.value) {
    let username = Message.value[index].sender;
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
  <div class="overflow-x-auto px-10">
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" @click="">
        <td class="w-24">
          <img src="http://182.92.100.66:5000/media/avatars/imgPlaylist.jpeg" alt="头像" class="h-14 rounded-xl aspect-square"/>
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