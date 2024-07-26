<template>
  <div class="w-full h-full flex">
    <div class="overflow-hidden w-4/5 h-[90%] m-auto">
      <transition name="lyric-transition">
        <ul :ref="el => LyricPanel = el" :style="{ transform: `translateY(-${currentIndex * 40}px)` }" class="px-4">
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
    const lyricRefs = ref([]);
    const LyricPanel = ref(null);
    const currentIndex = ref(0);

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

    watch(CurrentTime, () => {
      currentIndex.value = GetCurrentIndex();
    });

    return {
      lyricList,
      lyricRefs,
      currentIndex,
      LyricPanel,
      GetCurrentIndex
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
