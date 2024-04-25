<script setup>
import {computed, ref} from "vue";
import Image_Scrool from "@/views/SongList_Scrool.vue";
import UploadSong from "@/views/UploadSong.vue";
const NaviMode = ref('1');
const upload= ref('0');
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const containerClass_Upload = computed(() => ({
  'antialiased text-sm box h-10 my-1 text-white leading-10 transition duration-400 hover:bg-gray-600/40 px-4 ml-2 mr-2 rounded-md': upload.value !== '1',
  'antialiased text-sm box h-10 my-1 text-white leading-10 transition duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': upload.value === '1',
}));
const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}
const uploadSong=(newOne)=>{
  if(upload.value==='1'){
    upload.value='0';
    return;
  }
  upload.value = newOne.toString();
}
const uploadSongSuccess=()=>{
  upload.value='0';
}
const songName = ref('');
</script>

<template>
  <div class="w-full h-14 pl-6">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">我的创作</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">创意空间</div>
    <Search></Search>
  </div>
    <div class="grid-col">
      <div class="text-2xl mx-4 text-white font-serif font-bold my-4">我的上传</div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
          <tr>
            <th class="text-center text-sm font-semibold">音乐标题</th>
            <th class="text-center text-sm font-semibold">歌手</th>
            <th class="text-center text-sm font-semibold">标签</th>
            <th class="text-center text-sm font-semibold">喜欢人数</th>
            <th></th>
          </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  <hr class="m-5 border-gray-500">
  <div class="w-5px">
    <div
        :class="containerClass_Upload" @click="uploadSong(1)">
      <svg t="1713774287902" class="icon inline fill-white transition duration-400 my-auto" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="2452" width="20" height="20"><path d="M509 736q-15 0-24-9t-9-24V209l1-80-111 123-85 84q-9 10-23.5 10t-23.5-9.5q-9-9.5-9-23t10-24.5L484 39q11-11 25.5-11T534 39l249 250q11 11 11 24.5t-9.5 23Q775 346 761 346t-23-9l-86-85-110-125 1 82v494q0 15-9.5 24t-24.5 9z" fill="#ffffff" p-id="2453">
      </path>
      </svg>
      <span v-if="upload==='0'" class="font-medium">新的上传</span>
      <span v-if="upload==='1'" class="font-medium">取消上传</span>
    </div>

  </div>
  <div v-if="upload==='1'" class="w-full h-full">
    <UploadSong @uploadSongSuccess="uploadSongSuccess"></UploadSong>
  </div>

</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}
</style>