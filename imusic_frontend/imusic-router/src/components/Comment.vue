<script setup>
import {defineEmits, defineModel, onMounted, ref, watch} from "vue";
import axios from "axios";
import Warning from "@/components/Warning.vue";

const emit = defineEmits(['fullsize', 'togglePlay', 'update', 'back', 'next']);

const token = defineModel('token')
const showComment = defineModel('showComment');

const songID = defineModel('songID');
const Comment = defineModel('Comment');
const addCommentInfo = ref('');
const WarningShow = defineModel('WarningShow');
const message = defineModel('message');
const addComment = () => {
  const formData = new FormData();
  if (addCommentInfo.value === '') {
    WarningShow.value = true;
    message.value = '评论不能为空';
    return;
  }
  formData.append('songID', songID.value);
  formData.append('content', addCommentInfo.value);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/comments/add', formData)
      .then(response => {
        addCommentInfo.value = '';
        alert('评论成功');
        getSongComment();
      })
      .catch(error => {
        console.log(error.data);
      })
}
const props = defineProps({
  id: String,
});
const getSongComment = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/songs/comments', {
    params: {
      'songID': songID.value
    }
  })
      .then((response) => {
        Comment.value = response.data.data;
        initUserImage();
        initCheckFollow();
      })
      .catch((error) => {
        console.log(error);
      });
}
let userImage = ref([]);
const initUserImage = () => {
  for (let index in Comment.value) {
    let username = Comment.value[index].user;
    const instance = axios.create({
      baseURL: 'http://182.92.100.66:5000',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${token.value}`,
      }
    });
    axios.defaults.withCredentials = true;
    let url = '/users/info/' + username;
    instance.get(url, {})
        .then((response) => {
          userImage.value[index] = response.data.data.avatar;
        })
        .catch((error) => {
          console.log(error);
        });
  }
  for (let i = 0; i < Comment.value.length; i++) {
    if (Comment.value[i].content.length > 31) {
      info.value[i] = Comment.value[i].content;
      showDetail.value[i] = true;
      showInfo.value[i] = false;
    } else {
      info.value[i] = '';
      showDetail.value[i] = false;
      showInfo.value[i] = false;
    }
    sameUser.value[i] = (Comment.value[i].user === username.value);
    //comment_date仅保留年月日
    Comment.value[i].comment_date = Comment.value[i].comment_date.split('T')[0];
  }
}
const deleteComment = (index) => {
  let commentID = Comment.value[index].id;
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/comments/delete';
  instance.delete(url, {
    params: {
      'commentID': commentID
    }
  })
      .then((response) => {

        alert('删除成功');
        getSongComment();
      })
      .catch((error) => {
        console.log(error);

      });
}
function initCheckFollow() {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  let url = '/users/followings?username=' + username.value;
  instance.get(url, {})
      .then((response) => {
        userFollow.value = response.data.data;
        for (let i = 0; i < Comment.value.length; i++) {
          addUser.value[i] = true;
          for (let j = 0; j < userFollow.value.length; j++) {
            if (Comment.value[i].user === userFollow.value[j].username) {
              addUser.value[i] = false;
              break;
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);

      });

}
const info = ref([]);
const showInfo = ref([]);
const showDetail = ref([]);
const sameUser = ref([]);
const username = defineModel('username');
const userFollow = ref([]);
const addUser = ref([]);
function on(index) {
  showInfo.value[index] = true;
}
function off(index) {
  showInfo.value[index] = false;
}
function followUser(index) {
  const formData = new FormData();
  formData.append('username', Comment.value[index].user);

  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.post('/users/follow', formData)
      .then(response => {

        initCheckFollow();
        if(response.data.message==='加关注成功')
        {
          alert('关注成功');
          addUser[index]=false;
        }
        else {
          alert('取消关注成功');
          addUser[index]=true;
        }

      })
      .catch(error => {

      })
}
function tip(index) {
  console.log(addUser.value);
  if (addUser.value[index] === true) {
    return '关注'+Comment.value[index].user;
  } else {
    return '取消关注';
  }
}

onMounted(() => {
  getSongComment();
  console.log(token.value);
})
</script>

<template>
  <transition name="fade">
  <div class="comment h-full w-full overflow-visible" :class="{show:showComment}">
    <div class="text-center text-3xl  font-bold text-white p-3 w-full h-1/10 cursor-default">评论</div>
    <div class="formx2 w-5/6 flexible h-5/6">
      <div class="h-full overflow-auto w-5/6">
        <div
            :style="{ height: (showInfo[index] === true) ? (info[index].length/30*28+50)+'px' :
              (showDetail[index] === true) ? '80px' : '60px'
            }" style="position:relative"
            :class="index % 2 === 0 ? 'bg-even' : 'bg-odd'"
            class="w-full rounded-lg text-white transition ease-in-out delay-100 hover:bg-transparent/20 grid grid-cols-12 grid-rows-8 gap-2 cursor-default"
            v-for="(item, index) in Comment" :key="index">
          <div class="icon aspect-square fill-white ml-1 mr-1 mt-1 row-start-1 col-start-1 w-10 h-10">
            <button class="rounded-full w-10 h-10"><img class="rounded-full w-10 h-10" :src="userImage[index]" alt=""></button>
          <div class="my-0 font-thin ml-7 -mt-2  relative" v-if="sameUser[index]===false">
            <button class="hover:-translate-y-0.1 tooltip overflow-visible" @click="followUser(index)" :data-tip="tip(index)">
              <svg t="1715907551136" class="icon" v-if="addUser[index]===true" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2927"
                   width="14" height="14"><path d="M512 1024C229.238154 1024 0 794.761846 0 512S229.238154 0 512 0s512 229.238154 512 512-229.238154 512-512 512z m236.307692-551.384615H551.384615V275.692308a39.384615 39.384615 0 1 0-78.76923 0v196.923077H275.692308a39.384615 39.384615 0 1 0 0 78.76923h196.923077v196.923077a39.384615 39.384615 0 1 0 78.76923 0V551.384615h196.923077a39.384615 39.384615 0 0 0 0-78.76923z" fill="#13227a" p-id="2928"></path></svg>
              <svg t="1715908677501" class="icon" v-if="addUser[index]===false" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4054"
                   width="14" height="14"><path d="M511.658216 52.364625c-254.320243 0-460.487789 206.167546-460.487789 460.487789s206.167546 460.487789 460.487789 460.487789 460.487789-206.167546 460.487789-460.487789S765.978459 52.364625 511.658216 52.364625zM837.041958 570.014298 186.274474 570.014298c-23.931039 0-43.51098-19.579941-43.51098-43.51098l0-29.006637c0-23.931039 19.579941-43.51098 43.51098-43.51098l650.767484 0c23.931039 0 43.51098 19.579941 43.51098 43.51098l0 29.006637C880.552937 550.434358 860.972996 570.014298 837.041958 570.014298z" fill="#d81e06" p-id="4055"></path></svg>
            </button>
            </div>
            </div>
          <div class="row-start-1 row-span-1 col-start-2 col-span-2 my-auto font-thin">
            <div class=" text-sm">{{ item.user }}：</div>
          </div>
          <div class="row-start-6 row-span-1 col-start-2 col-span-2 my-auto font-thin"
               v-if="showInfo[index]===false">
            <div style=" font-size:0.65rem;line-height:0.8rem"> {{ item.comment_date }}</div>
          </div>
          <div class="row-start-3 row-span-2 col-start-2 col-span-10 my-auto"
               v-if="showInfo[index]===false">
            <p class="ml-2 text-l truncate">{{item.content }}</p>
          </div>
            <button class="row-start-6 row-span-1 col-start-3 col-span-2 my-auto font-thin text-transparent/60  hover:underline "
                 v-if="showInfo[index]===false&&showDetail[index]===true" @click="on(index)">
              <div class="text-l font-black">展开</div>
            </button>
            <button class="col-start-3 col-span-2 my-auto font-thin text-transparent/60 hover:underline ml-8"
                    style="position:absolute;bottom:10px"
                    v-if="showInfo[index]===true" @click="off(index)">
              <div class="text-l font-black">收起</div>
            </button>
          <div class="row-start-4 row-span-2 col-start-12 col-span-1 w-1/2" @click="deleteComment(index)"
               v-if="(sameUser[index])">
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24">
              <path
                  d="M519.620465 0c-103.924093 0-188.511256 82.467721-192.083349 185.820279H85.015814A48.91386 48.91386 0 0 0 36.101953 234.686512a48.91386 48.91386 0 0 0 48.913861 48.866232h54.010046V831.345116c0 102.852465 69.822512 186.844279 155.909954 186.844279h439.200744c86.087442 0 155.909953-83.491721 155.909954-186.844279V284.100465h48.91386a48.91386 48.91386 0 0 0 48.913861-48.890046 48.91386 48.91386 0 0 0-48.913861-48.866233h-227.756651A191.559442 191.559442 0 0 0 519.620465 0z m-107.234232 177.080558c3.548279-49.771163 46.627721-88.540279 99.851907-88.540279 53.224186 0 96.327442 38.745302 99.351813 88.540279h-199.20372z m-111.997024 752.044651c-30.981953 0-65.083535-39.15014-65.083535-95.041488V287.744h575.488v546.839814c0 55.915163-34.077767 95.041488-65.059721 95.041488H300.389209v-0.500093z"
                  fill="#D81E06"></path>
              <path
                  d="M368.116093 796.814884c24.361674 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.908465-48.818605-44.27014-48.818604-24.33786 0-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.293954 48.818605z m154.933581 0c24.361674 0 44.293953-21.670698 44.293954-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.293954-48.818604-24.33786 0-44.27014 21.670698-44.270139 48.818604v278.623256c0 27.147907 19.932279 48.818605 44.293953 48.818605z m132.810419 0c24.33786 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.27014-48.818604s-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.27014 48.818605z"
                  fill="#D81E06"></path>
            </svg>
          </div>
          <hr class="m-0.5 border-gray-500 row-start-8 col-start-3 col-span-9"
              v-if="showInfo[index]===false"/>
          <div class="row-start-2 row-span-2 col-start-2 col-span-10 my-auto"
               v-if="showInfo[index]===true">
            <p class="m-auto text-l mt-2">{{ info[index] }}</p>
          </div>
        </div>
      </div>

      <div class="inputForm bg-transparent/10 fill-white w-5/6">
        <div class="flex w-full h-full">
          <svg class="icon my-auto fill-white" viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg"
               width="30" height="30">
            <path
                d="M193 317h-29a6 6 0 0 0-6 6v408a6 6 0 0 0 6 6h83.806v121.532a6 6 0 0 0 10.195 4.29L386.698 737h200.66l60.159 58.815A66.346 66.346 0 0 1 635 797H411.154L299.945 905.725c-26.064 25.482-67.85 25.01-93.332-1.054a66 66 0 0 1-18.807-46.14V797H164c-36.45 0-66-29.55-66-66V323c0-36.45 29.55-66 66-66h29v60z m642.194 449.532a66 66 0 0 1-18.807 46.139c-25.482 26.064-67.268 26.536-93.332 1.054L582.183 676H299c-36.45 0-66-29.55-66-66V164c0-36.45 29.55-66 66-66h560c36.45 0 66 29.55 66 66v446c0 36.45-29.55 66-66 66h-23.806v90.532z m-60-150.532H859a6 6 0 0 0 6-6V164a6 6 0 0 0-6-6H299a6 6 0 0 0-6 6v446a6 6 0 0 0 6 6h307.64L765 770.822a6 6 0 0 0 10.194-4.29V616z"
            ></path>
            <path d="M757.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z"></path>
            <path d="M575.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z"></path>
            <path d="M392.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z"></path>
          </svg>
          <input type="text" class="input bg-transparent text-white w-full" placeholder="请输入评论"
                 v-model="addCommentInfo">
        </div>
        <button
            class="text-white btn col-span-1 bg-blue-600 hover:bg-blue-800 transition:ease-in duration-300 w-28 border-none cursor-pointer"
            @click="addComment">
          确认
        </button>
      </div>
    </div>
  </div>
  </transition>

</template>

<style scoped>
@import url('../css/Music_Play.css');

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: transparent;
  border-radius: 8px;
}
.bg-even {
  background-color: rgba(0, 0, 0, 0.1);
}
.bg-odd {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>