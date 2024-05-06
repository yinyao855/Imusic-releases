<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import buttonchangesize from '@/components/buttonchangesize.vue'

const token = defineModel('token');
const UserId = defineModel('UserId');
const emits = defineEmits(['changesize']);
const userdata = ref([]);
const role=ref('');

const submitdata=()=>{
  const submitrole=ref('');
  if(role.value==='管理员'){
    submitrole.value='admin';
  }
  else{
    submitrole.value='user';
  }
  console.log(submitrole)
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData=new FormData();
  formData.append('dir_user',UserId.value);
  formData.append('role',submitrole.value);
  instance.post('users/change-role',formData)
      .then(response=>{
        if(response.data.success===true){
          alert('用户权限修改成功');
        }
        else{
          alert('用户权限修改失败');
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

const GetUserData = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/info/' + UserId.value)
      .then(response => {
        userdata.value = response.data.data;
        if (userdata.value.role === 'admin') {
          userdata.value.role = '管理员';
        } else {
          userdata.value.role = '普通用户';
        }
        role.value=userdata.value.role;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const changesize = () => {
  emits('changesize');
}
onMounted(GetUserData);
</script>

<template>
  <div class="w-full h-screen">
    <div class="h-64 flex bg-zinc-700">
      <buttonchangesize class="absolute top-5 left-5" @fullsize="changesize" v-model:token="token"></buttonchangesize>
      <img :src="userdata.avatar" alt="用户头像" class="aspect-square my-auto mx-10 h-4/5 rounded-2xl">
      <div class="h-4/5 my-auto">
        <p class="text-white text-4xl my-4">{{ userdata.username }}</p>
        <p class="text-base text-white my-6">注册时间：{{ userdata.registration_date }}</p>
      </div>
    </div>
    <div class="text-white text-xl w-3/5 mx-auto my-4">
      个人简介：
      <div class="inputForm bg-zinc-900 my-2">
        <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
              d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
          ></path>
        </svg>
        <input type="text" class="input bg-zinc-900 w-full" placeholder="个人简介" v-model="userdata.bio" disabled>
      </div>
    </div>
    <div class="text-white text-xl w-3/5 mx-auto my-4">
      身份：
      <div class="inputForm bg-zinc-900 my-2 fill-white">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="32" height="32">
          <path
              d="M500 128.8c-95.2 5.6-173.6 83.2-180 178.4-7.2 112 80.8 205.6 191.2 205.6 106.4 0 192-86.4 192-192 0.8-110.4-92-198.4-203.2-192zM512 575.2c-128 0-383.2 64-383.2 192v96c0 17.6 14.4 32 32 32h702.4c17.6 0 32-14.4 32-32V766.4c0-127.2-255.2-191.2-383.2-191.2z"
          ></path>
        </svg>
        <select class="select select-bordered w-full" v-model="role">
          <option class="h-8">{{userdata.role}}</option>
          <option class="h-8">{{userdata.role==='管理员'?'普通用户':'管理员'}}</option>
        </select>
      </div>
    </div>
    <div class="text-white text-xl w-3/5 mx-auto my-4">
      邮箱：
      <div class="inputForm bg-zinc-900 my-2 fill-white">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="32" height="32">
          <path
              d="M500 128.8c-95.2 5.6-173.6 83.2-180 178.4-7.2 112 80.8 205.6 191.2 205.6 106.4 0 192-86.4 192-192 0.8-110.4-92-198.4-203.2-192zM512 575.2c-128 0-383.2 64-383.2 192v96c0 17.6 14.4 32 32 32h702.4c17.6 0 32-14.4 32-32V766.4c0-127.2-255.2-191.2-383.2-191.2z"
          ></path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="" v-model="userdata.email" readonly disabled>
      </div>
    </div>
    <button @click="submitdata" class="w-2/5 mx-auto mt-10 flex justify-center bg-blue-600 text-white p-4  rounded-full
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-800 shadow-lg cursor-pointer transition ease-in duration-300 tracking-widest">
      保存信息
    </button>
  </div>
</template>

<style scoped>

</style>