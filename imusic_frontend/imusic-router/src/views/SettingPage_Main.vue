<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const lrcUrl = 'http://182.92.100.66:5000/media/lyrics/%E6%98%A5%E6%B3%A5.lrc';
const formattedLyrics = ref([]);

const fetchAndFormatLyrics = async () => {
  try {
    const response = await axios.get(lrcUrl);
    formattedLyrics.value = formatLyrics(response.data);
    console.log(formattedLyrics.value);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
};

const formatLyrics = (rawLyrics) => {
  // 用正则表达式匹配时间部分，并将毫秒位变成两位数
  const formattedLyrics = rawLyrics.replace(/\[(\d+:\d+\.)(\d{2,3})\]/g, (match, time, ms) => {
    // 截取毫秒位的前两位
    const truncatedMs = ms.slice(0, 2);
    // 返回替换后的时间字符串
    return `[${time}${truncatedMs}]`;
  });

  return parseLRC(formattedLyrics);
};


function parseLRC(lrc) {
  const lines = lrc.split("\n");
  const lyrics = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;

  lines.forEach((line) => {
    const match = timeRegex.exec(line);
    if (match) {
      const minute = parseInt(match[1]);
      const second = parseInt(match[2]);
      const millisecond = parseInt(match[3]);
      const timestamp = minute * 60 + second + millisecond / 1000;
      const text = match[4].trim();
      lyrics.push({timestamp, text});
    }
  });
  return lyrics;
}


</script>

<template>
  <div class="btn btn-sm" @click="fetchAndFormatLyrics">点击</div>
</template>

<style scoped>

</style>