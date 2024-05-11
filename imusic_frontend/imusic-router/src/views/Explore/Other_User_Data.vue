<script setup>
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import ButtonChangeSizeRight from "@/components/ButtonChangeSizeRight.vue";

const username = defineModel('username');
const token = defineModel('token');
const emits = defineEmits(['changesize']);
const User = ref([]);
const SongLists = ref([]);
const Songs = ref([]);
const NaviMode=ref(1);
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === 1,
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === 2,
}));

const GetUserData = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/users/info/' + username.value)
      .then(response => {
        User.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
  instance.get('/users/songs', {
    params: {
      'username': username.value
    }
  })
      .then(response => {
        Songs.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
  instance.get('/users/songlists', {
    params: {
      'username': username.value
    }
  })
      .then(response => {
        SongLists.value = response.data.data;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

const changesize = () => {
  emits('changesize')
}

const ChangeNaviMode=(num)=>{
  NaviMode.value=num;
}

onMounted(GetUserData);
</script>

<template>
  <div class="w-full h-screen">
    <div class="h-1/3 flex bg-zinc-700">
      <ButtonChangeSizeRight @fullsize="changesize"></ButtonChangeSizeRight>
      <img :src="User.avatar" alt="用户头像" class="aspect-square my-auto mx-10 h-4/5 rounded-2xl">
      <div class="h-4/5 my-auto">
        <p class="text-white text-4xl my-4">{{ User.username }}</p>
        <p class="text-base text-white my-6">用户简介：{{ User.bio }}</p>
      </div>
    </div>
    <div class="flex">
      <div class="text-xl mx-auto">
        <div :class="[NaviClass1, 'text-transition']" @click='ChangeNaviMode(1)'>TA喜爱的歌曲</div>
        <div :class="[NaviClass2, 'text-transition']" @click='ChangeNaviMode(2)'>TA收藏的歌单</div>
      </div>
    </div>

    <div class="h-32"></div>
  </div>
</template>

<style scoped>

</style>