<script setup>
import axios from "axios";
import {defineEmits, ref} from "vue";
import Admin_Show_User_Information from "@/views/admin/Admin_Show_User_Information.vue";
const Users = defineModel('Users');
const token = defineModel('token');
const emits = defineEmits(['refresh']);

const refresh = () => {
  emits('refresh');
}

const UserId = ref(0);
const ShowUpdateSongPage = ref(false);

const ShowDetail = (index) => {
  ShowUpdateSongPage.value = true;
  UserId.value = Users.value[index].username;
  console.log(Users.value[index].id);
}

const changesize = () => {
  ShowUpdateSongPage.value = false;
}

const UpdateUserData=(role)=>{
  console.log(role);
  let length=Users.value.length;
  for(let i=0;i<length;++i){
    if(Users.value[i].username===UserId.value){
      Users.value[i].role=role;
    }
  }
}
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowUpdateSongPage">
      <Admin_Show_User_Information v-model:UserId="UserId" @changesize="changesize"
                       v-model:token="token" @UpdateUserData="UpdateUserData"></Admin_Show_User_Information>
    </div>
  </transition>
  <div class="overflow-x-auto mx-4" v-if="!ShowUpdateSongPage">
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