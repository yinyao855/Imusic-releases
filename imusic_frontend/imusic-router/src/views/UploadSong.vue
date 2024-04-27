<template>
  <transition name="vx">
    <div class="w-full absolute top-0 left-1/2 transform -translate-x-1/2" v-if="WarningShow">
      <Warning :message="message" @CloseWarning="CloseWarning" class="mx-auto"></Warning>
    </div>
  </transition>
  <div class="h-full w-full flex items-center" @keypress.enter="submitSong">
    <div class="formx2 my-auto mx-auto width:800px flexible bg-zinc-900">
      <div class="flex-column text-2xl">
        <div class="text-white">*歌曲名</div>
      </div>
      <div class="inputForm bg-zinc-900">
        <svg class="icon fill-white transition" viewBox="0 0 1024 1024"
             xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
              d="M458.24 594.304l1.6-0.576v-0.64l417.216-417.152A65.6 65.6 0 0 0 784.32 83.2L367.104 500.416h-0.448l-0.384 1.28c-13.888 14.464-19.2 33.408-17.28 51.968l-28.672 86.464 86.656-28.736c18.24 1.792 36.928-3.52 51.264-17.088zM64 768.256V896h896v-127.744H64z"
          ></path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="请输入歌曲名" v-model="songTitle">
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <div class="flex-column text-2xl">
        <div class="text-white">*歌手</div>
      </div>
      <div class="inputForm bg-zinc-900 fill-white">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path
              d="M621.6906477754643 481.59890704548104v91.51856298436078A255.94484428572028 255.94484428572028 0 0 0 219.49160697948815 783.1750596871783v146.2541965102559h-73.12709904067292v-164.5359700921066a310.79016817345257 310.79016817345257 0 0 1 310.79016817345257-310.79016817345257h36.56354873479146a309.6932614129017 309.6932614129017 0 0 1 127.97242292840514 27.495789113605824z m109.6906477754644 240.7709710973103V563.7937657073393a36.56354873479146 36.56354873479146 0 0 1 36.56354873479146-36.563550305881485h73.12709746958292a36.56354873479146 36.56354873479146 0 1 1 0 73.12709904067292h-36.56354873479146v219.3812939798388h-1.2797235065826498A127.97242135731514 127.97242135731514 0 1 1 731.3812955509288 722.3698781427912zM676.5359716631967 892.8657074626428a54.8453238877322 54.8453238877322 0 1 0 0-109.6906477754644 54.8453238877322 54.8453238877322 0 0 0 0 109.6906477754644zM475.4364512652086 417.53956762599375a182.81774524504735 182.81774524504735 0 1 1 0-365.6354904900947 182.81774524504735 182.81774524504735 0 0 1 0 365.6354904900947z m0-73.12709746958292a109.6906477754644 109.6906477754644 0 1 0 0-219.3812955509288 109.6906477754644 109.6906477754644 0 0 0 0 219.3812955509288z"
          >
          </path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="请输入歌曲歌手" v-model="singerName">
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <div class="flex-column text-2xl">
        <div class="text-white">*歌曲文件</div>
      </div>
      <div class="grid grid-cols-1 space-y-2">
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div class="h-full w-full text-center flex flex-col items-center justify-center  ">
              <svg class="icon fill-white transition hover:fill-blue-600" viewBox="0 0 1194 1024"
                   xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                <path
                    d="M152.62673094 991.65443843a51.27435943 51.27435943 0 0 1-52.15426311-48.79463341l102.38873717-552.73919819v-1.5198328c0-27.67695563 23.35743091-50.15448278 52.23425434-50.15448278h843.90717007c28.31688465 0 51.51433311 21.75760687 52.3942369 48.79463253l-102.38873725 552.73919807v1.5198328a51.27435943 51.27435943 0 0 1-52.31424564 50.15448382H152.62673094z m636.80995128-262.85108717c13.27853904 0 26.47708777-15.91824934 30.95659499-31.83649784 0-15.91824934-4.47950719-37.11591754-13.27854002-47.67475592L657.05124401 447.87425375c-17.59806379-21.19766814-44.15514285-21.19766814-61.75320652 0L445.23454444 649.2920975C431.95600436 659.85093594 431.95600436 681.04860501 431.95600436 696.96685342c0 15.91824934 13.27853904 31.83649781 30.87660374 31.83649784h105.98834157v132.46542936c0 21.19766814 13.1985478 37.11591754 30.87660377 37.11591755h61.75320656c17.67805497 0 30.87660377-15.91824934 30.87660375-37.11591755V728.80335124H789.51667344zM202.94119625 271.81362032c-37.83583785 0-68.71244156 28.95681469-68.79243277 64.47290816L32.95989401 868.70796219V97.03284595C33.03988525 61.59674467 60.63684963 32.79991158 94.79309279 32.79991158H403.95908469l92.70980156 96.46938842h463.46901844c34.15624311 0 61.83319876 28.79683219 61.83319876 64.31292572V271.97360282H202.94119625z"
                    fill="#1296db">
                </path>
              </svg>
              <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
              </div>
              <p v-if="mp3File===null" class="pointer-none text-gray-500 "><span class="text-sm"></span> 拖拽文件至此处
                <br/> 或点击此处上传</p>
              <p v-if="mp3File!==null" class="pointer-none text-gray-500 "><span class="text-sm"></span>
                {{ mp3File.name }}</p>
            </div>
            <input type="file" @change="onMp3FileChange" class="absolute -left-10 -top-10"
                   accept="audio/mpeg, audio/wav, audio/ogg">
          </label>
        </div>
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <p class="text-sm text-gray-300">
        <span>支持格式：mp3,wav,ogg</span>
      </p>
      <div class="flex-column text-2xl">
        <div class="text-white">*歌曲封面</div>
      </div>
      <div class="grid grid-cols-1 space-y-2">
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 group text-center p-0"
                 for="CoverUpLoad">
            <div class="h-4/5 content-center m-auto" v-if="coverImageFile!==null">
              <img :src="coverImageFileUrl" class="w-full h-full object-cover rounded-lg content-center" alt="封面">
            </div>
            <p v-if="coverImageFile!==null" class="pointer-none text-gray-500 "><span
                class="text-sm"></span>{{ coverImageFile.name }}</p>
            <div v-if="coverImageFile===null"
                 class="h-full w-full text-center flex flex-col items-center justify-center  ">
              <svg class="icon fill-white transition hover:fill-blue-600" viewBox="0 0 1194 1024"
                   xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                <path
                    d="M152.62673094 991.65443843a51.27435943 51.27435943 0 0 1-52.15426311-48.79463341l102.38873717-552.73919819v-1.5198328c0-27.67695563 23.35743091-50.15448278 52.23425434-50.15448278h843.90717007c28.31688465 0 51.51433311 21.75760687 52.3942369 48.79463253l-102.38873725 552.73919807v1.5198328a51.27435943 51.27435943 0 0 1-52.31424564 50.15448382H152.62673094z m636.80995128-262.85108717c13.27853904 0 26.47708777-15.91824934 30.95659499-31.83649784 0-15.91824934-4.47950719-37.11591754-13.27854002-47.67475592L657.05124401 447.87425375c-17.59806379-21.19766814-44.15514285-21.19766814-61.75320652 0L445.23454444 649.2920975C431.95600436 659.85093594 431.95600436 681.04860501 431.95600436 696.96685342c0 15.91824934 13.27853904 31.83649781 30.87660374 31.83649784h105.98834157v132.46542936c0 21.19766814 13.1985478 37.11591754 30.87660377 37.11591755h61.75320656c17.67805497 0 30.87660377-15.91824934 30.87660375-37.11591755V728.80335124H789.51667344zM202.94119625 271.81362032c-37.83583785 0-68.71244156 28.95681469-68.79243277 64.47290816L32.95989401 868.70796219V97.03284595C33.03988525 61.59674467 60.63684963 32.79991158 94.79309279 32.79991158H403.95908469l92.70980156 96.46938842h463.46901844c34.15624311 0 61.83319876 28.79683219 61.83319876 64.31292572V271.97360282H202.94119625z"
                    fill="#1296db">
                </path>
              </svg>
              <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
              </div>
              <p v-if="true" class="pointer-none text-gray-500 "><span class="text-sm"></span> 拖拽文件至此处
                <br/> 或点击此处上传</p>
            </div>
            <input type="file" @change="onCoverFileChange" id="CoverUpLoad" class="absolute -left-10 -top-10"
                   accept="image/jpeg, image/png, image/gif, image/webp">
          </label>
        </div>
      </div>
      <p class="text-sm text-gray-500">
        <span>此项为必填项</span>
      </p>
      <p class="text-sm text-gray-300">
        <span>支持格式：webp,jpg,jpeg,png</span>
      </p>
      <div class="flex-column text-2xl">
        <div class="text-white">标签</div>
      </div>

      主题
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="默认" value="默认" v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="背景音乐" value="背景音乐"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="经典老歌" value="经典老歌"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="KTV金曲" value="KTV金曲"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="游戏配乐" value="游戏配乐"
               v-model="theme"/>
        <input class="join-item btn w-1/6" type="radio" name="options1" aria-label="电影配乐" value="电影配乐"
               v-model="theme"/>
      </div>
      场景
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="默认" value="默认" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="咖啡馆" value="咖啡馆"
               v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="运动" value="运动" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="睡前" value="睡前" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="旅行" value="旅行" v-model="scene"/>
        <input class="join-item btn w-1/6" type="radio" name="options2" aria-label="派对" value="派对" v-model="scene"/>
      </div>
      心情
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="默认" value="默认" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="伤感" value="伤感" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="安静" value="安静" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="思念" value="思念" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="宣泄" value="宣泄" v-model="mood"/>
        <input class="join-item btn w-1/6" type="radio" name="options3" aria-label="开心" value="开心" v-model="mood"/>
      </div>
      风格
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="默认" value="默认" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="摇滚" value="摇滚" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="民谣" value="民谣" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="轻音乐" value="轻音乐"
               v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="电音" value="电音" v-model="style"/>
        <input class="join-item btn w-1/6" type="radio" name="options4" aria-label="流行" value="流行" v-model="style"/>
      </div>
      语言
      <div class="join w-full">
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="默认" value="默认"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="英语" value="英语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="日语" value="日语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="粤语" value="粤语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="国语" value="国语"
               v-model="language"/>
        <input class="join-item btn w-1/6" type="radio" name="options5" aria-label="韩语" value="韩语"
               v-model="language"/>
      </div>


      <div class="flex-column text-2xl">
        <div class="text-white">介绍</div>
      </div>
      <div class="inputForm bg-zinc-900">
        <svg class="icon fill-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="white"></path>
          <path
              d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z"
              fill="white"></path>
        </svg>
        <input type="text" class="input bg-zinc-900" placeholder="请为你的歌曲写一点介绍" v-model="introduction">
      </div>
      <div class="flex-column text-2xl">
        <div class="text-white">歌词</div>
      </div>
      <div>
        <input type="file" @change="onLrcFileChange">
        <button @click="parseLrcFile" class="btn btn-xl text-white tracking-widest">上传并解析歌词文件</button>
      </div>
      <div class="grid grid-cols-10 gap-4">
        <p class="col-span-3 text-sm text-gray-300">
          <span>歌词开始时间</span>
        </p>
        <p class="text-sm text-gray-300">
          <span>单句歌词</span>
        </p>
      </div>
      <div class="grid grid-cols-10 gap-4" v-for="(lyric, index) in lyrics" :key="index">
        <div class="inputForm bg-zinc-900 col-span-3">
          <svg class="icon fill-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
               width="24" height="24">
            <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="white"></path>
            <path
                d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z"
                fill="white"></path>
          </svg>
          <input type="text" class="input bg-zinc-900" placeholder="[00:00:00]" v-model="lyric.time">
        </div>
        <div class="inputForm bg-zinc-900 col-span-6">
          <svg class="icon fill-white" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
               width="24" height="24">
            <path d="M0 0v1024h1024V0H0z m938.67 938.67H85.33V85.33h853.33v853.34z" fill="white"></path>
            <path
                d="M341.33 213.33h512v85.33h-512zM170.67 213.33H256v85.33h-85.33zM341.33 384h512v85.33h-512zM341.33 554.67h512V640h-512zM170.67 554.67H256V640h-85.33zM341.33 725.33h512v85.33h-512z"
                fill="white"></path>
          </svg>
          <input type="text" class="input bg-zinc-900" placeholder="请输入单句歌词" v-model="lyric.text">
        </div>
        <div type="button"
             class="h-[31px] col-span-1 m-auto border-radius rounded-full mx-auto focus:outline-none focus:shadow-outline hover:bg-gray-300 transition"
             @click="deleteline(index)">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
               width="32" height="32">
            <path
                d="M875.432137 148.567863c-198.090484-198.090484-523.981279-198.090484-722.071763 0s-198.090484 523.981279 0 722.071763 523.981279 198.090484 722.071763 0S1073.522621 353.048362 875.432137 148.567863zM690.121685 646.98908c12.780031 12.780031 12.780031 31.950078 0 44.730109-12.780031 12.780031-31.950078 12.780031-44.730109 0L511.201248 557.528861l-134.190328 134.190328c-12.780031 12.780031-31.950078 12.780031-44.730109 0-12.780031-12.780031-12.780031-31.950078 0-44.730109L466.471139 512.798752 332.280811 378.608424C319.50078 365.828393 319.50078 346.658346 332.280811 333.878315s31.950078-12.780031 44.730109 0L511.201248 468.068643l134.190328-134.190328c12.780031-12.780031 31.950078-12.780031 44.730109 0 12.780031 12.780031 12.780031 31.950078 0 44.730109L555.931357 512.798752 690.121685 646.98908z"
                fill="#d81e06"></path>
          </svg>
        </div>
      </div>
      <div type="button"
           class="h-[31px] border-radius rounded-full mx-auto focus:outline-none focus:shadow-outline fill-blue-500 hover:bg-gray-500 hover:fill-white transition"
           @click="addline">
        <svg class="icon" viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg"
             width="32" height="32">
          <path
              d="M512 93.090909c111.709091 0 216.436364 44.218182 295.563636 123.345455 162.909091 162.909091 162.909091 428.218182 0 593.454545C728.436364 886.690909 623.709091 930.909091 512 930.909091s-216.436364-44.218182-295.563636-123.345455c-162.909091-162.909091-162.909091-428.218182 0-593.454545C295.563636 137.309091 400.290909 93.090909 512 93.090909m0-93.090909C381.672727 0 249.018182 48.872727 148.945455 148.945455-48.872727 349.090909-48.872727 674.909091 148.945455 875.054545c100.072727 100.072727 232.727273 148.945455 363.054545 148.945455s262.981818-48.872727 363.054545-148.945455c200.145455-200.145455 200.145455-523.636364 0-723.781818C774.981818 48.872727 642.327273 0 512 0z"
          ></path>
          <path
              d="M512 779.636364c-25.6 0-46.545455-20.945455-46.545455-46.545455v-442.181818c0-25.6 20.945455-46.545455 46.545455-46.545455s46.545455 20.945455 46.545455 46.545455v442.181818c0 25.6-20.945455 46.545455-46.545455 46.545455z"
          ></path>
          <path
              d="M733.090909 558.545455h-442.181818c-25.6 0-46.545455-20.945455-46.545455-46.545455s20.945455-46.545455 46.545455-46.545455h442.181818c25.6 0 46.545455 20.945455 46.545455 46.545455s-20.945455 46.545455-46.545455 46.545455z"
          ></path>
        </svg>
      </div>
      <button class="mt-5 w-full flex justify-center bg-blue-600 text-white p-4  rounded-full button-submit
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-800 shadow-lg cursor-pointer transition ease-in duration-300 tracking-widest"
              @click="submitSong">
        上 传
      </button>
      <button @click="downloadLrcFile" class="mb-5 w-full flex justify-center bg-blue-600 text-white p-4  rounded-full button-submit
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-800 shadow-lg cursor-pointer transition ease-in duration-300 tracking-widest">
        下载歌词
      </button>
    </div>
  </div>
