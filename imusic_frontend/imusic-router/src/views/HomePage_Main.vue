<script setup>
import {computed, ref,defineModel} from "vue";
import Search from "@/views/Search.vue";
import Image_Scrool from "@/views/SongList_Scrool.vue";
import SingerList_Scrool from "@/views/SingerList_Scrool.vue";
const NaviMode = ref('1');
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const changeNaviMode = (newMode) => {
  NaviMode.value = newMode.toString();
  console.log(NaviMode.value);
}

const songlists=defineModel('songlists');
const index=defineModel('index');

</script>

<template>
  <div class="w-full h-16 pl-6 fixed z-50 bg-zinc-900">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">推荐</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">最新上传</div>
    <Search></Search>
  </div>
  <div class="text-2xl mx-4 text-white font-serif font-bold mt-16 ml-8">歌单</div>
  <Image_Scrool v-model:songlists="songlists" v-model:index="index"></Image_Scrool>
  <hr class="m-5 border-gray-500">
  <div class="text-2xl mx-4 text-white font-serif font-bold ml-8">推荐艺人</div>
  <SingerList_Scrool v-model:songlists="songlists"></SingerList_Scrool>
  <hr class="m-5 border-gray-500">
  <div class="mx-4">
  <div class="grid grid-cols-2 gap-4">
    <div class="grid-col-2">
      <div class="text-2xl mx-8 text-white font-serif font-bold my-4">热门单曲</div>
      <div class="overflow-x-auto">
        <table class="table mx-auto">
          <!-- head -->
          <thead>
          <tr>
            <th class="text-center text-sm font-semibold">音乐标题</th>
            <th class="text-center text-sm font-semibold">歌手</th>
            <th class="text-center text-sm font-semibold">专辑</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Hart Hagerty</div>
                  <div class="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
            </td>
            <td>Purple</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 2 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Brice Swyre</div>
                  <div class="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
            </td>
            <td>Red</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 3 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Marjy Ferencz</div>
                  <div class="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
            </td>
            <td>Crimson</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 4 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Yancy Tear</div>
                  <div class="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
            </td>
            <td>Indigo</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          </tbody>

        </table>
      </div>
    </div>
    <div class="grid-col-2">
      <div class="text-2xl mx-4 text-white font-serif font-bold my-4">最新上传</div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
          <tr>
            <th class="text-center text-sm font-semibold">音乐标题</th>
            <th class="text-center text-sm font-semibold">上传者</th>
            <th class="text-center text-sm font-semibold">专辑</th>
            <th class="text-center text-sm font-semibold"></th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="http://182.92.100.66:5000/media/covers/%E5%96%9C%E5%B8%96%E8%A1%97_AT5qMkj.webp" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Hart Hagerty</div>
                  <div class="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
            </td>
            <td>Purple</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 2 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Brice Swyre</div>
                  <div class="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
            </td>
            <td>Red</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 3 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Marjy Ferencz</div>
                  <div class="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
            </td>
            <td>Crimson</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 4 -->
          <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src="" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">Yancy Tear</div>
                  <div class="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
            </td>
            <td>Indigo</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          </tbody>

        </table>
      </div>
    </div>
  </div>
  </div>
  <hr class="m-5 border-gray-500">
  <div class="text-white text-base px-4 my-4">
    关于ios后台播放<br>
    由于ios限制无法在后台切换歌曲，可以添加到主屏幕、升级到ios16.1.1<br>
  </div>
  <div class="text-white text-base px-4 mt-4 mb-32">
    如有侵权，请联系本人予以删除！邮箱xuehuitian45@gmail.com<br>
    本站本身不储存任何资源文件，资源来自互联网，仅供学习交流试听，请于下载后24小时内删除，支持购买正版专辑！
  </div>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}
</style>