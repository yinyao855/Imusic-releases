<template>
  <div>
    <audio ref="audioPlayer" src="./song.mp3" controls @timeupdate="setOffset" class="audio"></audio>
    <div class="container" ref="containerRef">
      <ul class="lyrics" ref="ulRef">
        <li v-for="(item, index) in lrcArr" :key="index" :class="{ active: index === activeIndex }">
          {{ item.words }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const audioPlayer = ref(null);
const ulRef = ref(null);
const containerRef = ref(null);
let lrcArr = ref([
  {
    "times": 1,
    "words": ""
  },
  {
    "times": 2,
    "words": "衰草连横向晚晴"
  },
  {
    "times": 10,
    "words": "半城柳色半声笛"
  },
  {
    "times": 17,
    "words": "枉将绿蜡作红玉"
  },
  {
    "times": 25,
    "words": "满座衣冠无相忆"
  },
  {
    "times": 33,
    "words": "时光 来复去"
  },
  {
    "times": 36,
    "words": ""
  },
  {
    "times": 37,
    "words": "斜屏半倚 拉长了光影"
  },
  {
    "times": 41,
    "words": "重彩朱漆 斑驳了画意"
  },
  {
    "times": 44,
    "words": "一出纸醉金迷闹剧"
  },
  {
    "times": 46,
    "words": "一袭染尽红尘的衣"
  },
  {
    "times": 49,
    "words": "唱罢西厢谁盼得此生相许"
  },
  {
    "times": 52,
    "words": "灯下的影 粉饰着回忆"
  },
  {
    "times": 56,
    "words": "老旧唱机 轮回了思绪"
  },
  {
    "times": 60,
    "words": "一封泛黄褶皱的信"
  },
  {
    "times": 62,
    "words": "一支勾勒眉角的笔"
  },
  {
    "times": 64,
    "words": "花腔宛转着应和陈年的曲"
  },
  {
    "times": 68,
    "words": "衣香鬓影掩过了几声叹息"
  },
  {
    "times": 75,
    "words": "冷眼看过了霓虹几场别离"
  },
  {
    "times": 82,
    "words": "他还演着那场郎骑竹马来的戏"
  },
  {
    "times": 91,
    "words": "他还穿着那件花影重叠的衣"
  },
  {
    "times": 98,
    "words": "他还陷在那段隔世经年的梦"
  },
  {
    "times": 105,
    "words": "静静和衣睡去 不理朝夕"
  },
  {
    "times": 112,
    "words": ""
  },
  {
    "times": 115,
    "words": ""
  },
  {
    "times": 121,
    "words": ""
  },
  {
    "times": 128,
    "words": ""
  },
  {
    "times": 136,
    "words": ""
  },
  {
    "times": 142,
    "words": ""
  },
  {
    "times": 145,
    "words": "灯下的影 粉饰着回忆"
  },
  {
    "times": 148,
    "words": "老旧唱机 轮回了思绪"
  },
  {
    "times": 152,
    "words": "一封泛黄褶皱的信"
  },
  {
    "times": 154,
    "words": "一支勾勒眉角的笔"
  },
  {
    "times": 157,
    "words": "花腔宛转着应和陈年的曲"
  },
  {
    "times": 160,
    "words": "衣香鬓影掩过了几声叹息"
  },
  {
    "times": 168,
    "words": "冷眼看过了霓虹几场别离"
  },
  {
    "times": 175,
    "words": "他还演着那场郎骑竹马来的戏"
  },
  {
    "times": 183,
    "words": "他还穿着那件花影重叠的衣"
  },
  {
    "times": 190,
    "words": "他还陷在那段隔世经年的梦"
  },
  {
    "times": 198,
    "words": "静静和衣睡去 不理朝夕"
  },
  {
    "times": 205,
    "words": "他演尽了悲欢也无人相和的戏"
  },
  {
    "times": 213,
    "words": "那烛火未明摇曳满地的冷清"
  },
  {
    "times": 221,
    "words": "他摇落了繁花空等谁记起"
  },
  {
    "times": 229,
    "words": "为梦送行的人 仍未散去"
  },
  {
    "times": 235,
    "words": ""
  },
  {
    "times": 237,
    "words": "还有谁陪我痴迷看这场旧戏"
  },
  {
    "times": 244,
    "words": "还有谁为我而停谁伴我如衣"
  },
  {
    "times": 255,
    "words": ""
  }
]);
const activeIndex = ref(0);

const setOffset = () => {
  const index = findIndex();
  const liHeight = 40; // 每行歌词的高度
  const containerHeight = containerRef.value.clientHeight; // 容器的高度
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  const maxOffset = ulRef.value.clientHeight - containerHeight;

  if (offset < 0) {
    offset = 0;
  } else if (offset > maxOffset) {
    offset = maxOffset;
  }

  ulRef.value.style.transform = `translateY(-${offset}px)`;

  // 更新高亮行
  activeIndex.value = index;
};

const findIndex = () => {
  const currentTime = audioPlayer.value.currentTime;
  for (let i = 0; i < lrcArr.value.length - 1; i++) {
    if (lrcArr.value[i].times <= currentTime && lrcArr.value[i + 1].times > currentTime) {
      return i;
    }
  }
  return lrcArr.value.length - 1;
};
</script>

<style>
.container {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  border: 2px solid #fff;
  overflow: hidden;
  text-align:center;
}

.audio {
  margin: 30px 0;
  width: 400px;
  height: 40px;
}

.container ul {
  width: 100%;
  transition: transform 0.5s;
}

.container ul li {
  width: 100%;
  height: 40px; /* 每行歌词的高度 */
  color: #666;
  line-height: 40px; /* 每行歌词的行高 */
  transition: all 0.5s;
  font-size: 18px; /* 歌词字体大小 */
}

.container ul li.active {
  color: white;
  transform: scale(1.2); /* 高亮行的缩放效果 */
  font-size: 24px; /* 高亮行的字体大小 */
  line-height: 48px; /* 高亮行的行高 */
}
</style>
