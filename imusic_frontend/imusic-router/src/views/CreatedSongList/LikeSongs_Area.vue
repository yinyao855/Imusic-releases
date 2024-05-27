<script setup>
import {defineEmits, defineModel, onMounted, ref} from "vue"
import buttonchangesize from '../../components/ButtonChangeSizeForLikeArea.vue'
import CreateSongList from "@/views/CreatedSongList/CreateSongList.vue";
import axios from "axios";
import SongPage from "@/components/SongPage.vue";
import CreatedSonglist from "@/views/CreatedSongList/CreatedSonglist.vue";
import SharePage from "@/components/SharePage.vue";

const LikeSongs = ref([]);
const token = defineModel('token')
const HasLogin = defineModel('HasLogin')
const emits = defineEmits(['handlePlayNow', 'handlePlayAfter', 'changesize', 'PlayLikeSongs']);
const LikeSongsCover = defineModel('LikeSongsCover');
const SongId = ref(0);
const NeedShowSongDetail = ref(false);
const shareType = ref("likesongs")

function handlePlayNow(id) {
  emits('handlePlayNow', id)
}

function handlePlayAfter(id) {
  emits('handlePlayAfter', id)
}

const changesize = () => {
  emits('changesize');
}

const username = defineModel('username');

const deletelike = (index) => {
  if(!confirm("确定删除？")) {
    return
  }
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('song_id', LikeSongs.value[index].id);
  LikeSongs.value.splice(index, 1);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/like/songs/delete', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}


const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}


const ShowSongDetail = (index) => {
  SongId.value = LikeSongs.value[index].id;
  NeedShowSongDetail.value = true;
}


