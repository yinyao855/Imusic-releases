<script setup>
import {computed, ref, defineModel} from "vue";
import UploadSong from "@/views/UploadSong.vue";
import axios from "axios";
import EditSong from "@/views/EditSong.vue";
import SongPage from "@/views/SongPage.vue";

const NaviMode = ref('1');
const upload = ref('0');
const token = defineModel('token')
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const containerClass_Upload = computed(() => ({
  'antialiased text-sm box h-10 my-1 text-white leading-10 transition duration-400 hover:bg-gray-600/40 bg-zinc-800 px-4 ml-2 mr-2 rounded-md': upload.value !== '1',
  'antialiased text-sm box h-10 my-1 text-white leading-10 transition duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': upload.value === '1',
}));
const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}
const uploadSong = (newOne) => {
  if (upload.value === '1') {
    upload.value = '0';
    return;
  }
  upload.value = newOne.toString();
}
const uploadSongSuccess = () => {
  upload.value = '0';
}
const username = defineModel('username')

const HasLogin = defineModel('HasLogin')

const props = defineProps({
  userUploadedSongs: Object,
}) // 存储用户上传的所有歌曲

const songData = ref([]);
const songId = ref(0);
const showEditSong = ref(false); // 是否展示修改歌单信息页面（默认：否），点击修改的icon后为true
const cover = ref(null); // 存储当前歌单图片
const coverImageFileUrl = ref(''); // 存储当前歌单图片url，若修改了图片，可以直接展示新选择的图片即使还没完成修改
const mp3File = ref(null);
const lrcFile = ref(null);

const ShowSong = ref(false);
const currentSongId = ref(0);
const emits = defineEmits(['handlePlayNow']);

function handlePlayNow(id) {
  emits('handlePlayNow', id);
}

// 关闭歌曲详细界面
function CloseSong() {
  ShowSong.value = false;
}

// 进入歌曲详细界面
function activeSongPage(id) {
  currentSongId.value = id;
  ShowSong.value = true;
}

// 删除歌曲
function deleteSong(songid) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.delete('/songs/delete/' + songid)
      .then(function (response) {
        if (response.data.success === true) {
          window.alert("delete success");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 存储歌曲图片，进入修改歌曲界面（showEditSong为true）
function activeShowEditSong(index, imgUrl, mp3, lrc) {
  songId.value = props.userUploadedSongs[index].id;
  songData.value = props.userUploadedSongs[index];
  cover.value = imgUrl;
  coverImageFileUrl.value = imgUrl;
  mp3File.value = mp3;
  lrcFile.value = lrc;
  showEditSong.value = true;
}

function closeEditSong() {
  showEditSong.value = false;
}
</script>

<template>
  <div v-if="!showEditSong&&!ShowSong">
    <div class="w-full h-14 pl-6">
      <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">我的创作</div>
      <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">创意空间</div>
      <Search v-model:token="token"></Search>
    </div>
    <div v-if="NaviMode==='1'">
      <div class="">
        <div class="text-2xl mx-4 text-white font-serif font-bold my-4">我的上传</div>
        <div class="">
          <table class="w-full text-gray-400">
            <!-- head -->
            <thead>
            <tr>
              <th class="text-left p-3 text-sm font-semibold text-white">音乐标题</th>
              <th class="text-center text-sm font-semibold text-white">歌手</th>
              <th class="text-center text-sm font-semibold text-white">上传时间</th>
              <!--            <th class="text-center text-sm font-semibold text-white">标签</th>-->
              <th class="text-center text-sm font-semibold text-white">喜欢人数</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(song, index) in props.userUploadedSongs" class="hover:bg-gray-600">
              <td @click="activeSongPage(song.id)" class="pl-3 p-1 hover:cursor-pointer">
                <img :src="song.cover" class="img_song inline-block mr-3">
                <p class="inline-block">{{ song.title }}</p>
              </td>
              <td class="text-center">{{ song.singer }}</td>
              <td class="text-center">{{ song.upload_date }}</td>
              <!--            <td class="text-center w-1/3">-->
              <!--              &lt;!&ndash;            标签&ndash;&gt;-->
              <!--              <div class="inline-block">-->
              <!--                <div v-if="show_tag(song.tag_theme)"-->
              <!--                     class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">-->
              <!--                  {{ song.tag_theme }}-->
              <!--                </div>-->
              <!--                <div v-if="show_tag(song.tag_scene)"-->
              <!--                     class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">-->
              <!--                  {{ song.tag_scene }}-->
              <!--                </div>-->
              <!--                <div v-if="show_tag(song.tag_mood)"-->
              <!--                     class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">-->
              <!--                  {{ song.tag_mood }}-->
              <!--                </div>-->
              <!--                <div v-if="show_tag(song.tag_style)"-->
              <!--                     class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">-->
              <!--                  {{ song.tag_style }}-->
              <!--                </div>-->
              <!--                <div v-if="show_tag(song.tag_language)"-->
              <!--                     class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">-->
              <!--                  {{ song.tag_language }}-->
              <!--                </div>-->
              <!--              </div>-->
              <!--            </td>-->
              <td class="text-center">{{ song.like }}</td>
              <td class="pr-5">
                <!--              修改歌曲信息-->
                <svg @click="activeShowEditSong(index, song.cover, song.audio, song.lyric)"
                     class="ml-2 inline-block float-right h-5 w-5 cursor-pointer text-blue-700 hover:text-blue-900"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
                <!--          删除歌曲-->
                <svg @click="deleteSong(song.id)"
                     class="inline-block float-right h-6 w-6 cursor-pointer text-red-700 hover:text-red-900" width="24"
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
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr class="m-5 border-gray-500">
      <div class="w-5px  w-1/5 flex items-center justify-center">
        <div
            :class="containerClass_Upload" @click="uploadSong(1)">
          <svg v-if="upload==='0'" class="icon inline fill-white transition duration-400 my-auto mr-1"
               viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg"
               width="16" height="16">
            <path
                d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z"
            ></path>
          </svg>
          <svg v-if="upload==='1'" class="icon inline fill-white transition duration-400 my-auto mr-1"
               viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg"
               id="mx_n_1714112302736" width="16" height="20">
            <path
                d="M973.154 563.218 51.222 563.218c-28.275 0-51.222-22.946-51.222-51.214 0-28.276 22.946-51.222 51.222-51.222L973.154 460.782c28.33 0 51.222 22.946 51.222 51.222C1024.375 540.272 1001.484 563.218 973.154 563.218L973.154 563.218z"
            ></path>
          </svg>
          <span v-if="upload==='0'" class="font-medium">新的上传</span>
          <span v-if="upload==='1'" class="font-medium">取消上传</span>
        </div>

      </div>
      <div v-if="upload==='1'" class="w-full h-full">
        <UploadSong @uploadSongSuccess="uploadSongSuccess" v-model:HasLogin="HasLogin"
                    v-model:username="username" v-model:token="token"></UploadSong>
      </div>
    </div>
  </div>

  <!--  展示修改歌曲信息界面（当showEditSong为true）-->
  <EditSong v-model:songId="songId" v-if="showEditSong" @closeEditSong="closeEditSong"
            v-model:cover="cover" v-model:coverImageFileUrl="coverImageFileUrl"
            v-model:token="token" v-model:username="username"></EditSong>

  <SongPage v-if="ShowSong" v-model:currentSongId="currentSongId"
            @handlePlayNow="handlePlayNow" @CloseSong="CloseSong"
            v-model:username="username" v-model:token="token"></SongPage>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}

.img_song {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}
</style>