<script setup>
import {defineModel, defineEmits} from "vue"

const songlistlast = defineModel('songlistlast');
const emits = defineEmits(['handlePlayNow', 'handlePlayAfter']);

function handlePlayNow(index) {
  //console.log(songlistlast.value[index].id);
  emits('handlePlayNow', songlistlast.value[index].id)
}

function handlePlayAfter(index) {
  //console.log(songlistlast.value[index].id);
  emits('handlePlayAfter', songlistlast.value[index].id)
}

</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">歌手</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold"></th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in songlistlast" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar justify-center">
              <svg t="1714113029201" class="icon fill-white mx-2 " viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="4703" width="20" height="20">
                <path
                    d="M744.0384 131.6864a209.5104 209.5104 0 0 1 190.976 124.8256c0.4096 0.9216 0.8192 1.9968 1.28 3.1232a241.0496 241.0496 0 0 1 15.0016 59.1872v0.9728a230.4 230.4 0 0 1 1.9456 30.72A247.04 247.04 0 0 1 880.64 526.0288l-363.52 363.52a9.0624 9.0624 0 0 1-6.5536 2.7136 8.9088 8.9088 0 0 1-6.3488-2.56l-359.0656-358.912a252.16 252.16 0 0 1-74.496-184.32v-0.3584A250.4704 250.4704 0 0 1 87.04 259.9424a208.896 208.896 0 0 1 259.6864-116.1216 217.856 217.856 0 0 1 111.36 93.1328A59.8528 59.8528 0 0 0 510.0032 266.24H517.12l6.8608-1.6896a61.696 61.696 0 0 0 34.0992-22.4256l1.792-2.4064 1.536-2.6112a198.912 198.912 0 0 1 21.76-30.1568l0.512-0.5632 0.512-0.5632c2.4064-2.8672 4.7616-5.5296 7.2192-8.0896 1.4336-1.536 3.072-3.2768 3.8912-3.9936l0.8192-0.8192 0.8192-0.768c2.9696-2.9696 5.12-5.12 7.68-7.2192 4.0448-3.5328 7.424-6.2976 10.24-8.4992l0.6144-0.4608 0.5632-0.4608c2.8672-2.2528 6.3488-4.6592 10.24-7.3728s8.2944-5.4272 11.776-7.424c3.5328-2.048 7.0656-3.9424 10.5984-5.7344a210.944 210.944 0 0 1 93.952-22.2208m0-57.4464A268.1856 268.1856 0 0 0 624.2816 102.4c-4.5568 2.304-9.1648 4.8128-13.7728 7.4752s-9.9328 6.144-14.8992 9.3696-9.5744 6.5536-14.1824 10.24-9.216 7.2704-13.6192 11.1104-7.424 6.656-11.0592 10.24c-2.5088 2.304-4.8128 4.8128-7.1168 7.2704-3.2256 3.4816-6.2976 6.912-9.3696 10.5472a258.048 258.048 0 0 0-28.16 38.8608 3.3792 3.3792 0 0 1-2.0992 1.3312 2.6624 2.6624 0 0 1-2.4576-1.3312 275.2512 275.2512 0 0 0-141.5168-117.76A266.24 266.24 0 0 0 34.0992 237.3632v0.3584a314.2144 314.2144 0 0 0 70.656 333.7216l358.9632 358.912a66.56 66.56 0 0 0 93.952 0l363.776-363.52a305.152 305.152 0 0 0 89.6-216.32 280.832 280.832 0 0 0-2.5088-38.2976 299.1616 299.1616 0 0 0-19.1488-74.8544c-0.3584-0.768-0.5632-1.3312-0.768-1.8944a266.9568 266.9568 0 0 0-244.6336-161.2288z"
                    p-id="4704"></path>
              </svg>
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.cover"
                     alt="Avatar Tailwind CSS Component"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.title }}</div>
              <div class="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {{ item.singer }}
        </td>
        <td>{{ item.uploader }}</td>
        <th>
          <div
              class="dropdown dropdown-left dropdown-end my-auto tooltip transition duration-400 hover:bg-gray-600/40 bg-zinc-900 btn btn-sm border-none"
              data-tip="播放列表">
            <svg t="1713774064278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2300" width="32" height="32" tabindex="0" role="button">
              <path
                  d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
                  fill="white" p-id="2301"></path>
            </svg>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow rounded-box bg-zinc-900 text-white text-sm"
                style="width:300px">
              <li>
                <div class="z-50">
                  <img :src="item.cover" alt="封面" class="aspect-square h-12 w-12 ml-0 pl-0">
                  <a class="font-semibold text-sm">{{ item.title }}</a>
                  <br>
                  <a class="block text-gray-600 text-xs mr-0">{{ item.singer }}</a>
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="handlePlayNow(index);">
                  <svg t="1713852360106" class="icon ml-1" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="2272" width="16" height="16">
                    <path
                        d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
                        fill="white" p-id="2273"></path>

                  </svg>
                  立即播放
                </div>
              </li>
              <li>
                <div class="text-sm font-semibold" @click="handlePlayAfter(index)">
                  <svg t="1713852558165" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="3445" width="22" height="22">
                    <path
                        d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
                        fill="white" p-id="3446"></path>
                  </svg>
                  添加到播放列表
                </div>
              </li>
            </ul>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>