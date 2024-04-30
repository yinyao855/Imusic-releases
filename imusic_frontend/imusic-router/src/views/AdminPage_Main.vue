<script setup>
import Search from "@/components/Search.vue";
import Admin_SongList_View from "@/views/Admin_SongList_View.vue";
import {computed, ref} from "vue";
import axios from "axios";
import Admin_Song_View from "@/views/Admin_Song_View.vue";
import Search_View from "@/views/Search_View.vue";
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const Songs=ref([]);
const NaviMode=ref('1');
const changeNaviMode=(NewMode)=>{
  NaviMode.value=NewMode.toString();
  if(NewMode===1){
    Get_Admin_SongList_Data();
  }
  if(NewMode===2)
  {
    Get_Admin_Songs_Data();
  }
}


function gettime(time) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

const SongLists=ref([]);
const Get_Admin_SongList_Data=()=>{
  console.log("refresh");
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songlists/alldata')
      .then(response=>{
        SongLists.value=response.data.data;
      })
      .then(error=>{
        console.log(error.response.data);
      })
}

const ShowSearchView=ref(false);

const Get_Admin_Songs_Data=()=>{
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songs/alldata')
      .then(response=>{
        Songs.value=response.data.data;
        let length=Songs.value.length;
        for(let i=0;i<length;++i){
          Songs.value[i].duration=gettime(Songs.value[i].duration);
        }
      })
      .then(error=>{
        console.log(error.response.data);
      })
}


const token=defineModel('token');
const SearchContent=defineModel('SearchContent');
// onMounted(Get_Admin_SongList_Data);
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSearchView&&!ShowCurrentUser_SongList">

    </div>
  </transition>

  <div class="w-full h-16 pl-6 fixed bg-zinc-900 z-50" v-if="!ShowSearchView">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1);" style="line-height: 56px">歌 单</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2);" style="line-height: 56px">
      歌 曲
    </div>
    <Search v-model:SearchContent="SearchContent" @SearchOperation="SearchOperation" v-model:token="token"></Search>
  </div>
  <div class="w-full mt-16" v-if="!ShowSearchView">
    <Admin_SongList_View v-if="NaviMode==='1'" v-model:token="token" v-model:SongLists="SongLists" @refresh="Get_Admin_SongList_Data"></Admin_SongList_View>
    <Admin_Song_View v-if="NaviMode==='2'" v-model:token="token" v-model:Songs="Songs" @refresh="Get_Admin_Songs_Data"></Admin_Song_View>
  </div>
</template>

<style scoped>

</style>