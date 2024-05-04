<script setup>
import {defineEmits, defineModel, onMounted, ref} from "vue"
import buttonchangesize from '../components/buttonchangesize.vue'
import axios from "axios";
import Buttonchangesize from "@/components/buttonchangesize.vue";

const SongList = ref([]);
const token = defineModel('token');
const emits = defineEmits(['changesize','DeleteSongListId']);
const SongListId = defineModel('SongListId');
const changesize = () => {
  emits('changesize');
}

const IsEditing = ref(false);


function gettime(time) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

const CoverFile=ref(null);

const GetSongListData = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songlists/info/' + SongListId.value)
      .then(response => {
        SongList.value = response.data.data;
        let length = SongList.value.songs.length;
        for (let i = 0; i < length; ++i) {
          SongList.value.songs[i].duration = gettime(SongList.value.songs[i].duration);
        }
        console.log(SongList.value);
      })
      .then(error => {
        console.log(error.response.data);
      })
}

const CoverUrl = ref('');

const activeShowEditSonglist = () => {
  IsEditing.value = true;
  CoverUrl.value = SongList.value.cover;
}

const SubmitData = () => {
  SongList.value.cover=CoverUrl.value;
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  const formData=new FormData();
  formData.append("cover",CoverFile.value);
  formData.append("title",SongList.value.title);
  formData.append("introduction",SongList.value.introduction);
  axios.defaults.withCredentials = true;
  instance.post('/songlists/update/'+SongListId.value,formData)
      .then(response=>{
        if(response.data.success===true){
          alert('更新成功');
          IsEditing.value=false;
        }
        else {
          alert('更新失败');
        }
      })
      .catch(error=>{
        console.log(error.response);
      })
}


const onCoverFileChange = (event) => {
  CoverFile.value = event.target.files[0];
  const files = event.target.files || event.dataTransfer.files;
  createImage(files[0]);
};

// 将图片转换为url形式
const createImage = (file) => {
  fileToBase64(file).then(function (base64) {
    CoverUrl.value = base64;// 输出文件的 base64 形式
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

const Cancel=()=>{
  IsEditing.value=false;
}

const deleteSonglist=()=>{
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.delete('/songlists/delete/'+SongListId.value)
      .then(response=>{
        console.log(response.data);
        if(response.data.success===true){
          emits('DeleteSongListId');
          changesize();
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

const DeleteSongFromSongList=(index)=>{
  const SongId=SongList.value.songs[index].id;
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData=new FormData();
  formData.append('song_id',SongId);
  formData.append('songlist_id',SongListId.value);
  instance.post('/songlists/delsong',formData)
      .then(response=>{
        if(response.data.success===true){
          let length=SongList.value.songs.length;
          for(let i=0;i<length;++i){
            if(SongList.value.songs[i].id===SongId){
              SongList.value.songs.splice(i,1);
              break;
            }
          }
          alert("删除完成");
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

onMounted(GetSongListData);
</script>

<template>
  <div class="h-72 relative">
    <div class="bg-center bg-cover bg-blur w-full h-full absolute top-0 left-0"
         :style="{backgroundImage: 'url(' + SongList.cover + ')'}">
    </div>
    <div class="absolute top-0 w-full">
      <buttonchangesize class="top-0 absolute left-2" @fullsize="changesize" v-model:token="token"></buttonchangesize>
      <svg @click="deleteSonglist" v-if="!IsEditing"
           class="inline-block float-right h-8 w-8 cursor-pointer text-red-600 hover:text-red-800" width="24"
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
      <!--          修改歌单信息-->
      <svg @click="activeShowEditSonglist()" v-if="!IsEditing"
           class="m-1 inline-block float-right h-7 w-7 cursor-pointer text-blue-700 hover:text-blue-900" width="24"
           height="24"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </svg>
      <div class="inline-block px-10">
        <img :src="SongList.cover" class="img_songlist shadow-2xl" v-if="!IsEditing">
        <div>
          <!--            展示图片-->
          <div class="grid grid-cols-1 space-y-2" v-if="IsEditing">
            <div class="flex items-center justify-center w-full">
              <label
                  class="flex flex-col rounded-3xl border-4 border-dashed w-full h-52 group text-center transition ease-in duration-300"
                  for="CoverUpLoad">
                <div class="h-full content-center mx-auto">
                  <img :src="CoverUrl" class="img_songlist shadow-2xl" alt="图像">
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
        <div v-if="!IsEditing">
          <h1 class="mt-2 text-white font-extrabold text-3xl">{{ SongList.title }}</h1>
          <p class="mt-2 text-white">{{ SongList.owner }} · {{
              SongList.create_date
            }}</p>
        </div>
        <div class="flex-column text-md" v-if="IsEditing">
          <div class="text-white">歌曲名</div>
          <div class="inputForm bg-zinc-900">
            <svg class="icon fill-white transition" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                  d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
              ></path>
            </svg>
            <input type="text" class="input bg-zinc-900 text-white" placeholder="请输入歌单名"
                   v-model="SongList.title">
          </div>
        </div>
        <div>
          <details class="text-white text-sm" v-if="!IsEditing">
            <summary class="mt-3 text-white font-bold">介绍</summary>
            <div class="mt-3 absolute">
              {{ SongList.introduction }}
            </div>
          </details>
          <div class="flex-column text-md" v-if="IsEditing">
            <div class="text-white">介绍</div>
            <div class="inputForm bg-zinc-900">
              <svg class="icon fill-white transition" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
                ></path>
              </svg>
              <input type="text" class="input bg-zinc-900 text-white" placeholder="请输入介绍"
                     v-model="SongList.introduction">
            </div>
          </div>
        </div>
        <div class="bg-blue-600 btn w-20 tracking-widest border-none hover:bg-blue-800 mr-8 my-4 text-white" @click="Cancel" v-if="IsEditing">取 消</div>
        <div class="bg-blue-600 btn w-20 tracking-widest border-none hover:bg-blue-800 text-white" @click="SubmitData" v-if="IsEditing">完成</div>
      </div>
    </div>
  </div>


  <div class="mt-6">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">歌手</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold">时长</th>
        <th class="text-left text-sm font-semibold">操作</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white rounded-md"
          v-for="(item, index) in SongList.songs" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.cover"
                     alt="Avatar Tailwind CSS Component"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.title }}</div>
              <!--              <div class="text-sm opacity-50">United States</div>-->
            </div>
          </div>
        </td>
        <td>
          {{ item.singer }}
        </td>
        <td>{{ item.uploader }}</td>
        <td>{{ item.duration }}</td>
        <td>
          <div class="inline pr-4">
            <svg class="icon fill-red-600 inline hover:fill-red-800"  @click="DeleteSongFromSongList(index)" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24">
              <path
                  d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
              ></path>
              <path
                  d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
              ></path>
              <path
                  d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
              ></path>
              <path
                  d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
              ></path>
            </svg>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="h-32"></div>
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

.menu {
  position: relative;
  display: inline-block;
}

.menu_item {
  display: none;
  position: absolute;
  min-width: 160px;
  border-radius: 8px;
}

.menu:hover .menu_item {
  display: block;
}

.bg-blur {
  position: relative;
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