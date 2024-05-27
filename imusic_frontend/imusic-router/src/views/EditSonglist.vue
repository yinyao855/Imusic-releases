<script setup>
// 修改歌单信息界面
import {defineModel, ref} from "vue";
import axios from "axios";
import MyAlert from "@/js/MyAlert.js";

// global variables
const token = defineModel('token')
const username = defineModel('username')

// defineEmits(将歌曲从当前歌单删除)
const emits = defineEmits(['deleteFromSongList', 'CloseEditSongList'])

const currentUserSongList = defineModel('currentUserSongList')

// v-model
const cover = defineModel('cover')
const coverImageFileUrl = defineModel('coverImageFileUrl')

const showSonglistSongs = ref(true);

// emits
const deleteFromSongList = (index) => {
  emits('deleteFromSongList', index);
  showSonglistSongs.value = false;
  currentUserSongList.value.songs.splice(index, 1);
  showSonglistSongs.value = true;
}
const CloseEditSongList = () => {
  emits('CloseEditSongList');
}

// global function: 获取歌曲时长
const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

// 处理歌单图片，若修改了图片，可以直接展示新选择的图片即使还没完成修改
const onCoverFileChange = (event) => {
  cover.value = event.target.files[0];
  const files = event.target.files || event.dataTransfer.files;
  createImage(files[0]);
};

// 将图片转换为url形式
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

