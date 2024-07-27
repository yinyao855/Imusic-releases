<!--编辑歌曲的组件-->
<script setup>
import {
  EditLyricList,
  EditSongDetail,
  EditSongVisible,
  GetEditSongDetail,
  SongId
} from '@/js/SongDetail.js'
import { onMounted, ref, watch } from 'vue'
import { HandlePlayNow, MusicPlayerVisible } from '@/js/MusicPlayer.js'
import UploadImage from '@/components/UploadImage.vue'


const Lyrics = ref(EditLyricList.value)


//展示的图片
const ShowImage=ref('');
//歌曲名
const title=ref('');
//歌手名
const singer=ref('');
//歌曲介绍
const introduction=ref('');




const AvatarFile = ref(null)

//是否有修改
const HasEdited = ref(false)

//监听歌曲是否有修改
watch(() => title.value, () => {
  HasEdited.value=ShowImage.value!==EditSongDetail.value.cover||title.value!==EditSongDetail.value.title||singer.value!==EditSongDetail.value.singer||introduction.value!==EditSongDetail.value.introduction
})
watch(() => singer.value, () => {
  HasEdited.value=ShowImage.value!==EditSongDetail.value.cover||title.value!==EditSongDetail.value.title||singer.value!==EditSongDetail.value.singer||introduction.value!==EditSongDetail.value.introduction
})
watch(() => introduction.value, () => {
  HasEdited.value=ShowImage.value!==EditSongDetail.value.cover||title.value!==EditSongDetail.value.title||singer.value!==EditSongDetail.value.singer||introduction.value!==EditSongDetail.value.introduction
})
watch(() => ShowImage.value, () => {
  HasEdited.value = ShowImage.value !== EditSongDetail.value.cover || title.value !== EditSongDetail.value.title || singer.value !== EditSongDetail.value.singer || introduction.value !== EditSongDetail.value.introduction
})


//初始赋值
watch(() => EditSongDetail.value, () => {
  title.value=EditSongDetail.value.title;
  singer.value=EditSongDetail.value.singer;
  introduction.value=EditSongDetail.value.introduction;
  ShowImage.value=EditSongDetail.value.cover;
})

//歌词初始赋值
watch(() => EditLyricList.value, () => {
  Lyrics.value = EditLyricList.value
})

onMounted(GetEditSongDetail)
</script>

<template>
  <div class="h-full w-full overflow-auto flex flex-row z-50 bg-[#FAF7F5]">
    <div class="block w-2/5">
      <div class="btn btn-sm mt-2" @click="EditSongVisible=false">
        <img src="../../icons/Return_Icon.svg" alt="返回">
      </div>
      <div class="mt-4">
        <UploadImage v-model:ShowImage="ShowImage" v-model:AvatarFile="AvatarFile"
                     class="w-72 ml-12 my-2"></UploadImage>
        <div class="ml-12 flex flex-wrap my-1">
          <div class="text-base text-gray-60 w-full my-1">歌曲名:
            <input v-model="title" class="w-3/4 p-2 border-2 rounded-lg" placeholder="歌曲名">
          </div>
          <div class="text-base text-gray-60 w-full my-1">歌手名:
            <input v-model="singer" class="w-3/4 p-2 border-2 rounded-lg" placeholder="歌手名">
          </div>
          <div class="w-[90%] my-1">
            <div class="flex flex-col">
              <div class="">歌曲介绍:</div>
              <div class="flex">
              <textarea v-model="introduction" class="w-full h-32 p-2 border-2 rounded-lg"
                        placeholder="歌曲介绍"></textarea>
              </div>
            </div>
          </div>
          <div class="w-full flex my-2">
            <div
              class="bg-blue-500 hover:bg-blue-600 transition-colors ease-in duration-300 h-10 rounded-full w-32 flex mr-4"
              @click="HandlePlayNow(SongId)">
              <div class="m-auto text-white flex">
                <img src="../../icons/Play_White_Icon.svg" alt="播放" class="h-6 inline my-auto mr-2">
                播放
                <div class="w-1 h-full"></div>
              </div>
            </div>
            <div
              class="bg-green-500 hover:bg-green-600 transition-colors ease-in duration-300 h-10 rounded-full w-32 flex mr-4"
              v-if="HasEdited"
            >
              <div class="m-auto text-white flex">
                保存
              </div>
            </div>
            <div
              class="bg-gray-500 hover:bg-gray-600 transition-colors ease-in duration-300 h-10 rounded-full w-32 flex mr-4"
              v-if="HasEdited"
            >
              <div class="m-auto text-white flex">
                取消修改
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-32 w-full" v-if="MusicPlayerVisible"></div>
    </div>
    <div class="block w-3/5 h-full overflow-auto border-l-2">
      <div class="w-full flex">
        <span class="mx-auto text-2xl my-2">歌词</span>
      </div>
      <div class="w-full flex" v-for="(Content,index) in Lyrics" :key="index">
        <span class="mx-auto">{{ Content.content }}</span>
      </div>
      <div class="h-32 w-full" v-if="MusicPlayerVisible"></div>
    </div>

  </div>
</template>

<style scoped>

</style>