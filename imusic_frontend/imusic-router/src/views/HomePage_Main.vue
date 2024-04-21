<script setup>
import {computed, ref} from "vue";
import Search from "@/views/Search.vue";
import Image_Scrool from "@/views/Image_Scrool.vue";
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
</script>

<template>
  <div class="w-full h-16 pl-6">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1)" style="line-height: 56px">推荐</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2)" style="line-height: 56px">最新上传</div>
    <Search></Search>
  </div>
  <div class="text-2xl mx-4 text-white font-serif font-bold">歌单</div>
  <Image_Scrool></Image_Scrool>
  <hr class="m-5 border-gray-500">
  <div class="text-2xl mx-4 text-white font-serif font-bold">推荐艺人</div>
  <Image_Scrool></Image_Scrool>
  <hr class="m-5 border-gray-500">
  <div class="grid grid-cols-2 gap-4">
    <div class="grid-col-2">
      <div class="text-2xl mx-4 text-white font-serif font-bold my-4">热门单曲</div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
          <tr>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 2 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 3 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Office Assistant I</span>
            </td>
            <td>Crimson</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 4 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Community Outreach Specialist</span>
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
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 2 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 3 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Office Assistant I</span>
            </td>
            <td>Crimson</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          <!-- row 4 -->
          <tr>
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
              <br/>
              <span class="badge badge-ghost badge-sm">Community Outreach Specialist</span>
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
  <hr class="m-5 border-gray-500">
  <div class="text-white text-base px-4 my-4">
    关于ios后台播放<br>
    由于ios限制无法在后台切换歌曲，可以添加到主屏幕、升级到ios16.1.1<br>
  </div>
  <div class="text-white text-base px-4 my-4">
    如有侵权，请联系本人予以删除！邮箱i@liumingye.cn或liumingye2015@gmail.com<br>
    本站本身不储存任何资源文件，资源来自互联网，仅供学习交流试听，请于下载后24小时内删除，支持购买正版专辑！
  </div>
</template>

<style scoped>
.text-transition {
  transition: color 0.5s ease;
}
</style>