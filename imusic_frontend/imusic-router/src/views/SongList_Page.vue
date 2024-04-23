<script setup>
import {defineEmits, defineModel} from "vue"
import buttonchangesize from './buttonchangesize.vue'

const songlistlast = defineModel('songlist');

const emits = defineEmits(['handlePlayNow', 'handlePlayAfter', 'changesize','ChangeSongList']);

function handlePlayNow(index) {
  //console.log(songlistlast.value[index].id);
  emits('handlePlayNow', songlistlast.value.songs[index].id)
}

function handlePlayAfter(index) {
  //console.log(songlistlast.value[index].id);
  emits('handlePlayAfter', songlistlast.value.songs[index].id)
}

const changesize = () => {
  emits('changesize');
}

const ChangeSongList =()=>{
  emits('ChangeSongList',songlistlast.value.id);
}

</script>

<template>
  <div class="bgx bg-cover bg-center h-2/5 relative z-40">
    <div class="bg-blur w-full h-full absolute top-0 left-0"
         :style="{backgroundImage: `url(${songlistlast.cover})`}"></div>
    <buttonchangesize class="absolute top-5 left-5" @fullsize="changesize"></buttonchangesize>
    <img class="absolute top-10 left-24 w-60 aspect-square rounded-2xl" :src="songlistlast.cover">
    <div class="absolute top-10 left-96">
      <div class="text-4xl text-white my-8">
        {{ songlistlast.title }}
      </div>
      <div class="text-2xl text-white font-base">{{ songlistlast.owner }} 创建于 {{ songlistlast.create_date }}</div>
      <div>{{ songlistlast.introduction }}</div>
      <div class="btn btn-xl my-8 bg-blue-600 border-none rounded-2xl hover:bg-blue-800 text-white fill-white" @click="ChangeSongList">播放全部
        <svg t="1713860064756" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="3125" width="25" height="25">
          <path
              d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z"
              p-id="3126"></path>
        </svg>
      </div>
    </div>
  </div>


  <div class="mt-6 overflow-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">歌手</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold"></th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in songlistlast.songs" :key="index">
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
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {{ item.singer }}
        </td>
        <td>{{ item.uploader }}</td>
        <th>
          <div
              class="dropdown dropdown-left dropdown-end my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm border-none"
              data-tip="播放列表">
            <svg t="1713774064278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2300" width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white" p-id="2301"></path>
            </svg>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm"
                style="width:300px">
              <li>
                <div class="z-50">
                  <img :src="item.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                  <a class="font-semibold text-sm">{{ item.title }}</a>
                  <br>
                  <a class="block text-gray-600 text-xs mr-0">{{ item.singer }}</a>
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="handlePlayNow(index);">
                  <svg t="1713852360106" class="icon ml-1" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="2272" width="16" height="16">
                    <path
                        d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
                        fill="white" p-id="2273"></path>

                  </svg>
                  立即播放
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="handlePlayAfter(index)">
                  <svg t="1713852558165" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="3445" width="22" height="22">
                    <path
                        d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
                        fill="white" p-id="3446"></path>
                  </svg>
                  添加到播放列表
                </div>
              </li>
            </ul>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="h-32"></div>
</template>

<style scoped>
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

.content {
  font-size: 50px;
  color: #555;
  font-weight: bold;
}

.font-content {
  position: absolute;
  width: 700px;
  height: 700px;
  margin: 20px;
  text-align: center;
  line-height: 700px;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>