<script setup>
import {computed, ref, defineModel} from "vue";
import UploadSong from "@/views/CreateCenter/UploadSong.vue";
import axios from "axios";
import EditSong from "@/views/EditSong.vue";
import SongPage from "@/components/SongPage.vue";
import Search_View from "@/views/HomePage/Search_View.vue";
import CreateSonglist_Area from "@/views/CreateCenter/CreateSonglist_Area.vue";

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
const NaviClass3 = computed(() => ({
  'text-base inline-block mx-3 w-20 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '3',
}));
const containerClass_Upload = computed(() => ({
  'antialiased text-sm box h-10 my-1 text-white leading-10 transition duration-400 hover:bg-gray-600/40 bg-zinc-800 px-4 ml-2 mr-2 rounded-md': upload.value !== '1',
  'antialiased text-sm box h-10 my-1 text-white leading-10 transition duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': upload.value === '1',
}));
const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
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
const emits = defineEmits(['handlePlayNow', 'handlePlayAfter']);

function handlePlayNow(id) {
  emits('handlePlayNow', id);
}

const handlePlayAfter = (id) => {
  emits('handlePlayAfter', id);
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

const gettime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time - minute * 60);
  if (second < 10) {
    return `${minute}:0${second}`;
  }
  return `${minute}:${second}`;
}

const formatdate = (str) => {
  const index = str.indexOf(' ');
  return index !== -1 ? str.substring(0, index) : str;
}


const SongId=ref(0);
const NeedShowSongDetail=ref(false);

const ShowSongDetail=(index)=>{
  SongId.value=props.userUploadedSongs[index].id;
  NeedShowSongDetail.value=true;
}

