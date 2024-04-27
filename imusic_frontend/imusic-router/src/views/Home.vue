<script setup>
import {computed, onMounted, ref, watch} from "vue";
import HomePage_Main from "@/views/HomePage_Main.vue";
import ExplorePage_Main from "@/views/ExplorePage_Main.vue";
import CreateCenter from "@/views/CreateCenterPage_Main.vue";
import SettingPage_Main from "@/views/SettingPage_Main.vue";
import MusicPlayerView from "./MusicPlayerView.vue";
import MusicPlayerFullView from "./MusicPlayerFullView.vue";
import Login from "./Login.vue";
import Personal_Center from "@/views/Personal_Center.vue";
import CreateSonglist from "@/views/CreateSonglist_Area.vue";
import Sign_up from "./Sign_up.vue";
import axios from "axios";
import UploadSong from "@/views/UploadSong.vue";
import CreateSonglistPage_Main from "@/views/CreateSonglistPage_Main.vue";
import CreatedSonglist from "@/views/CreatedSonglist.vue";
const userlike=ref([]);
const songlistlast = ref([
  {
    singer: '张杰',
    uploader: 'yy',
    cover: 'http://182.92.100.66:5000/media/covers/%E6%98%8E%E5%A4%A9%E8%BF%87%E5%90%8E-%E5%BC%A0%E6%9D%B0.png',
    id: '22',
    title: '明天过后'
  }
]);
const RegisterMode = ref(false);
const mode = ref('1');
const containerClass1 = computed(() => ({
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 hover:bg-gray-600/40 px-4 ml-2 mr-2 rounded-md': mode.value !== '1',
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': mode.value === '1',
}));
const containerClass2 = computed(() => ({
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 hover:bg-gray-600/40 px-4 ml-2 mr-2 rounded-md': mode.value !== '2',
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': mode.value === '2',
}));
const containerClass3 = computed(() => ({
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 hover:bg-gray-600/40 px-4 ml-2 mr-2 rounded-md': mode.value !== '3',
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': mode.value === '3',
}));
const containerClass4 = computed(() => ({
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 hover:bg-gray-600/40 px-4 ml-2 mr-2 rounded-md': mode.value !== '4',
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': mode.value === '4',
}));
const containerClass5 = computed(() => ({
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 hover:bg-gray-600/40 pl-4 ml-2 mr-2 rounded-md': mode.value !== '5',
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': mode.value === '5',
}));
const containerClass6 = computed(() => ({
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 hover:bg-gray-600/40 pl-4 ml-2 mr-2 rounded-md': mode.value !== '6',
  'antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 ml-2 mr-2 rounded-md bg-blue-500 hover:bg-blue-500': mode.value === '6',
}));
const changeMode = (newMode) => {
  mode.value = newMode.toString(); // 设置新的 mode 值
};

const ChangerRegisterMode = () => {
  RegisterMode.value = !RegisterMode.value;
}

const props = defineProps({
  lyrics: Object,
  gradient: Object,
})

const lyrics = props.lyrics
const gradient = props.gradient
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
const isFull = ref(false);
const audioPlayer = ref(null);
const isPlaying = ref(true);
//当前播放时间和总时间
const currentTime = ref("0:00");
const duration = ref("0:00");
//当前播放时间和总时间（秒）
const durationInSeconds = ref(0);
const currentTimeInSeconds = ref(0);
//将当前播放歌曲和外部绑定
const curIndex = defineModel("curIndex")
const lyric = ref(parseLRC(lyrics[0]))
const currentMusic = ref(musicList.value[curIndex.value])
const playerMode = ref(0)

function changeSize() {
  if (currentMusic.value.lyric !== null) {
    fetchAndFormatLyrics(currentMusic.value.lyric);
  }
  if (cantransformtofull.value) {
    isFull.value = !isFull.value;
  }
}

//监控当前播放歌曲变化
watch(curIndex, () => {
  let index = curIndex.value;
  currentMusic.value = musicList.value[index];
  if (currentMusic.value.lyric !== null) {
    fetchAndFormatLyrics(currentMusic.value.lyric);
  }
  isPlaying.value = true;
  console.log(lyric.value);
  const id = currentMusic.value.id;
  updateusersonglist(id);
})


const refresh = () => {
  let index = curIndex.value;
  currentMusic.value = musicList.value[index];
  console.log(musicList.value)
  if (currentMusic.value.lyric !== null) {
    fetchAndFormatLyrics(currentMusic.value.lyric);
  }
  isPlaying.value = true;
}

//播放设置
function handleModeChange() {
  if (playerMode.value === 0) {
    nextSong();
  } else if (playerMode.value === 1) {
    audioPlayer.value.currentTime = 0;
    audioPlayer.value.play();
  } else {
    randomSong();
  }
}

//上一首
function backSong() {
  const length = musicList.value.length;
  const index = (curIndex.value - 1 + length) % length;
  curIndex.value = index;
  refresh();
}

const formattedLyrics = ref([]);
const fetchAndFormatLyrics = async (lrcUrl) => {
  try {
    const response = await axios.get(lrcUrl);
    lyric.value = formatLyrics(response.data);
    flag.value = true;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    flag.value = true;
  }
};

