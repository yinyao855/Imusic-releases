import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 处理播放器的 store
export const usePlayerStore = defineStore('player', () => {
    // 播放器的状态
    const isPlay = ref(false)

    // 播放器显示模式，0不显示，1为缩小样式，2为默认样式，3为全屏样式
    const mode = ref(0)

    // 当前播放歌曲
    const currentMusic = ref(null)

    // 当前播放歌曲的索引
    const currentIndex = ref(0)

    // 当前歌曲的歌词
    const currentLyric = ref(null)

    // 播放列表
    const playList = ref([])

    function setPlayList(list){
        playList.value = list;
    }

    function setPlayListByID(id){
        currentIndex.value = id;
    }
})
