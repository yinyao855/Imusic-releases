<template>
  <div id="sign_up" class="h-full w-full flex items-center" @keypress.enter="show">
    <div class="formx mx-auto my-auto">
      <div class="flex-column">
        <label>邮 箱 </label>
      </div>
      <div class="inputForm">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path
              d="M512 447.223c-88.224 0-160-71.776-160-160s71.776-160 160-160c88.225 0 160 71.776 160 160s-71.775 160-160 160z m0-256c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zM454.901 870.594c-96.594 0-184.933-3.802-231.263-49.955C203.308 800.386 193 774.164 193 742.701c0-31.629 10.247-62.812 30.457-92.686 17.978-26.573 42.908-50.741 74.098-71.833C359.256 536.46 437.418 512.53 512 512.53c74.55 0 152.55 23.943 214.002 65.691 31.05 21.094 55.861 45.273 73.746 71.867C819.822 679.937 830 711.096 830 742.701c0 31.552-10.317 57.827-30.664 78.097-50.714 50.521-151.822 50.128-258.88 49.723a7395.45 7395.45 0 0 0-56.914-0.001c-9.605 0.037-19.163 0.074-28.641 0.074zM512 806.447c9.567 0 19.149 0.037 28.701 0.073 49.52 0.191 96.284 0.37 135.808-4.396 38.418-4.633 64.546-13.604 77.659-26.668 5.079-5.06 11.832-13.96 11.832-32.755 0-38.089-27.688-78.744-75.963-111.54C638.933 596.442 574.04 576.53 512 576.53c-126.309 0-255 83.862-255 166.171 0 18.675 6.738 27.547 11.807 32.596 32.045 31.922 128.975 31.55 214.491 31.224 9.556-0.037 19.139-0.074 28.702-0.074z"
          ></path>
        </svg>
        <input type="text" class="input bg-white" placeholder="请输入邮箱" v-model="email">
      </div>


      <div class="flex-column">
        <label>验 证 码 </label>
      </div>
      <div class="inputForm">
        <svg class="icon fill-black" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path
              d="M943.1 172c-2.4-0.2-245.1-25.3-413.8-147.8-5.1-3.7-11-5.6-17.3-5.6-6.2 0-12.2 1.9-17.3 5.6C326.9 146 83.3 171.8 80.9 172c-15.2 1.4-26.6 14.1-26.6 29.3 0 6.7 0.6 165.8 54.8 344.4 32.1 105.8 76.4 196.4 131.9 269.2 70.3 92.3 158.5 156 262 189.2 2.9 0.9 5.9 1.4 9 1.4s6.1-0.5 8.9-1.4c103.6-33.2 191.7-96.8 262-189.2 55.4-72.7 99.8-163.2 131.9-269.2 54.1-178.6 54.8-337.7 54.8-344.4C969.7 186.1 958.3 173.5 943.1 172zM910.1 227.2l-0.1 1.6c-2.9 58.1-13.4 174.4-51.4 299.9-66.7 220.1-183.1 360.1-346 416.1L512 945l-0.6-0.2C349 888.9 232.7 749.4 165.8 530.1c-39.8-130.5-49.4-254.2-51.8-301.4l-0.1-1.6 1.5-0.2c70.6-10.3 250.5-44.8 395.5-142.4l0.9-0.7 1 0.7C658 182.1 837.9 216.6 908.5 227L910.1 227.2z"
          ></path>
          <path
              d="M641.8 351 467 580.3l-89-76.1c-5.3-4.5-12.1-7-19.1-7-8.6 0-16.8 3.7-22.4 10.3-10.5 12.3-9.1 31 3.3 41.5l112.7 96.4c5.2 4.4 12.4 7 19.6 7 0.9 0 1.8 0 2.7-0.1 8-0.8 15.4-5 20.3-11.4l193.7-254c4.8-6.3 6.8-14 5.7-21.8-1-7.8-5.1-14.7-11.3-19.5C670.1 335.6 651.6 338.1 641.8 351z"
          ></path>
        </svg>
        <input type="text" class="input bg-white" placeholder="请输入密码" v-model="verify_code">
        <div class="w-1/2 h-full text-black border-black rounded-2xl flex items-center justify-center">
          <button class="btn text-black hover:text-white hover:bg-black btn-outline w-full" v-if="!showcountdown"
                  @click="startCountdown">
            {{ content }}
          </button>

          <span v-if="showcountdown" class="countdown font-mono text-2xl text-black px-4">
            <span :style="{ '--value': timeLeft }"></span>
        </span>
          <span class="text:black" v-if="showcountdown">秒后重新获取</span>
        </div>
      </div>


      <div class="flex-column">
        <label>账 号 </label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_3" data-name="Layer 3">
            <path
                d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input type="text" class="input bg-white" placeholder="请输入用户名" v-model="username">
      </div>

      <div class="flex-column">
        <label>密 码 </label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input :type="showPassword1 ? 'text' : 'password'" class="input bg-white" placeholder="请输入密码" v-model="password">
        <svg v-if="!showPassword1" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer mx-auto" @click="changeShowPassword1">
          <path
              d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
        </svg>
        <svg v-if="showPassword1" viewBox="0 0 1024 1024" height="1.5em" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer mx-auto" @click="changeShowPassword1"
             t="1717076201906" version="1.1" p-id="8194">
          <path d="M815.5 796.8c-18.7 18.7-49.1 18.7-67.9 0L272.5 321.6c-18.7-18.7-18.7-49.1 0-67.9 18.7-18.7 49.1-18.7 67.9 0l475.2 475.2c18.7 18.7 18.7 49.1-0.1 67.9z" fill="#131414" p-id="8195"></path><path d="M444.8 403.5C408.4 426 384 466 384 512c0 70.7 57.3 128 128 128 46 0 86-24.4 108.5-60.8L444.8 403.5zM498.5 321.4c4.5-0.3 8.9-1.4 13.5-1.4 106 0 192 86 192 192 0 4.6-1 9-1.4 13.5l127.6 127.6c45.6-39.7 81.5-87.5 103.7-141.1-61.6-149-227-256-422-256-25.1 0-49.6 1.9-73.6 5.3l60.2 60.1z" fill="#131414" p-id="8196"></path><path d="M666.5 625.1c-35 47.6-90.9 78.9-154.5 78.9-106 0-192-86-192-192 0-63.6 31.3-119.5 78.9-154.5l-67.7-67.7C219.4 332.4 131.2 412.3 90 512c61.6 149 227 256 422 256 87.6 0 168.6-22.5 237.6-59.8l-83.1-83.1z" fill="#131414" p-id="8197"></path></svg>

      </div>

      <div class="flex-column">
        <label>重 复 密 码 </label>
      </div>
      <div class="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input :type="showPassword2 ? 'text' : 'password'" class="input bg-white" placeholder="请再次输入密码" v-model="repeatpassword">
        <svg v-if="!showPassword2" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer mx-auto" @click="changeShowPassword2">
          <path
              d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
        </svg>
        <svg v-if="showPassword2" viewBox="0 0 1024 1024" height="1.5em" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer mx-auto" @click="changeShowPassword2"
             t="1717076201906" version="1.1" p-id="8194">
          <path d="M815.5 796.8c-18.7 18.7-49.1 18.7-67.9 0L272.5 321.6c-18.7-18.7-18.7-49.1 0-67.9 18.7-18.7 49.1-18.7 67.9 0l475.2 475.2c18.7 18.7 18.7 49.1-0.1 67.9z" fill="#131414" p-id="8195"></path><path d="M444.8 403.5C408.4 426 384 466 384 512c0 70.7 57.3 128 128 128 46 0 86-24.4 108.5-60.8L444.8 403.5zM498.5 321.4c4.5-0.3 8.9-1.4 13.5-1.4 106 0 192 86 192 192 0 4.6-1 9-1.4 13.5l127.6 127.6c45.6-39.7 81.5-87.5 103.7-141.1-61.6-149-227-256-422-256-25.1 0-49.6 1.9-73.6 5.3l60.2 60.1z" fill="#131414" p-id="8196"></path><path d="M666.5 625.1c-35 47.6-90.9 78.9-154.5 78.9-106 0-192-86-192-192 0-63.6 31.3-119.5 78.9-154.5l-67.7-67.7C219.4 332.4 131.2 412.3 90 512c61.6 149 227 256 422 256 87.6 0 168.6-22.5 237.6-59.8l-83.1-83.1z" fill="#131414" p-id="8197"></path></svg>

      </div>
      <div class="flex-row">
        <span class="span" @click="gotologin">登录</span>
      </div>
      <button class="button-submit" @click="show">注 册</button>
    </div>
  </div>
