<script setup>
import {onMounted, ref} from "vue";
import HomePage_Main from "@/views/HomePage_Main.vue";
import ExplorePage_Main from "@/views/ExplorePage_Main.vue";
import CreateCenter from "@/views/CreateCenterPage_Main.vue";
import SettingPage_Main from "@/views/SettingPage_Main.vue";
import Login from "../components/Login.vue";
import Personal_Center from "@/views/Personal_Center.vue";
import Sign_up from "./Sign_up.vue";
import axios from "axios";
import CreateSonglistPage_Main from "@/views/CreateSonglistPage_Main.vue";
import CreatedSonglist from "@/views/CreatedSonglist.vue";
import Warning from "@/components/Warning.vue";
import SideBar from "@/views/SideBar.vue";
import MusicPlayer_Cell from "@/components/MusicPlayer_Cell.vue";
import AdminPage_Main from "@/views/admin/AdminPage_Main.vue";
import CreatedSonglist_Main from "@/views/CreatedSonglist_Main.vue";

const token = ref('');
const needshowsonglistpage = ref(false);
const cantransformtofull = ref(false);
const userlike = ref([]);
const avatar = ref('');
const index = ref('1');
const datax = ref([]);
const UserRole = ref('');
const musicList = ref([
  {
    "id": null,
    "title": "",
    "singer": "",
    "cover": "",
    "gradient": "",
    "introduction": "",
    "audio": "",
    "duration": "",
    "lyric": "",
    "tag_theme": null,
    "tag_scene": null,
    "tag_mood": null,
    "tag_style": null,
    "tag_language": null,
    "uploader": "",
    "like": 0,
    "upload_date": ""
  }]);
const username = ref('点击登录');
const HasLogin = ref(false);
const songlists = ref([]);
const userdata = ref([]);
const songlistsearch = ref([]);
const SearchContent = ref('');
const ShowSearchView = ref(false);
const HomePageRecommendLatest = ref([]);
const songlistlast = ref([]);
const RegisterMode = ref(false);
const mode = ref('1');
const WarningShow = ref(false);
const message = ref('');
const songlist = ref([]);
const changeMode = (newMode) => {
  mode.value = newMode.toString(); // 设置新的 mode 值
};

const ChangerRegisterMode = () => {
  RegisterMode.value = !RegisterMode.value;
}

const refreshNewest_Songs_Page = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/recommend/latest')
      .then(response => {
        songlistlast.value = response.data.data;
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration)
        }
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
            'username': username.value,
          }
        })
            .then(response2 => {
              userlike.value = response2.data.data;
              console.log(userlike.value);
              let length2 = userlike.value.length;
              for (let i = 0; i < length; ++i) {
                for (let j = 0; j < length2; ++j) {
                  if (songlistlast.value[i].id === userlike.value[j].id) {
                    songlistlast.value[i].user_like = true;
                  }
                }
              }
              console.log(songlist.value);
            })
            .catch(error => {
              console.log(error.response.data);
            })
      })
      .catch(error => {
        console.log(error.data.message);
      })
}

