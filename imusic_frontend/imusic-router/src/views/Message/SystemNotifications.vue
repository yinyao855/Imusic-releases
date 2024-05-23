<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref, computed, watch} from "vue";
import SystemMessages from "@/views/Message/SystemMessages.vue";

const token = defineModel("token");
const username = defineModel("username");

// 处理消息
import {useMessageStore} from "@/stores/message.js";
import MyAlert from "@/js/MyAlert.js";
const messageStore = useMessageStore();
const Message = ref(computed(() => messageStore.MessageType1));
const currentMessage = ref([]);
const contents = ref([]);
const Loading = ref(true);
const report = ref("");
// const systemMessage = defineModel("systemMessage");
// const playSongMessage = defineModel("playSongMessage");
// const createMessage = defineModel("createMessage");
const showSystemMessage = ref(false);
// const emits = defineEmits(["GetMessage", "readMessage"]);

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  return `${year}年${formattedMonth}月${formattedDay}日`;
}

function activeShowSystemMessage(index) {
  currentMessage.value = Message.value[index];
  if(currentMessage.value.is_read === false) {
    readMessage(currentMessage.value.id);
    currentMessage.value.is_read = true;
  }
  // 分析
  const s1 = ref([]);
  const s2 = ref([]);
  const s3 = ref([]);
  const s = ref([]);
  const sen = ref([]);
  contents.value = [];

  // 听歌周报
  if (currentMessage.value.title === "听歌周报") {
    sen.value = currentMessage.value.content.split("。");

    // 您在_至_这段时间内，共听歌_首，累计听歌时长_
    s.value = sen.value[0].split("，");
    s1.value = s.value[0].split("您在")
    s2.value = s1.value[1].split("这段时间内")
    s3.value = s2.value[0];
    contents.value[0] = "听歌统计：" + s3.value;
    s1.value = s.value[2].split("累计听歌时长");
    s2.value = s1.value[1].split("分钟");
    s3.value = s2.value[0];
    contents.value[1] = s3.value + "分钟";
    contents.value[2] = s.value[1];

    // 您最常听的歌曲是_，共播放_次
    s.value = sen.value[1].split("，");
    contents.value[3] = "最常听的歌曲";
    s1.value = s.value[0].split("您最常听的歌曲是");
    contents.value[4] = s1.value[1];
    contents.value[5] = s.value[1];

    // 您最常听的歌手是_，共听过他/她的_首歌曲，分别是_
    s.value = sen.value[2].split("，");
    contents.value[6] = "最喜爱的歌手";
    s1.value = s.value[0].split("您最常听的歌手是");
    contents.value[7] = s1.value[1];
    contents.value[8] = s.value[1];
    s1.value = s.value[2].split("分别是");
    contents.value[9] = s1.value[1];

    // 您喜欢听的歌曲风格为_
    s.value = sen.value[3].split("，");
    contents.value[10] = "喜欢听的风格";
    s1.value = s.value[0].split("您喜欢听的歌曲风格为");
    contents.value[11] = s1.value[1];

    // 祝您生活愉快！
    contents.value[12] = sen.value[4];
  }
  // 创作周报
  else if (currentMessage.value.title === "创作周报") {
    sen.value = currentMessage.value.content.split("。");

    // 您在_这段时间内，共上传歌曲_首，创建歌单_个
    s.value = sen.value[0].split("，");
    s1.value = s.value[0].split("您在")
    s2.value = s1.value[1].split("这段时间内")
    s3.value = s2.value[0];
    contents.value[1] = "创作周报";
    contents.value[2] = s3.value;
    s1.value = s.value[1].split("共")
    contents.value[4] = s1.value[1];
    contents.value[7] = s.value[2];

    // 您上传的歌曲有_
    s1.value = sen.value[1].split("您上传的歌曲有")
    contents.value[5] = s1.value[1];

    // 您创建的歌单有修改。
    s1.value = sen.value[2].split("您创建的")
    contents.value[9] = s1.value[1];

    // 您上传的歌曲共获得_个喜欢，创建的歌单共获得0个收藏
    s.value = sen.value[3].split("，");
    s1.value = s.value[0].split("您上传的歌曲")
    contents.value[3] = s1.value[1];
    s1.value = s.value[1].split("创建的歌单")
    contents.value[6] = s1.value[1];

    // 祝您创作愉快！
    contents.value[0] = sen.value[4];
  }
}

