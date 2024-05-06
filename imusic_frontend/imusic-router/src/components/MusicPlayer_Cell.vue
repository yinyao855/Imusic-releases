<script setup>
import { ref, watch} from "vue";
import axios from "axios";
import MusicPlayerFullView from "@/views/MusicPlayerFullView.vue";
import MusicPlayerView from "@/views/MusicPlayerView.vue";

const props=defineProps(['HasLogin']);
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

const initCurrentMusic=(music)=>{
  currentMusic.value=music;
}

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

const currentTime=ref('0:00');
const duration=ref('0:00');
const isPlaying=ref(true);
const durationInSeconds=ref(0);
const currentTimeInSeconds=ref(0);
const audioPlayer=ref(null);
const playerMode=ref(0);
const curIndex=ref(0);
const token=defineModel('token');
const musicList = defineModel('musicList');
const isFull = ref(false);
const currentMusic = ref(musicList.value[curIndex.value])
const datax=defineModel('datax');
const lyric=ref([]);
const username=defineModel('username')
const cantransformtofull=defineModel('cantransformtofull')
const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

function handlePlayNow(id) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songs/info/' + id;
  instance.get(web)
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
        for (let i = 0; i < musicList.value.length; ++i) {
          if (musicList.value[i].audio === '' || musicList.value[i].audio === null) {
            musicList.value.splice(i, 1);
          }
        }
        musicList.value.push(newmusic);
        curIndex.value = musicList.value.length - 1;
        datax.value = musicList.value;
        currentMusic.value = musicList.value[curIndex.value]
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

function handlePlayAfter(id) {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songs/info/' + id;
  instance.get(web)
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
        for (let i = 0; i < musicList.value.length; ++i) {
          if (musicList.value[i].audio === '' || musicList.value[i].audio === null) {
            musicList.value.splice(i, 1);
          }
        }
        console.log(curIndex.value);
        datax.value = musicList.value;
        currentMusic.value = musicList.value[curIndex.value]
      })
      .catch(error => {
        console.log(error.data.message);
      })
}


const fetchAndFormatLyrics = async (lrcUrl) => {
  try {
    const response = await axios.get(lrcUrl);
    const formattedLyrics = response.data.replace(/\[(\d+:\d+\.)(\d{2,3})\]/g, (match, time, ms) => {
      const truncatedMs = ms.slice(0, 2);
      return `[${time}${truncatedMs}]`;
    });
    lyric.value = parseLRC(formattedLyrics);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
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

function nextSong() {
  const length = musicList.value.length;
  curIndex.value = (curIndex.value + 1) % length;
  console.log(musicList.value);
  refresh();
}

const refresh = () => {
  let index = curIndex.value;
  currentMusic.value = musicList.value[index];
  console.log(musicList.value)
  if (currentMusic.value.lyric !== null) {
    fetchAndFormatLyrics(currentMusic.value.lyric);
  }
  isPlaying.value = true;
}

function randomSong() {
  const length = musicList.value.length;
  curIndex.value = Math.floor(Math.random() * length);
}


function changeSize() {
  if (currentMusic.value.lyric !== null) {
    fetchAndFormatLyrics(currentMusic.value.lyric);
    updateTime();
  }
  if (cantransformtofull.value) {
    isFull.value = !isFull.value;
  }
}


const mode=defineModel('mode');

watch(curIndex, () => {
  let index = curIndex.value;
  currentMusic.value = musicList.value[index];
  if (currentMusic.value.lyric !== null) {
    fetchAndFormatLyrics(currentMusic.value.lyric);
  }
  isPlaying.value = true;
  const id = currentMusic.value.id;
  updateusersonglist(id);
})


const updateusersonglist = (songid) => {
  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('song_id', songid);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/feature/addrecent', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.data);
      })
}

function backSong() {
  const length = musicList.value.length;
  curIndex.value = (curIndex.value - 1 + length) % length;
  refresh();
}

defineExpose({handlePlayNow,handlePlayAfter,initCurrentMusic})
</script>

<template>
  <audio
      :src="currentMusic.audio"
      ref="audioPlayer"
      class="hidden"
      @timeupdate="updateTime"
      @ended="handleModeChange"
      controls
      autoplay
      v-if="(mode==='1'||mode==='6'||mode==='8'||mode==='2')&&HasLogin"
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
      v-model:token="token"
      @togglePlay="togglePlay"
      v-if="!isFull&&(mode==='1'||mode==='6'||mode==='8'||mode==='2')&&HasLogin"
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
          v-model:token="token"
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