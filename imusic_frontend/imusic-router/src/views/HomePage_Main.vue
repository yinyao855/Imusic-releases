<script setup>
import {computed, ref, defineModel, defineEmits} from "vue";
import Search from "@/views/Search.vue";
import Image_Scrool from "@/views/SongList_Scrool.vue";
import SingerList_Scrool from "@/views/SingerList_Scrool.vue";
import Newest_Songs_Page from "@/views/Newest_Songs_Page.vue";
import SongList_Page from "@/views/SongList_Page.vue";
import axios from "axios";
import Search_View from "@/views/Search_View.vue";
import P from "particles.vue3";

const emits = defineEmits(['handlePlayNow', 'handlePlayAfter', 'ChangeSongList']);
const songlistlast = defineModel('songlistlast')

const NaviMode = ref('1');
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));

const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}

const songlists = defineModel('songlists');
const songlist = defineModel('songlist');
const index = defineModel('index');
const ShowSearchView = ref(false);
const songlistsearch = ref([]);


function handlePlayNow(id) {
  console.log(id);
  emits('handlePlayNow', id);
}


function handlePlayAfter(id) {
  emits('handlePlayAfter', id);
}

const SearchContent = ref('');

const SearchOperation = () => {
  console.log(SearchContent.value);
  axios.get('http://182.92.100.66:5000/songs/search', {
    params: {
      keyword: SearchContent.value
    }
  })
      .then(response => {
        console.log(response.data.data);
        ShowSearchView.value = true;
        songlistsearch.value = response.data.data;
        let length=songlistsearch.value.length;
        for(let i=0;i<length;++i){
          songlistsearch.value[i].duration=gettime(songlistsearch.value[i].duration)
        }
      })
      .catch(error => {
        console.log(error.data.message);
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

const needshowsonglistpage = defineModel('needshowsonglistpage');

const changesize = () => {
  needshowsonglistpage.value = false;
}

function ChangeSongList(id) {
  emits('ChangeSongList', id);
}

const ChangeSearchViewMode = () => {
  console.log('change');
  ShowSearchView.value = false;
}
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSearchView">
      <Search_View v-if="ShowSearchView" v-model:songlistlast="songlistsearch" @handlePlayNow="handlePlayNow"
                   @handlePlayAfter="handlePlayAfter" @changesize="ChangeSearchViewMode" class="w-full"></Search_View>
    </div>
  </transition>

  <transition name="slide" appear>
    <div class="transition-container z-50 ml-8" v-if="needshowsonglistpage&&!ShowSearchView">
      <SongList_Page class="w-screen mb-32" v-model:songlist="songlist"
                     @changesize="changesize" @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow"
                     @ChangeSongList="ChangeSongList"></SongList_Page>
    </div>
  </transition>
  <div class="w-full h-16 pl-6 fixed bg-zinc-900 z-50" v-if="!needshowsonglistpage&&!ShowSearchView">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">推 荐</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">最新上传</div>
    <Search v-model:SearchContent="SearchContent" @SearchOperation="SearchOperation"></Search>
  </div>
  <Newest_Songs_Page @handlePlayNow="handlePlayNow" @handlePlayAfter="handlePlayAfter"
                     v-model:songlistlast="songlistlast" v-if="NaviMode!=='1'&&!needshowsonglistpage&&!ShowSearchView"
                     class="text-2xl mb-32 mx-4 text-white font-serif font-bold mt-16 ml-8 z-50"></Newest_Songs_Page>
  <div class="text-2xl mx-4 text-white font-serif font-bold mt-16 ml-8"
       v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
    歌单
  </div>
  <Image_Scrool v-model:songlists="songlists" v-model:index="index"
                v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView"></Image_Scrool>
  <hr class="m-5 border-gray-500" v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
  <div class="text-2xl mx-4 text-white font-serif font-bold ml-8"
       v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
    推荐艺人
  </div>
  <SingerList_Scrool v-model:songlists="songlists"
                     v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView"></SingerList_Scrool>
  <hr class="m-5 border-gray-500" v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
  <div class="mx-4" v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
    <div class="grid grid-cols-2 gap-4">
      <div class="grid-col-2">
        <div class="text-2xl mx-8 text-white font-serif font-bold my-4">热门单曲</div>
        <div class="overflow-x-auto">
          <table class="table mx-auto">
            <!-- head -->
            <thead>
            <tr>
              <th class="text-center text-sm font-semibold">音乐标题</th>
              <th class="text-center text-sm font-semibold">歌手</th>
              <th class="text-center text-sm font-semibold">专辑</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Hart Hagerty</div>
                    <div class="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
              </td>
              <td>Purple</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <!-- row 2 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Brice Swyre</div>
                    <div class="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                Carroll Group
              </td>
              <td>Red</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <!-- row 3 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Marjy Ferencz</div>
                    <div class="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
              </td>
              <td>Crimson</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <!-- row 4 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Yancy Tear</div>
                    <div class="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
              </td>
              <td>Indigo</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
      <div class="grid-col-2">
        <div class="text-2xl mx-4 text-white font-serif font-bold my-4">最新上传</div>
        <div class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
            <tr>
              <th class="text-center text-sm font-semibold">音乐标题</th>
              <th class="text-center text-sm font-semibold">上传者</th>
              <th class="text-center text-sm font-semibold">专辑</th>
              <th class="text-center text-sm font-semibold"></th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp"
                           alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Hart Hagerty</div>
                    <div class="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
              </td>
              <td>Purple</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <!-- row 2 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Brice Swyre</div>
                    <div class="text-sm opacity-50">China</div>
                  </div>
                </div>
              </td>
              <td>
                Carroll Group
              </td>
              <td>Red</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <!-- row 3 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Marjy Ferencz</div>
                    <div class="text-sm opacity-50">Russia</div>
                  </div>
                </div>
              </td>
              <td>
                Rowe-Schoen
              </td>
              <td>Crimson</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            <!-- row 4 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src="" alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">Yancy Tear</div>
                    <div class="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
              </td>
              <td>Indigo</td>
              <th>
                <button class="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <hr class="m-5 border-gray-500" v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
  <div class="text-white text-base px-4 my-4" v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
    关于ios后台播放<br>
    由于ios限制无法在后台切换歌曲，可以添加到主屏幕、升级到ios16.1.1<br>
  </div>
  <div class="text-white text-base px-4 mt-4 mb-32" v-if="NaviMode==='1'&&!needshowsonglistpage&&!ShowSearchView">
    如有侵权，请联系本人予以删除！邮箱xuehuitian45@gmail.com<br>
    本站本身不储存任何资源文件，资源来自互联网，仅供学习交流试听，请于下载后24小时内删除，支持购买正版专辑！
  </div>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
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
}
</style>