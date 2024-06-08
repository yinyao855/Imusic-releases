import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import {useUserStore} from "@/stores/user.js";

// 临时保存的用户数据
export const useTmpStore = defineStore('temp', () => {
    const username = ref('');
    const token = ref('');

    // 用户播放记录
    const playHistory = ref([]);
    // 用户喜欢的音乐
    const likeMusic = ref([]);
    // 用户收藏的歌单
    const favorMusicList = ref([]);
    // 获取用户播放记录

    function init(){
        const userStore = useUserStore();
        token.value = userStore.token;
        username.value = userStore.username;
        getUserPlayHistory();
    }
    function getUserPlayHistory() {
        const instance = axios.create({
            baseURL: 'http://182.92.100.66:5000',
            timeout: 5000, // 设置请求超时时间
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        });
        axios.defaults.withCredentials = true;
        instance.get('/feature/recent', {
            params: {
                'username': username.value,
            }
        })
            .then(response => {
                playHistory.value = response.data.data.songs;
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    function flush(){
        playHistory.value = [];
        likeMusic.value = [];
        favorMusicList.value = [];
    }

    return {
        playHistory,
        likeMusic,
        favorMusicList,
        init,
        getUserPlayHistory
    }
})