<script setup>
import { defineModel,defineEmits } from "vue"

const songlistlast=defineModel('songlistlast');
const emits=defineEmits(['handlePlayNow','handlePlayAfter']);

function handlePlayNow(index){
  //console.log(songlistlast.value[index].id);
  emits('handlePlayNow',songlistlast.value[index].id)
}

function handlePlayAfter(index){
  //console.log(songlistlast.value[index].id);
  emits('handlePlayAfter',songlistlast.value[index].id)
}

</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
<!--        <th class="text-center text-sm font-semibold">封面</th>-->
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">歌手</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold"></th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md" v-for="(item, index) in songlistlast" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.cover"
                     alt="Avatar Tailwind CSS Component"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{item.title}}</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {{item.singer}}
        </td>
        <td>{{ item.uploader }}</td>
        <th>
          <div class="dropdown dropdown-left dropdown-end my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm" data-tip="播放列表">
            <svg t="1713774064278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2300" width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white" p-id="2301"></path>
            </svg>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm" style="width:300px">
              <li>
                <div>
                  <img :src="item.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                  <a class="font-semibold text-sm">{{ item.title }}</a>
                  <br>
                  <a class="block text-gray-600 text-xs mr-0">{{ item.singer }}</a>
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold text-right" @click="handlePlayNow(index);">
                  立即播放
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold text-right" @click="handlePlayAfter(index)">
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
</template>

<style scoped>

</style>