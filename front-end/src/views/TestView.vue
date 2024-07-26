<template>
  <div class="h-[120px] mb-2 w-full px-2 bg-[#C9C7C5] bg-opacity-90 fixed bottom-0 left-0 rounded-3xl use_font z-20">
    <div class="w-full h-full flex flex-row">

      <div class="h-full ml-4 flex">
        <img :src="CurrentSongDetail.cover" alt="当前封面" class="aspect-square rounded-md h-[90%] my-auto">
      </div>

      <div class="h-full flex">
        <div class="my-auto ml-4">
          <div class="text-xl font-bold mb-1">{{ CurrentSongDetail.title }}</div>
          <div class="text-sm">{{ CurrentSongDetail.singer }}</div>
        </div>
      </div>

      <div>
        <div class="flex h-[62%] justify-around w-1/2 mx-auto">
          <!--播放上一首-->
          <div class="tooltip my-auto" data-tip="上一首">
            <button
                class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none fill-zinc-900 hover:fill-zinc-900">
              <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M34 36L22 24L34 12" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M14 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <!--播放与暂停-->
          <div class="tooltip my-auto" data-tip="播放与暂停">
            <button class="btn transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
                    @click="IsPlaying = !IsPlaying">
              <svg v-if="!IsPlaying" width="40" height="40" viewBox="0 0 48 48" fill="white"
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
            <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none">
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 12L26 24L14 36" stroke="white" stroke-width="4" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M34 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <input type="range" min="0" :max="Duration" v-model="CurrentTime" class="range range-xs range-primary"
               style="width:60vw"
               @change="IsDragging=true"/>
        <div class="flex">
          <div class="text-sm">{{ SecondToTime(CurrentTime) }}</div>
          <div class="flex-1"></div>
          <div class="text-sm">{{ SecondToTime(parseInt(Duration)) }}</div>
        </div>
      </div>

      <div class="w-1/4 flex justify-around">


        <!--控制播放方式-->
        <div class="tooltip my-auto">
          <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
          >
            <svg v-if="PlayType === 0" class="icon fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                  d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115z"
              ></path>
            </svg>
            <svg v-if="PlayType === 1" class="icon fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                  d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z"
              ></path>
              <path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z"></path>
            </svg>
            <svg v-if="PlayType === 2" fill="#fff" height="24" viewBox="0 0 20 20" width="24"
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
          <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none"
          >
            <svg class="icon fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" v-if="VolumePercent<=0">
              <path
                  d="M456.166667 86.96a21.333333 21.333333 0 0 0-23.253334 4.62L225.833333 298.666667H53.333333a53.393333 53.393333 0 0 0-53.333333 53.333333v320a53.393333 53.393333 0 0 0 53.333333 53.333333h172.5l207.08 207.086667A21.333333 21.333333 0 0 0 469.333333 917.333333V106.666667a21.333333 21.333333 0 0 0-13.166666-19.706667z"
              ></path>
            </svg>
            <svg class="icon fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 v-if="VolumePercent>0&&VolumePercent<=33">
              <path
                  d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m176.753334 299.726666a21.333333 21.333333 0 0 0-33.486667 26.433334 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334z"
              ></path>
            </svg>
            <svg class="icon fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 v-if="VolumePercent>=34&&VolumePercent<=66">
              <path
                  d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m146.793334 296.2a21.333333 21.333333 0 0 0-3.526667 29.96 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334 21.333333 21.333333 0 0 0-29.966666-3.526666z m212.213333-19.3A339.393333 339.393333 0 0 0 753.333333 270.666667a346.585333 346.585333 0 0 0-22.046666-20.213334 21.333333 21.333333 0 1 0-27.446667 32.666667c6.666667 5.586667 13.146667 11.553333 19.333333 17.726667C779.6 357.22 810.666667 432.22 810.666667 512s-31.066667 154.78-87.48 211.186667c-6.173333 6.173333-12.666667 12.14-19.333334 17.726666a21.333333 21.333333 0 1 0 27.446667 32.666667 346.585333 346.585333 0 0 0 22.046667-20.213333 341.706667 341.706667 0 0 0 74.98-369.793334z"
              ></path>
            </svg>
            <svg class="icon fill-white" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 v-if="VolumePercent>=67&&VolumePercent<=100">
              <path
                  d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m146.793334 296.2a21.333333 21.333333 0 0 0-3.526667 29.96 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334 21.333333 21.333333 0 0 0-29.966666-3.526666zM853.333333 512a340.32 340.32 0 0 0-100-241.333333 346.585333 346.585333 0 0 0-22.046666-20.213334 21.333333 21.333333 0 1 0-27.446667 32.666667c6.666667 5.586667 13.146667 11.553333 19.333333 17.726667C779.6 357.22 810.666667 432.22 810.666667 512s-31.066667 154.78-87.48 211.186667c-6.173333 6.173333-12.666667 12.14-19.333334 17.726666a21.333333 21.333333 0 1 0 27.446667 32.666667 346.585333 346.585333 0 0 0 22.046667-20.213333 340.32 340.32 0 0 0 100-241.333334z m133.173334-192.666667a508.806667 508.806667 0 0 0-112.466667-169.386666 518.346667 518.346667 0 0 0-57.533333-49.653334 21.333333 21.333333 0 0 0-25.42 34.273334 474.246667 474.246667 0 0 1 52.78 45.553333c182.993333 182.993333 182.993333 480.74 0 663.733333a474.853333 474.853333 0 0 1-52.78 45.553334 21.333333 21.333333 0 0 0 25.413333 34.273333 519.026667 519.026667 0 0 0 57.54-49.653333 512.546667 512.546667 0 0 0 112.466667-554.666667z"
              ></path>
            </svg>
          </button>
          <input type="range" min="0" max="100" class="range range-xs my-auto" v-model="VolumePercent"/>
        </div>

        <button
            class="border-none my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm z-50"
            data-tip="播放列表">
          <svg class="icon border-none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
               width="32" height="32" tabindex="0" role="button">
            <path
                d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                fill="white"></path>
          </svg>
        </button>
        <!--        <transition name="slide">-->
        <!--          <PlayMusic_List :songlistlast="datax" v-if="ShowPlayMusicList" @HandleIndex="HandleIndex"-->
        <!--                          v-model:token="token"></PlayMusic_List>-->
        <!--        </transition>-->

        <!--全屏播放器-->
        <div class="tooltip my-auto" data-tip="全屏显示">
          <button class="btn btn-sm transition duration-400 hover:bg-gray-600/40 bg-zinc-900 rounded-md border-none">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 42H6V26" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M26 6H42V22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CurrentSongDetail,
  CurrentTime,
  Duration,
  IsDragging,
  IsPlaying,
  PlayType,
  VolumePercent
} from "@/js/MusicPlayer.js";
import {SecondToTime} from '@/js/BeforeEnterHomeView.js'

</script>