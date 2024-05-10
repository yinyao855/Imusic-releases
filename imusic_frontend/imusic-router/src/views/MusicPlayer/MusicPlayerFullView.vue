<template>
  <transition name="vx">
    <div class="w-full absolute top-0 left-1/2 transform -translate-x-1/2" v-if="WarningShow">
      <Warning :message="message" @CloseWarning="CloseWarning" class="mx-auto" v-model:token="token"></Warning>
    </div>
  </transition>
  <div class="flex h-screen w-screen" :style="sty">
    <div class="col1 w-1/2">
      <div class="button_div">
        <buttonchangesize style="display: block" @fullsize="changesize" v-model:token="token"></buttonchangesize>
      </div>
      <div class="card">
        <label for="uploadx">
          <div class="card__img">
            <img :src="props.cover"
                 :class="{'content':true, 'rotate':isPlaying,'stop':!isPlaying, 'rounded-full':true, 'w-[243px]':true, 'h-[243px]':true}"
                 alt="封面">
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
          <div class="tooltip my-auto" :data-tip="playerModeText">
            <button class=" card__btn"
                    @click="changeMode">
              <svg v-if="playerMode === 0" class="icon" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z"
                ></path>
              </svg>
              <svg v-if="playerMode === 1" class="icon" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z"
                ></path>
                <path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z"></path>
              </svg>
              <svg v-if="playerMode === 2" fill="#fff" height="24" viewBox="0 0 20 20" width="24"
                   xmlns="http://www.w3.org/2000/svg"
              >
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
          <button class="card__btn tooltip" @click="back" data-tip="上一首">
            <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 8V0L0 8L11.5 16V8ZM23 0L11.5 8L23 16V0Z" fill="#fff"></path>
            </svg>
          </button>
          <button class="card__btn card__btn-play tooltip" @click="togglePlay" data-tip="播放/暂停">
            <svg fill="#000" height="22" viewBox="0 0 18 22" width="18" xmlns="http://www.w3.org/2000/svg"
                 v-if="!isPlaying">
              <path d="m0 0v22l18-11z" fill="#000"></path>
            </svg>
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20"
                 fill="black"
                 height="20" v-if="isPlaying">
              <path
                  d="M128 106.858667C128 94.976 137.621333 85.333333 149.12 85.333333h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333H149.12A21.290667 21.290667 0 0 1 128 917.141333V106.88z m640 0c0-11.882667 9.621333-21.525333 21.12-21.525334h85.76c11.648 0 21.12 9.6 21.12 21.525334V917.12c0 11.882667-9.621333 21.525333-21.12 21.525333h-85.76a21.290667 21.290667 0 0 1-21.12-21.525333V106.88z"
                  fill="black"></path>
            </svg>
          </button>
          <button class="card__btn tooltip" @click="next" data-tip="下一首">
            <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 8V0L23 8L11.5 16V8ZM0 0L11.5 8L0 16V0Z" fill="#fff"></path>
            </svg>
          </button>
          <button class="card__btn tooltip" @click="comment" data-tip="显示/关闭评论">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 width="30" height="24">
              <path
                  d="M622.56056 464.834794c0 27.928073 22.73684 50.64854 50.664913 50.64854 27.956725 0 50.693566-22.720468 50.693566-50.64854 0-27.928073-22.73684-50.66389-50.693566-50.66389C645.2974 414.171927 622.56056 436.907745 622.56056 464.834794"
                  fill="#231F20"></path>
              <path
                  d="M931.254178 211.459063c0-40.637536-33.05893-73.698512-73.728188-73.698512L166.471964 137.76055c-40.637536 0-73.727165 33.059953-73.727165 73.698512l0 506.796488c0 40.637536 33.088606 73.696466 73.727165 73.696466l251.16846 0 94.343715 94.28641 94.315062-94.28641 251.226788 0c40.669258 0 73.728188-33.05893 73.728188-73.696466l0-82.560344-0.089028-1.282203L931.254178 211.459063zM875.96699 695.220928c0 22.88522-18.558681 41.444924-41.443901 41.444924L579.446623 736.665853l-67.462484 67.490114-67.430762-67.490114L189.506587 736.665853c-22.88522 0-41.4746-18.559705-41.4746-41.444924L148.031986 234.493685c0-22.88522 18.58938-41.488927 41.4746-41.488927l645.01548 0c22.88522 0 41.443901 18.603707 41.443901 41.488927l0 396.579247 0 36.161594L875.965967 695.220928z"
                  fill="#231F20"></path>
              <path
                  d="M461.321272 464.834794c0 27.928073 22.735817 50.64854 50.662867 50.64854 27.929096 0 50.66389-22.720468 50.66389-50.64854 0-27.928073-22.734794-50.66389-50.66389-50.66389C484.057089 414.171927 461.321272 436.907745 461.321272 464.834794"
                  fill="#231F20"></path>
              <path
                  d="M300.083008 464.834794c0 27.928073 22.735817 50.64854 50.66389 50.64854 27.927049 0 50.662867-22.720468 50.662867-50.64854 0-27.928073-22.735817-50.66389-50.662867-50.66389C322.817802 414.171927 300.083008 436.907745 300.083008 464.834794"
                  fill="#231F20"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="col2 w-1/2 flex" v-if="!showComment">
      <div class="w-full overflow-hidden mx-auto my-auto pr-20" style="height:90%">
        <Lyrics_Show_View v-model:currentduration="currentduration" v-model:lrcArr="lyric"></Lyrics_Show_View>
      </div>
    </div>
    <div class="col2 bg-transparent overflow-hidden h-full" v-if="showComment">
      <Transition name="slide-fade">
        <Comment :token="token" :id="songID" v-model:showComment="showComment" v-model:songID="songID"
                 v-model:WarningShow="WarningShow" v-model:message="message"></Comment>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {ref, defineModel, watch} from 'vue';
