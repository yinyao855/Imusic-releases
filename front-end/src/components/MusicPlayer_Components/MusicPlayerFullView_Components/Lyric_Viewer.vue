<template>
  <div class="w-full h-full flex" :ref="el => LyricPanel = el">
    <div class="overflow-hidden w-4/5 h-[90%] m-auto" >
      <transition name="lyric-transition">
        <ul :style="{ transform: `translateY(-${Offset}px)`,transition: `transform 0.5s ease`, }" class="px-[56px]">
          <li v-for="(lyricContent, index) in lyricList" :key="index"
              :class="{ 'current-lyric': index === currentIndex, 'NotCurrent-lyric': index !== currentIndex, 'text-center py-1 hover:hover:bg-gray-300/30 transition-colors ease-in duration-100 rounded-lg': true }"
              :ref="el => lyricRefs[index] = el">
            {{ lyricContent.content }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue';
import {LyricList} from '@/js/SongDetail.js';
import {CurrentTime} from "@/js/MusicPlayer.js";

export default {
  setup() {
    const lyricList = ref(LyricList);
    //当前歌词列表对应的引用
    const lyricRefs = ref([]);
    //当前歌词面板对应的引用
    const LyricPanel = ref(null);
    //当前歌词索引
    const currentIndex = ref(0);
    //当前偏移量
    const Offset = ref(0);

    const GetCurrentIndex = () => {
      let index = 0;
      if (parseInt(lyricList.value[lyricList.value.length - 1].timestamp) <= CurrentTime.value) {
        return lyricList.value.length - 1;
      }
      for (let i = 0; i < lyricList.value.length - 1; i++) {
        if (parseInt(lyricList.value[i + 1].timestamp) > CurrentTime.value && parseInt(lyricList.value[i].timestamp) <= CurrentTime.value) {
          index = i;
        }
      }
      return index;
    }


    const GetOffset = () => {
      Offset.value = 0;
      for (let i = 0; i < currentIndex.value - 1; i++) {
        Offset.value += lyricRefs.value[i].clientHeight;
      }
      Offset.value += lyricRefs.value[currentIndex.value].clientHeight / 2;
      if (Offset.value < LyricPanel.value.clientHeight*0.45) {
        Offset.value = 0;
      } else {
        Offset.value -= LyricPanel.value.clientHeight*0.45;
      }
    }

    watch(CurrentTime, () => {
      currentIndex.value = GetCurrentIndex();
    });

    watch(currentIndex, () => {
      GetOffset();
    });

    return {
      lyricList,
      lyricRefs,
      currentIndex,
      LyricPanel,
      Offset,
    };
  }
};
</script>

<style scoped>
.NotCurrent-lyric {
  width: 100%;
  font-weight: 550;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
  font-size: 27px; /* 歌词字体大小 */
}

.current-lyric {
  width: 100%;
  color: white;
  font-weight: 700;
  transform: scale(1.2); /* 高亮行的缩放效果 */
  font-size: 36px; /* 高亮行的字体大小 */
}

.lyric-transition-enter-active, .lyric-transition-leave-active {
  transition: transform 2s ease; /* 设置过渡效果 */
}
</style>
