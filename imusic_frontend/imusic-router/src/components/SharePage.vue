<script setup>
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import {defineModel, onMounted, ref} from "vue";
import axios from "axios";

const token = defineModel('token')
const username = defineModel('username')
const shareType = defineModel('shareType')
const id = defineModel('id')
const title = defineModel('title')
const userFriends = ref([]);
const hasFriends = ref(false);
const shareCode = ref("");
const emits = defineEmits(["closeComplaint"])

const content = ref("");

function closeSharePage() {
  emits('closeSharePage');
}

function sendPostShare(user) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('type', '0');
  formData.append('friend', user);
  instance.post('/share/' + shareType.value, formData)
      .then(response => {
        if(response.data.success === true) {
          alert("分享成功")
        }
      })
      .catch(error => {
        console.log(error.response.data);
        alert("分享失败")
      })
}

function getShareCode() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('type', '1');
  instance.post('/share/' + shareType.value, formData)
      .then(response => {
        shareCode.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

function getUserFriends() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/friends?username=' + username.value)
      .then(response => {
        userFriends.value = response.data.data;
        if (userFriends.value.length > 0) {
          hasFriends.value = true;
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

onMounted(getUserFriends)
</script>

<template>
  <buttonchangesize class="left-4 top-4" @fullsize="closeSharePage"
                    v-model:token="token"></buttonchangesize>
  <div class="w-2/3 m-auto">
    <div class="w-full h-32 flex">
      <div v-if="shareType==='likesongs'" class="text-4xl text-white text-center m-auto">分享歌曲： {{ title }}</div>
      <div v-if="shareType==='songlist'" class="text-4xl text-white text-center m-auto">分享歌单： {{ title }}</div>
    </div>
    <div>
      <div class="w-full h-32 flex" v-if="!hasFriends">
        <div class="text-4xl text-white text-center m-auto">暂无互关的朋友</div>
      </div>
      <button class="btn btn-info" style="font-size: 20px" onclick="my_modal_2.showModal()" @click="getShareCode">获取分享码</button>
      <dialog id="my_modal_2" class="modal">
        <div class="modal-box bg-gray-300 text-center p-12">
          <h3 class="font-bold text-2xl text-gray-700 inline-block">分享码：</h3>
          <p class="text-cyan-600 text-xl inline-block">{{shareCode}}</p>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <table class="table mt-5">
        <tbody>
        <tr class="text-white hover:bg-gray-600/40 rounded-md"
            v-for="(item, index) in userFriends" @click="sendPostShare(item.username)">
          <td class="w-32">
            <img :src="item.avatar" alt="头像"
                 class="h-12 rounded-xl aspect-square inline-block"/>
          </td>
          <td class="">
            <div class="font-bold text-xl mb-2">{{ item.username }}</div>
          </td>
          <td class="w-40 text-sm">
            <button class="btn btn-success btn-sm">分享</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>