import buttonchangesize from '../../components/ButtonChangeSizeLeft.vue'
import Comment from '../../components/Comment.vue'
import {defineEmits} from 'vue';
import Warning from "@/components/Warning.vue";
import Lyrics_Show_View from "@/views/MusicPlayer/Lyrics_Show_View.vue";

const emit = defineEmits(['fullsize', 'togglePlay', 'update', 'back', 'next']);
const changesize = () => {
  emit('fullsize');
}
const props = defineProps({
  cover: String,
  source: String,
  singer: String,
  name: String,
  sty: String,
  id: String,
})


const playerModeText = ref('列表循环');
const modeList = ['列表循环', '单曲循环', '随机播放'];
const playerMode = defineModel('playerMode');

const isPlaying = defineModel("isPlaying");
const durationtime = defineModel("duration");
const currentTime = defineModel("currentTime");
const currentduration = defineModel("currentTimeInSeconds");
const durationInSeconds = defineModel("durationInSeconds");
const lyric = defineModel("lyric")
const audioPlayer = defineModel("audioPlayer");
const token = defineModel('token')
const text = ref('未播放');

const togglePlay = () => {
  emit('togglePlay');
};

const seek = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentduration.value;
    console.log(currentduration.value);
  }
};

const back = () => {
  emit('back');
  showComment.value = false;
}

const next = () => {
  emit('next');
  showComment.value = false;
}

const changeMode = () => {
  console.log("hello");
  const newMode = (playerMode.value + 1) % 3;
  playerModeText.value = modeList[newMode];
  playerMode.value = newMode;
}

const restart = () => {
  audioPlayer.value.currentTime = 0;
  currentduration.value = 0;
  currentTime.value = '0:00';
};

const showComment = defineModel('showComment');
let songID = "";
const comment = () => {
  showComment.value = !showComment.value;
  songID = props.id;
  console.log(songID);
}
const WarningShow = ref(false);
const CloseWarning = () => {
  WarningShow.value = false;
}
const message = ref('');
</script>


<style scoped>
@import url('../../css/Music_Play.css');

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

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
