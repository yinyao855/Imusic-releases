<script setup>
import Search from "@/components/Search.vue";
import Admin_SongList_View from "@/views/Admin/Admin_SongList_View.vue";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import Admin_Song_View from "@/views/Admin/Admin_Song_View.vue";
import Admin_Search_Song_View from "@/views/Admin/Admin_Search_Song_View.vue";
import Admin_Search_Songlist_View from "@/views/Admin/Admin_Search_Songlist_View.vue";
import Admin_Update_Song_Page from "@/views/Admin/Admin_Update_Song_Page.vue";
import Admin_Update_SongList_Page from "@/views/Admin/Admin_Update_SongList_Page.vue";
import Admin_User_View from "@/views/Admin/Admin_User_View.vue";
import Admin_Search_User_View from "@/views/Admin/Admin_Search_User_View.vue";
import Admin_Show_User_Information from "@/views/Admin/Admin_Show_User_Information.vue";
import Admin_Complaint_View from "@/views/Admin/Admin_Complaint_View.vue";

const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40 cursor-pointer': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40 cursor-pointer': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const NaviClass3 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40 cursor-pointer': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '3',
}));
const NaviClass4 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40 cursor-pointer': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '4',
}));
const Songs = ref([]);
const NaviMode = ref('1');
const changeNaviMode = (NewMode) => {
  NaviMode.value = NewMode.toString();
  if (NewMode === 1) {
    Get_Admin_SongList_Data();
  }
  if (NewMode === 2) {
    Get_Admin_Songs_Data();
  }
  if (NewMode === 3) {
    Get_Admin_Users_Data();
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

const SongLists = ref([]);
const Users = ref([]);
const Get_Admin_SongList_Data = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songlists/alldata')
      .then(response => {
        console.log(response.data.data);
        SongLists.value = response.data.data;
      })
      .then(error => {
        console.log('songlists/alldata/error');
      })
}


const Get_Admin_Users_Data = () => {
  console.log("getuser");
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/alldata')
      .then(response => {
        Users.value = response.data.data;
        console.log(Users.value);
        let length = Users.value.length;
        for (let i = 0; i < length; ++i) {
          Users.value[i].role = Users.value[i].role === 'admin' ? '管理员' : '普通用户';
        }
      })
      .then(error => {
        console.log(error.response.data);
      })
}

const ShowSearchView = ref(false);

const Get_Admin_Songs_Data = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songs/alldata')
      .then(response => {
        Songs.value = response.data.data;
        let length = Songs.value.length;
        for (let i = 0; i < length; ++i) {
          Songs.value[i].duration = gettime(Songs.value[i].duration);
        }
      })
      .then(error => {
        console.log(error.response.data);
      })
}

const token = defineModel('token');
const SearchContent = ref('');
onMounted(Get_Admin_SongList_Data);
const SongListId = ref(0);
const ChangeShowSearchView = () => {
  ShowSearchView.value = false;
}
const ShowUpdateSongView = ref(false);

const ChangeShowUpdateView = () => {
  ShowUpdateSongView.value = false;
}

const UpdateSong = (id) => {
  ShowUpdateSongView.value = true;
  SongId.value = id;
}


const UpdateSongList = (id) => {
  ShowUpdateSongView.value = true;
  SongListId.value = id;
}
const UserId = ref(0);

const UpdateUser = (id) => {
  UserId.value = id;
  ShowUpdateSongView.value = true;
}

const SongId = ref(0);

const SearchOperation = () => {
  console.log(SearchContent.value);
  ShowSearchView.value = true;
}
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowSearchView&&!ShowUpdateSongView">
      <Admin_Search_Song_View v-if="NaviMode==='2'" :SearchContent="SearchContent" @changesize="ChangeShowSearchView"
                              @refresh="Get_Admin_SongList_Data" v-model:token="token"
                              @UpdateSong="UpdateSong"></Admin_Search_Song_View>
      <Admin_Search_Songlist_View v-if="NaviMode==='1'" :SearchContent="SearchContent"
                                  @changesize="ChangeShowSearchView" @refresh="Get_Admin_Songs_Data"
                                  v-model:token="token" @UpdateSongList="UpdateSongList"></Admin_Search_Songlist_View>
      <Admin_Search_User_View v-if="NaviMode==='3'" :SearchContent="SearchContent" @changesize="ChangeShowSearchView"
                              @refresh="Get_Admin_Users_Data" @UpdateUser="UpdateUser"
                              v-model:token="token"></Admin_Search_User_View>
    </div>
  </transition>


  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowUpdateSongView">
      <Admin_Update_Song_Page v-model:token="token" v-model:SongId="SongId" v-if="NaviMode==='2'"
                              @changesize="ChangeShowUpdateView"></Admin_Update_Song_Page>
      <Admin_Update_SongList_Page v-model:token="token" v-model:SongListId="SongListId" v-if="NaviMode==='1'"
                                  @changesize="ChangeShowUpdateView"></Admin_Update_SongList_Page>
      <Admin_Show_User_Information v-model:token="token" v-model:UserId="UserId" v-if="NaviMode==='3'"
                                   @changesize="ChangeShowUpdateView"></Admin_Show_User_Information>
    </div>
  </transition>

  <div class="w-full h-16 pl-6 fixed bg-zinc-900 z-50" v-if="!ShowSearchView">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1);" style="line-height: 56px">歌 单</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2);" style="line-height: 56px">
      歌 曲
    </div>
    <div :class="[NaviClass3, 'text-transition']" @click="changeNaviMode(3);" style="line-height: 56px">
      用 户
    </div>
    <Search v-model:SearchContent="SearchContent" @SearchOperation="SearchOperation" v-model:token="token"></Search>
  </div>
  <div class="w-full mt-16" v-if="!ShowSearchView">
    <Admin_SongList_View v-if="NaviMode==='1'" v-model:token="token" v-model:SongLists="SongLists"
                         @refresh="Get_Admin_SongList_Data" v-model:SearchContent="SearchContent"></Admin_SongList_View>
    <Admin_Song_View v-if="NaviMode==='2'" v-model:token="token" v-model:Songs="Songs" @refresh="Get_Admin_Songs_Data"
                     v-model:SearchContent="SearchContent"></Admin_Song_View>
    <Admin_User_View v-if="NaviMode==='3'" v-model:token="token" v-model:Users="Users" @refresh="Get_Admin_Users_Data"
                     v-model:SearchContent="SearchContent"></Admin_User_View>
    <Admin_Complaint_View v-if="NaviMode==='4'" v-model:token="token">
    </Admin_Complaint_View>
  </div>
</template>

<style scoped>
.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}

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
</style>