function readMessage(id) {
  messageStore.readMessage(id, token.value);
}

const hasMessage = ref(true);
function getSystemMessages() {
  if (Message.value.length === 0) {
    hasMessage.value = false;
  }
  Loading.value = false;
}
async function DeleteMessage(index) {
  console.log(Message.value[index].id);
  console.log(token.value);
  try {
    await messageStore.deleteMessage(Message.value[index].id, token.value);
    MyAlert({type: 'alert-info', text: '删除成功'});
    Loading.value = true;
    messageStore.refreshMessage(token.value);

  } catch (error) {
    MyAlert({type: 'alert-error', text: '删除失败'});
    messageStore.refreshMessage(token.value);
  }
}
onMounted(getSystemMessages)
watch(Message, getSystemMessages)
</script>

<template>
<!--  <transition name="slide" appear>-->
<!--    <div class="transition-container-2 cursor-default" v-if="showSystemMessage">-->
<!--      <SystemMessages :currentMessage="currentMessage"-->
<!--                      @closeShowSystemMessage="closeShowSystemMessage"-->
<!--                      v-model:token="token"></SystemMessages>-->
<!--    </div>-->
<!--  </transition>-->

<!--  听歌周报-->
  <dialog id="modal" class="modal">
    <div class="modal-box" style="max-width: 100rem;">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="stats shadow flex">

        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div class="stat-title my-2">{{contents[0]}}</div>
          <div class="stat-value text-primary">{{contents[1]}}</div>
          <div class="stat-desc my-2">{{contents[2]}}</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="stat-title my-2">{{contents[3]}}</div>
          <div class="stat-value text-secondary">{{contents[4]}}</div>
          <div class="stat-desc my-2">{{contents[5]}}</div>
        </div>

        <div class="stat">
          <div class="stat-title my-2">{{contents[6]}}</div>
          <div class="stat-value text-warning">{{contents[7]}}</div>
          <div class="stat-desc my-2">{{contents[8]}}</div>
          <div class="stat-desc text-primary">{{contents[9]}}</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <div class="avatar online">
            </div>
          </div>
          <div class="stat-value">{{contents[10]}}</div>
          <div class="stat-title">{{contents[11]}}</div>
          <div class="stat-desc text-secondary">{{contents[12]}}</div>
        </div>

      </div>
    </div>
  </dialog>

  <div class="overflow-x-auto px-10" v-if="!showSystemMessage">
    <div class="w-full h-32 flex" v-if="!hasMessage&&!Loading">
      <div class="text-4xl text-white text-center m-auto">暂无消息</div>
    </div>
    <div class="w-full flex h-60" v-if="Loading">
      <span class="loading loading-spinner loading-lg m-auto"></span>
    </div>
    <table class="table" v-if="!Loading">
      <tbody>
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md cursor-pointer"
          v-for="(item, index) in Message" :key="index" onclick="modal.showModal()" @click="activeShowSystemMessage(index)">
        <td class="w-24">
          <svg v-if="item.title === '听歌周报'" class="h-10 w-10 align-middle text-cyan-400 inline-block"
               viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path
                d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
          <svg v-if="item.title === '创作周报'" class="h-10 w-10 align-middle text-pink-400 inline-block"
               width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <svg v-if="!item.is_read" class="h-2 w-2 text-red-500 inline-block rounded-full align-top" width="24" height="24" viewBox="0 0 24 24" stroke-width="1"
               stroke="currentColor" fill="red" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </td>
        <td class="align-middle">
          <div class="font-bold text-xl">{{ item.title }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ formatDateTime(item.send_date) }}
        </td>
        <td class="w-20">
          <div class="inline pr-4">
            <svg class="icon fill-red-500 inline hover:fill-red-800" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" @click.stop="DeleteMessage(index)">
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
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="h-32"></div>
</template>

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

.transition-container {
  right: 0;
  top: 0;
  height: 100%
}

.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}
</style>