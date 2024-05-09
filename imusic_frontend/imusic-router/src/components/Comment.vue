<script setup>


import {defineEmits, defineModel, onMounted, ref} from "vue";
import axios from "axios";
import Warning from "@/components/Warning.vue";
const emit = defineEmits(['fullsize', 'togglePlay', 'update', 'back', 'next']);

const token=defineModel('token')
const showComment = defineModel('showComment');
const backComment = () => {
  showComment.value = false;
  console.log(showComment.value);
}
const songID=defineModel('songID');
const Comment = defineModel('Comment');
const addCommentInfo = ref('');
const WarningShow = defineModel('WarningShow');
const message = defineModel('message');
const addComment = () => {
  const formData = new FormData();
  if(addCommentInfo.value === ''){
    WarningShow.value = true;
    message.value='评论不能为空';
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
        console.log(response.data);
        addCommentInfo.value = '';
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
      console.log(response.data);
      console.log(songID.value);
      Comment.value = response.data.data;
      initUserImage();
    })
    .catch((error) => {
      console.log(error);
    });
}
let userImage = ref([]);
const initUserImage = () => {
  for ( let index in Comment.value) {
    let username = Comment.value[index].user;
    const instance = axios.create({
      baseURL: 'http://182.92.100.66:5000',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${token.value}`,
      }
    });
    axios.defaults.withCredentials = true;
    let url='/users/info/'+username;
    instance.get(url, {
    })
        .then((response) => {
          console.log(response.data);
          userImage.value[index] = response.data.data.avatar;
          console.log(userImage.value);
        })
        .catch((error) => {
          console.log(error);
        });
  }
}
onMounted(() => {
  getSongComment();
})
</script>

<template>
  <div class="col2  duration-300 h-1">
    <div class="formx2 w-1 grid-cols-10 flexible">
    <div class="col-span-1">
    <button class="btn transition bg-transparent hover:-translate-y-1 hover:scale-110 hover:bg-transparent" @click="backComment">
      <svg t="1715236058449" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2905"
           width="48" height="48"><path d="M597.12 512L768 682.88 682.88 768 512 597.12 341.12 768 256 682.88 426.88 512 256 341.12 341.12 256 512 426.88 682.88 256 768 341.12z" p-id="2906"></path></svg>
    </button>
    </div>
    <div class="text-center text-3xl font-semibold text-white p-3 w-full ">评论</div>
      <div class="h-1/2 overflow-auto w-full">
        <div class="text-white bg-transparent transition duration-400 hover:bg-transparent-50 grid grid-cols-10 gap-4 w-full"
            v-for="(item, index) in Comment" :key="index">
            <img class="icon fill-white mr-4 my-auto col-span-1 justify-center rounded-full"
                 :src="userImage[index]" alt="">
          <div class="col-span-2 my-auto">
            <div class=" text-l">{{item.user}}</div>
            </div>
          <div class="col-span-7 my-auto">
            <div class="m-auto text-l">{{item.content}}</div>
            </div>
          <hr class="m-0.5 border-gray-500 col-span-10" />
        </div>
      </div>

    <div class="inputForm bg-transparent/10 fill-white w-full">
      <div class="grid grid-cols-10 w-full">
        <svg t="1715238681389" class="icon col-span-1 justify-center" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4044"
             width="42" height="42"><path d="M193 317h-29a6 6 0 0 0-6 6v408a6 6 0 0 0 6 6h83.806v121.532a6 6 0 0 0 10.195 4.29L386.698 737h200.66l60.159 58.815A66.346 66.346 0 0 1 635 797H411.154L299.945 905.725c-26.064 25.482-67.85 25.01-93.332-1.054a66 66 0 0 1-18.807-46.14V797H164c-36.45 0-66-29.55-66-66V323c0-36.45 29.55-66 66-66h29v60z m642.194 449.532a66 66 0 0 1-18.807 46.139c-25.482 26.064-67.268 26.536-93.332 1.054L582.183 676H299c-36.45 0-66-29.55-66-66V164c0-36.45 29.55-66 66-66h560c36.45 0 66 29.55 66 66v446c0 36.45-29.55 66-66 66h-23.806v90.532z m-60-150.532H859a6 6 0 0 0 6-6V164a6 6 0 0 0-6-6H299a6 6 0 0 0-6 6v446a6 6 0 0 0 6 6h307.64L765 770.822a6 6 0 0 0 10.194-4.29V616z" fill="#2c2c2c" p-id="4045"></path><path d="M757.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z" fill="#2c2c2c" p-id="4046"></path><path d="M575.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z" fill="#2c2c2c" p-id="4047"></path><path d="M392.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z" fill="#2c2c2c" p-id="4048"></path></svg>
        <input type="text" class="input bg-transparent col-span-8" placeholder="请输入评论" v-model="addCommentInfo">
        <button class="btn transition col-span-1 bg-transparent/20 hover:bg-transparent/50 cursor-pointer" @click="addComment">
        确认</button>
        </div>
    </div>
    </div>
  </div>

</template>

<style scoped>
@import url('../css/Music_Play.css');
</style>