const CloseSongPage=()=>{
  NeedShowSongDetail.value=false;
}
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="NeedShowSongDetail">
      <SongPage v-model:currentSongId="SongId"
                @handlePlayNow="handlePlayNow" @CloseSong="CloseSongPage"
                v-model:username="username" v-model:token="token" v-model:HasLogin="HasLogin"></SongPage>
    </div>
  </transition>


  <transition name="slide" appear>
    <div class="transition-container-2 z-50" v-if="showEditSong&&!NeedShowSongDetail">
      <EditSong v-model:songId="songId" @closeEditSong="closeEditSong"
                v-model:cover="cover" v-model:coverImageFileUrl="coverImageFileUrl"
                v-model:token="token" v-model:username="username"></EditSong>
    </div>
  </transition>

  <div v-if="!showEditSong&&!ShowSong&&!NeedShowSongDetail">
    <div class="w-full h-14 pl-6">
      <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">我的创作</div>
      <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">创作歌曲</div>
      <div :class="[NaviClass3, 'text-transition']" @click="changeNaviMode(3)" style="line-height: 56px">创建歌单</div>
      <Search v-model:token="token"></Search>
    </div>
    <div v-if="NaviMode==='1'">
      <div class="">
        <div class="text-2xl mx-4 text-white font-serif font-bold my-4 w-1/2">我的上传</div>
        <div class="mx-6">
          <table class="table mb-32">
            <thead>
            <tr>
              <th class="text-left text-sm font-semibold">音乐标题</th>
              <th class="text-left text-sm font-semibold">歌手</th>
              <th class="text-left text-sm font-semibold">时长</th>
              <th class="text-left text-sm font-semibold">上传日期</th>
              <th class="text-left text-sm font-semibold">喜欢人数</th>
              <th class="text-left text-sm font-semibold"></th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
                v-for="(item, index) in props.userUploadedSongs" :key="index">
              <td @click="handlePlayNow(index);">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="item.cover"
                           alt="Avatar Tailwind CSS Component"/>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.title }}</div>
                    <!--                    <div class="text-sm opacity-50">United States</div>-->
                  </div>
                </div>
              </td>
              <td @click="handlePlayNow(index);">
                {{ item.singer }}
              </td>
              <td @click="handlePlayNow(item.id);">{{ gettime(item.duration) }}</td>
              <td @click="handlePlayNow(item.id);">{{ formatdate(item.upload_date) }}</td>
              <td @click="handlePlayNow(item.id);">{{ item.like }}</td>
              <th>
                <div
                    class="dropdown dropdown-left dropdown-content my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm border-none z-50"
                    data-tip="播放列表">
                  <svg class="icon z-50" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                       width="32" height="32" tabindex="0" role="button">
                    <path
                        d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                        fill="white"></path>
                  </svg>
                  <ul tabindex="0"
                      class="dropdown-content z-50 menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm"
                      style="width:300px">
                    <li class="z-50">
                      <div class="z-50">
                        <img :src="item.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                        <a class="font-semibold text-sm">{{ item.title }}</a>
                        <br>
                        <a class="block text-gray-600 text-xs mr-0">{{ item.singer }}</a>
                      </div>
                    </li>
                    <li>
                      <div class="text-sm font-semibold z-50" @click="handlePlayNow(item.id);">
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
                      <div class="text-sm font-semibold" @click="deleteSong(item.id)">
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
                    <li>
                      <div class="text-sm font-semibold"
                           @click="activeShowEditSong(index, item.cover, item.audio, item.lyric)">
                        <svg class="icon fill-white" viewBox="0 0 1024 1024"
                             xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                          <path
                              d="M916.823514 412.032194c-12.507872 0-22.648836 10.119475-22.720468 22.603811l0 0.069585c0 0.023536 0 0.023536 0 0.070608 0 0 0 0.023536 0 0.046049l0 402.968771c0 25.109887-20.354584 45.439912-45.437865 45.439912L414.133553 883.230929c-0.022513 0-0.022513 0-0.047072 0L166.98157 883.230929c-25.084305 0-45.438888-20.330024-45.438888-45.439912l0-657.709593c0-25.108864 20.354584-45.438888 45.438888-45.438888l439.051571 0c12.531408-0.022513 22.695908-10.188037 22.695908-22.719444 0-12.554944-10.1645-22.719444-22.695908-22.719444L162.438091 89.203648c-47.688115 0-86.334297 38.647205-86.334297 86.334297l0 222.395136c0 0.023536 0 0.070608 0 0.070608l0 444.332854c0 47.689139 38.647205 86.334297 86.334297 86.334297l690.77057 0c47.689139 0 86.335321-38.646182 86.335321-86.334297L939.543981 434.636005C939.471326 422.151669 929.330362 412.032194 916.823514 412.032194zM494.449787 703.160761l432.257841-432.223049c25.716708-25.694195 23.351847-69.938885-5.293563-98.537224l-40.825824-40.871873c-28.620851-28.64541-72.843028-31.03483-98.558713-5.340635L349.76964 558.493917 494.449787 703.160761zM814.232974 158.464081c9.768481-9.743922 26.5374-8.854669 37.406958 1.990331l40.847314 40.848337c10.844999 10.915607 11.757788 27.662013 1.991354 37.382399l-47.969525 47.968501-79.612199-80.853469L814.232974 158.464081zM812.571125 320.592622 491.193627 642.017192l-80.269162-80.245625 322.034461-322.032414L812.571125 320.592622zM349.558839 559.312562l-44.431955 162.819273c-1.944282 7.121188 0.094144 14.661931 5.245468 19.909445 5.223978 5.152347 12.789281 7.166213 19.885909 5.246491l162.831552-44.408419-33.330106-33.388435-105.726973 28.891004 28.832675-105.787348L349.558839 559.312562z"
                          ></path>
                        </svg>
                        编辑歌曲
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
                  </ul>
                </div>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full h-5/6 overflow-auto" v-if="NaviMode==='2'&&!NeedShowSongDetail">
    <UploadSong @uploadSongSuccess="uploadSongSuccess" v-model:HasLogin="HasLogin"
                v-model:username="username" v-model:token="token"></UploadSong>
  </div>
  <div class="w-full h-5/6 overflow-auto" v-if="NaviMode==='3'&&!NeedShowSongDetail">
    <CreateSonglist_Area @uploadSongSuccess="uploadSongSuccess" v-model:HasLogin="HasLogin"
                v-model:username="username" v-model:token="token"></CreateSonglist_Area>
  </div>
  <div class="h-32" v-if="!NeedShowSongDetail"></div>
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


.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}
</style>