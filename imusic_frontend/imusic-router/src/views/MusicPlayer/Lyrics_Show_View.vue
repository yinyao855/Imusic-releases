<template>
  <div class="w-full h-full">
    <div class="container" ref="containerRef" @wheel="handleScroll">
      <ul class="lyrics" ref="ulRef">
        <li v-for="(item, index) in lrcArr" :key="index" :class="{ active: index === activeIndex }" @click="ChangePlayTime(index)">
          <div class="w-full hover:bg-gray-300/30 rounded-xl">
          {{ item.text }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';

const audioPlayer = ref(null);
const ulRef = ref(null);
const containerRef = ref(null);
const lrcArr=defineModel('lrcArr');
const activeIndex = ref(0);
const currentduration=defineModel('currentduration');
const index=ref(-1);
const Local_Scrool_Offset=ref(0);

const ChangePlayTime=(LyricIndex)=>{
  console.log(lrcArr.value[LyricIndex].timestamp);
  currentduration.value=lrcArr.value[LyricIndex].timestamp;
  RealaudioPlayer.value.currentTime=lrcArr.value[LyricIndex].timestamp;
}

const handleScroll=()=>{
  let offset;
  const delta = Math.sign(event.deltaY);
  offset = delta*60;
  const liHeight=60;
  const containerHeight = containerRef.value.clientHeight; // 容器的高度
  const maxOffset = ulRef.value.clientHeight - containerHeight;
  Local_Scrool_Offset.value+=offset;
  let offset2 = liHeight * index.value + liHeight / 2 - containerHeight / 2+Local_Scrool_Offset.value;
  if (offset2 < 0) {
    offset2 = 0;
  } else if (offset2 > maxOffset) {
    offset2 = maxOffset;
  }
  ulRef.value.style.transform = `translateY(-${offset2}px)`;
}

const setOffset = () => {
  const liHeight = 60; // 每行歌词的高度
  const containerHeight = containerRef.value.clientHeight; // 容器的高度
  let offset = liHeight * index.value + liHeight / 2 - containerHeight / 2;
  const maxOffset = ulRef.value.clientHeight - containerHeight;
  if (offset < 0) {
    offset = 0;
  } else if (offset > maxOffset) {
    offset = maxOffset;
  }
  ulRef.value.style.transform = `translateY(-${offset}px)`;
  Local_Scrool_Offset.value=0;
  // 更新高亮行
  activeIndex.value = index.value;
};

const RealaudioPlayer=defineModel('audioPlayer')

const UpdateIndex=()=>{
  index.value=GetIndex();
}

const GetIndex= () => {
  for (let i = 0; i < lrcArr.value.length - 1; i++) {
    if (lrcArr.value[i].timestamp <= currentduration.value && lrcArr.value[i + 1].timestamp > currentduration.value) {
      return i;
    }
  }
  return lrcArr.value.length - 1;
};


watch(currentduration,UpdateIndex);
watch(index,setOffset);
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  text-align:center;
  border: none;
}

.container ul {
  width: 100%;
  transition: transform 0.5s;
}

.container ul li {
  width: 100%;
  font-weight:550;
  height: 60px; /* 每行歌词的高度 */
  color: rgb(255,255,255,0.6);
  line-height: 60px; /* 每行歌词的行高 */
  transition: all 0.5s;
  font-size: 27px; /* 歌词字体大小 */
}

.container ul li.active {
  color: white;
  font-weight:700;
  transform: scale(1.2); /* 高亮行的缩放效果 */
  font-size: 36px; /* 高亮行的字体大小 */
  line-height: 72px; /* 高亮行的行高 */
}
</style>