</template>

<style>
@import url('../css/Login.css');

.vx-enter-active,
.vx-leave-active {
  transition: opacity 0.3s ease;
}

.vx-enter-from,
.vx-leave-to {
  opacity: 0;
}

.formx2 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  width: 800px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.text-white {
  color: white;
}
</style>

<script setup>
import confetti from 'canvas-confetti';
import {ref, defineModel} from "vue";
import axios from "axios";
import Warning from "@/components/Warning.vue";
import {defineEmits} from "vue"
import P from "particles.vue3";

const emits = defineEmits(['ChangerRegisterMode', 'changeMode']);
const lyrics = ref([{'time': '', 'text': ''}]);
const theme = ref('主题');
const scene = ref('场景');
const mood = ref('心情');
const style = ref('风格');
const language = ref('语言');
const introduction = ref('');
const username = defineModel('username')
const songTitle = ref('');
const singerName = ref('');
const mp3File = ref(null);
const coverImageFile = ref(null);
const coverImageFileUrl = ref('');
const lrcFile = ref(null);

const onLrcFileChange = (event) => {
  lrcFile.value = event.target.files[0];
};

const parseLrcFile = () => {
  if (lrcFile.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      let lrcContent = e.target.result;
      lrcContent = lrcContent.replace(/\[(\d+:\d+\.)(\d{2,3})\]/g, (match, time, ms) => {
        const truncatedMs = ms.slice(0, 2);
        return `[${time}${truncatedMs}]`;
      });
      lyrics.value = parseLrcContent(lrcContent);
    };
    reader.readAsText(lrcFile.value);
  }
};

