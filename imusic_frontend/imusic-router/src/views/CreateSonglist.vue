<script setup>
import {ref} from "vue";
import axios from "axios";

const title = ref("");
let cover;
const introduction = ref("");
const owner = ref("yees");

const theme = ref("")
const scene = ref("")
const mood = ref("")
const style = ref("")
const language = ref("")

const props = defineProps({
  showFormCreateSonglist: Boolean,
})

const emit = defineEmits(['activeShowFormCreateSonglist']);

function updateImg(e) {
  cover = e.target.files[0];
}

function sendPostCreateSonglist() {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('cover', cover);
  formData.append('introduction', introduction.value);
  formData.append('owner', owner.value);
  console.log(formData);
  axios.post('http://182.92.100.66:5000/songlists/create', formData)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log("error");
      });
};

</script>

<template>
  <!--  <button @click="showForm">click</button>-->
  <div class="form_create_container bg-gray-400 fixed" v-show="showFormCreateSonglist">
    <div class="form_create m-auto mt-4 bg-gray-800 p-3 rounded-2xl">
      <div class="">
        <div class="text-2xl text-white mb-2">
          <p class="">*歌单标题</p>
        </div>
        <input type="text" class="w-full rounded-md p-3" placeholder="请输入歌单标题" v-model="title">
      </div>
      <div>
        <div class="text-2xl text-white my-2">
          <p class="w-full rounded-2xl">*歌单封面</p>
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-48 p-10 group text-center">
              <div class="h-full w-full text-center flex flex-col items-center justify-center  ">
                <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                </div>
                <p class="pointer-none text-gray-500 ">
                  <span class="text-sm"></span>
                  拖拽文件至此处 <br/> 或
                  <span class="text-blue-600 hover:underline">选择文件</span>
                  上传
                </p>
              </div>
              <input type="file" class="hidden" accept="image/png,image/jpg,image/jpeg" @change="updateImg">
            </label>
          </div>
        </div>
        <p class="text-sm text-gray-500">
          <span>此项为必填项</span>
        </p>
        <p class="text-sm text-gray-300">
          <span>支持格式：webg,jpg,jpeg,png</span>
        </p>
      </div>
      <div>
        <div class="text-2xl text-white my-2">
          <p class="">歌单介绍</p>
        </div>
        <input type="text" class="w-full rounded-md p-3" placeholder="请为你的歌单写一点介绍" v-model="introduction">
      </div>
      <div class="text-2xl text-white my-2">
        <p class="">标签</p>
      </div>
      <div class="inline-block">
        <select v-model="theme"
                class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
          <option value="">-- 主题 --</option>
          <option>背景音乐</option>
          <option>经典老歌</option>
          <option>KTV金曲</option>
          <option>游戏配乐</option>
          <option>电影配乐</option>
        </select>
      </div>
      <div class="inline-block">
        <select v-model="scene"
                class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">
          <option value="">-- 场景 --</option>
          <option>咖啡馆</option>
          <option>运动</option>
          <option>睡前</option>
          <option>旅行</option>
          <option>派对</option>
        </select>
      </div>
      <div class="inline-block">
        <select v-model="mood"
                class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">
          <option value="">-- 心情 --</option>
          <option>伤感</option>
          <option>安静</option>
          <option>思念</option>
          <option>宣泄</option>
        </select>
      </div>
      <div class="inline-block">
        <select v-model="style"
                class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">
          <option value="">-- 风格 --</option>
          <option>摇滚</option>
          <option>民谣</option>
          <option>轻音乐</option>
          <option>电音</option>
          <option>流行</option>
        </select>
      </div>
      <div class="inline-block">
        <select v-model="language"
                class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">
          <option value="">-- 语言 --</option>
          <option>英语</option>
          <option>日语</option>
          <option>粤语</option>
          <option>国语</option>
          <option>韩语</option>
        </select>
      </div>
      <div>
        <button @click="sendPostCreateSonglist" class="mt-8 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
          创建歌单
        </button>
      </div>
    </div>
    <div class="fixed top-4 right-4" @click="emit('activeShowFormCreateSonglist')">
      <svg class="h-8 w-8 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
select {
  width: 90px;
  margin: 2px;
}

.form_create_container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  opacity: 95%;
}

.form_create {
  width: 500px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
}
</style>