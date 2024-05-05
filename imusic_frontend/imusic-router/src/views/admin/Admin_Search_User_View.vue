<script setup>
import {defineEmits, onMounted, ref} from "vue";
import axios from "axios";
import buttonchangesize from "@/components/buttonchangesize.vue"

const Users = ref([]);
const token = defineModel('token');
const SearchContent = defineModel('SearchContent');
const emits = defineEmits(['refresh', 'changesize', 'UpdateUser']);

const refresh = () => {
  emits('refresh');
}

const changesize = () => {
  emits('changesize');
}


const GetSearchResult = () => {
  console.log('hello');
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/search/users', {
    params: {
      'keyword': SearchContent.value
    }
  })
      .then(response => {
        Users.value = response.data.data;
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
const ShowDetail = (index) => {
  console.log(Users.value[index].id);
  emits('UpdateUser', Users.value[index].username);
}

onMounted(GetSearchResult);
</script>

<template>
  <div class="text-2xl mx-auto my-6 w-full text-center text-white font-semibold">
    <buttonchangesize class="absolute top-5 left-5" @fullsize="changesize" v-model:token="token"></buttonchangesize>
    搜索结果
  </div>
  <div class="overflow-x-auto mx-12">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">账号及头像</th>
        <th class="text-left text-sm font-semibold">权限</th>
        <th class="text-left text-sm font-semibold">注册时间</th>
        <th class="text-left text-sm font-semibold">操作</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white rounded-md"
          v-for="(item, index) in Users" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar justify-center">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.avatar"
                     alt="头像"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.username }}</div>
              <!--              <div class="text-sm opacity-50">United States</div>-->
            </div>
          </div>
        </td>
        <td>
          {{ item.role }}
        </td>
        <td>{{ item.registration_date }}</td>
        <td>
          <svg class="icon fill-white inline hover:fill-gray-500" viewBox="0 0 1024 1024"
               xmlns="http://www.w3.org/2000/svg"
               width="24" height="24" @click="ShowDetail(index)">
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

</style>