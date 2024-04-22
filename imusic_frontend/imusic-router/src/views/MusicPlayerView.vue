<template>
  <!-- 缩小后的音乐播放器 -->
  <Transition name="player-transition">
    <div v-if="isMinimized" class="fixed bottom-6 left-6 w-32 h-32 rounded-full bg-red-100 animate-spin1"
         @click="expandPlayer">
      <img :src="props.cover" alt="Album Art" class="h-32 w-32 rounded-full">
    </div>
  </Transition>

  <Transition name="slide-fade">
    <div class="fixed bottom-0 w-full h-32 bg-opacity-0 mb-0" v-if="!isMinimized">
      <div class="music-player-container h-28 mr-5 rounded-md shadow-lg flex bg-opacity-100 mb-0">
        <!-- 专辑封面 -->
        <div class="rounded-md h-24 w-24 my-auto ml-4">
          <img :src="props.cover" alt="Album Art" class="h-24 w-24 rounded">
        </div>
        <!-- 歌曲信息 -->
        <div class="flex flex-col ml-4 my-auto">
          <span class="text-lg font-semibold text-white">{{ props.name }}</span>
          <span class="text-sm font-light text-white">{{ props.singer }}</span>
        </div>

        <!-- 播放控制 -->
        <div class="flex flex-col ml-auto my-auto mr-4 w-1/2 h-4/5">
          <div class="flex h-2/3 justify-around w-1/2 mx-auto">
            <!--播放上一首-->




            <div class="tooltip my-auto" data-tip="上一首">
              <button
                  class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none fill-zinc-900 hover:fill-zinc-900"
                  @click="goBack">
                <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M34 36L22 24L34 12" stroke="white" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M14 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="tooltip my-auto" data-tip="播放与暂停">
              <button class="btn transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                      @click="togglePlay">
                <svg v-if="!isPlaying" width="40" height="40" viewBox="0 0 48 48" fill="white"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z" fill="white" stroke="white"
                        stroke-width="4" stroke-linejoin="round"/>
                </svg>
                <svg v-else width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M32 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <!--播放下一首-->
            <div class="tooltip my-auto" data-tip="下一首">
              <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                      @click="goNext">
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 12L26 24L14 36" stroke="white" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M34 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <!-- 进度条 -->
          <div class="flex mt-2">
            <input type="range" class="w-full ml-1 range range-accent range-xs" min="0" :max="durationInSeconds"
                   v-model="currentTimeInSeconds" @input="seek"/>
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-xs font-light">{{ currentTime }}</span>
            <span class="text-xs font-light text-right">{{ duration }}</span>
          </div>
        </div>
        <!-- 其他控制 -->
        <div class="w-1/4 flex justify-around">
          <!--控制播放速度-->
<!--          <div class="tooltip my-auto" data-tip="播放速度">-->
<!--            <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none">-->
<!--              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path-->
<!--                    d="M34.0234 6.68921C31.0764 4.97912 27.6525 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 20.3727 43.0344 16.9709 41.3461 14.0377"-->
<!--                    stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                <path-->
<!--                    d="M31.9498 16.0503C31.9498 16.0503 28.5621 25.0948 27.0001 26.6569C25.438 28.219 22.9053 28.219 21.3432 26.6569C19.7811 25.0948 19.7811 22.5621 21.3432 21C22.9053 19.4379 31.9498 16.0503 31.9498 16.0503Z"-->
<!--                    fill="none" stroke="white" stroke-width="4" stroke-linejoin="round"/>-->
<!--              </svg>-->
<!--            </button>-->
<!--          </div>-->


          <div class="dropdown dropdown-top dropdown-end my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm" data-tip="播放列表">
            <svg t="1713774064278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2300" width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white" p-id="2301"></path>
            </svg>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-zinc-900">
              <li v-for="(item, index) in datax" :key="index" @click="handleindex(index)">
                <a>{{ item.name }}</a>
              </li>
            </ul>
          </div>


          <!--控制播放方式-->
          <div class="tooltip my-auto" :data-tip="playerModeText">
            <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                    @click="changeMode">
              <svg v-if="playerMode === 0" width="24" height="24" viewBox="0 0 48 48" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M43.8233 25.2305C43.7019 25.9889 43.5195 26.727 43.2814 27.4395C42.763 28.9914 41.9801 30.4222 40.9863 31.6785C38.4222 34.9201 34.454 37 30 37H16C9.39697 37 4 31.6785 4 25C4 18.3502 9.39624 13 16 13H44"
                    stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M38 7L44 13L38 19" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
              <svg v-if="playerMode === 1" width="24" height="24" viewBox="0 0 48 48" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M43.8233 25.2305C43.7019 25.9889 43.5195 26.727 43.2814 27.4395C42.763 28.9914 41.9801 30.4222 40.9863 31.6785C38.4222 34.9201 34.454 37 30 37H16C9.39697 37 4 31.6785 4 25C4 18.3502 9.39624 13 16 13H44"
                    stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M38 7L44 13L38 19" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M24 19V31" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24 19L21 22L19.5 23.5" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
              <svg v-if="playerMode === 2" width="24" height="24" viewBox="0 0 48 48" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M4 25C4 18.3502 9.39624 13 16 13H44" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M38 7L44 13L38 19" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M44 23C44 29.6498 38.6038 35 32 35H4" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M10 41L4 35L10 29" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <!--控制音量-->
          <div class="my-auto flex">
            <button
                class="btn my-auto btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 3.99976V43.9998" stroke="white" stroke-width="4" stroke-linecap="round"/>
                <path d="M34 11.9998V35.9998" stroke="white" stroke-width="4" stroke-linecap="round"/>
                <path d="M4 17.9998V29.9998" stroke="white" stroke-width="4" stroke-linecap="round"/>
                <path d="M44 17.9998V29.9998" stroke="white" stroke-width="4" stroke-linecap="round"/>
                <path d="M14 11.9998V35.9998" stroke="white" stroke-width="4" stroke-linecap="round"/>
              </svg>
            </button>
            <input type="range" min="0" max="100" value="40" class="range range-xs my-auto" v-model="volume"
                   @input="changeVolume"/>
          </div>
          <!--缩小播放器-->
          <div class="tooltip my-auto" data-tip="最小化">
            <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                    @click="minimizePlayer">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 9V21H39" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 39V27H9" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M27 21L42 6" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 27L6 42" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <!--全屏播放器-->
          <div class="tooltip my-auto" data-tip="全屏显示">
            <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                    @click="fullSize">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 42H6V26" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M26 6H42V22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  </Transition>

