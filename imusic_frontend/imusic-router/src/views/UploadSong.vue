<template>
  <div id="uploadSong" class="h-full w-full flex items-center">
    <div class=" formx2 my-auto ml-[200px] width:800px flexible">
      <div class="flex-column text-2xl">
        <label>*歌曲名</label>
      </div>
      <div class="inputForm">
        <svg t="1713779846725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5635" width="24" height="24"><path d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z" p-id="5636"></path></svg>
        <input type="text" class="input bg-white" placeholder="请输入歌曲名" v-model="SongName">
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <div class="flex-column text-2xl">
        <label>*歌手</label>
      </div>
      <div class="inputForm">
        <svg t="1713781402135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7988" width="24" height="24"><path d="M621.6906477754643 481.59890704548104v91.51856298436078A255.94484428572028 255.94484428572028 0 0 0 219.49160697948815 783.1750596871783v146.2541965102559h-73.12709904067292v-164.5359700921066a310.79016817345257 310.79016817345257 0 0 1 310.79016817345257-310.79016817345257h36.56354873479146a309.6932614129017 309.6932614129017 0 0 1 127.97242292840514 27.495789113605824z m109.6906477754644 240.7709710973103V563.7937657073393a36.56354873479146 36.56354873479146 0 0 1 36.56354873479146-36.563550305881485h73.12709746958292a36.56354873479146 36.56354873479146 0 1 1 0 73.12709904067292h-36.56354873479146v219.3812939798388h-1.2797235065826498A127.97242135731514 127.97242135731514 0 1 1 731.3812955509288 722.3698781427912zM676.5359716631967 892.8657074626428a54.8453238877322 54.8453238877322 0 1 0 0-109.6906477754644 54.8453238877322 54.8453238877322 0 0 0 0 109.6906477754644zM475.4364512652086 417.53956762599375a182.81774524504735 182.81774524504735 0 1 1 0-365.6354904900947 182.81774524504735 182.81774524504735 0 0 1 0 365.6354904900947z m0-73.12709746958292a109.6906477754644 109.6906477754644 0 1 0 0-219.3812955509288 109.6906477754644 109.6906477754644 0 0 0 0 219.3812955509288z" p-id="7989">

        </path></svg><input type="text" class="input bg-white" placeholder="请输入歌曲歌手" v-model="Singer">
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <div class="flex-column text-2xl">
        <label>*歌曲文件</label>
      </div>
      <div class="grid grid-cols-1 space-y-2">
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div class="h-full w-full text-center flex flex-col items-center justify-center  ">
              -<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image">
              </div>
              <p class="pointer-none text-gray-500 "><span class="text-sm"></span> 拖拽文件至此处 <br /> 或 <a href="" id="" class="text-blue-600 hover:underline">选择文件</a> 上传</p>
            </div>
            <input type="file" class="hidden">
          </label>
        </div>
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <p class="text-sm text-gray-300">
        <span>支持格式：mp3</span>
      </p>
      <div class="flex-column text-2xl">
        <label>*歌曲封面</label>
      </div>
      <div class="grid grid-cols-1 space-y-2">
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div class="h-full w-full text-center flex flex-col items-center justify-center  ">
              -<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
              <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image">
              </div>
              <p class="pointer-none text-gray-500 "><span class="text-sm"></span>拖拽文件至此处<br />或<a href="" id="" class="text-blue-600 hover:underline">选择文件</a>上传</p>
            </div>
            <input type="file" class="hidden">
          </label>
        </div>
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <p class="text-sm text-gray-300">
        <span>支持格式：webg,jpg,jpeg,png</span>
      </p>
      <div class="flex-column text-2xl">
        <label>标签</label>
      </div>
      <div class="w-full mx-auto rounded-lg bg-gray-50 p-6" id="cta">
        <div class="group relative" id="dropdown-cta">
          <div class="flex items-center space-x-1" id="dropdown-header">
            <a href="#" class="block" id="dropdown-link">{{ theme }}</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-500 group-hover:rotate-180" id="icon-arrow-down" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <ul class="absolute z-10 hidden w-full divide-y rounded border bg-white shadow-md group-hover:block" id="dropdown-items">
            <li class="p-3"><button class="hover:text-blue-600" @click="setTheme(0)">主题（默认）</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setTheme(1)">背景音乐</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setTheme(2)">经典老歌</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setTheme(3)">KTV金曲</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setTheme(4)">游戏配乐</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setTheme(5)">电影配乐</button></li>
          </ul>
        </div>
      </div>
      <div class="w-full mx-auto rounded-lg bg-gray-50 p-6" id="cta">
        <div class="group relative" id="dropdown-cta">
          <div class="flex items-center space-x-1" id="dropdown-header">
            <a href="#" class="block" id="dropdown-link">{{ scene }}</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-500 group-hover:rotate-180" id="icon-arrow-down" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <ul class="absolute z-10 hidden w-full divide-y rounded border bg-white shadow-md group-hover:block" id="dropdown-items">
            <li class="p-3"><button class="hover:text-blue-600" @click="setScene(0)">场景（默认）</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setScene(1)">咖啡馆</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setScene(2)">运动</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setScene(3)">睡前</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setScene(4)">旅行</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setScene(5)">派对</button></li>
          </ul>
        </div>
      </div>
      <div class="w-full mx-auto rounded-lg bg-gray-50 p-6" id="cta">
        <div class="group relative" id="dropdown-cta">
          <div class="flex items-center space-x-1" id="dropdown-header">
            <a href="#" class="block" id="dropdown-link">{{ mood }}</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-500 group-hover:rotate-180" id="icon-arrow-down" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <ul class="absolute z-10 hidden w-full divide-y rounded border bg-white shadow-md group-hover:block" id="dropdown-items">
            <li class="p-3"><button class="hover:text-blue-600" @click="setMood(0)">心情（默认）</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setMood(1)">伤感</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setMood(2)">安静</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setMood(3)">思念</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setMood(4)">宣泄</button></li>
          </ul>
        </div>
      </div>
      <div class="w-full mx-auto rounded-lg bg-gray-50 p-6" id="cta">
        <div class="group relative" id="dropdown-cta">
          <div class="flex items-center space-x-1" id="dropdown-header">
            <a href="#" class="block" id="dropdown-link">{{ style }}</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-500 group-hover:rotate-180" id="icon-arrow-down" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <ul class="absolute z-10 hidden w-full divide-y rounded border bg-white shadow-md group-hover:block" id="dropdown-items">
            <li class="p-3"><button class="hover:text-blue-600" @click="setStyle(0)">风格（默认）</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setStyle(1)">摇滚</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setStyle(2)">民谣</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setStyle(3)">轻音乐</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setStyle(4)">电音</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setStyle(5)">流行</button></li>
          </ul>
        </div>
      </div>
      <div class="w-full mx-auto rounded-lg bg-gray-50 p-6" id="cta">
        <div class="group relative" id="dropdown-cta">
          <div class="flex items-center space-x-1" id="dropdown-header">
            <a href="#" class="block" id="dropdown-link">{{ language }}</a>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-all duration-500 group-hover:rotate-180" id="icon-arrow-down" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <ul class="absolute z-10 hidden w-full divide-y rounded border bg-white shadow-md group-hover:block" id="dropdown-items">
            <li class="p-3"><button class="hover:text-blue-600" @click="setLanguage(0)">语言（默认）</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setLanguage(1)">英语</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setLanguage(2)">日语</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setLanguage(3)">粤语</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setLanguage(4)">国语</button></li>
            <li class="p-3"><button class="hover:text-blue-600" @click="setLanguage(5)">韩语</button></li>
          </ul>
        </div>
      </div>
      <div class="flex-column text-2xl">
        <label>介绍</label>
      </div>
      <div class="inputForm">
        <svg t="1713789997854" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9038" width="24" height="24">
          <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="#333333" p-id="9039"></path>
          <path d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z" fill="#333333" p-id="9040"></path></svg><input type="text" class="input bg-white" placeholder="请为你的歌曲写一点介绍" v-model="introduction">
      </div>
      <div class="flex-column text-2xl">
        <label>歌词</label>
      </div>
      <div class="columns-2">
      <div class="inputForm">
        <svg t="1713789997854" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9038" width="24" height="24">
          <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="#333333" p-id="9039"></path>
          <path d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z" fill="#333333" p-id="9040"></path></svg><input type="text" class="input bg-white" placeholder="Please the introduction of the song" v-model="introduction">
      </div>

      </div>
      <div>
        <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
          Upload
        </button>
      </div>
  </div>
  </div>