// 修改该歌单
function sendEditSonglist(id) {
  const formData = new FormData();
  formData.append('title', currentUserSongList.value.title);
  formData.append('cover', cover.value);
  formData.append('introduction', currentUserSongList.value.introduction);
  formData.append('owner', currentUserSongList.value.owner);
  formData.append('tag_theme', currentUserSongList.value.tag_theme);
  formData.append('tag_scene', currentUserSongList.value.tag_scene);
  formData.append('tag_mood', currentUserSongList.value.tag_mood);
  formData.append('tag_style', currentUserSongList.value.tag_style);
  formData.append('tag_language', currentUserSongList.value.tag_language);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/songlists/update/' + id, formData)
      .then(function (response) {
        if (response.data.success === true) {
          MyAlert({type: 'alert-info', text: '修改成功'})
          CloseEditSongList();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

</script>

<template>
  <!--  修改歌单界面-->
  <div>
    <div class="h-72 relative">
      <div class="bg-center bg-cover bg-blur w-full h-full absolute top-0 left-0"
           :style="{backgroundImage: 'url(' + coverImageFileUrl + ')'}">
      </div>
      <div class="p-5 absolute w-full">
        <!--        点击后即保存修改后的信息-->
        <button @click="sendEditSonglist(currentUserSongList.id)" class="btn bg-blue-500 text-white border-blue-500 hover:bg-blue-700 m-1 inline-block float-right ">完成
        </button>
        <button @click="CloseEditSongList" class="btn bg-white m-1 inline-block float-right ">取消
        </button>
        <div class="inline-block">
          <div>
            <!--            展示图片-->
            <div class="grid grid-cols-1 space-y-2">
              <div class="flex items-center justify-center w-full">
                <label
                    class="flex flex-col rounded-3xl border-4 border-dashed w-full h-52 group text-center transition ease-in duration-300"
                    for="CoverUpLoad">
                  <div class="h-full content-center mx-auto">
                    <img :src="coverImageFileUrl" class="img_songlist shadow-2xl" alt="图像">
                  </div>
                  <div class="absolute m-16">
                    <svg class="icon fill-gray-300 transition hover:fill-gray-400" viewBox="0 0 1194 1024"
                         xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                      <path
                          d="M152.62673094 991.65443843a51.27435943 51.27435943 0 0 1-52.15426311-48.79463341l102.38873717-552.73919819v-1.5198328c0-27.67695563 23.35743091-50.15448278 52.23425434-50.15448278h843.90717007c28.31688465 0 51.51433311 21.75760687 52.3942369 48.79463253l-102.38873725 552.73919807v1.5198328a51.27435943 51.27435943 0 0 1-52.31424564 50.15448382H152.62673094z m636.80995128-262.85108717c13.27853904 0 26.47708777-15.91824934 30.95659499-31.83649784 0-15.91824934-4.47950719-37.11591754-13.27854002-47.67475592L657.05124401 447.87425375c-17.59806379-21.19766814-44.15514285-21.19766814-61.75320652 0L445.23454444 649.2920975C431.95600436 659.85093594 431.95600436 681.04860501 431.95600436 696.96685342c0 15.91824934 13.27853904 31.83649781 30.87660374 31.83649784h105.98834157v132.46542936c0 21.19766814 13.1985478 37.11591754 30.87660377 37.11591755h61.75320656c17.67805497 0 30.87660377-15.91824934 30.87660375-37.11591755V728.80335124H789.51667344zM202.94119625 271.81362032c-37.83583785 0-68.71244156 28.95681469-68.79243277 64.47290816L32.95989401 868.70796219V97.03284595C33.03988525 61.59674467 60.63684963 32.79991158 94.79309279 32.79991158H403.95908469l92.70980156 96.46938842h463.46901844c34.15624311 0 61.83319876 28.79683219 61.83319876 64.31292572V271.97360282H202.94119625z"
                          fill="">
                      </path>
                    </svg>
                  </div>
                  <input type="file" @change="onCoverFileChange" id="CoverUpLoad" class="absolute opacity-0"
                         accept="image/jpeg, image/png, image/gif, image/webp">
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="inline-block ml-7 align-top">
          <div class="flex-column text-md">
            <div class="text-white">*歌曲名</div>
          </div>
          <div class="inputForm bg-zinc-900">
            <svg t="1713779846725" class="icon fill-white transition" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="5635" width="24" height="24">
              <path
                  d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
                  p-id="5636"></path>
            </svg>
            <input type="text" class="input bg-zinc-900 text-white" placeholder="请输入歌单名"
                   v-model="currentUserSongList.title">
          </div>
          <div class="flex-column text-md">
            <div class="text-white">介绍</div>
          </div>
          <div class="inputForm bg-zinc-900">
            <svg t="1713789997854" class="icon fill-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 p-id="9038" width="24" height="24">
              <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="white" p-id="9039"></path>
              <path
                  d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z"
                  fill="white" p-id="9040"></path>
            </svg>
            <input type="text" class="input bg-zinc-900 text-white" placeholder="请为你的歌曲写一点介绍"
                   v-model="currentUserSongList.introduction">
          </div>
          <!--          标签-->
          <div class="inline-block mt-5">
            <select v-model="currentUserSongList.tag_theme"
                    class="text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-blue-200 text-blue-700 rounded-full">
              <option :value="null">-- 主题 --</option>
              <option>背景音乐</option>
              <option>经典老歌</option>
              <option>KTV金曲</option>
              <option>游戏配乐</option>
              <option>电影配乐</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="currentUserSongList.tag_scene"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-green-200 text-green-700 rounded-full">
              <option :value="null">-- 场景 --</option>
              <option>咖啡馆</option>
              <option>运动</option>
              <option>睡前</option>
              <option>旅行</option>
              <option>派对</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="currentUserSongList.tag_mood"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-red-200 text-red-700 rounded-full">
              <option :value="null">-- 心情 --</option>
              <option>伤感</option>
              <option>安静</option>
              <option>思念</option>
              <option>宣泄</option>
              <option>开心</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="currentUserSongList.tag_style"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-orange-200 text-orange-700 rounded-full">
              <option :value="null">-- 风格 --</option>
              <option>摇滚</option>
              <option>民谣</option>
              <option>轻音乐</option>
              <option>电音</option>
              <option>流行</option>
            </select>
          </div>
          <div class="inline-block">
            <select v-model="currentUserSongList.tag_language"
                    class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-0 py-1 bg-purple-200 text-purple-700 rounded-full">
              <option :value="null">-- 语言 --</option>
              <option>英语</option>
              <option>日语</option>
              <option>粤语</option>
              <option>国语</option>
              <option>韩语</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--    批量进行将歌单中的歌曲删除的操作-->
    <div class="mt-3 overflow-auto">
      <hr class="mx-5 border-gray-500">
      <div class="mt-3 m-5">
        <table class="w-full mb-32">
          <thead class="">
          <tr class="h-10 text-white">
            <th class="text-left p-3 text-sm font-semibold">歌名</th>
            <th class="text-center text-sm font-semibold">演唱者</th>
            <th class="text-center text-sm font-semibold">时长</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(song, index) in currentUserSongList.songs" v-if="showSonglistSongs"
              class="text-white transition duration-400 hover:bg-gray-600/40">
            <td class="pl-3 p-1 hover:cursor-pointer">
              <img :src="song.cover" class="img_song inline-block mr-3">
              <p class="inline-block">{{ song.title }}</p>
            </td>
            <td class="text-center">{{ song.singer }}</td>
            <td class="text-center">{{ gettime(song.duration) }}</td>
            <td>
              <div class="">
                <div @click="deleteFromSongList(index)"
                     class="hover:cursor-pointer">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-red-500 hover:text-red-800 inline-block align-sub" width="24"
                         height="24"
                         viewBox="0 0 24 24" stroke-width="2"
                         stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <line x1="4" y1="7" x2="20" y2="7"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                    </svg>
                  </p>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg_img {
  margin: 0;
  height: 330px;
  background-size: cover;
  filter: blur(30px);
  float: left;
  width: 100%;
}

.img_songlist {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}

.img_song {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.bg-blur {
  float: left;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(19px);
  -moz-filter: blur(19px);
  -o-filter: blur(19px);
  -ms-filter: blur(19px);
  filter: blur(19px);

}
</style>