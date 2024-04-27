<script setup>
const props = defineProps({
  songlist: Object,
})

function show_tag(theme) {
  return theme !== null;
}

</script>

<template>
  <div class="bgx bg-cover bg-center h-72 relative z-10">
    <div class="bg-blur w-full h-full absolute top-0 left-0"
         :style="{backgroundImage: 'url(' + props.songlist.cover + ')'}"></div>
    <div class="p-5 header_songlist">
      <div class="inline-block">
        <img :src="props.songlist.cover" class="img_songlist shadow-2xl" alt="歌单封面">
      </div>
      <div class="inline-block ml-7 align-top">
        <div>
          <h1 class="mt-2 text-white font-extrabold text-3xl">{{ props.songlist.title }}</h1>
          <p class="mt-2 text-white">{{ props.songlist.owner }} · {{ props.songlist.create_date }}</p>
        </div>
        <div>
          <details class="text-white text-sm">
            <summary class="mt-3 text-white font-bold">介绍</summary>
            <div class="mt-3 absolute">
              {{ props.songlist.introduction }}
            </div>
          </details>
        </div>
        <div class="mt-16 inline-block">
          <div v-if="show_tag(props.songlist.tag_theme)"
               class="text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
            {{ props.songlist.tag_theme }}
          </div>
          <div v-if="show_tag(props.songlist.tag_scene)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-green-200 text-green-700 rounded-full">
            {{ props.songlist.tag_scene }}
          </div>
          <div v-if="show_tag(props.songlist.tag_mood)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-red-200 text-red-700 rounded-full">
            {{ props.songlist.tag_mood }}
          </div>
          <div v-if="show_tag(props.songlist.tag_style)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-orange-200 text-orange-700 rounded-full">
            {{ props.songlist.tag_style }}
          </div>
          <div v-if="show_tag(props.songlist.tag_language)"
               class="ml-1 text-xs inline-flex items-center font-bold leading-sm px-2 py-1 bg-purple-200 text-purple-700 rounded-full">
            {{ props.songlist.tag_language }}
          </div>
        </div>
      </div>
      <div class="">
        <button class="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full">
          <svg class="h-5 w-5 inline-block align-sub text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <p class="inline-block">Play All</p>
        </button>
        <button class="mr-3 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-16 rounded-full inline-block">
          <svg class="h-5 w-5 text-white inline-block align-sub" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          收藏歌单
          ({{ props.songlist.like }})
        </button>
      </div>
    </div>
  </div>
  <div class="mt-3 overflow-auto">
    <hr class="mx-5 border-gray-500">
    <div class="mt-3 m-5">
      <table class="w-full">
        <thead class="">
        <tr class="h-10 text-white">
          <th class="text-left p-3 text-sm font-semibold">歌名</th>
          <th class="text-center text-sm font-semibold">演唱者</th>
          <th class="text-center text-sm font-semibold">时长</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="song in props.songlist.songs" class="text-white transition duration-400 hover:bg-gray-600/40">
          <td class="pl-3 p-1 hover:cursor-pointer">
            <img :src="song.cover" class="img_song inline-block mr-3" alt="歌曲封面">
            <p class="inline-block">{{ song.title }}</p>
          </td>
          <td class="text-center">{{ song.singer }}</td>
          <td class="text-center">0.00</td>
          <td>
            <div class="menu">
              <button class="font-bold text-xl">···</button>
              <div class="menu_item font-bold right-7 -bottom-1 bg-gray-600 text-white opacity-90">
                <div
                    class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </svg>
                    查看歌曲信息
                  </p>
                </div>
                <div
                    class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" width="24" height="24"
                         viewBox="0 0 24 24" stroke-width="2"
                         stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z"/>
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    加入播放列表
                  </p>
                </div>
                <div
                    class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    加入歌单
                  </p>
                </div>
                <div
                    class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    下载
                  </p>
                </div>
                <div
                    class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    分享
                  </p>
                </div>
                <div
                    class="hover:bg-white hover:text-blue-500 hover:cursor-pointer rounded-md py-2 w-44 inline-block">
                  <p>
                    <svg class="ml-5 h-5 w-5 text-gray-900 inline-block align-sub" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path
                          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    举报
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.header_songlist {
  position: absolute;
}

.img_songlist {
  width: 200px;
  height: 200px;
  border-radius: 20px;
}

.img_song {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.menu {
  position: relative;
  display: inline-block;
}

.menu_item {
  display: none;
  position: absolute;
  min-width: 160px;
  border-radius: 8px;
}

.menu:hover .menu_item {
  display: block;
}

.bg-blur {
  float: left;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(19px);
  -ms-filter: blur(19px);
  filter: blur(19px);

}
</style>