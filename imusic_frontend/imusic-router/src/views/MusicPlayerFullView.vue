<template>
  <div class="outcontainer" :style="sty">
    <div class="col1">
      <div class="button_div">
        <buttonchangesize style="display: block" @fullsize="changesize"></buttonchangesize>
      </div>
      <div class="card">
        <label for="uploadx">
          <div class="card__img">
            <img :src="props.cover" class="content rotate rounded-full w-[243px] h-[243px]">
          </div>
          <div class="card__title" style="font-weight: bolder !important;">{{ props.name }}</div>
          <div class="card__subtitle">{{ props.singer }}</div>
          <div class="card__wrapper">
            <div class="card__time card__time-passed">{{ currentTime }}</div>
            <div class="card__timeline">
              <input type="range" min="0" :max="durationInSeconds" v-model="currentduration" @input="seek">
            </div>
            <div class="card__time card__time-left">{{ durationtime }}</div>
          </div>
        </label>
        <div class="card__wrapper">
          <button class="card__btn" @click="restart">
            <svg fill="none" height="12" viewBox="0 0 20 12" width="20" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <clipPath id="a">
                <path d="m0 0h20v12h-20z"></path>
              </clipPath>
              <g>
                <path
                    d="m17 1c0-.265216-.1054-.51957-.2929-.707107-.1875-.187536-.4419-.292893-.7071-.292893h-8v2h7v5h-3l3.969 5 4.031-5h-3zm-14 10c0 .2652.10536.5196.29289.7071.18754.1875.44189.2929.70711.2929h8v-2h-7v-5h3l-4-5-4 5h3z"
                    fill="#fff"></path>
              </g>
            </svg>
          </button>
          <button class="card__btn" @click="back">
            <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 8V0L0 8L11.5 16V8ZM23 0L11.5 8L23 16V0Z" fill="#fff"></path>
            </svg>
          </button>
          <button class="card__btn card__btn-play" @click="togglePlay">
            <svg fill="#000" height="22" viewBox="0 0 18 22" width="18" xmlns="http://www.w3.org/2000/svg"
                 v-if="!isPlaying">
              <path d="m0 0v22l18-11z" fill="#000"></path>
            </svg>
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20"
                 fill="black"
                 height="20" v-if="isPlaying">
              <path
                  d="M128 106.858667C128 94.976 137.621333 85.333333 149.12 85.333333h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333H149.12A21.290667 21.290667 0 0 1 128 917.141333V106.88z m640 0c0-11.882667 9.621333-21.525333 21.12-21.525334h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333h-85.76a21.290667 21.290667 0 0 1-21.12-21.525333V106.88z"
                  fill="black"></path>
            </svg>
          </button>
          <button class="card__btn" @click="next">
            <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 8V0L23 8L11.5 16V8ZM0 0L11.5 8L0 16V0Z" fill="#fff"></path>
            </svg>
          </button>
          <button class="card__btn">
            <svg fill="#fff" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <clipPath id="a">
                <path d="m0 .5h20v19h-20z"></path>
              </clipPath>
              <g fill="#fff">
                <path
                    d="m15 14.5h-1.559l-9.7-10.673c-.09376-.10305-.20802-.18536-.33545-.24168-.12744-.05631-.26523-.08537-.40455-.08532h-3.001v2h2.559l4.09 4.5-4.09 4.501h-2.559v2h3.001c.13932 0 .27711-.029.40455-.0853.12743-.0563.24169-.1387.33545-.2417l4.259-4.687 4.259 4.686c.0938.103.208.1854.3355.2417.1274.0563.2652.0853.4045.0853h2.001v3l5-4-5-4z"></path>
                <path
                    d="m13.4406 5.5h1.559v3l5-3.938-5-4.062v3h-2.001c-.1393-.00005-.2771.02901-.4045.08532-.1275.05632-.2417.13863-.3355.24168l-3.36798 3.707 1.47998 1.346z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="col2">
      

      <div style="width:100%;  display:flex; align-items: center; justify-content: center; margin: 0;" class="lyricclass">
        <ul style="width:100%;">
    <span class="box" v-for="(item, index) in lyricsshow" :key="index"
          :class="{ 'highlighted': item.special ,'nothighlighted' : !item.special}">
      {{ item.text }}
      <br>
    </span>
        </ul>
      </div>
    </div>
  </div>
  

</template>

<script setup>
import {ref,defineModel,watch} from 'vue';
import buttonchangesize from './buttonchangesize.vue'
import { defineEmits } from 'vue';
const emit = defineEmits(['fullsize','togglePlay','update','back','next']);
const changesize =()=>{
  emit('fullsize');
}
const props=defineProps({
  cover:String,
  source:String,
  singer:String,
  name:String,
  sty:String,
})