const parseLrcContent = (lrcContent) => {
  const lines = lrcContent.split('\n');
  const pattern = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/;
  return lines.map(line => {
    const match = line.match(pattern);
    if (match) {
      return {
        time: `${match[1]}:${match[2]}.${match[3]}`,
        text: match[4].trim()
      };
    }
    return {time: '', text: ''};
  }).filter(line => line.text !== '');
};


function convertLyricsToLRC(lyricsArray) {
  let lrcContent = '';
  for (const lyric of lyricsArray) {
    lrcContent += `[${lyric.time}]${lyric.text}\n`;
  }
  return lrcContent;
}

const onMp3FileChange = (event) => {
  mp3File.value = event.target.files[0];
};

const onCoverFileChange = (event) => {
  coverImageFile.value = event.target.files[0];
  const files = event.target.files || event.dataTransfer.files;
  createImage(files[0]);
};

const createImage = (file) => {
  fileToBase64(file).then(function (base64) {
    coverImageFileUrl.value = base64;// 输出文件的 base64 形式
  }).catch(function (error) {
    console.error('Error:', error.data);
  });
};


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

const downloadLrcFile = () => {
  const lrcString = convertLyricsToLRC(lyrics.value);
  const filename = songTitle.value ? `${songTitle.value}.lrc` : 'lyrics.lrc';
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
};

