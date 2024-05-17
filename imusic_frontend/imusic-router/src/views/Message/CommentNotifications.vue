<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";
import SongPage from "@/components/SongPage.vue";
import Comment from "@/components/Comment.vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const userImage = ref([]);
const songId = ref(0);
const title = ref("");
const currentMessage = ref([]);

function getCommentMessage() {
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

function activeCommentMessage(index, content) {
  currentMessage.value = Message.value[index];
  if(currentMessage.value.is_read === false) {
    readMessage(currentMessage.value.id);
    currentMessage.value.is_read = true;
  }
  const s1 = ref([]);
  const s2 = ref([]);
  s1.value = content.split("《");
  s2.value = s1.value[1].split("》");
  title.value = s2.value[0];
  getSongId();
}

function readMessage(messageId) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('message_id', messageId);
  instance.post('/messages/read', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

function getSongId() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songs/alldata')
      .then(response => {
        const length = ref(0);
        length.value = response.data.data.length;
        for (let i = 0; i < length.value; i++) {
          if (response.data.data[i].title === title.value && response.data.data[i].uploader === username.value) {
            songId.value = response.data.data[i].id;
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
}

onMounted(getCommentMessage)

</script>
<template>
  <div class="overflow-x-auto px-10">
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" @click="activeCommentMessage(index, item.content)">
        <td class="w-28">
          <img src="http://182.92.100.66:5000/media/avatars/imgPlaylist.jpeg" alt="头像"
               class="h-14 rounded-xl aspect-square inline-block"/>
          <div v-if="!item.is_read" class="text-red-500 inline-block" style="font-size: 50px">.</div>
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