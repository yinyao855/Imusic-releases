<template>
  <div id="login" class="h-full w-full flex items-center" @keypress.enter="show">
    <transition name="vx">
      <div class="w-full absolute top-0 left-1/2 transform -translate-x-1/2" v-if="WarningShow">
        <Warning :message="message" @CloseWarning="CloseWarning" class="mx-auto" v-model:token="token"></Warning>
      </div>
    </transition>
    <div class="formx mx-auto my-auto">
      <div class="flex-column">
        <label>Username </label>
      </div>
      <div class="inputForm">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path
              d="M512 447.223c-88.224 0-160-71.776-160-160s71.776-160 160-160c88.225 0 160 71.776 160 160s-71.775 160-160 160z m0-256c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zM454.901 870.594c-96.594 0-184.933-3.802-231.263-49.955C203.308 800.386 193 774.164 193 742.701c0-31.629 10.247-62.812 30.457-92.686 17.978-26.573 42.908-50.741 74.098-71.833C359.256 536.46 437.418 512.53 512 512.53c74.55 0 152.55 23.943 214.002 65.691 31.05 21.094 55.861 45.273 73.746 71.867C819.822 679.937 830 711.096 830 742.701c0 31.552-10.317 57.827-30.664 78.097-50.714 50.521-151.822 50.128-258.88 49.723a7395.45 7395.45 0 0 0-56.914-0.001c-9.605 0.037-19.163 0.074-28.641 0.074zM512 806.447c9.567 0 19.149 0.037 28.701 0.073 49.52 0.191 96.284 0.37 135.808-4.396 38.418-4.633 64.546-13.604 77.659-26.668 5.079-5.06 11.832-13.96 11.832-32.755 0-38.089-27.688-78.744-75.963-111.54C638.933 596.442 574.04 576.53 512 576.53c-126.309 0-255 83.862-255 166.171 0 18.675 6.738 27.547 11.807 32.596 32.045 31.922 128.975 31.55 214.491 31.224 9.556-0.037 19.139-0.074 28.702-0.074z"
          ></path>
        </svg>
        <input type="text" class="input bg-white text-black" placeholder="Enter your Username" v-model="username">
      </div>

      <div class="flex-column">
        <label>Password </label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input type="password" class="input bg-white text-black" placeholder="Enter your Password" v-model="password">
        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
        </svg>
      </div>

      <div class="flex-row">
        <span class="span" @click="gotosignup">Forgot password?</span>
      </div>
      <button class="button-submit" @click="show">Sign In</button>
      <p class="p">Don't have an account? <span class="span" @click="gotosignup">Sign Up</span></p>
    </div>
  </div>
</template>

<style>
@import url('../../css/Login.css');

.vx-enter-active,
.vx-leave-active {
  transition: opacity 0.3s ease;
}

.vx-enter-from,
.vx-leave-to {
  opacity: 0;
}
</style>

<script setup>
import confetti from 'canvas-confetti';
import {ref} from "vue";
import axios from "axios";
import Warning from "@/components/Warning.vue";
import {defineEmits, defineModel} from "vue"

const emits = defineEmits(['ChangerRegisterMode', 'changeMode', 'getsonglistinit']);
const token=defineModel('token');
const UserRole=defineModel('UserRole');
const show = () => {
  const button = document.querySelector('.button-submit');
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + rect.height / 2 + window.scrollY;
  if (username.value === '') {
    WarningShow.value = true;
    message.value = "请输入用户名";
    return;
  }
  if (password.value === '') {
    WarningShow.value = true;
    message.value = "请输入密码";
    return;
  }
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);
  console.log(formData);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/users/login', formData)
      .then(response => {
        if (response.data.success === true) {
          HasLogin.value = true;
          usernametofather.value = username.value;
          token.value=response.data.token;
          confetti({
            particleCount: 500,
            angle: 90,
            spread: 45,
            startVelocity: 45,
            decay: 0.9,
            gravity: 1,
            drift: 0,
            ticks: 200,
            origin: {x: x / window.innerWidth, y: y / window.innerHeight},
            shapes: ["square", "circle"],
            zIndex: 100,
            colors: [
              "#26ccff",
              "#a25afd",
              "#ff5e7e",
              "#88ff5a",
              "#fcff42",
              "#ffa62d",
              "#ff36ff"
            ],
            disableForReducedMotion: false,
            scalar: 1
          });
          HasLogin.value = true;
          getsonglistinit(username.value);
          changeMode();
          avatar.value = response.data.data.avatar;
          UserRole.value=response.data.data.role;
          if (response.data.data.avatar === null) {
            avatar.value = '';
          }
          console.log(avatar.value)
        } else {
          WarningShow.value = true;
          message.value = "用户名或密码错误";
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const getsonglistinit = (s) => {
  emits('getsonglistinit', s);
}

const CloseWarning = () => {
  WarningShow.value = false;
}
const HasLogin = defineModel('HasLogin');
const username = ref('');
const password = ref('');
const message = ref('');
const WarningShow = ref(false);
const usernametofather = defineModel('username');
const avatar = defineModel('avatar');

const gotosignup = () => {
  emits('ChangerRegisterMode');
}

const changeMode = () => {
  emits('changeMode', 1);
}
</script>