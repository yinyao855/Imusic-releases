<script setup>
import {computed, defineModel, ref} from "vue"
import axios from "axios";
import Upload_Area from "@/components/Upload_Area.vue";
import MyAlert from "@/js/MyAlert.js";

const token = defineModel('token')
const emits = defineEmits(['updateavatar'])
const userdata = defineModel('userdata');
const HasLogin = defineModel('HasLogin')
const username = defineModel('username');
const shareCode = ref("");
const Avatar = ref(null);
const AvatarHasChanged = ref(false);
const userrole = computed(() => {
  if (userdata.value.role === 'Admin') {
    return '管理员';
  } else {
    return '普通用户';
  }
})

const CountNotRead = defineModel('CountNotRead');

const changeHasLogin = () => {
  username.value = '点击登录'
  HasLogin.value = !HasLogin.value;
  CountNotRead.value = 0;
  localStorage.removeItem('user-info');
}

const updateavatar = () => {
  emits('updateavatar');
}

const Savemessage = () => {
  let formData = new FormData();
  const web = '/users/update/' + username.value;
  formData.append('bio', userdata.value.bio);
  if (userdata.value.email !== '' && userdata.value.email !== null) {
    formData.append('email', userdata.value.email);
  }
  if (AvatarHasChanged.value) {
    formData.append('avatar', Avatar.value);
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post(web, formData)
      .then(response => {
        console.log(response.data.message);
        if (response.data.success === true) {
          updateavatar();
          MyAlert({type: 'alert-info', text: '保存成功'});
          const webx = '/users/info/' + username.value;
          const instance = axios.create({
            baseURL: 'http://182.92.100.66:5000',
            timeout: 5000, // 设置请求超时时间
            headers: {
              'Authorization': `Bearer ${token.value}`,
            }
          });
          axios.defaults.withCredentials = true;
          instance.get(webx)
              .then(response => {
                userdata.value.avatar = response.data.data.avatar;
              })
              .catch(error => {
                console.log(error.response.data);
              })
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

function getShare() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  const formData = new FormData();
  formData.append('code', shareCode.value);
  axios.defaults.withCredentials = true;
  instance.post("/share/handle", formData)
      .then(response => {
        if (response.data.success === true) {
          MyAlert({type: 'alert-info', text: '接受分享成功'});
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
</script>

<template>
  <div class="w-full h-full">
    <div class="h-1/3 bg-zinc-700">
      <img :src="userdata.avatar" alt="用户头像"
           class="aspect-square my-auto mx-10 h-4/5 rounded-2xl inline-block mt-6">
      <div class="h-4/5 my-auto inline-block">
        <p class="text-white text-4xl my-4">{{ userdata.username }}</p>
        <p class="text-base text-white my-6">注册时间：{{ userdata.registration_date }}</p>
      </div>
      <button class="btn btn-info btn-md float-right mt-3 mx-3" onclick="my_modal_2.showModal()">使用分享码</button>
    </div>
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box bg-gray-300 h-60 py-10">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-2xl text-gray-700">分享码：</h3>
        <input class="w-4/5 text-cyan-600 text-xl p-2 inline-block align-middle mr-5 rounded-md"
               v-model="shareCode" placeholder="请输入分享码"/>
        <button class="btn btn-info mt-8 inline-block" @click="getShare">获取</button>
        <div class="text-cyan-600 mt-1 ml-1" style="font-size: 12px">分享码时效为一天，接受分享成功后，请在【收藏的歌单】中查看</div>
      </div>
    </dialog>
    <div class="text-white text-xl w-3/5 mx-auto my-4">
      个人简介：
      <div class="inputForm bg-zinc-900 my-2">
        <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
              d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
          ></path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="个人简介" v-model="userdata.bio">
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
        <input type="text" class="input bg-zinc-900" placeholder="" v-model="userrole" readonly>
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
        <input type="text" class="input bg-zinc-900" placeholder="" v-model="userdata.email" readonly>
      </div>
    </div>
    <Upload_Area v-model:avatar="Avatar" v-model:AvatarHasChanged="AvatarHasChanged"
                 v-model:token="token"></Upload_Area>

    <div
        class="w-1/5 bg-blue-600 hover:bg-blue-800 transition ease-in duration-300 my-6 mx-auto rounded-md h-10 text-white text-center tracking-widest items-center flex justify-center"
        @click="Savemessage">
      <p>保存信息</p>
    </div>
    <div
        class="w-1/5 bg-blue-600 hover:bg-blue-800 transition ease-in duration-300 my-6 mx-auto rounded-md h-10 text-white text-center tracking-widest items-center flex justify-center"
        @click="changeHasLogin">
      <p>注销</p>
    </div>
    <div class="h-32"></div>
  </div>

</template>

<style scoped>

</style>