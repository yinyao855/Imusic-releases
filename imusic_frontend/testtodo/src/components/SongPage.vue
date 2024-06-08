<script setup>
// 展示歌曲详细信息界面
import {defineModel, defineEmits, onMounted, ref, computed} from "vue";
import buttonchangesize from "@/components/ButtonChangeSizeRight.vue";
import axios from "axios";
import Complaint from "@/components/Complaint.vue";
import MyAlert from "@/js/MyAlert.js";
import {useUserStore} from "@/stores/user.js";

// global variables
const userStore = useUserStore();
const token = defineModel('token')
const username = defineModel('username')
const message = ref('');
const HasLogin = ref(computed(() => userStore.isLogin));
const showComment = ref(true);
const showComplaint = ref(false);
const complaintType = ref("songs")

// defineEmits(关闭当前页面/回到上一个页面展示歌单)
const emits = defineEmits(['handlePlayNow', 'CloseSong'])


// v-model
let songData;
const currentSongId = defineModel("currentSongId")
const lyrics = ref([]) // 存储歌词（字符串数组）
const loading = ref(true);

const isFavoriteSong = ref(false);
const likes = ref(0);

const isSubscribe = ref(false);
const isMe = ref(false);

// emits
function handlePlayNow(id) {
  emits('handlePlayNow', id)
}

const fullsize = () => {
  emits('CloseSong');
}

// global function: 获取歌曲时长
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