const flag = ref(false);

const formatLyrics = (rawLyrics) => {
  // 用正则表达式匹配时间部分，并将毫秒位变成两位数
  const formattedLyrics = rawLyrics.replace(/\[(\d+:\d+\.)(\d{2,3})\]/g, (match, time, ms) => {
    // 截取毫秒位的前两位
    const truncatedMs = ms.slice(0, 2);
    // 返回替换后的时间字符串
    return `[${time}${truncatedMs}]`;
  });

  return parseLRC(formattedLyrics);
};

//下一首
function nextSong() {
  const length = musicList.value.length;
  const index = (curIndex.value + 1) % length;
  curIndex.value = index;
  console.log(musicList.value);
  refresh();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//随机选取
function randomSong() {
  const length = musicList.value.length;
  const index = getRandomInt(length)
  // currentMusic.value = musicList[index];
  // lyric.value = parseLRC(lyrics[index]);
  // isPlaying.value = true;
  curIndex.value = index;
}

const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

function parseLRC(lrc) {
  const lines = lrc.split("\n");
  const lyrics = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;

  lines.forEach((line) => {
    const match = timeRegex.exec(line);
    if (match) {
      const minute = parseInt(match[1]);
      const second = parseInt(match[2]);
      const millisecond = parseInt(match[3]);
      const timestamp = minute * 60 + second + millisecond / 1000;
      const text = match[4].trim();
      lyrics.push({timestamp, text});
    }
  });
  return lyrics;
}

const songlists = ref([
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
  {
    cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
    title: 'name'
  },
]);

const updateTime = () => {
  const audio = audioPlayer.value;
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.floor(audio.currentTime % 60);
  currentTime.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  minutes = Math.floor(audio.duration / 60);
  seconds = Math.floor(audio.duration % 60);
  duration.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  currentTimeInSeconds.value = audio.currentTime;
  durationInSeconds.value = audio.duration;
};
const username = ref('点击登录')
const HasLogin = ref(false);
const changeModex = () => {
  mode.value = '1';
}

const refreshNewest_Songs_Page=()=>{
  axios.get('http://182.92.100.66:5000/recommend/latest')
      .then(response => {
        songlistlast.value = response.data.data;
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration)
        }
        axios.get('http://182.92.100.66:5000/like/songs',{
          params:{
            'username':username.value,
          }
        })
            .then(response2=>{
              userlike.value=response2.data.songs;
              console.log(userlike.value);
              let length2=userlike.value.length;
              for(let i=0;i<length;++i){
                for(let j=0;j<length2;++j){
                  if(songlistlast.value[i].id===userlike.value[j].id){
                    songlistlast.value[i].user_like=true;
                  }
                }
              }
              console.log(songlist.value);
            })
            .catch(error=>{
              console.log(error.response.data);
            })
      })
      .catch(error => {
        console.log(error.data.message);
      })
}


const needshowsonglistpage = ref(false);

const cantransformtofull = ref(false);

