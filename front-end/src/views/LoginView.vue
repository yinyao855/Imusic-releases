<!--登录界面-->
<script setup>
import {ref} from "vue";
import {OpenNotification} from "@/js/Notification.js";
import {UserStore} from "@/stores/User.js";
import instance, {setAuthToken} from "@/js/axios.js";
import router from "@/router/index.js";
import {computed} from "vue";
import {GetPlayList} from "@/js/MusicPlayer.js";

const user_store = UserStore();
const onSubmit = () => {
  if (username.value === '') {
    OpenNotification('登录失败', '请输入用户名');
    return;
  }
  if (password.value === '') {
    OpenNotification('登录失败', '请输入密码');
    return;
  }

  const formData = new FormData();
  formData.append('username', username.value);
  formData.append('password', password.value);

  instance.post('/users/login', formData)
      .then(response => {
        if (response.data.success === true) {
          OpenNotification('登录成功', '');
          user_store.token = response.data.token;
          user_store.Username = username.value;
          user_store.State = true;
          user_store.email = response.data.data.email;
          user_store.register_time = response.data.data.registration_date.split(' ')[0];
          user_store.bio = response.data.data.bio === null ? '还没有个性签名' : response.data.data.bio;
          user_store.store_bio = user_store.bio;
          user_store.Avatar = response.data.data.avatar;
          user_store.role = response.data.data.role;
          user_store.Registration_date=response.data.data.registration_date.split(' ')[0];
          setAuthToken(user_store.token);
          GetPlayList();
          router.push('/home/homeView');
        } else {
          OpenNotification('登录失败', response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      })
}
const username = ref('');
const password = ref('');


const ShowPassword = ref(false);
const InputType = computed(() => {
  return ShowPassword.value === true ? 'text' : 'password'
})
</script>

<template>
  <div class="flex w-full h-full use_font">
    <div class="m-auto">
      <div class="relative flex flex-col p-4 text-black bg-white border-2 rounded-lg" style="width: 28rem">
        <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">欢迎来到 <span
            class="bg-gradient-to-r from-[#7747ff]  to-[#A349A4] bg-clip-text text-transparent">Imusic</span></div>
        <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">登录你的账户</div>
        <form class="flex flex-col gap-3">
          <div class="block relative">
            <label for="email"
                   class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">账户</label>
            <input type="text" id="email" v-model="username"
                   class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0">

          </div>
          <div class="block relative">
            <label for="password"
                   class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">密码</label>
            <div class="relative">
              <input :type="InputType" id="password" v-model="password"
                     class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0">
              <img src="../components/icons/Eye.svg" alt="眼睛睁开"
                   style="height:22px; position: absolute; top: 50%; right: 10px; transform: translateY(-50%);"
                   @click="ShowPassword=true" v-if="!ShowPassword">
              <img src="../components/icons/Eye_Close.svg" alt="眼睛闭上"
                   style="height:22px; position: absolute; top: 50%; right: 10px; transform: translateY(-50%);"
                   @click="ShowPassword=false" v-if="ShowPassword">
            </div>
          </div>
          <div>
            <a class="text-sm text-[#7747ff]" href="/forget-password">忘记密码
            </a></div>
        </form>
        <button type="submit" class="bg-[#7747ff] w-max mx-auto px-6 py-2 rounded text-white text-sm font-normal my-2"
                @click="onSubmit">登 录
        </button>
        <div class="text-sm text-center mt-[1.6rem]">还没有账号？ <a class="text-sm text-[#7747ff]"
                                                                    href="/register">免费注册</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>