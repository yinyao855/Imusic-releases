<template>
  <!-- 缩小后的音乐播放器 -->
  <Transition name="player-transition">
    <div v-if="isMinimized" :class="['fixed', 'bottom-6', 'left-6', 'w-32', 'h-32', 'rounded-full',
    'bg-red-100', { 'animate-spin1': isPlaying }]" @click="expandPlayer">
      <img :src="props.cover" alt="Album Art" class="h-32 w-32 rounded-full">
    </div>
  </Transition>

  <Transition name="slide-fade">
    <div class="fixed bottom-0 w-full h-32 bg-opacity-0 mb-0 z-50" v-if="!isMinimized">
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


          <!--控制播放方式-->
          <div class="tooltip my-auto" :data-tip="playerModeText">
            <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                    @click="changeMode">
              <svg v-if="playerMode === 0" class="icon fill-white" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z"
                ></path>
              </svg>
              <svg v-if="playerMode === 1" class="icon fill-white" viewBox="0 0 1024 1024"
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
          <!--控制音量-->
          <div class="my-auto flex">
            <button
                class="border-none my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm z-50"
                data-tip="音量调节" @click="Mute">
              <svg class="icon fill-white" viewBox="0 0 1024 1024" v-if="IsMuted"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M0.002433 672V352a53.393333 53.393333 0 0 1 53.333334-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.335767 106.666667v189.413333L41.435767 724A53.42 53.42 0 0 1 0.002433 672z m633.753334-452.42a21.333333 21.333333 0 0 0-30.173334 0l-597.333333 597.333333a21.333333 21.333333 0 0 0 30.173333 30.173334L158.1691 725.333333h67.666667l207.08 207.086667A21.333333 21.333333 0 0 0 469.335767 917.333333V414.166667l164.42-164.413334a21.333333 21.333333 0 0 0 0-30.173333z"
                    ></path>
              </svg>
              <svg class="icon fill-white" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" v-if="!IsMuted&&volume<=0">
                <path
                    d="M456.166667 86.96a21.333333 21.333333 0 0 0-23.253334 4.62L225.833333 298.666667H53.333333a53.393333 53.393333 0 0 0-53.333333 53.333333v320a53.393333 53.393333 0 0 0 53.333333 53.333333h172.5l207.08 207.086667A21.333333 21.333333 0 0 0 469.333333 917.333333V106.666667a21.333333 21.333333 0 0 0-13.166666-19.706667z"
                ></path>
              </svg>
              <svg class="icon fill-white" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" v-if="!IsMuted&&volume>0&&volume<=33">
                <path
                    d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m176.753334 299.726666a21.333333 21.333333 0 0 0-33.486667 26.433334 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334z"
                ></path>
              </svg>
              <svg class="icon fill-white" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" v-if="!IsMuted&&volume>=34&&volume<=66">
                <path
                    d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m146.793334 296.2a21.333333 21.333333 0 0 0-3.526667 29.96 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334 21.333333 21.333333 0 0 0-29.966666-3.526666z m212.213333-19.3A339.393333 339.393333 0 0 0 753.333333 270.666667a346.585333 346.585333 0 0 0-22.046666-20.213334 21.333333 21.333333 0 1 0-27.446667 32.666667c6.666667 5.586667 13.146667 11.553333 19.333333 17.726667C779.6 357.22 810.666667 432.22 810.666667 512s-31.066667 154.78-87.48 211.186667c-6.173333 6.173333-12.666667 12.14-19.333334 17.726666a21.333333 21.333333 0 1 0 27.446667 32.666667 346.585333 346.585333 0 0 0 22.046667-20.213333 341.706667 341.706667 0 0 0 74.98-369.793334z"
                ></path>
              </svg>
              <svg class="icon fill-white" viewBox="0 0 1024 1024"
                   xmlns="http://www.w3.org/2000/svg" width="24" height="24" v-if="!IsMuted&&volume>=67&&volume<=100">
                <path
                    d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m146.793334 296.2a21.333333 21.333333 0 0 0-3.526667 29.96 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334 21.333333 21.333333 0 0 0-29.966666-3.526666zM853.333333 512a340.32 340.32 0 0 0-100-241.333333 346.585333 346.585333 0 0 0-22.046666-20.213334 21.333333 21.333333 0 1 0-27.446667 32.666667c6.666667 5.586667 13.146667 11.553333 19.333333 17.726667C779.6 357.22 810.666667 432.22 810.666667 512s-31.066667 154.78-87.48 211.186667c-6.173333 6.173333-12.666667 12.14-19.333334 17.726666a21.333333 21.333333 0 1 0 27.446667 32.666667 346.585333 346.585333 0 0 0 22.046667-20.213333 340.32 340.32 0 0 0 100-241.333334z m133.173334-192.666667a508.806667 508.806667 0 0 0-112.466667-169.386666 518.346667 518.346667 0 0 0-57.533333-49.653334 21.333333 21.333333 0 0 0-25.42 34.273334 474.246667 474.246667 0 0 1 52.78 45.553333c182.993333 182.993333 182.993333 480.74 0 663.733333a474.853333 474.853333 0 0 1-52.78 45.553334 21.333333 21.333333 0 0 0 25.413333 34.273333 519.026667 519.026667 0 0 0 57.54-49.653333 512.546667 512.546667 0 0 0 112.466667-554.666667z"
                ></path>
              </svg>
            </button>
            <input type="range" min="0" max="100" value="40" class="range range-xs my-auto" v-model="volume"
                   @input="changeVolume"/>
          </div>

          <button
              class="border-none my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm z-50"
              data-tip="播放列表" @click="ShowPlayMusicListChange" v-click-outside="ShowPlayMusicListFalse">
            <svg class="icon border-none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                 width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white"></path>
            </svg>
          </button>
          <transition name="slide">
            <PlayMusic_List :songlistlast="datax" v-if="ShowPlayMusicList" @HandleIndex="HandleIndex"
                            v-model:token="token"></PlayMusic_List>
          </transition>


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
import {ref, watch} from 'vue';
import {defineProps, defineModel} from 'vue';
import PlayMusic_List from "@/components/PlayMusic_List.vue";

const token = defineModel('token')
const ShowPlayMusicList = ref(false);
const index = defineModel('curIndex');

const props = defineProps({
  cover: String,
  name: String,
  singer: String,
  datax: Array,
});

const store = ref(0);
const IsMuted = ref(false);

const Mute = () => {
  if (!IsMuted.value) {
    store.value = volume.value;
    volume.value=0;
    IsMuted.value = true;
  } else {
    volume.value = store.value;
    IsMuted.value = false;
  }
}

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

watch(volume,()=>{
  if(volume.value>0){
    IsMuted.value=false;
  }
})

const HandleIndex = (indexx) => {
  index.value = indexx;
}

const ShowPlayMusicListFalse = () => {
  ShowPlayMusicList.value = false;
}

const ShowPlayMusicListChange = () => {
  ShowPlayMusicList.value = !ShowPlayMusicList.value;
}

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
}
</style>
