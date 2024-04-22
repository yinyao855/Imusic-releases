<template>
    <audio
      :src="currentMusic.source"
      class="hidden"
      ref="audioPlayer"
      @timeupdate="updateTime"
      @ended="handleModeChange"
      controls
      autoplay
    ></audio>

    <div v-if="!isFull">
      <MusicPlayerView
        :key="1"
        :name="currentMusic.name"
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
        @togglePlay="togglePlay"
      >
      </MusicPlayerView>
    </div>

    <Transition name="slide" appear>
      <div v-if="isFull" key="musicPlay" class="transition-container">
        <MusicPlayFullView
          class="fixed top-0 left-0 w-full"
          v-model:audioPlayer="audioPlayer"
          v-model:durationInSeconds="durationInSeconds"
          v-model:currentTime="currentTime"
          v-model:isPlaying="isPlaying"
          v-model:duration="duration"
          v-model:currentTimeInSeconds="currentTimeInSeconds"
          @fullsize="changeSize"
          :name="currentMusic.name"
          :singer="currentMusic.singer"
          :cover="currentMusic.cover"
          v-model:lyric="lyric"
          @update="updateTime"
          :sty="gradient[curIndex]"
          @togglePlay="togglePlay"
          @back="backSong"
          @next="nextSong"
        ></MusicPlayFullView>
      </div>
    </Transition>

</template>

<script setup>
import MusicPlayerView from "./MusicPlayerView.vue";
import MusicPlayFullView from "./MusicPlayerFullView.vue";
import {ref, watch} from "vue";

const props = defineProps({
  lyrics:Object,
  gradient:Object,
  musicList:Object,
})

const lyrics = props.lyrics
const gradient = props.gradient
const musicList = props.musicList

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
const lyric = ref(parseLRC(lyrics[curIndex.value]))
const currentMusic = ref(musicList[curIndex.value])

const playerMode = ref(0)

function changeSize() {
  isFull.value = !isFull.value;
}

//监控当前播放歌曲变化
watch(curIndex, ()=>{
  const index = curIndex.value;
  currentMusic.value = musicList[index];
  lyric.value = parseLRC(lyrics[index]);
  isPlaying.value = true;
})

//播放设置
function handleModeChange() {
  if (playerMode.value === 0){
    nextSong();
  }
  else if (playerMode.value === 1){
    audioPlayer.value.currentTime = 0;
    audioPlayer.value.play();
  }
  else {
    randomSong();
  }
}

//上一首
function backSong() {
  const length = musicList.length;
  const index = (curIndex.value - 1 + length) % length;
  // currentMusic.value = musicList[index];
  // lyric.value = parseLRC(lyrics[index]);
  // isPlaying.value = true;
  curIndex.value = index;
}

//下一首
function nextSong() {
  const length = musicList.length;
  const index = (curIndex.value + 1) % length;
  // currentMusic.value = musicList[index];
  // lyric.value = parseLRC(lyrics[index]);
  // isPlaying.value = true;
  curIndex.value = index;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//随机选取
function randomSong() {
  const length = musicList.length;
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
      lyrics.push({ timestamp, text });
    }
  });
  return lyrics;
}

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
</script>

<style>
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
