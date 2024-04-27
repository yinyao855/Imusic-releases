<script setup>
import {defineModel, ref} from "vue";
import axios from "axios";

const title = ref("");
const introduction = ref("");
const theme = ref("")
const scene = ref("")
const mood = ref("")
const style = ref("")
const language = ref("")
const cover = ref(null);
const coverImageFileUrl = ref('');
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
          alert("创建成功");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
}

</script>

<template>
  <div class="form_create_container bg-zinc-900 w-full">
    <div class="w-3/5 m-auto mt-4 bg-zinc-900 p-3 rounded-2xl">
      <div class="text-2xl text-white mb-2">
        <p class="">*歌单标题</p>
      </div>
      <div class="inputForm bg-zinc-900">
        <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
              d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
              ></path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="请输入歌单名" v-model="title">
      </div>
      <div>
        <div class="text-2xl text-white my-2">
          <p class="w-full rounded-2xl">*歌单封面</p>
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <div class="flex items-center justify-center w-full">
            <label
                class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 pb-6 pt-3 group text-center hover:bg-zinc-800 transition ease-in duration-300"
                for="CoverUpLoad">
              <div class="h-full content-center mx-auto" v-if="cover!==null">
                <img :src="coverImageFileUrl" class="w-full h-full object-cover rounded-lg content-center" alt="图像">
              </div>
              <p v-if="cover!==null" class=" pointer-none text-gray-500 "><span
                  class="text-sm"></span>{{ cover.name }}</p>
              <div v-if="cover===null"
                   class="h-full w-full text-center flex flex-col items-center justify-center  ">
                <svg class="icon fill-white transition hover:fill-blue-600" viewBox="0 0 1194 1024"
                     xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                  <path
                      d="M152.62673094 991.65443843a51.27435943 51.27435943 0 0 1-52.15426311-48.79463341l102.38873717-552.73919819v-1.5198328c0-27.67695563 23.35743091-50.15448278 52.23425434-50.15448278h843.90717007c28.31688465 0 51.51433311 21.75760687 52.3942369 48.79463253l-102.38873725 552.73919807v1.5198328a51.27435943 51.27435943 0 0 1-52.31424564 50.15448382H152.62673094z m636.80995128-262.85108717c13.27853904 0 26.47708777-15.91824934 30.95659499-31.83649784 0-15.91824934-4.47950719-37.11591754-13.27854002-47.67475592L657.05124401 447.87425375c-17.59806379-21.19766814-44.15514285-21.19766814-61.75320652 0L445.23454444 649.2920975C431.95600436 659.85093594 431.95600436 681.04860501 431.95600436 696.96685342c0 15.91824934 13.27853904 31.83649781 30.87660374 31.83649784h105.98834157v132.46542936c0 21.19766814 13.1985478 37.11591754 30.87660377 37.11591755h61.75320656c17.67805497 0 30.87660377-15.91824934 30.87660375-37.11591755V728.80335124H789.51667344zM202.94119625 271.81362032c-37.83583785 0-68.71244156 28.95681469-68.79243277 64.47290816L32.95989401 868.70796219V97.03284595C33.03988525 61.59674467 60.63684963 32.79991158 94.79309279 32.79991158H403.95908469l92.70980156 96.46938842h463.46901844c34.15624311 0 61.83319876 28.79683219 61.83319876 64.31292572V271.97360282H202.94119625z"
                      fill="#1296db">
                  </path>
                </svg>
                <p v-if="cover===null" class="pointer-none text-gray-500 "><span class="text-sm"></span> 拖拽文件至此处
                  <br/> 或点击此处上传</p>
              </div>
              <input type="file" @change="onCoverFileChange" id="CoverUpLoad" class="absolute -left-10 -top-10"
                     accept="image/jpeg, image/png, image/gif, image/webp">
            </label>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2 mb-1">
          <span>此项为必填项</span>
        </p>
        <p class="text-sm text-gray-300 mb-1">
          <span>支持格式：webg,jpg,jpeg,png</span>
        </p>
      </div>
      <div>
        <div class="text-2xl text-white mb-2">
          <p class="">歌单介绍</p>
        </div>
        <div class="inputForm bg-zinc-900">
          <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
                d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
                ></path>
          </svg>
          <input type="text" class="input bg-zinc-900" placeholder="请为你的歌单写一点介绍" v-model="introduction">
        </div>
      </div>
      <div class="text-2xl text-white my-2">
        <p class="">标签</p>
      </div>
      主题
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="默认" value="默认" v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="背景音乐" value="背景音乐"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="经典老歌" value="经典老歌"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="KTV金曲" value="KTV金曲"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="游戏配乐" value="游戏配乐"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="电影配乐" value="电影配乐"
               v-model="theme"/>
      </div>
      场景
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="默认" value="默认" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="咖啡馆" value="咖啡馆"
               v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="运动" value="运动" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="睡前" value="睡前" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="旅行" value="旅行" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="派对" value="派对" v-model="scene"/>
      </div>
      心情
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="默认" value="默认" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="伤感" value="伤感" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="安静" value="安静" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="思念" value="思念" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="宣泄" value="宣泄" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="开心" value="开心" v-model="mood"/>
      </div>
      风格
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="默认" value="默认" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="摇滚" value="摇滚" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="民谣" value="民谣" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="轻音乐" value="轻音乐"
               v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="电音" value="电音" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="流行" value="流行" v-model="style"/>
      </div>
      语言
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="默认" value="默认"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="英语" value="英语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="日语" value="日语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="粤语" value="粤语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="国语" value="国语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="韩语" value="韩语"
               v-model="language"/>
      </div>
      <div>
        <button @click="sendPostCreateSonglist" class="mt-8 w-full flex justify-center bg-blue-600 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-800 shadow-lg cursor-pointer transition ease-in duration-300">
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
  left: 0;
  top: 0;
  opacity: 95%;
}

</style>