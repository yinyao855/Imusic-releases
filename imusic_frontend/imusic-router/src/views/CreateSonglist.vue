<script setup>
import {defineModel, ref} from "vue";
import axios from "axios";
import P from "particles.vue3";

const title = ref("");
const introduction = ref("");

const theme = ref("")
const scene = ref("")
const mood = ref("")
const style = ref("")
const language = ref("")

const cover = ref(null);
const coverImageFileUrl = ref('');

const props = defineProps({
  showFormCreateSonglist: Boolean,
})

const emit = defineEmits(['activeShowFormCreateSonglist']);
const HasLogin = defineModel('HasLogin');
const username = defineModel('username');
const message = ref('');
const WarningShow = ref(false);

const onCoverFileChange = (event) => {
  cover.value = event.target.files[0];
  const files = event.target.files || event.dataTransfer.files;
  createImage(files[0]);
};

const createImage = (file) => {
  fileToBase64(file).then(function (base64) {
    coverImageFileUrl.value = base64;// 输出文件的 base64 形式
  }).catch(function (error) {
    console.error('Error:', error.data);
  });
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

function sendPostCreateSonglist() {
  if (HasLogin.value === false) {
    console.log('请先登录');
    WarningShow.value = true;
    message.value = '请先登录';
    return;
  }
  if (title.value === '') {
    console.log('请输入歌单名');
    WarningShow.value = true;
    message.value = '请输入歌单名';
    return;
  }
  if (cover.value === null) {
    console.log('请上传封面');
    WarningShow.value = true;
    message.value = '请上传封面';
    return;
  }

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('cover', cover.value);
  formData.append('introduction', introduction.value);
  formData.append('owner', username.value);
  formData.append('tag_theme', theme.value);
  formData.append('tag_scene', scene.value);
  formData.append('tag_mood', mood.value);
  formData.append('tag_style', style.value);
  formData.append('tag_language', language.value);

  axios.post('http://182.92.100.66:5000/songlists/create', formData)
      .then(function (response) {
        if (response.data.success === true) {
          console.log(response);
          window.alert("创建成功");
          emit("activeShowFormCreateSonglist");
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
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-52 p-10 group text-center"
                   for="CoverUpLoad">
              <div class="h-32 content-center m-auto" v-if="cover!==null">
                <img :src="coverImageFileUrl" class="w-full h-full object-cover rounded-lg content-center">
              </div>
              <p v-if="cover!==null" class=" pointer-none text-gray-500 "><span
                  class="text-sm"></span>{{ cover.name }}</p>
              <div v-if="cover===null"
                   class="h-full w-full text-center flex flex-col items-center justify-center  ">
                <svg t="1713876861040" class="icon fill-white transition hover:fill-blue-600" viewBox="0 0 1194 1024"
                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7431" width="80" height="80">
                  <path
                      d="M152.62673094 991.65443843a51.27435943 51.27435943 0 0 1-52.15426311-48.79463341l102.38873717-552.73919819v-1.5198328c0-27.67695563 23.35743091-50.15448278 52.23425434-50.15448278h843.90717007c28.31688465 0 51.51433311 21.75760687 52.3942369 48.79463253l-102.38873725 552.73919807v1.5198328a51.27435943 51.27435943 0 0 1-52.31424564 50.15448382H152.62673094z m636.80995128-262.85108717c13.27853904 0 26.47708777-15.91824934 30.95659499-31.83649784 0-15.91824934-4.47950719-37.11591754-13.27854002-47.67475592L657.05124401 447.87425375c-17.59806379-21.19766814-44.15514285-21.19766814-61.75320652 0L445.23454444 649.2920975C431.95600436 659.85093594 431.95600436 681.04860501 431.95600436 696.96685342c0 15.91824934 13.27853904 31.83649781 30.87660374 31.83649784h105.98834157v132.46542936c0 21.19766814 13.1985478 37.11591754 30.87660377 37.11591755h61.75320656c17.67805497 0 30.87660377-15.91824934 30.87660375-37.11591755V728.80335124H789.51667344zM202.94119625 271.81362032c-37.83583785 0-68.71244156 28.95681469-68.79243277 64.47290816L32.95989401 868.70796219V97.03284595C33.03988525 61.59674467 60.63684963 32.79991158 94.79309279 32.79991158H403.95908469l92.70980156 96.46938842h463.46901844c34.15624311 0 61.83319876 28.79683219 61.83319876 64.31292572V271.97360282H202.94119625z"
                      fill="#1296db" p-id="7432">
                  </path>
                </svg>
                <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                </div>
                <p v-if="cover===null" class="pointer-none text-gray-500 "><span class="text-sm"></span> 拖拽文件至此处
                  <br/> 或点击此处上传</p>
              </div>
              <input type="file" @change="onCoverFileChange" id="CoverUpLoad" class="absolute -left-10 -top-10"
                     accept="image/jpeg, image/png, image/gif, image/webp">
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