const GetUserLike = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/like/songs', {
    params: {
      'username': username.value
    }
  })
      .then(response => {
        LikeSongs.value = response.data.data;
        let length = LikeSongs.value.length;
        for (let i = 0; i < length; ++i) {
          LikeSongs.value[i].duration = gettime(LikeSongs.value[i].duration)
        }
        console.log(LikeSongs.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const CloseSongPage = () => {
  GetUserLike();
  NeedShowSongDetail.value = false;
}

const PlayLikeSongs = () => {
  emits('PlayLikeSongs');
}

const ShowSharePage = ref(false);
const ActiveShowSharePage = () => {
  ShowSharePage.value = true;
}

const CloseShowSharePage = () => {
  ShowSharePage.value = false;
}


onMounted(GetUserLike)
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="NeedShowSongDetail&&!ShowSharePage">
      <SongPage v-model:currentSongId="SongId"
                @handlePlayNow="handlePlayNow" @CloseSong="CloseSongPage"
                v-model:username="username" v-model:token="token" v-model:HasLogin="HasLogin"></SongPage>
    </div>
  </transition>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSharePage">
      <SharePage v-model:shareType="shareType" @closeSharePage="CloseShowSharePage"
          v-model:token="token" v-model:username="username"></SharePage>
    </div>
  </transition>

  <div class="bgx bg-cover bg-center h-2/5 relative" v-if="!NeedShowSongDetail&&!ShowSharePage">
    <div class="bg-blur w-full h-full absolute top-0 left-0"
         :style="{backgroundImage: `url(${LikeSongsCover})`}"></div>
    <buttonchangesize class="absolute top-5 left-5" @fullsize="changesize" v-model:token="token"></buttonchangesize>
    <img class="absolute top-10 left-24 w-60 aspect-square rounded-2xl" :src="LikeSongsCover" alt="歌单封面">
    <div class="absolute top-4 left-96">
      <div class="text-4xl text-white mt-8 mb-4">
        我喜欢的歌曲
      </div>
      <div class="btn btn-xl my-8 bg-blue-600 border-none rounded-2xl hover:bg-blue-800 text-white fill-white mr-4"
           @click="PlayLikeSongs">播放全部
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="25" height="25">
          <path
              d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z"
          ></path>
        </svg>
      </div>
      <div class="btn btn-xl my-8 bg-green-600 border-none rounded-2xl hover:bg-green-800 text-white fill-white"
           @click="ActiveShowSharePage">分享为歌单
        <svg class="icon fill-white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="22" height="22">
          <path
              d="M768.73106 703.537712c-35.606921 0-67.945574 14.793214-91.167479 38.359147l-309.109357-171.670082c9.116748-17.545439 14.621199-37.155048 14.621199-58.312783 0-12.55703-2.408198-24.426004-5.676466-35.950949l304.63699-189.215522c22.705863 20.469679 52.464304 33.198723 85.146985 33.198723 70.525785 0 127.978498-57.452713 127.978498-127.978498S837.708718 63.989249 767.182933 63.989249s-127.978498 57.452713-127.978498 127.978498c0 14.621199 2.92424 28.382328 7.396607 41.455401L344.716278 420.746514c-23.049891-22.705863-54.700487-36.983034-89.791366-36.983034-70.525785 0-127.978498 57.452713-127.978498 127.978498s57.452713 127.978498 127.978498 127.978498c25.630102 0 49.540064-7.740635 69.493701-20.813707l321.150344 178.378633c-3.096254 11.008903-5.160423 22.18982-5.160423 34.058794 0 70.525785 57.452713 127.978498 127.978498 127.978498s127.978498-57.452713 127.978498-127.978498S839.256845 703.537712 768.73106 703.537712zM767.182933 127.978498c35.262893 0 63.989249 28.726356 63.989249 63.989249s-28.726356 63.989249-63.989249 63.989249-63.989249-28.726356-63.989249-63.989249S731.92004 127.978498 767.182933 127.978498zM191.107677 511.913993c0-35.262893 28.726356-63.989249 63.989249-63.989249s63.989249 28.726356 63.989249 63.989249-28.726356 63.989249-63.989249 63.989249S191.107677 547.176886 191.107677 511.913993zM768.73106 895.505459c-35.262893 0-63.989249-28.726356-63.989249-63.989249s28.726356-63.989249 63.989249-63.989249 63.989249 28.726356 63.989249 63.989249C832.720309 866.951117 803.993953 895.505459 768.73106 895.505459z"
          ></path>
        </svg>
      </div>
    </div>

  </div>

  <div class="mt-6" v-if="!NeedShowSongDetail&&!ShowSharePage">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">歌手</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold">时长</th>
        <th class="text-left text-sm font-semibold"></th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in LikeSongs" :key="index">
        <td @click="handlePlayNow(item.id);">
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
        <td @click="handlePlayNow(item.id);">
          {{ item.singer }}
        </td>
        <td @click="handlePlayNow(item.id);">{{ item.uploader }}</td>
        <td @click="handlePlayNow(item.id);">{{ item.duration }}</td>
        <th>
          <div
              class="dropdown dropdown-left dropdown-end my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm border-none"
              data-tip="播放列表">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white"></path>
            </svg>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm"
                style="width:300px">
              <li>
                <div>
                  <img :src="item.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                  <a class="font-semibold text-sm">{{ item.title }}</a>
                  <br>
                  <a class="block text-gray-600 text-xs mr-0">{{ item.singer }}</a>
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="handlePlayNow(item.id);">
                  <svg class="icon ml-1" viewBox="0 0 1024 1024"
                       xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path
                        d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
                        fill="white"></path>

                  </svg>
                  立即播放
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="handlePlayAfter(item.id)">
                  <svg class="icon" viewBox="0 0 1024 1024"
                       xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path
                        d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
                        fill="white"></path>
                  </svg>
                  添加到播放列表
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="ShowSongDetail(index)">
                  <svg class="icon fill-white" viewBox="0 0 1024 1024"
                       xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path
                        d="M501.5 109.38a403.52 403.52 0 0 1 285.32 688.84 403.52 403.52 0 0 1-570.66-570.66 400.94 400.94 0 0 1 285.34-118.18m0-64C243.3 45.38 34 254.7 34 512.88S243.3 980.4 501.5 980.4 969 771.08 969 512.88 759.68 45.38 501.5 45.38z"
                    ></path>
                    <path
                        d="M501.5 291.16a7.64 7.64 0 1 1-7.64 7.64 7.64 7.64 0 0 1 7.64-7.64m0-64a71.64 71.64 0 1 0 71.62 71.64 71.64 71.64 0 0 0-71.62-71.64zM501.5 418.18a59.38 59.38 0 0 0-59.38 59.38V768a59.36 59.36 0 0 0 59.38 59.36A59.36 59.36 0 0 0 560.86 768V477.56a59.36 59.36 0 0 0-59.36-59.38z"
                    ></path>
                  </svg>
                  详细信息
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="deletelike(index)">
                  <svg class="icon fill-white" viewBox="0 0 1024 1024"
                       xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path
                        d="M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z"
                    ></path>
                    <path
                        d="M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z"
                    ></path>
                  </svg>
                  删除歌曲
                </div>
              </li>
            </ul>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="h-32" v-if="!NeedShowSongDetail&&!ShowUpdate"></div>

</template>

<style scoped>
.bg-blur {
  float: left;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(19px);
  -ms-filter: blur(19px);
  filter: blur(19px);
}


.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.transition-container {
  right: 0;
  top: 0;
  height: 100%
}


.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}
</style>