</template>

<style>
@import url('../css/Login.css');
.vx-enter-active,
.vx-leave-active {
  transition: opacity 0.3s ease;
}

.vx-enter-from,
.vx-leave-to {
  opacity: 0;
}
.formx2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 30px;
  width: 800px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>

<script setup>
import confetti from 'canvas-confetti';
import {ref} from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import Warning from "@/views/Warning.vue";
import { defineEmits } from "vue"
const emits=defineEmits(['ChangerRegisterMode','changeMode']);
const router = useRouter();
const theme=ref('主题');
const scene=ref('场景');
const mood=ref('心情');
const style=ref('风格');
const language=ref('语言');
const setTheme=(newTheme)=>{
  if(newTheme===1){
    theme.value='背景音乐';
  }
  else if(newTheme===2){
    theme.value='经典老歌';
  }
  else if(newTheme===3){
    theme.value='KTV金曲';
  }
  else if(newTheme===4){
    theme.value='游戏配乐';
  }
  else if(newTheme===5){
    theme.value='电影配乐';
  }
  else if(newTheme===0){
    theme.value='主题';
  }
}
const setScene=(newScene)=>{
  if(newScene===1){
    scene.value='咖啡馆';
  }
  else if(newScene===2){
    scene.value='运动';
  }
  else if(newScene===3){
    scene.value='睡前';
  }
  else if(newScene===4){
    scene.value='旅行';
  }
  else if(newScene===5){
    scene.value='派对';
  }
  else if(newScene===0){
    scene.value='场景';
  }
}
const setMood=(newMood)=>{
  if(newMood===1){
    mood.value='伤感';
  }
  else if(newMood===2){
    mood.value='安静';
  }
  else if(newMood===3){
    mood.value='思念';
  }
  else if(newMood===4){
    mood.value='宣泄';
  }
  else if(newMood===0){
    mood.value='心情';
  }
}
const setStyle=(newStyle)=>{
  if(newStyle===1){
    style.value='摇滚';
  }
  else if(newStyle===2){
    style.value='民谣';
  }
  else if(newStyle===3){
    style.value='轻音乐';
  }
  else if(newStyle===4){
    style.value='电音';
  }
  else if(newStyle===5){
    style.value='流行';
  }
  else if(newStyle===0){
    style.value='风格';
  }
}
const setLanguage=(newLanguage)=>{
  if(newLanguage===1){
    language.value='英语';
  }
  else if(newLanguage===2){
    language.value='日语';
  }
  else if(newLanguage===3){
    language.value='粤语';
  }
  else if(newLanguage===4){
    language.value='国语';
  }
  else if(newLanguage===5){
    language.value='韩语';
  }
  else if(newLanguage===0){
    language.value='语言';
  }
}
// const gotosignup = () => {
//   console.log("signup");
//   router.push('/sign_up');
// }