function getsonglistinit() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/feature/recent', {
    params: {
      'username': username.value,
    }
  })
      .then(response => {
        musicList.value = response.data.data.songs;
        cantransformtofull.value = true;
        if (musicList.value.length === 0) {
          cantransformtofull.value = false;
          musicList.value = [
            {
              "id": null,
              "title": "",
              "singer": "",
              "cover": "",
              "gradient": "",
              "introduction": "",
              "audio": "",
              "duration": "",
              "lyric": "",
              "tag_theme": null,
              "tag_scene": null,
              "tag_mood": null,
              "tag_style": null,
              "tag_language": null,
              "uploader": "",
              "like": 0,
              "upload_date": ""
            }]
        }
        datax.value = response.data.data.songs;
        MusicPlayer_Cell_Ref.value.initCurrentMusic(musicList.value[0])
        console.log(musicList.value);
      })
      .catch(error => {
        console.log(error.response.data);
      })
  instance.get('/songlists/initdata')
      .then(response => {
        songlists.value = response.data.data;
        let length = songlists.value;
        for (let i = 0; i < length; ++i) {
          songlists.value[i].duration = gettime(songlists.value[i].duration)
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
  instance.get('/recommend/latest')
      .then(response => {
        songlistlast.value = response.data.data;
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration)
        }
        let length2 = userlike.value.length;
        for (let i = 0; i < length; ++i) {
          for (let j = 0; j < length2; ++j) {
            if (songlistlast.value[i].id === userlike.value[j].id) {
              songlistlast.value[i].user_like = true;
            }
          }
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

const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}

const changesonglist = () => {
  needshowsonglistpage.value = true;
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songlists/info/' + index.value;
  instance.get(web)
      .then(response => {
        songlist.value = response.data.data;
        songlist.value.create_date = extractDate(songlist.value.create_date)
        let length = songlist.value.songs.length;
        console.log(length);
        for (let i = 0; i < length; ++i) {
          songlist.value.songs[i].duration = gettime(songlist.value.songs[i].duration)
        }
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
            'username': username.value,
          }
        })
            .then(response2 => {
              userlike.value = response2.data.data;
              console.log(userlike.value);
              let length2 = userlike.value.length;
              for (let i = 0; i < length; ++i) {
                for (let j = 0; j < length2; ++j) {
                  if (songlist.value.songs[i].id === userlike.value[j].id) {
                    songlist.value.songs[i].user_like = true;
                  }
                }
              }
              console.log(songlist.value.songs);
            })
            .catch(error => {
              console.log("changesonglisterror");
            })
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const SearchOperation = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/search/songs', {
    params: {
      keyword: SearchContent.value
    }
  })
      .then(response => {
        ShowSearchView.value = true;
        songlistsearch.value = response.data.data;
        let length = songlistsearch.value.length;
        for (let i = 0; i < length; ++i) {
          songlistsearch.value[i].duration = gettime(songlistsearch.value[i].duration)
        }
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
            'username': username.value,
          }
        })
            .then(response2 => {
              console.log(response2.data.data);
              userlike.value = response2.data.data;
              console.log(userlike.value);
              let length2 = userlike.value.length;
              for (let i = 0; i < length; ++i) {
                for (let j = 0; j < length2; ++j) {
                  if (songlistsearch.value[i].id === userlike.value[j].id) {
                    songlistsearch.value[i].user_like = true;
                  }
                }
              }
            })
            .catch(error => {
              console.log("likeerror");
            })
      })
      .catch(error => {
        console.log('SearchOperationerror');
      })
}
const MusicPlayer_Cell_Ref = ref(null);

const handlePlayNow = (id) => {
  MusicPlayer_Cell_Ref.value.handlePlayNow(id);
}

const handlePlayAfter = (id) => {
  MusicPlayer_Cell_Ref.value.handlePlayAfter(id);
}


const getPageinit = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 10000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songlists/initdata')
      .then(response => {
        songlists.value = response.data.data;
        let length = songlists.value.length;
        for (let i = 0; i < length; ++i) {
          songlists.value[i].duration = gettime(songlists.value[i].duration);
        }
      })
      .catch(error => {
        console.log("getPageinit1error");
      })
  instance.get('/recommend/latest')
      .then(response => {
        songlistlast.value = response.data.data;
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration);
        }
      })
      .catch(error => {
        console.log("getpageinit2error");
      })
  GetHomePageRecommendLatest();
}

