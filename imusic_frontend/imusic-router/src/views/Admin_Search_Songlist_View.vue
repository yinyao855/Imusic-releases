<script setup>
import axios from "axios";
import {defineEmits, ref} from "vue";
import Admin_Update_SongList_Page from "@/views/Admin_Update_SongList_Page.vue";
import buttonchangesize from "@/components/buttonchangesize.vue"

const SongLists = defineModel('SongLists');
const token = defineModel('token');


const DeleteSongList = (index) => {
  let SongListId = SongLists.value[index].id
  console.log(SongListId);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const web = '/songlists/delete/' + SongListId;
  instance.delete(web)
      .then(response => {
        console.log(response.data);
        if (response.data.success === true) {
          alert('删除成功');
          refresh();
        }
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
const refresh = () => {
  emits('refresh');
}

const ShowUpdateSongList = ref(false);

const SongListId = ref(0);

const Show_Update_SongList = (index) => {
  SongListId.value = SongLists.value[index].id;
  ShowUpdateSongList.value = true;
}

const DeleteSongListId = () => {
  let length = SongLists.value.length;
  for (let i = 0; i < length; ++i) {
    if (SongLists.value[i].id === SongListId.value) {
      SongLists.value.splice(i, 1);
      break;
    }
  }
}

const changesize = () => {
  ShowUpdateSongList.value = false;
}
</script>

<template>
  <div class="text-2xl mx-auto my-6 w-full text-center text-white font-semibold">
    <buttonchangesize class="absolute top-5 left-5" @fullsize="changesize" v-model:token="token"></buttonchangesize>
    搜索结果
  </div>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowUpdateSongList">
      <Admin_Update_SongList_Page v-model:token="token" v-model:SongListId="SongListId"
                                  @changesize="changesize"
                                  @DeleteSongListId="DeleteSongListId"></Admin_Update_SongList_Page>
    </div>
  </transition>

  <div class="overflow-x-auto mx-4" v-if="!ShowUpdateSongList">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">音乐标题</th>
        <th class="text-left text-sm font-semibold">上传者</th>
        <th class="text-left text-sm font-semibold">上传日期</th>
        <th class="text-left text-sm font-semibold">操作</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white rounded-md"
          v-for="(item, index) in SongLists" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar justify-center">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.cover"
                     alt="封面"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.title }}</div>
              <!--              <div class="text-sm opacity-50">United States</div>-->
            </div>
          </div>
        </td>
        <td>
          {{ item.owner }}
        </td>
        <td>{{ item.create_date }}</td>
        <td>
          <div class="inline pr-4" @click="DeleteSongList(index)">
            <svg class="icon fill-red-600 hover:fill-red-800 inline" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24">
              <path
                  d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z"
              ></path>
              <path
                  d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z"
              ></path>
              <path
                  d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z"
              ></path>
              <path
                  d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"
              ></path>
            </svg>
          </div>
          <svg @click="Show_Update_SongList(index)" class="icon fill-white inline hover:fill-gray-500"
               viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg"
               width="24" height="24">
            <path
                d="M684.202667 117.248c15.893333-15.872 42.154667-15.36 58.922666 1.408l90.517334 90.517333c16.661333 16.661333 17.344 42.986667 1.429333 58.922667l-445.653333 445.653333c-7.936 7.914667-23.104 16.746667-34.218667 19.776l-143.701333 39.253334c-21.909333 5.994667-35.114667-7.104-29.568-28.949334l37.248-146.773333c2.773333-10.944 11.562667-26.346667 19.392-34.176l445.653333-445.653333zM268.736 593.066667c-2.901333 2.901333-8.106667 12.074667-9.130667 16.021333l-29.12 114.773333 111.957334-30.570666c4.437333-1.216 13.632-6.549333 16.810666-9.728l445.653334-445.653334-90.517334-90.496-445.653333 445.653334zM682.794667 178.986667l90.517333 90.517333-30.186667 30.186667-90.496-90.517334 30.165334-30.165333z m-362.026667 362.048l90.496 90.517333-30.165333 30.165333-90.517334-90.496 30.165334-30.186666zM170.666667 874.666667c0-11.776 9.429333-21.333333 21.461333-21.333334h661.077333a21.333333 21.333333 0 1 1 0 42.666667H192.128A21.333333 21.333333 0 0 1 170.666667 874.666667z"
            ></path>
          </svg>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}

.text-transition {
  transition: color 0.5s ease;
}


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
</style>