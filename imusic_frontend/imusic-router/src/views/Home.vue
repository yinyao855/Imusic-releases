<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import HomePage_Main from "@/views/HomePage/HomePage_Main.vue";
import ExplorePage_Main from "@/views/Explore/ExplorePage_Main.vue";
import CreateCenter from "@/views/CreateCenter/CreateCenterPage_Main.vue";
import SettingPage_Main from "@/views/Settings/SettingPage_Main.vue";
import Login from "./Account/Login.vue";
import Personal_Center from "@/views/Account/Personal_Center.vue";
import Sign_up from "./Account/Sign_up.vue";
import axios from "axios";
import SideBar from "@/views/SideBar.vue";
import MusicPlayer_Cell from "@/views/MusicPlayer/MusicPlayer.vue";
import AdminPage_Main from "@/views/Admin/AdminPage_Main.vue";
import CreatedSonglist_Main from "@/views/CreatedSongList/CreatedSonglist_Main.vue";
import FavoriteSonglist_Main from "@/views/FavoriteSongList/FavoriteSonglist_Main.vue";
import Forget_Password from "@/views/Account/Forget_Password.vue";
import Message_Main from "@/views/Message/Message_Main.vue";

import {useUserStore} from "@/stores/user.js";
import {useMessageStore} from "@/stores/message.js";
import {useTmpStore} from "@/stores/usertmp.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore();
const tmpStore = useTmpStore();
// console.log("测试持久化" + userStore.username);

const {username, token} = storeToRefs(userStore); // 解析出来的是ref对象
const HasLogin = ref(computed(() => userStore.isLogin))
const avatar = ref(computed(() => userStore.userAvatar))
const UserRole = ref(computed(() => userStore.userRole))

/*---------------------------------------------------*/
// 处理自动登录
const autoLogin = () => {
  const tmp = userStore.token
  if (tmp === '') {
    return;
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${tmp}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/check-token/')
      .then(response => {
        if (response.data.success) {
          console.log("auto login success!");
          // GetMessage();
          getsonglistinit();
          intervalId = setInterval(GetMessage, 6000); //目前设置为6s
          tmpStore.init();
        }
        else{
          console.log("auto login failed!");
          mode.value = '0'; // 跳转到登录页面
          userStore.flush();
        }
      })
      .catch(error => {
        console.log(error)
      })
}
/*---------------------------------------------------*/

const needshowsonglistpage = ref(false);
const cantransformtofull = ref(false);
const userlike = ref([]);

const index = ref(1);
const datax = ref([]);
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

const songlists = ref([]);
const userdata = ref([]);
const songlistsearch = ref([]);
const SearchContent = ref('');
const ShowSearchView = ref(false);
const HomePageRecommendLatest = ref([]);
const songlistlast = ref([]);
const RegisterMode = ref(false);
const mode = ref('1');
const message = ref('');
const songlist = ref([]);
const changeMode = (newMode) => {
  mode.value = newMode.toString(); // 设置新的 mode 值
};

const ChangerRegisterMode = () => {
  RegisterMode.value = !RegisterMode.value;
  if (ShowForget.value) {
    ShowForget.value = false;
    RegisterMode.value = false;
  }
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
  // 登录时获取用户消息
  GetMessage();
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
      })
      .catch(error => {
        console.log(error.response.data);
      })
  instance.get('/feature/hotsonglists')
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

const SongListId = ref(0);

const changesonglist = () => {
  const UserLikeSongLists = ref([]);
  needshowsonglistpage.value = true;
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  SongListId.value = index.value;
  const web = ref("");
  let str = SongListId.value + "";
  if(str.includes("sh")) {
    web.value = '/songlists/info/' + SongListId.value + "?username=" + username.value;
  } else {
    web.value = '/songlists/info/' + SongListId.value;
  }
  instance.get(web.value)
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
        instance.get('/like/songlists', {
          params: {
            username: username.value
          }
        })
            .then(response => {
              UserLikeSongLists.value = response.data.data;
              let length2 = UserLikeSongLists.value.length;
              for (let i = 0; i < length2; ++i) {
                if (UserLikeSongLists.value[i].id === songlist.value.id) {
                  songlist.value.user_like = true;
                  break;
                }
              }
            })
            .catch(error => {
              console.log(error.response.data);
            })
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
  instance.get('/feature/hotsonglists')
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
        //console.log(response.data.data)
        //console.log(songlistlast.value);
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          //console.log(i);
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration);
        }
      })
      .catch(error => {
        console.log("getpageinit2error");
        console.log(error);
      })
  GetHomePageRecommendLatest();
}