const GetHomePageRecommendLatest = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/recommend/latest', {
    params: {
      'num': 10,
    }
  })
      .then(response => {
        console.log(response.data.data);
        HomePageRecommendLatest.value = response.data.data;
        let length = HomePageRecommendLatest.value.length;
        for (let i = 0; i < length; ++i) {
          HomePageRecommendLatest.value[i].duration = gettime(HomePageRecommendLatest.value[i].duration);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const updateavatar = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/users/info/' + username.value;
  instance.get(web)
      .then(response => {
        avatar.value = response.data.data.avatar;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const userUploadedSongs = ref([]);
const createdSonglists = ref([]);
const currentUserSongList = ref([]);
const showUserSongList = ref(false);

const PlaySongList = (id) => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songlists/info/' + id;
  instance.get(web)
      .then(response => {
        musicList.value = response.data.data.songs;
        MusicPlayer_Cell_Ref.value.initCurrentMusic(musicList.value[0]);
        datax.value = response.data.data.songs;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const checkLogin = () => {
  if (HasLogin.value === false) {
    WarningShow.value = true;
    message.value = '请先登录';
    changeMode(0);
  }
}
const CloseWarning = () => {
  WarningShow.value = false;
}

onMounted(getPageinit);
</script>

<template>
  <div class="w-full absolute top-0 left-1/2 transform -translate-x-1/2" v-if="WarningShow">
    <Warning :message="message" @CloseWarning="CloseWarning" class="mx-auto" v-model:token="token"></Warning>
  </div>
  <div class="flex w-full h-screen bg-zinc-900">
    <SideBar :HasLogin="HasLogin" :avatar="avatar" @checkLogin="checkLogin" v-model:mode="mode" :username="username"
             v-model:userdata="userdata" v-model:token="token" v-model:createdSonglists="createdSonglists"
             v-model:currentUserSongList="currentUserSongList" v-model:userUploadedSongs="userUploadedSongs"
             v-model:showUserSongList="showUserSongList"
             v-model:UserRole="UserRole"></SideBar>
    <div class="lg:w-1/6 w-0 h-full mr-0"></div>
    <div class="w-full lg:w-5/6 h-full mr-0">
      <div class="bg-zinc-900 h-screen overflow-auto">
        <div v-if="mode==='0'&&!HasLogin" class="w-full h-full z-50">
          <Login v-if="!RegisterMode" @ChangerRegisterMode="ChangerRegisterMode" v-model:username="username"
                 @changeMode="changeMode" v-model:HasLogin="HasLogin" @getsonglistinit="getsonglistinit"
                 v-model:avatar="avatar" v-model:token="token" v-model:UserRole="UserRole"></Login>
          <Sign_up v-if="RegisterMode" @ChangerRegisterMode="ChangerRegisterMode" v-model:username="username"
                   v-model:token="token"></Sign_up>
        </div>
        <Personal_Center v-model:userdata="userdata" v-model:HasLogin="HasLogin" v-model:username="username"
                         v-if="HasLogin&&mode==='0'" @updateavatar="updateavatar"
                         v-model:token="token"></Personal_Center>
        <HomePage_Main v-model:songlist="songlist" v-model:needshowsonglistpage="needshowsonglistpage"
                       @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow" v-if="mode==='1'"
                       v-model:SearchContent="SearchContent" v-model:ShowSearchView="ShowSearchView"
                       v-model:songlistsearch="songlistsearch" @SearchOperation="SearchOperation"
                       v-model:songlists="songlists" v-model:index="index" v-model:username="username"
                       v-model:userlike="userlike" @refreshNewest_Songs_Page="refreshNewest_Songs_Page"
                       v-model:songlistlast="songlistlast" v-model:HomePageRecommendLatest="HomePageRecommendLatest"
                       v-model:token="token"
                       @changesonglist="changesonglist" @PlaySongList="PlaySongList"></HomePage_Main>
        <ExplorePage_Main v-if="mode==='2'" v-model:token="token"></ExplorePage_Main>
        <SettingPage_Main v-if="mode==='3'" v-model:token="token"></SettingPage_Main>
        <CreateCenter v-if="mode==='4'" :userUploadedSongs="userUploadedSongs"
                      v-model:HasLogin="HasLogin" v-model:username="username"
                      v-model:token="token"></CreateCenter>
        <CreateSonglistPage_Main v-if="mode==='5'" v-model:HasLogin="HasLogin"
                                 v-model:username="username" v-model:token="token"></CreateSonglistPage_Main>
        <!--        <CreatedSonglist :songlist="currentUserSongList" v-if="mode==='6'&&showUserSongList"-->
        <!--                         @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow"-->
        <!--                         v-model:token="token" v-model:username="username"></CreatedSonglist>-->
        <CreatedSonglist_Main v-model:createdSonglists="createdSonglists" v-if="mode==='6'"
                              @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                              @handlePlayNow="handlePlayNow"
                              v-model:token="token" v-model:username="username"></CreatedSonglist_Main>
        <AdminPage_Main v-model:token="token" v-if="mode==='7'"></AdminPage_Main>
      </div>
    </div>
  </div>
  <MusicPlayer_Cell ref="MusicPlayer_Cell_Ref" v-model:musicList="musicList" v-model:token="token" v-model:mode="mode"
                    :HasLogin="HasLogin" v-model:datax="datax" v-model:username="username"
                    v-model:cantransformtofull="cantransformtofull"></MusicPlayer_Cell>
</template>

<style scoped>
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>