const show = () => {
  const button = document.querySelector('.button-submit');
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + rect.height / 2 + window.scrollY;
  if(username.value===''){
    WarningShow.value=true;
    message.value="请输入用户名";
    return;
  }
  if(password.value===''){
    WarningShow.value=true;
    message.value="请输入密码";
    return;
  }
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);
  console.log(formData);
  axios.post('http://182.92.100.66:5000/users/login',formData)
      .then(response=>{
        if(response.data.success===1){
          HasLogin.value=true;
          usernametofather.value=username.value;
          confetti({
            particleCount: 500,
            angle: 90,
            spread: 45,
            startVelocity: 45,
            decay: 0.9,
            gravity: 1,
            drift: 0,
            ticks: 200,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
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
          changeMode();
        }
        else{
          WarningShow.value=true;
          message.value="用户名或密码错误";
        }
      })
      .catch(error=>{
        console.log("error");
      })
}

const CloseWarning = () => {
  WarningShow.value = false;
}
const HasLogin=defineModel('HasLogin');
const username=ref('');
const password=ref('');
const message=ref('');
const WarningShow=ref(false);
const usernametofather=defineModel('username');
// const email=defineModel('email');
// const bio=defineModel('bio');
// const avatar=defineModel('avatar');
// const role=defineModel('role');
// const registration_date=defineModel('registration_date');

const gotosignup = () =>{
  emits('ChangerRegisterMode');
}

const changeMode= ()=>{
  emits('changeMode');
}

</script>