const HotSongs = ref([]);

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
        HomePageRecommendLatest.value = response.data.data;
        let length = HomePageRecommendLatest.value.length;
        for (let i = 0; i < length; ++i) {
          HomePageRecommendLatest.value[i].duration = gettime(HomePageRecommendLatest.value[i].duration);
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
  instance.get('/feature/hotsongs', {
    params: {
      'num': 10,
    }
  })
      .then(response => {
        HotSongs.value = response.data.data;
        let length = HotSongs.value.length;
        for (let i = 0; i < length; ++i) {
          HotSongs.value[i].duration = gettime(HotSongs.value[i].duration);
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
// const createdSonglists = ref([]);
// const favoriteSonglists = ref([]);
// const currentUserSongList = ref([]);
// const showUserSongList = ref(false);

const PlaySongList = (id) => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songlists/info/' + id + "?username=" + username.value;
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

// const checkLogin = () => {
//   if (HasLogin.value === false) {
//     WarningShow.value = true;
//     message.value = '请先登录';
//     changeMode(0);
//   }
// }

const PlayLikeSongs = () => {
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
      'username': username.value
    }
  })
      .then(response => {
        musicList.value = response.data.data;
        MusicPlayer_Cell_Ref.value.initCurrentMusic(musicList.value[0]);
        datax.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}


const ShowForget = ref(false);
const ChangeForgetMode = () => {
  ShowForget.value = !ShowForget.value;
  console.log(ShowForget.value);
}

const PlaySingerSongs = (index) => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/singer/getsongs/' + index;
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

/*----------------------------------------*/
const messageStore = useMessageStore();
// 获取消息
const GetMessage = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/messages/';
  instance.get(web)
      .then(response => {
        const msg = response.data.data;
        messageStore.setMessage(msg);
        console.log(msg);
      })
      .catch(error => {
        console.log(error.response.data);
      })
};
/*----------------------------------------*/

let intervalId = null;

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
onMounted(getPageinit);
onMounted(autoLogin);
</script>

<template>
  <div class="flex w-full h-screen bg-zinc-900">
    <SideBar v-model:mode="mode"
             v-model:userdata="userdata"
             v-model:userUploadedSongs="userUploadedSongs"
    ></SideBar>
    <div class="lg:w-1/6 w-0 h-full mr-0"></div>
    <div class="w-full lg:w-5/6 h-full mr-0">
      <div class="bg-zinc-900 h-screen overflow-auto">
        <div v-if="mode==='0'&&!HasLogin" class="w-full h-full z-50">
          <Login v-if="!RegisterMode&&!ShowForget" @ChangerRegisterMode="ChangerRegisterMode"
                 v-model:username="username"
                 @changeMode="changeMode" @getsonglistinit="getsonglistinit"
                 @ChangeForgetMode="ChangeForgetMode"></Login>
          <Sign_up v-if="RegisterMode&&!ShowForget" @ChangerRegisterMode="ChangerRegisterMode"
                   v-model:username="username"
                   v-model:token="token"></Sign_up>
          <Forget_Password v-if="!RegisterMode&&ShowForget" @ChangerRegisterMode="ChangerRegisterMode"
                           v-model:username="username"
                           v-model:token="token"></Forget_Password>
        </div>
        <Personal_Center v-if="HasLogin&&mode==='0'"></Personal_Center>
        <HomePage_Main v-model:songlist="songlist" v-model:needshowsonglistpage="needshowsonglistpage"
                       @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow" v-if="mode==='1'"
                       v-model:SearchContent="SearchContent" v-model:ShowSearchView="ShowSearchView"
                       v-model:songlistsearch="songlistsearch" @SearchOperation="SearchOperation"
                       v-model:songlists="songlists" v-model:index="index" v-model:username="username"
                       v-model:userlike="userlike" @refreshNewest_Songs_Page="refreshNewest_Songs_Page"
                       v-model:songlistlast="songlistlast" v-model:HomePageRecommendLatest="HomePageRecommendLatest"
                       v-model:token="token" v-model:SongListId="SongListId"
                       @changesonglist="changesonglist" @PlaySongList="PlaySongList"
                       v-model:HotSongs="HotSongs" @PlaySingerSongs="PlaySingerSongs"></HomePage_Main>
        <ExplorePage_Main v-model:username="username" v-if="mode==='2'" v-model:token="token" @PlaySongList="PlaySongList"
                          @handlePlayNow="handlePlayNow" @handlePlayAfter="handlePlayAfter"></ExplorePage_Main>
        <SettingPage_Main v-if="mode==='3'" v-model:token="token" v-model:username="username"></SettingPage_Main>
        <CreateCenter v-if="mode==='4'" :userUploadedSongs="userUploadedSongs" @handlePlayNow="handlePlayNow"
                      v-model:HasLogin="HasLogin" v-model:username="username" @handlePlayAfter="handlePlayAfter"
                      v-model:token="token"></CreateCenter>
        <CreatedSonglist_Main v-if="mode==='6'"
                              @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                              @handlePlayNow="handlePlayNow" @PlayLikeSongs="PlayLikeSongs"
                              v-model:token="token" v-model:username="username"
                              v-model:HasLogin="HasLogin"></CreatedSonglist_Main>
        <FavoriteSonglist_Main v-if="mode==='8'"
                               @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                               @handlePlayNow="handlePlayNow"
                               v-model:token="token" v-model:username="username"
                               v-model:HasLogin="HasLogin"></FavoriteSonglist_Main>
        <Message_Main v-if="mode==='9'" @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                      @handlePlayNow="handlePlayNow"
                      v-model:token="token" v-model:username="username"
                      v-model:HasLogin="HasLogin" v-model:UserRole="UserRole"
        ></Message_Main>
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