const isPlaying = defineModel("isPlaying");
const durationtime = defineModel("duration");
const currentTime = defineModel("currentTime");
const currentduration = defineModel("currentTimeInSeconds");
const durationInSeconds = defineModel("durationInSeconds");
const lyric = defineModel("lyric")
const test=defineModel("test");
const audioPlayer = defineModel("audioPlayer");

const lyricsshow = ref([{text: '', special: false}, {text: '', special: false}, {text: '', special: false}, {
  text: '',
  special: false
}, {text: '', special: false}, {text: '', special: false}, {text: '', special: false}, {
  text: '',
  special: false
}, {text: '', special: false}, {text: '', special: false}]);
const text = ref('未播放');
const nowline = ref(0);


const togglePlay = () => {
  emit('togglePlay');
  if(!isPlaying.value){
    playAudio();
  }
  else{
    pauseAudio();
  }
};

const seek = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentduration.value;
    console.log(currentduration.value);
  }
};

const playAudio = () => {
  const content = document.querySelector('.content');
  content.classList.add('rotate');
  content.classList.remove('stop');
}


const pauseAudio = () => {
  const content = document.querySelector('.content');
  content.classList.add('stop');
  content.classList.remove('rotate');
};

const back = () =>{
  emit('back');
}

const next = () =>{
  emit('next');
}

const restart = () => {
  audioPlayer.value.currentTime=0;
  currentduration.value=0;
  currentTime.value='0:00';
};

const getcurrentTime = () => {
  const minute = currentduration.value / 60;
  const second = currentduration.value % 60;
  displayLyrics(props.lyrics, currentduration.value);
};


function displayLyrics(lyrics, currentTime) {
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].timestamp && (!lyrics[i + 1] || currentTime < lyrics[i + 1].timestamp)) {
      text.value = lyrics[i].text;
      if (i <= 5) {
        let j = 0;
        for (j = 0; j < 10; ++j) {
          lyricsshow.value[j].text = lyrics[j].text;
          lyricsshow.value[j].special = false;
        }
        nowline.value = i;
        lyricsshow.value[nowline.value].special = true;
      } else if (i + 5 >= lyrics.length) {
        let j = 0;
        for (j = lyrics.length - 10; j < lyrics.length; ++j) {
          lyricsshow.value[j - lyrics.length + 10].text = lyrics[j].text;
          lyricsshow.value[j - lyrics.length + 10].special = false;
        }
        nowline.value = i - lyrics.length + 10;
        lyricsshow.value[nowline.value].special = true;
      } else {
        let j = 0;
        for (j = 0; j < 10; ++j) {
          lyricsshow.value[j].text = lyrics[j + i - 5].text;
          lyricsshow.value[j].special = false
        }
        nowline.value = 5;
        lyricsshow.value[nowline.value].special = true;
      }
      break;
    }
  }
}

watch(currentduration, () => {
  displayLyrics(lyric.value, currentduration.value);
});
</script>


<style scoped>
@import url('../css/Music_Play.css');

.outcontainer {
    display: grid;
    height:100%;
    grid-template-columns: 1fr 1fr;
}

.content {
  transform-origin: center center;
  animation: rotate 10s linear infinite;
}

.content.rotate {
  animation: rotate 10s linear infinite; /* 启动动画 */
}

.content.stop {
  animation-play-state: paused;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.highlighted {
  display: block; /* 或 inline-block */
  width: 100%; /* 例如：指定一个宽度 */
  margin: 0 auto; /* 水平居中 */
  color: rgba(255, 255, 255, 0.5);
  font-weight: bolder;
  font-size: 250%;
  line-height: 2;
  text-align: center;
}

.nothighlighted {
  display: block; /* 或 inline-block */
  width: 100%; /* 例如：指定一个宽度 */
  margin: 0 auto; /* 水平居中 */
  color: rgba(255, 255, 255, 0.5);
  line-height: 2.5;
  font-size: 170%;
  text-align: center;
}

.box {
  border-radius: 10px;
  transition: width 0.5s, height 0.5s, background-color 0.5s;
}

.blur-enter-active,
.blur-leave-active {
  border-radius: 10px;
  transition: filter 0.5s; /* 定义过渡动画 */
}

.blur-enter,
.blur-leave-to {
  border-radius: 10px;
  filter: blur(5px); /* 初始和结束状态 */
}

.box:hover {
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
