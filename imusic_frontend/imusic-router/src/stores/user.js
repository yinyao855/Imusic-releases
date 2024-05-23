import {defineStore} from 'pinia'
import { ref, computed } from 'vue'

// user store
export const useUserStore = defineStore('user', () => {
    const username = ref('请先登录');
    const token = ref('');
    const isLogin = ref(false);
    const userInfo = ref({});
    const userAvatar = ref('');
    const userRole = ref('');

    function setUsername(name) {
        username.value = name;
        console.log("set username!" + username.value)
    }

    function setToken(t) {
        token.value = t;
        console.log("set token!" + token.value)
    }

    function login(data) {
        // console.log("login data: ", data);
        isLogin.value = true;
        userInfo.value = data;
        userAvatar.value = data.avatar;
        userRole.value = data.role;
        // console.log("user info: ", userInfo);
        // console.log("user avatar: ", userAvatar);
        // console.log("user role: ", userRole);
        console.log("login success!")
    }

    function flush() {
        username.value = '';
        token.value = ''
    }

    return {
        username,
        token,
        isLogin,
        userAvatar,
        userInfo,
        userRole,
        setUsername,
        setToken,
        flush,
        login,
    }
})