</template>

<style>
@import url('../../css/Login.css');


.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<script setup>
import confetti from 'canvas-confetti';
import axios from "axios";
import {defineEmits} from "vue"

const content = ref('获取验证码');
import {ref, watch} from "vue";
import MyAlert from "@/js/MyAlert.js";

const showcountdown = ref(false);
const email = ref('');
const username = ref('');
const password = ref('');
const repeatpassword = ref('');
const message = ref('');
const usernametofather = defineModel('username');
const emits = defineEmits(['ChangerRegisterMode']);
let interval = null;
const token = defineModel('token');
const verify_code = ref('');
const timeLeft = ref(60);
const gotologin = () => {
  emits('ChangerRegisterMode');
}
const showPassword1 = ref(false);
const showPassword2 = ref(false);
const changeShowPassword1 = () => {
  showPassword1.value = !showPassword1.value;
}
const changeShowPassword2 = () => {
  showPassword2.value = !showPassword2.value;
}

const show = () => {
  const button = document.querySelector('.button-submit');
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + rect.height / 2 + window.scrollY;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === '') {
    MyAlert({type:'alert-warning',text:'请输入邮箱'});
    return;
  } else if (verify_code.value === '') {
    MyAlert({type:'alert-warning',text:'请输入验证码'});
    return;
  } else if (!emailRegex.test(email.value)) {
    MyAlert({type:'alert-warning',text:'邮箱格式不符合要求'});
    return;
  } else if (username.value === '') {
    MyAlert({type:'alert-warning',text:'请输入用户名'});
    return;
  } else if (password.value !== repeatpassword.value) {
    MyAlert({type:'alert-warning',text:'两次密码不一致'});
    return;
  }
  const formData = new FormData();
  formData.append('email', email.value)
  formData.append('username', username.value);
  formData.append('password', password.value);
  formData.append('verification_code', verify_code.value);
  console.log(verify_code.value);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/users/register', formData)
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          usernametofather.value = username.value;
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
          gotologin();
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
}

watch(timeLeft, () => {
  let time = timeLeft.value;
  if (time === 0) {
    showcountdown.value = false;
    content.value = '重新获取';
  }
})

const startCountdown = () => {
  const formData = new FormData();
  formData.append('email', email.value);
  axios.post('http://182.92.100.66:5000/users/send-code', formData)
      .then(response => {
        console.log(response.data);
        token.value = response.data.token;
      })
      .catch(error => {
        console.log(error.data);
      })
  showcountdown.value = true;
  clearInterval(interval);
  timeLeft.value = 60;
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}
</script>