function getFavoriteSongs() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get("/like/songs?username=" + username.value)
      .then(function (response) {
        if (response.data.success === true) {
          let length = response.data.data.length;
          for (let i = 0; i < length; ++i) {
            if (response.data.data[i].id === currentSongId.value) {
              isFavoriteSong.value = true;
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 收藏此歌单
function addFavoriteSong() {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('song_id', currentSongId.value);
  instance.post('/like/songs/add', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSong.value = true;
          songData.like++;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 取消收藏此歌单
function deleteFavoriteSong() {
  if (HasLogin.value === false) {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('song_id', currentSongId.value);
  instance.post('/like/songs/delete', formData)
      .then(function (response) {
        if (response.data.success === true) {
          isFavoriteSong.value = false;
          songData.like--;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 获取歌曲详细信息
function getSongData() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  console.log(currentSongId.value)
  instance.get("/songs/info/" + currentSongId.value)
      .then(function (response) {
        if (response.data.success === true) {
          songData = response.data.data;
          fetchAndFormatLyrics(songData.lyric)
          loading.value = false;
          if (response.data.data.uploader === username.value) {
            isMe.value = true;
          }
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      })
}

// 从歌词url解析歌词，存储到字符串数组中lyrics
const fetchAndFormatLyrics = async (lrcUrl) => {
  try {
    const response = await axios.get(lrcUrl);
    console.log(response.data)
    const lines = response.data.split("\n");
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d+)](.*)/;

    lines.forEach((line) => {
      const match = timeRegex.exec(line);
      if (match) {
        const text = {
          time: `${match[1]}:${match[2]}.${match[3]}`,
          text: match[4].trim()
        };
        lyrics.value.push(text);
      }
      console.log(lyrics.value)
    });
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
};

function convertLyricsToLRC(lyricsArray) {
  let lrcContent = '';
  for (const lyric of lyricsArray) {
    lrcContent += `[${lyric.time}]${lyric.text}\n`;
  }
  return lrcContent;
}

function downloadLrcFile() {
  if (lyrics.value.length === 0) {
    MyAlert({type:'alert-warning',text:'未输入歌词'});
    return;
  }
  const lrcString = convertLyricsToLRC(lyrics.value);
  const filename = songData.title ? `${songData.title}.lrc` : 'lyrics.lrc';
  const lrcBlob = new Blob([lrcString], {type: 'text/plain'});
  const blobUrl = URL.createObjectURL(lrcBlob);
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.href = blobUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(blobUrl);
  document.body.removeChild(link);
}

// 判断是否需要展示该标签（若值为空表示没有此标签，不用展示false）
function show_tag(tag) {
  if (tag === 'null' || tag === null) return false;
  return true;
}

function getSubscribeUser() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/followings', {
    params: {
      'username': username.value
    }
  })
      .then(response => {
        let length = response.data.data.length;
        for (let i = 0; i < length; ++i) {
          if (response.data.data[i].username === songData.uploader) {
            isSubscribe.value = true;
            break;
          }
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

// 关注用户/取消关注
function handleSubscribeUser() {
  if (token.value === "") {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  if (isMe.value === true) {
    MyAlert({type: 'alert-warning', text: '不允许关注自己'})
    return;
  }
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('username', songData.uploader)
  instance.post('/users/follow', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  isSubscribe.value = !isSubscribe.value;
}

function activeShowComplaint() {
  if (token.value === "") {
    MyAlert({type:'alert-warning',text:'请先登录'});
    return;
  }
  showComplaint.value = true;
}

function closeComplaint() {
  showComplaint.value = false;
}

onMounted(getSongData)
onMounted(getFavoriteSongs);
onMounted(getSubscribeUser);
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="showComplaint">
      <Complaint v-model:complaintType="complaintType"
                 v-model:id="songData.id" v-model:title="songData.title"
                 @closeComplaint="closeComplaint"
                 v-model:token="token" v-model:username="username"></Complaint>
    </div>
  </transition>

  <div class="w-1 m-auto my-40" v-if="loading">
    <span class="loading loading-dots loading-lg"></span>
  </div>

  <!--  回到歌单界面-->
  <buttonchangesize v-if="!loading&&!showComplaint" class="left-4 top-4" @fullsize="fullsize"
                    v-model:token="token"></buttonchangesize>
  <!--  歌曲详细信息新界面-->
  <div v-if="!loading&&!showComplaint" class="mx-20">
    <div
        class="float-right dropdown dropdown-bottom transition duration-400 border-none z-50">
      <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
           width="32" height="32" tabindex="0" role="button">
        <path
            d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
            fill="white"></path>
      </svg>
      <ul tabindex="0"
          class="dropdown-content z-50 text-white text-sm"
          style="width:50px">
        <li class="">
          <!--          投诉歌单-->
          <div class="mt-3 cursor-pointer h-8 w-8 p-1 bg-gray-300 hover:bg-yellow-500 rounded-lg tooltip tooltip-left"
               data-tip="投诉">
            <svg @click="activeShowComplaint"
                 class="h-6 w-6 align-top text-yellow-600 hover:text-yellow-800" width="24" height="24"
                 viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <circle cx="12" cy="12" r="9"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <div class="inline-block mt-10">
      <img :src="songData.cover" alt="歌曲封面"
           class="mr-10 h-72 w-72 aspect-square rounded-xl border-gray-300 border-e-2 border-b-2">
      <div class="mt-3 text-white">
        <div @click="addFavoriteSong" v-if="!isFavoriteSong" class="inline-block">
          <svg class="fill-white my-auto inline-block align-sub mr-8 ml-2"
               viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path
                d="M744.0384 131.6864a209.5104 209.5104 0 0 1 190.976 124.8256c0.4096 0.9216 0.8192 1.9968 1.28 3.1232a241.0496 241.0496 0 0 1 15.0016 59.1872v0.9728a230.4 230.4 0 0 1 1.9456 30.72A247.04 247.04 0 0 1 880.64 526.0288l-363.52 363.52a9.0624 9.0624 0 0 1-6.5536 2.7136 8.9088 8.9088 0 0 1-6.3488-2.56l-359.0656-358.912a252.16 252.16 0 0 1-74.496-184.32v-0.3584A250.4704 250.4704 0 0 1 87.04 259.9424a208.896 208.896 0 0 1 259.6864-116.1216 217.856 217.856 0 0 1 111.36 93.1328A59.8528 59.8528 0 0 0 510.0032 266.24H517.12l6.8608-1.6896a61.696 61.696 0 0 0 34.0992-22.4256l1.792-2.4064 1.536-2.6112a198.912 198.912 0 0 1 21.76-30.1568l0.512-0.5632 0.512-0.5632c2.4064-2.8672 4.7616-5.5296 7.2192-8.0896 1.4336-1.536 3.072-3.2768 3.8912-3.9936l0.8192-0.8192 0.8192-0.768c2.9696-2.9696 5.12-5.12 7.68-7.2192 4.0448-3.5328 7.424-6.2976 10.24-8.4992l0.6144-0.4608 0.5632-0.4608c2.8672-2.2528 6.3488-4.6592 10.24-7.3728s8.2944-5.4272 11.776-7.424c3.5328-2.048 7.0656-3.9424 10.5984-5.7344a210.944 210.944 0 0 1 93.952-22.2208m0-57.4464A268.1856 268.1856 0 0 0 624.2816 102.4c-4.5568 2.304-9.1648 4.8128-13.7728 7.4752s-9.9328 6.144-14.8992 9.3696-9.5744 6.5536-14.1824 10.24-9.216 7.2704-13.6192 11.1104-7.424 6.656-11.0592 10.24c-2.5088 2.304-4.8128 4.8128-7.1168 7.2704-3.2256 3.4816-6.2976 6.912-9.3696 10.5472a258.048 258.048 0 0 0-28.16 38.8608 3.3792 3.3792 0 0 1-2.0992 1.3312 2.6624 2.6624 0 0 1-2.4576-1.3312 275.2512 275.2512 0 0 0-141.5168-117.76A266.24 266.24 0 0 0 34.0992 237.3632v0.3584a314.2144 314.2144 0 0 0 70.656 333.7216l358.9632 358.912a66.56 66.56 0 0 0 93.952 0l363.776-363.52a305.152 305.152 0 0 0 89.6-216.32 280.832 280.832 0 0 0-2.5088-38.2976 299.1616 299.1616 0 0 0-19.1488-74.8544c-0.3584-0.768-0.5632-1.3312-0.768-1.8944a266.9568 266.9568 0 0 0-244.6336-161.2288z"
            ></path>
          </svg>
        </div>
        <div @click="deleteFavoriteSong" v-if="isFavoriteSong" class="inline-block">
          <svg class="my-auto inline-block align-sub mr-8 ml-2" viewBox="0 0 1093 1024"
               xmlns="http://www.w3.org/2000/svg"
               width="20" height="20">
            <path
                d="M537.209749 246.735695c22.579939-125.653383 157.939631-190.594584 248.614765-187.827065 137.918426 6.636716 260.062434 134.142516 253.945461 284.241582a304.116193 304.116193 0 0 1-0.728528 11.660897c-0.071076 4.60661-0.017769 9.217661-0.284304 13.997519-12.802554 202.317673-142.422864 310.224281-261.164112 371.709414-198.697242 135.719514-243.279627 247.068863-243.279627 247.068864s-59.392835-104.637115-222.529894-243.301839c-117.524072-114.698804-260.457794-191.896162-267.343276-407.251828-0.155479-4.788742 0.519743-9.386467 0.839584-13.975308 0.008884-3.891408 0.053307-7.765047 0.21767-11.683108 6.094762-150.121277 140.699272-260.493332 278.62214-253.852174 80.497948 3.886966 183.442567 66.882463 213.090121 189.213046z"
                fill="#F06262"></path>
            <path
                d="M534.291193 1021.019253c-11.914105 0-22.961972-6.476795-28.919025-16.924959-0.57305-1.003948-59.437258-102.05617-215.169091-234.421788a32.757125 32.757125 0 0 1-1.692496-1.545902c-21.527126-21.007383-44.537963-41.259585-66.793618-60.841007C121.166714 618.800489 17.191494 527.299097 11.141154 338.10382c-0.17769-5.441752 0.266535-10.20384 0.617472-14.028614 0.071076-0.777393 0.146594-1.554786 0.208786-2.327737 0.017769-3.918061 0.07996-7.822796 0.244324-11.767511 3.162879-77.921445 37.328197-150.694327 96.205731-204.86308C167.908032 50.379517 248.086138 20.509852 325.723279 24.250223c75.087292 3.620431 161.249104 50.006368 211.157743 133.938173 53.031538-83.598636 155.283167-132.685459 243.32405-132.685459a218.274222 218.274222 0 0 1 7.223093 0.119941c75.407134 3.629315 149.757013 39.762548 203.983515 99.133172 55.932325 61.236367 84.93131 139.273311 81.652932 219.744605-0.146594 3.882523-0.422013 7.818354-0.715202 11.7453l-0.026653 2.634252a247.673009 247.673009 0 0 1-0.297631 11.798606c-11.030098 174.340404-104.303947 308.314115-277.280581 398.47395-184.362112 126.355258-229.157726 230.006195-229.593066 231.04568a33.125832 33.125832 0 0 1-28.630279 20.740849 31.260088 31.260088 0 0 1-2.230007 0.079961z m-200.061012-301.379769c102.136131 86.930321 164.607442 160.867071 197.990925 205.662684 33.152485-48.042895 100.083813-125.893265 226.581223-212.294958 1.115004-0.759624 2.27443-1.452615 3.473836-2.074529 154.061549-79.773862 233.622183-192.371483 243.230763-344.225236 0.151036-2.683117 0.159921-5.526155 0.182132-8.342539l0.044423-4.055771c0.008884-0.679664 0.03998-1.359327 0.093287-2.034549 0.266535-3.433857 0.524185-6.894367 0.65301-10.377087 5.179659-127.021595-98.511257-243.577258-221.956844-249.694232-75.882454-2.181143-195.338903 53.70676-214.520524 160.427289a33.316848 33.316848 0 0 1-31.793158 27.408661 33.272426 33.272426 0 0 1-33.37904-25.454072c-24.952098-102.953504-110.603052-160.316232-182.318679-163.776743a213.116774 213.116774 0 0 0-10.239378-0.244323c-56.958484 0-114.818744 23.1752-158.743677 63.586315-45.759581 42.09917-72.302003 98.41797-74.745239 158.579314a256.45533 256.45533 0 0 0-0.191017 10.403742c0 0.746297-0.026653 1.492595-0.07996 2.23445-0.111056 1.603651-0.25765 3.216186-0.404245 4.828721-0.213228 2.296641-0.413129 4.464458-0.368706 5.766036 5.126352 160.369539 89.87553 234.950415 188.004755 321.298802 22.611034 19.905706 45.981693 40.473307 68.486113 62.378025z"
                fill="#BF4C4C"></path>
          </svg>
        </div>
        <p class="inline-block"> {{ songData.like }} </p>
      </div>
    </div>
    <div class="inline-block align-top mt-10">
      <div>
        <h1 class="text-4xl text-white ">{{ songData.title }}</h1>
        <p class="text-gray-500 ml-1 mt-1">歌手：{{ songData.singer }}</p>
      </div>
      <div v-if="!isSubscribe&&!isMe" class="inline-block tooltip-left tooltip" data-tip="关注用户">
        <svg @click="handleSubscribeUser" class="cursor-pointer h-4 w-4 text-blue-400 inline-block mr-1" width="24"
             height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
          <path d="M16 11h6m-3 -3v6"/>
        </svg>
        <p @click="handleSubscribeUser" class="cursor-pointer mt-2 text-gray-300 inline-block">
          {{ songData.uploader }} ·</p>
      </div>
      <div v-if="isSubscribe&&!isMe" class="inline-block tooltip-left tooltip" data-tip="取消关注">
        <svg @click="handleSubscribeUser" class="cursor-pointer h-4 w-4 text-green-400 inline-block mr-1"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <polyline points="17 11 19 13 23 9"/>
        </svg>
        <p @click="handleSubscribeUser" class="cursor-pointer mt-2 text-gray-300 inline-block">
          {{ songData.uploader }} ·</p>
      </div>
      <div v-if="isMe" class="inline-block">
        <svg class="h-4 w-4 text-blue-400 inline-block mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
        </svg>
        <p class="mt-2 text-gray-300 inline-block">
          {{ songData.uploader }} ·</p>
      </div>
      <p class="ml-2 text-gray-300 inline-block">{{ extractDate(songData.upload_date) }} </p>
      <!--            标签-->
      <div>
        <div class="inline-block my-3 opacity-60">
          <div v-if="show_tag(songData.tag_theme)"
               class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
            {{ songData.tag_theme }}
          </div>
          <div v-if="show_tag(songData.tag_scene)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">
            {{ songData.tag_scene }}
          </div>
          <div v-if="show_tag(songData.tag_mood)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">
            {{ songData.tag_mood }}
          </div>
          <div v-if="show_tag(songData.tag_style)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">
            {{ songData.tag_style }}
          </div>
          <div v-if="show_tag(songData.tag_language)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">
            {{ songData.tag_language }}
          </div>
        </div>
      </div>
      <div>
        <details class="dropdown m-2 cursor-pointer">
          <summary class="text-white">简介</summary>
          <ul class="m-1 p-2 shadow menu dropdown-content z-[1] bg-base-100 text-gray-600 rounded-box w-96">
            <li><a>{{
                songData.introduction === 'null' || songData.introduction === null ? '无简介' : songData.introduction
              }}</a></li>
          </ul>
        </details>
      </div>
      <div class="mt-14">
        <!--            播放歌单中所有歌曲-->
        <button @click="handlePlayNow(songData.id)"
                class="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full">
          <svg class="h-5 w-5 inline-block align-sub text-white" viewBox="0 0 24 24" fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <p class="inline-block">播放</p>
        </button>
        <!--          导出歌词-->
        <button @click="downloadLrcFile(songData.lyric)"
                class="mr-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full">
          <svg class="h-5 w-5 inline-block align-sub text-white" width="24" height="24" viewBox="0 0 24 24"
               stroke-width="2"
               stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>
            <line x1="12" y1="11" x2="12" y2="17"/>
            <polyline points="9 14 12 17 15 14"/>
          </svg>
          <p class="inline-block">下载歌词</p>
        </button>
      </div>
    </div>
    <hr class="my-10">
    <div class="mt-10 ml-5">
      <div class="text-gray-700 my-5" style="font-size:25px">歌词：</div>
      <div v-if="lyrics.length === 0" class="text-gray-300 mt-1">
        <p>[ 无歌词 ]</p>
      </div>
      <div v-for="lyric in lyrics" class="text-gray-300 mt-1">
        <p>{{ lyric.text }}</p>
      </div>
    </div>
  </div>
  <div class="h-40"></div>
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
  height: 100%;
}
</style>