const submitSong = () => {
  const button = document.querySelector('.button-submit');
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2 + window.scrollX;
  const y = rect.top + rect.height / 2 + window.scrollY;
  if (HasLogin.value === false) {
    WarningShow.value = true;
    message.value = '请先登录';
    return;
  }
  if (songTitle.value === '') {
    WarningShow.value = true;
    message.value = '请输入歌曲名';
    return;
  }
  if (mp3File.value === null) {
    WarningShow.value = true;
    message.value = '请上传歌曲';
    return;
  }
  if (coverImageFile.value === null) {
    WarningShow.value = true;
    message.value = '请上传封面';
    return;
  }
  let formData = new FormData();
  const lrcString = convertLyricsToLRC(lyrics.value);
  let filename = songTitle.value + '.lrc';
  const lrcBlob = new Blob([lrcString], {type: 'text/plain'});
  formData.append('title', songTitle.value);
  formData.append('singer', singerName.value);
  formData.append('cover', coverImageFile.value);
  formData.append('audio', mp3File.value);
  formData.append('uploader', username.value);
  formData.append('tag_theme', theme.value);
  formData.append('tag_scene', scene.value);
  formData.append('tag_style', style.value);
  formData.append('tag_mood', mood.value);
  formData.append('tag_language', language.value);
  formData.append('lyric', lrcBlob, filename);
  formData.append('introduction', introduction.value);
  axios.post('http://182.92.100.66:5000/songs/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
      .then(response => {
        alert('上传成功');
        upLoadSongSuccess();
        console.log(response.data);
        confetti({
          particleCount: 500,
          angle: 90,
          spread: 45,
          startVelocity: 45,
          decay: 0.9,
          gravity: 1,
          drift: 0,
          ticks: 200,
          origin: {x: x / window.innerWidth, y: y / window.innerHeight},
          shapes: ["square", "circle"],
          zIndex: 100,
          colors: [
            "#26ccff",
            "#a25afd",
            "#ff5e7e",
            "#88ff5a",
            "#fcff42",
            "#ffa62d",
            "#ff36ff"
          ],
          disableForReducedMotion: false,
          scalar: 1
        });
      })
      .catch(error => {
        alert('上传失败');
        console.error(error.response ? error.response : error);
      });
};


const addline = () => {
  lyrics.value.push({'time': '', 'content': ''});
}

const deleteline = (index) => {
  console.log(lyrics.value.length)
  if (lyrics.value.length === 1) {

  } else {
    lyrics.value.splice(index, 1);
  }
}

const CloseWarning = () => {
  WarningShow.value = false;
}
const HasLogin = defineModel('HasLogin');
const message = ref('');
const WarningShow = ref(false);

const changeMode = () => {
  emits('changeMode');
}

</script>