</template>

<script setup>
import {ref} from 'vue';
import {defineProps, defineModel} from 'vue';

const datax=ref([{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'},{name:'6'},{name:'7'},{name:'8'},{name:'9'},{name:'10'}]);

const handleindex = (index) =>{
  console.log(index);
}

const props = defineProps({
  cover: String,
  name: String,
  singer: String,
});

const emit = defineEmits([
  'fullsize',
  'back',
  'next',
  'togglePlay',
]);

//是否正在播放
const isPlaying = defineModel("isPlaying");
//当前播放时间和总时间
const currentTime = defineModel("currentTime");
const duration = defineModel("duration");
//当前播放时间和总时间（秒）
const durationInSeconds = defineModel("durationInSeconds");
const currentTimeInSeconds = defineModel("currentTimeInSeconds");
//音频播放器对象
const audioPlayer = defineModel("audioPlayer");
//定义播放模式, 0为列表循环，1为单曲循环，2为随机播放
const playerMode = defineModel("playerMode");
const playerModeText = ref('列表循环');
const modeList = ['列表循环', '单曲循环', '随机播放'];
//是否最小化
const isMinimized = ref(false);
//音量
const volume = ref(40);

//改变音量
const changeVolume = () => {
  audioPlayer.value.volume = volume.value / 100;
}

//播放上一首
const goBack = () => {
  emit('back');
  console.log('back');
}

//播放下一首
const goNext = () => {
  emit('next');
  console.log('next');
}

//改变播放模式
const changeMode = () => {
  const newMode = (playerMode.value + 1) % 3;
  // console.log(newMode);
  playerModeText.value = modeList[newMode];
  playerMode.value = newMode;
}

const togglePlay = () => {
  emit('togglePlay');
};

const seek = () => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentTimeInSeconds.value;
    console.log(currentTimeInSeconds.value);
  }
};

function minimizePlayer() {
  isMinimized.value = true;
}

function expandPlayer() {
  isMinimized.value = false;
}

//全屏显示
function fullSize() {
  emit('fullsize');
}
</script>

<style scoped>
.music-player-container {
  /* 设置背景图片填充方式 */
  background-size: cover;
  /* 设置背景图片的位置 */
  background-position: center;
  /* 使用 backdrop-filter 实现背景模糊效果，同时保持内部内容清晰 */
  backdrop-filter: blur(30px);
  /* 设置背景图片透明度 */
}

/* 最小化播放器的过渡效果 */
.player-transition-enter-active,
.player-transition-leave-active {
  transition: all 0.8s ease-in-out;
}

.player-transition-enter-from,
.player-transition-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* 默认播放器的过渡效果 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

/* 旋转动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin1 {
  animation: spin 4s linear infinite;
}

.animate-spin1:hover {
  animation-play-state: paused;
  /* transform: scale(1.1);
    transition-duration: 0.5s; */
}
</style>