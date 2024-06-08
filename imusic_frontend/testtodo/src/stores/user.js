import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
import axios from "axios";

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

    function refreshInfo() {
        if (isLogin.value === true) {
            const webx = '/users/info/' + username.value;
            const instance = axios.create({
                baseURL: 'http://182.92.100.66:5000',
                timeout: 5000, // 设置请求超时时间
                headers: {
                    'Authorization': `Bearer ${token.value}`,
                }
            });
            axios.defaults.withCredentials = true;
            instance.get(webx)
                .then(response => {
                    userInfo.value = response.data.data;
                    userAvatar.value = response.data.data.avatar;
                    console.log("refresh success!")
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        }
    }

    // 清空store
    function flush() {
        username.value = '请先登录';
        token.value = '';
        isLogin.value = false;
        userInfo.value = {};
        userAvatar.value = '';
        userRole.value = '';
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
        refreshInfo,
    }
}, {
        persist: true, // enable the store to be saved in the storage
})