function getsonglistinit(id) {
  GetUserLike();
  axios.get('http://182.92.100.66:5000/feature/recent', {
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
        currentMusic.value = musicList.value[curIndex.value];
        datax.value = response.data.data.songs;
        console.log(musicList.value);
      })
      .catch(error => {
        console.log("get init songlist fail");
      })
  axios.get('http://182.92.100.66:5000/songlists/initdata')
      .then(response => {
        songlists.value = response.data.data;
        let length = songlists.value;
        for (let i = 0; i < length; ++i) {
          songlists.value[i].duration = gettime(songlists.value[i].duration)
        }
      })
      .catch(error => {
        console.log('查不到歌单');
      })
  axios.get('http://182.92.100.66:5000/recommend/latest')
      .then(response => {
        songlistlast.value = response.data.data;
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration)
        }
        let length2=userlike.value.length;
        for(let i=0;i<length;++i){
          for(let j=0;j<length2;++j){
            if(songlistlast.value[i].id===userlike.value[j].id){
              songlistlast.value[i].user_like=true;
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
  const dateString = date.toISOString().slice(0, 10);
  return dateString;
}

const GetUserLike=()=>{
  axios.get('http://182.92.100.66:5000/like/songs',{
    params:{
      'username':username.value,
    }
  })
      .then(response=>{
        userlike.value=response.data.songs;
        console.log(userlike.value);
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

const userdata = ref([]);
const getuserdata = () => {
  const web = 'http://182.92.100.66:5000/users/info/' + username.value;
  axios.get(web)
      .then(response => {
        console.log(response.data.data);
        userdata.value = response.data.data;
      })
      .catch(error => {
        console.log(error.data);
      })
}

const songlist = ref([{
  cover: 'http://182.92.100.66:5000/media/covers/%E5%BD%93%E7%A6%BB%E5%88%AB%E5%BC%80%E5%87%BA%E8%8A%B1.webp',
  title: 'name'
}]);

function ChangeSongList(id) {
  const web = 'http://182.92.100.66:5000/songlists/info/' + index.value;
  axios.get(web)
      .then(response => {
        musicList.value = response.data.data.songs;
        curIndex.value = 0;
        currentMusic.value = musicList.value[curIndex.value]
        datax.value = response.data.data.songs;
      })
      .catch(error => {
        console.log("get init songlist fail");
      })
}


function changesonglist() {
  needshowsonglistpage.value = true;
  const web = 'http://182.92.100.66:5000/songlists/info/' + index.value;
  axios.get(web)
      .then(response => {
        songlist.value = response.data.data;
        songlist.value.create_date = extractDate(songlist.value.create_date)
        let length = songlist.value.songs.length;
        console.log(length);
        for (let i = 0; i < length; ++i) {
          songlist.value.songs[i].duration = gettime(songlist.value.songs[i].duration)
        }
        axios.get('http://182.92.100.66:5000/like/songs',{
          params:{
            'username':username.value,
          }
        })
            .then(response2=>{
              userlike.value=response2.data.songs;
              console.log(userlike.value);
              let length2=userlike.value.length;
              for(let i=0;i<length;++i){
                for(let j=0;j<length2;++j){
                  if(songlist.value.songs[i].id===userlike.value[j].id){
                    songlist.value.songs[i].user_like=true;
                  }
                }
              }
              console.log(songlist.value.songs);
            })
            .catch(error=>{
              console.log(error.response.data);
            })
      })
      .catch(error => {
        console.log("get init songlist fail");
      })
}


const songlistsearch=ref([]);
const SearchContent=ref('');
const ShowSearchView=ref(false);


const SearchOperation = () => {
  axios.get('http://182.92.100.66:5000/songs/search', {
    params: {
      keyword: SearchContent.value
    }
  })
      .then(response => {
        console.log(response.data.data);
        ShowSearchView.value = true;
        songlistsearch.value = response.data.data;
        let length = songlistsearch.value.length;
        for (let i = 0; i < length; ++i) {
          songlistsearch.value[i].duration = gettime(songlistsearch.value[i].duration)
        }
        axios.get('http://182.92.100.66:5000/like/songs',{
          params:{
            'username':username.value,
          }
        })
            .then(response2=>{
              userlike.value=response2.data.songs;
              console.log(userlike.value);
              let length2=userlike.value.length;
              for(let i=0;i<length;++i){
                for(let j=0;j<length2;++j){
                  if(songlistsearch.value[i].id===userlike.value[j].id){
                    songlistsearch.value[i].user_like=true;
                  }
                }
              }
            })
            .catch(error=>{
              console.log(error.response.data);
            })
      })
      .catch(error => {
        console.log(error.data.message);
      })
}

const index = ref('1');
const datax = ref([]);
watch(index, () => {
  changesonglist();
})

function handlePlayNow(id) {
  const web = 'http://182.92.100.66:5000/songs/info/' + id;
  axios.get(web)
      .then(response => {
        let newmusic = response.data.data;
        const idx = newmusic.id;
        let length = musicList.value.length;
        for (let i = 0; i < length; i = i + 1) {
          if (musicList.value[i].id === idx) {
            curIndex.value = i;
            currentMusic.value = musicList.value[curIndex.value];
            return;
          }
        }
        musicList.value.push(newmusic);
        curIndex.value = musicList.value.length - 1;
        datax.value = musicList.value;
        currentMusic.value = musicList.value[curIndex.value]
      })
      .catch(error => {
        console.log('error');
      })
}

function handlePlayAfter(id) {
  const web = 'http://182.92.100.66:5000/songs/info/' + id;
  axios.get(web)
      .then(response => {
        let newmusic = response.data.data;
        const idx = newmusic.id;
        let length = musicList.value.length;
        for (let i = 0; i < length; i = i + 1) {
          if (musicList.value[i].id === idx) {
            curIndex.value = i;
            currentMusic.value = musicList.value[curIndex.value];
            return;
          }
        }
        musicList.value.push(newmusic);
        console.log(curIndex.value);
        datax.value = musicList.value;
        currentMusic.value = musicList.value[curIndex.value]
      })
      .catch(error => {
        console.log(error.data.message);
      })
}

const updateusersonglist = (songid) => {
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('song_id', songid);
  axios.post('http://182.92.100.66:5000/feature/addrecent', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.data);
      })
}

const LoginArea = () => {
  if (HasLogin.value === true) {
    getuserdata();
  }
  changeMode(0);
}

const avatar = ref('');

const getPageinit = () => {
  axios.get('http://182.92.100.66:5000/songlists/initdata')
      .then(response => {
        songlists.value = response.data.data;
        let length = songlists.value.length;
        for (let i = 0; i < length; ++i) {
          songlists.value[i].duration = gettime(songlists.value[i].duration);
        }
      })
      .catch(error => {
        console.log('查不到歌单');
      })
  axios.get('http://182.92.100.66:5000/recommend/latest')
      .then(response => {
        songlistlast.value = response.data.data;
        let length = songlistlast.value.length;
        for (let i = 0; i < length; ++i) {
          songlistlast.value[i].duration = gettime(songlistlast.value[i].duration);
        }
      })
      .catch(error => {
        console.log(error.data.message);
      })
  GetHomePageRecommendLatest();
}

const HomePageRecommendLatest=ref([]);

const GetHomePageRecommendLatest=()=>{
  axios.get('http://182.92.100.66:5000/recommend/latest',{
    params:{
      'num':10,
    }
  })
      .then(response=>{
        console.log(response.data.data);
        HomePageRecommendLatest.value=response.data.data;
        let length = HomePageRecommendLatest.value.length;
        for (let i = 0; i < length; ++i) {
          HomePageRecommendLatest.value[i].duration = gettime(HomePageRecommendLatest.value[i].duration);
        }
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

const updateavatar=()=>{
  const web='http://182.92.100.66:5000/users/info/'+username.value;
  axios.get(web)
      .then(response=>{
        avatar.value=response.data.data.avatar;
      })
      .catch(error=>{
        console.log(error.response.data);
      })
}

onMounted(getPageinit);

let createdSonglists;
let chooseSonglist;
const showCreatedSonglists = ref("false");
const listCreatedSonglists = () => {
  const formData = new FormData();
  formData.append('username', username.value);
  axios.get("http://182.92.100.66:5000/users/songlists?username=" + username.value)
      .then(function (response) {
        if (response.data.success === true) {
          createdSonglists = response.data.data;
          showCreatedSonglists.value = true;
        }
      })
      .catch(function (error) {
        console.log("error");
      })
};

function activeSonglist(choose) {
  showCreatedSonglists.value = false;
  chooseSonglist = choose;
  showCreatedSonglists.value = true;
}

</script>

<template>
  <div class="flex w-full h-screen bg-zinc-900">
    <div class="w-1/6 h-screen fixed hidden lg:block" style="background-color:#2E2E30">
      <div
          class="group flex antialiased w-full mt-3 hover:text-blue-500 my-1 font-medium text-white transition ease-in duration-400 bg-yellow-95000 text-base"
          style="height:60px; line-height: 60px" @click="LoginArea">
        <svg t="1713667739578" class="icon inline fill-white transition ease-in duration-400 my-auto ml-4"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5760" width="32" height="32" v-if="!HasLogin||avatar===''">
          <path
              d="M512 625.777778c-159.288889 0-284.444444-125.155556-284.444444-284.444445s125.155556-284.444444 284.444444-284.444444 284.444444 125.155556 284.444444 284.444444-125.155556 284.444444-284.444444 284.444445z m0-56.888889c125.155556 0 227.555556-102.4 227.555556-227.555556s-102.4-227.555556-227.555556-227.555555-227.555556 102.4-227.555556 227.555555 102.4 227.555556 227.555556 227.555556z"
              p-id="5761"></path>
          <path
              d="M56.888889 1024c0-250.311111 204.8-455.111111 455.111111-455.111111s455.111111 204.8 455.111111 455.111111h-56.888889c0-221.866667-176.355556-398.222222-398.222222-398.222222s-398.222222 176.355556-398.222222 398.222222H56.888889z"
              p-id="5762"></path>
        </svg>
        <img v-if="HasLogin&&avatar!==''" :src="avatar"
             class="inline transition ease-in duration-400 my-auto ml-4 aspect-square w-12 h-12 rounded-full"
             alt="头像">
        <span class="px-5">{{ username }}</span>
        <svg t="1713669026081"
             class="icon inline fill-white group-hover:fill-blue-800 transition ease-in duration-400 justify-end my-auto mr-0"
             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="6750" width="20" height="20">
          <path
              d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z"
              p-id="6751"></path>
        </svg>
      </div>
      <div
          :class="containerClass1" @click="changeMode(1)">
        <svg t="1713669552767" class="icon inline fill-white my-auto" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="8112" width="16" height="16">
          <path
              d="M640 896h192V469.376h42.666667V896.213333c0 23.466667-19.029333 42.474667-42.666667 42.474667H597.333333V725.333333h-170.666666v213.333334H192c-23.573333 0-42.666667-18.986667-42.666667-42.453334V469.354667h42.666667V896h192V682.666667h256v213.333333z"
              p-id="8113"></path>
          <path
              d="M100.032 506.133333a21.333333 21.333333 0 1 1-29.397333-30.933333L466.282667 99.349333a66.688 66.688 0 0 1 91.434666 0L953.386667 475.2a21.333333 21.333333 0 1 1-29.397334 30.933333L528.341333 130.282667a24.021333 24.021333 0 0 0-32.682666 0L100.053333 506.133333zM832 192h-128a21.333333 21.333333 0 0 1 0-42.666667h149.333333a21.333333 21.333333 0 0 1 21.333334 21.333334v149.333333a21.333333 21.333333 0 0 1-42.666667 0V192z"
              p-id="8114"></path>
        </svg>
        <span class="px-4 font-medium">首页</span>
      </div>
      <div
          :class="containerClass2" @click="changeMode(2)">
        <svg t="1713669793815" class="icon inline fill-white my-auto" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="9427" width="16" height="16">
          <path
              d="M512 64c60.5 0 119.2 11.8 174.4 35.2 53.3 22.6 101.3 54.9 142.4 96 41.2 41.2 73.5 89.1 96 142.4C948.2 392.8 960 451.5 960 512s-11.8 119.2-35.2 174.4c-22.6 53.3-54.9 101.3-96 142.4-41.2 41.2-89.1 73.5-142.4 96C631.2 948.2 572.5 960 512 960s-119.2-11.8-174.4-35.2c-53.3-22.6-101.3-54.9-142.4-96-41.2-41.2-73.5-89.1-96-142.4C75.8 631.2 64 572.5 64 512s11.8-119.2 35.2-174.4c22.6-53.3 54.9-101.3 96-142.4s89.1-73.5 142.4-96C392.8 75.8 451.5 64 512 64m0-64C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z"
              p-id="9428"></path>
          <path
              d="M683.4 305.8c19.9-1.8 36.6 14.9 34.7 34.9-1.2 13-2.8 26.8-5.1 41.2-6.9 44.5-18 85.3-32.9 121.3-17.8 43.1-41.2 79.3-69.5 107.6-42 42-100.5 72.7-174 91.3-34.1 8.6-67 13.5-96.2 16.2-19.9 1.8-36.6-14.9-34.7-34.9 1.2-13 2.8-26.8 5.1-41.2 6.9-44.5 18-85.3 32.9-121.3 17.8-43.1 41.2-79.3 69.5-107.6 42-42 100.5-72.7 174-91.3 34.2-8.6 67.1-13.5 96.2-16.2z m63.6-67c-78.3 0-263.1 13.2-379 129.2-119.2 119.2-129.8 311.3-129.1 385.4 0.2 17.4 14.2 31.5 31.7 31.7h6.5c78.3 0 263.1-13.2 379-129.2 119.2-119.2 129.8-311.3 129.1-385.4-0.2-17.4-14.2-31.5-31.7-31.7-2.1 0.1-4.3 0-6.5 0z"
              p-id="9429"></path>
          <path d="M512 464c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" p-id="9430"></path>
        </svg>
        <span class="px-4 font-medium">探索</span>
      </div>
      <div
          :class="containerClass3" @click="changeMode(3)">
        <svg t="1713669835359" class="icon inline fill-white my-auto" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="10418" width="16" height="16">
          <path
              d="M545.784454 962.539206l-65.943898 0c-29.341259 0-54.624085-25.281803-54.624085-54.615898L425.216471 868.462574c0-9.623171-7.826246-20.911262-16.690124-23.680329l-1.566682-0.611937-55.725162-23.104207-0.880043-0.494257c-8.153704-4.41045-22.017456-2.376117-28.55229 4.187369l-28.17469 28.123524c-9.930163 9.977235-23.239284 15.494902-37.432541 15.494902-14.195304 0-27.507494-5.517667-37.487799-15.541975l-46.682205-46.630017c-20.60427-20.603247-20.6319-54.233182-0.069585-74.974575l28.15013-28.106128c6.637164-6.574742 8.676613-20.599154 4.253884-28.909423l-0.831948-1.768273-23.164582-56.128345-0.26913-0.682545c-2.803859-9.03477-14.279215-17.394159-23.611767-17.394159l-39.631626 0c-29.391401 0-52.861952-24.065092-52.861952-53.193503l0-65.943898c0-28.770254 22.998807-51.754734 52.919257-51.754734l39.575344 0c9.081843 0 20.803815-8.830109 23.666002-18.057261l0.567935-1.476631 23.163559-57.088206 0.505513-0.913812c4.40431-8.220219 2.319835-22.224164-4.2897-28.830629l-28.04166-28.087709c-9.964956-9.921977-15.486716-23.216771-15.502066-37.396725-0.01535-14.201443 5.492084-27.53717 15.507182-37.552268l46.6556-46.614667c9.94142-9.985422 23.248494-15.503089 37.432541-15.503089 0.001023 0 0 0 0.001023 0 14.184047 0 27.490098 5.51869 37.46938 15.540951l28.039613 28.05087c6.557346 6.525624 20.500916 8.596795 28.655643 4.231371l0.893346-0.478907 57.375755-23.64963c8.836249-2.731204 16.634866-14.037714 16.634866-23.719214l0-39.632649c0-28.967752 24.777313-52.095495 54.624085-52.095495L545.784454 64.076364c29.161157 0 52.370765 22.636556 52.370765 52.095495l0 39.632649c0 9.127891 8.709359 20.85498 17.767666 23.674189l1.51654 0.577145 56.639998 23.113417 0.923022 0.509606c8.202822 4.424776 22.184255 2.353604 28.788673-4.254907l28.163433-27.912723c9.895371-9.94142 23.179932-15.33936 37.352723-15.33936 0.019443 0 0.040932 0 0.060375 0 14.18814 0 27.508517 5.375427 37.516452 15.384385l46.709835 46.554292c10.004865 9.960863 15.524578 23.254633 15.524578 37.47552 0 14.18814-5.498224 27.506471-15.479553 37.532825l-28.16855 28.152177c-6.580882 6.610558-8.640798 20.771069-4.204765 29.107945l0.478907 0.896416 23.654746 57.956993c2.902096 9.255805 14.635325 18.114566 23.686469 18.114566l39.132252 0 0-0.573051c27.629267 0 52.188616 22.984481 52.188616 52.327786l0 65.998133c0 29.590945-22.985504 53.138244-51.746548 53.138244l-39.630602 0c-9.337669 0-20.84884 8.372691-23.686469 17.423835l-0.580215 1.51654-23.086811 56.240909-0.468674 0.860601c-4.419659 8.30413-2.393513 22.320355 4.169973 28.855188l28.135804 28.02017c10.031471 10.029424 15.539928 23.350824 15.537881 37.541011-0.004093 14.186094-5.514597 27.505447-15.518438 37.505195l-46.747697 46.682205c-9.920954 9.964956-23.219841 15.506159-37.406958 15.506159-0.019443 0-0.040932 0-0.060375 0-14.192234 0-27.514657-5.514597-37.518498-15.517415l-28.039613-28.095895c-6.490831-6.490831-20.807908-8.575306-28.887934-4.206812l-0.951675 0.514723-57.93755 23.680329c-9.087982 2.859118-17.823947 14.594393-17.823947 23.691585l0 39.460734C598.155219 937.76394 574.45954 962.539206 545.784454 962.539206zM421.86719 806.892287c25.192775 8.370645 44.282552 34.650171 44.282552 61.570287l0 39.460734c0 7.114025 6.569626 13.68365 13.691837 13.68365L545.784454 921.606958c6.496971 0 12.461823-6.043646 12.461823-13.68365L558.246277 868.462574c0-26.273387 19.516496-53.131081 44.901653-61.58052l53.859675-22.062482c23.62814-12.116969 56.342216-7.098675 75.118861 11.6749l28.009937 28.1532c2.432399 2.430352 5.678326 3.837398 9.179057 3.837398 0.00614 0 0.011256 0 0.01535 0 3.482311 0 6.726192-1.39886 9.135054-3.820002l46.780443-46.738487c2.436492-2.436492 3.783163-5.724375 3.78521-9.224082 0-3.495614-1.344624-6.774287-3.787256-9.216919l-28.106128-27.998681c-18.693758-18.609847-23.762193-51.349505-11.773138-75.036997l22.083971-53.603849c8.374738-25.167193 35.224246-44.51382 61.578474-44.51382l39.630602 0c7.745405 0 10.8143-7.086395 10.8143-13.229303l0-65.998133c0-6.862291-5.116531-12.07399-11.256368-12.302187l0 1.479701-39.132252 0c-26.236548 0-53.099359-20.149922-61.585637-45.735647l-22.083971-54.261834c-11.960403-23.654746-6.913457-56.502875 11.728112-75.228355l28.16855-28.192086c2.430352-2.441609 3.78828-5.764284 3.78828-9.295714 0-3.498684-1.334391-6.762007-3.759627-9.17394l-46.741557-46.577828c-2.462075-2.462075-5.736655-3.734044-9.234315-3.734044-0.004093 0-0.010233 0-0.013303 0-3.465938 0-6.700609 1.255597-9.105379 3.671623l-28.198226 28.037567c-18.703991 18.710131-51.417043 23.734564-75.000158 11.69025l-53.865815-22.072715c-25.403576-8.388041-44.934398-35.255968-44.934398-61.60508l0-39.632649c0-7.253194-5.517667-12.186554-12.461823-12.186554l-65.943898 0c-7.517207 0-13.691837 5.51869-13.691837 12.186554l0 39.632649c0 27.027563-19.107173 53.336766-44.325531 61.643965l-53.501518 21.99699c-23.834848 12.168134-55.857169 7.234775-74.878384-11.69639l-28.130687-28.115338c-2.441609-2.451842-5.690606-3.787256-9.152451-3.787256-3.462868-0.001023-6.704702 1.334391-9.117658 3.758604l-46.690392 46.64639c-2.438539 2.438539-3.784186 5.710049-3.781116 9.207709 0.004093 3.474125 1.339508 6.716982 3.762697 9.128915l28.068266 28.121478c18.698874 18.690688 23.782659 51.389414 11.808954 74.973552l-22.124903 54.813397c-8.413624 25.616424-35.281551 45.783743-61.603033 45.783743l-39.575344 0c-6.630001 0-13.010315 3.411703-13.010315 10.822486l0 65.943898c0 6.942109 5.753027 13.284561 12.95301 13.284561l39.631626 0c26.380834 0 53.195549 19.35072 61.524239 44.537356l22.182208 53.629431c12.027941 23.731494 6.918573 56.449663-11.863189 75.05644l-28.022217 27.949562c-5.021364 5.066389-5.048993 13.348006 0.010233 18.409279l46.713928 46.653553c2.452865 2.464121 5.695722 3.794419 9.168824 3.794419 3.472078 0 6.711865-1.336438 9.124821-3.759627l28.181853-28.122501c18.641569-18.730597 51.440579-23.752983 75.011414-11.642155L421.86719 806.892287z"
              p-id="10419"></path>
          <path
              d="M513.734504 731.880873c-120.639614 0-218.786958-98.147344-218.786958-218.786958s98.147344-218.786958 218.786958-218.786958 218.786958 98.147344 218.786958 218.786958S634.375142 731.880873 513.734504 731.880873zM513.734504 334.324368c-98.573039 0-178.769546 80.195483-178.769546 178.769546s80.195483 178.769546 178.769546 178.769546 178.769546-80.195483 178.769546-178.769546S612.308567 334.324368 513.734504 334.324368z"
              p-id="10420"></path>
        </svg>
        <span class="px-4 font-medium">设置</span>
      </div>
      <div :class="containerClass4" @click="changeMode(4)">
        <svg t="1713772424829" class="icon inline fill-white my-auto" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="2447" width="16" height="16">
          <path
              d="M374 4q-17 1-32 8-36 16-50.5 53t1.5 73h-91q-30 2-50 24t-20 52v121q2 19 12 35t26 25v265q2 30 17.5 55t41.5 39q26 14 56 14h465q30-2 54.5-17.5t39-41.5q14.5-26 14.5-55V395l5-3q15-11 24-27.5t9-35.5V208q-2-30-24-50t-52-20h-85l3-8q5-15 5-31 0-39-28-67T648 4h-15q-22 2-41 12t-33 27l-45 56-50-62q-15-16-34.5-24.5T388 4h-14z m111 707H285q-24 0-41-17t-17-40V405h258v306z m315-52q-2 22-18.5 37T743 711H543V405h258l-1 254zM485 348H208q-8 0-13.5-5.5T189 329V214q0-8 5.5-13.5T208 195h277v153z m335-153q8 0 13.5 5.5T839 214v115q0 8-5.5 13.5T820 348H543V195h277zM648 61q16 0 27 11.5t11 27q0 15.5-11 27T648 138h-91l47-59q14-18 36-18h8z m-260 0q22 0 36 17l47 60h-91q-16 0-27-11.5t-11-27q0-15.5 11-27T380 61h8z"
              p-id="2448">
          </path>
        </svg>
        <span class="px-4 font-medium">创作中心</span>
      </div>
      <div :class="containerClass5" @click="changeMode(5)">
        <svg t="1714138297308" class="icon inline fill-white my-auto" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="2360" width="16" height="16">
          <path
              d="M513.994 950.637c-119.023 0-230.918-46.127-315.082-129.876C114.714 736.94 68.335 625.526 68.335 506.95c0-118.547 46.381-229.991 130.547-313.776 84.165-83.752 196.057-129.877 315.08-129.877s230.918 46.125 315.044 129.877C913.24 276.959 959.59 388.404 959.59 506.92c0.03 118.577-46.351 230.02-130.584 313.8-84.096 83.75-195.99 129.917-315.012 129.917z m0-823.71c-102.087 0-198.033 39.537-270.164 111.353C171.727 310.03 132 405.463 132 506.95c0 101.487 39.694 196.914 111.797 268.638C315.93 847.4 411.872 886.933 513.961 886.933c102.056 0 198.032-39.534 270.163-111.345 72.1-71.784 111.832-167.192 111.797-268.673 0-101.484-39.697-196.885-111.797-268.606-72.102-71.812-168.078-111.382-270.13-111.382z m222.828 348.19H545.826V284.12c0-17.573-14.26-31.833-31.833-31.833s-31.833 14.26-31.833 31.833v190.998H291.164c-17.573 0-31.833 14.26-31.833 31.833 0 17.567 14.26 31.833 31.833 31.833H482.16V729.78c0 17.606 14.262 31.831 31.835 31.831 17.576 0 31.83-14.225 31.83-31.831V538.783h190.997c17.607 0 31.833-14.266 31.833-31.833 0-17.578-14.226-31.833-31.833-31.833z"
              p-id="2361"></path>
        </svg>
        <span class="px-4 font-medium">创建歌单</span>
      </div>
      <!--用户创建的歌单-->
      <div class="collapse bg-zinc-700 rounded-md" @click="listCreatedSonglists">
        <input type="checkbox"/>
        <span class="collapse-title text-white text-sm">
          创建的歌单
        </span>
        <div class="collapse-content">
          <div v-if="showCreatedSonglists">
            <div v-for="createdSonglist in createdSonglists" @click="changeMode(6); activeSonglist(createdSonglist)"
                 class="m-1 h-10 cursor-pointer overflow-hidden">
              <img :src="createdSonglist.cover" class="inline-block h-10 w-10 rounded-md"/>
              <span class="m-2 text-gray-400 hover:text-white"> {{ createdSonglist.title }} </span>
            </div>
          </div>
        </div>
      </div>
      <!--      <div :class="containerClass6">-->
      <!--        <details>-->
      <!--          <summary class="cursor-pointer text-white" @click="listCreatedSonglists">-->
      <!--            <p class="inline-block text-white px-4 font-medium">创建的歌单</p>-->
      <!--          </summary>-->
      <!--          <div v-if="showCreatedSonglists">-->
      <!--            <div v-for="createdSonglist in createdSonglists" @click="changeMode(6); activeSonglist(createdSonglist)" class="m-1 h-10 cursor-pointer overflow-hidden">-->
      <!--              <img :src="createdSonglist.cover" class="inline-block h-10 w-10 rounded-md"/>-->
      <!--              <span class="m-2 text-gray-400 hover:text-white"> {{ createdSonglist.title }} </span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </details>-->
      <!--      </div>-->
      <div
          class="antialiased text-sm block h-10 my-1 text-white leading-10 transition ease-in duration-400 px-4 hover:bg-gray-600/40 ml-2 mr-2 rounded-md">
        <span class="px-4 font-medium">收藏的歌单</span>
      </div>
    </div>
    <div class="lg:w-1/6 w-0 h-full mr-0"></div>
    <div class="w-full lg:w-5/6 h-full mr-0">
      <div class="bg-zinc-900 h-screen overflow-auto">
        <div v-if="mode==='0'&&!HasLogin" class="w-full h-full z-50">
          <Login v-if="!RegisterMode" @ChangerRegisterMode="ChangerRegisterMode" v-model:username="username"
                 @changeMode="changeModex" v-model:HasLogin="HasLogin" @getsonglistinit="getsonglistinit"
                 v-model:avatar="avatar"></Login>
          <Sign_up v-if="RegisterMode" @ChangerRegisterMode="ChangerRegisterMode" v-model:username="username"></Sign_up>
        </div>
        <Personal_Center v-model:userdata="userdata" v-model:HasLogin="HasLogin" v-model:username="username"
                         v-if="HasLogin&&mode==='0'" @updateavatar="updateavatar"></Personal_Center>
        <HomePage_Main v-model:songlist="songlist" v-model:needshowsonglistpage="needshowsonglistpage"
                       @handlePlayAfter="handlePlayAfter" @handlePlayNow="handlePlayNow" v-if="mode==='1'"
                       @ChangeSongList="ChangeSongList" v-model:SearchContent="SearchContent" v-model:ShowSearchView="ShowSearchView" v-model:songlistsearch="songlistsearch" @SearchOperation="SearchOperation"
                       v-model:songlists="songlists" v-model:index="index" v-model:username="username" v-model:userlike="userlike" @refreshNewest_Songs_Page="refreshNewest_Songs_Page"
                       v-model:songlistlast="songlistlast" v-model:HomePageRecommendLatest="HomePageRecommendLatest"></HomePage_Main>
        <ExplorePage_Main v-if="mode==='2'"></ExplorePage_Main>
        <SettingPage_Main v-if="mode==='3'"></SettingPage_Main>
        <CreateCenter v-if="mode==='4'" v-model:HasLogin="HasLogin" v-model:username="username"></CreateCenter>
        <CreateSonglistPage_Main v-if="mode==='5'" v-model:HasLogin="HasLogin"
                                 v-model:username="username"></CreateSonglistPage_Main>
        <CreatedSonglist :songlist="chooseSonglist" v-if="mode==='6'"></CreatedSonglist>
      </div>
    </div>
  </div>

  <audio
      :src="currentMusic.audio"
      ref="audioPlayer"
      class="hidden"
      @timeupdate="updateTime"
      @ended="handleModeChange"
      controls
      autoplay
      v-if="HasLogin"
  ></audio>

  <MusicPlayerView
      :key="1"
      :name="currentMusic.title"
      :singer="currentMusic.singer"
      :cover="currentMusic.cover"
      @fullsize="changeSize"
      @back="backSong"
      @next="nextSong"
      v-model:currentTime="currentTime"
      v-model:duration="duration"
      v-model:isPlaying="isPlaying"
      v-model:durationInSeconds="durationInSeconds"
      v-model:currentTimeInSeconds="currentTimeInSeconds"
      v-model:audioPlayer="audioPlayer"
      v-model:playerMode="playerMode"
      v-model:curIndex="curIndex"
      @togglePlay="togglePlay"
      v-if="!isFull&&mode==='1'&&HasLogin"
      :datax="datax"
  >
  </MusicPlayerView>

  <Transition name="slide" appear>
    <div v-if="isFull" key="musicPlay" class="transition-container z-50">
      <MusicPlayerFullView
          class="fixed top-0 left-0 w-full z-50"
          v-model:audioPlayer="audioPlayer"
          v-model:durationInSeconds="durationInSeconds"
          v-model:currentTime="currentTime"
          v-model:isPlaying="isPlaying"
          v-model:duration="duration"
          v-model:currentTimeInSeconds="currentTimeInSeconds"
          @fullsize="changeSize"
          :name="currentMusic.title"
          :singer="currentMusic.singer"
          :cover="currentMusic.cover"
          v-model:lyric="lyric"
          @update="updateTime"
          :sty="currentMusic.gradient"
          @togglePlay="togglePlay"
          @back="backSong"
          @next="nextSong"
      ></MusicPlayerFullView>
    </div>
  </Transition>


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

.transition-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>