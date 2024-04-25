<template>
  <div>
    <input type="file" @change="onLrcFileChange">
    <button @click="parseLrcFile">Upload and Parse LRC</button>
    <div v-if="lrcParsed.length">
      <div v-for="(line, index) in lrcParsed" :key="index">
        <span>Time: {{ line.time }}</span> | <span>Lyrics: {{ line.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const lrcFile = ref(null);
const lrcParsed = ref([]);

const onLrcFileChange = (event) => {
  lrcFile.value = event.target.files[0];
};

const parseLrcFile = () => {
  if (lrcFile.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const lrcContent = e.target.result;
      lrcParsed.value = parseLrcContent(lrcContent);
    };
    reader.readAsText(lrcFile.value);
  }
};

const parseLrcContent = (lrcContent) => {
  const lines = lrcContent.split('\n');
  const pattern = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/;
  return lines.map(line => {
    const match = line.match(pattern);
    if (match) {
      return {
        time: `${match[1]}:${match[2]}.${match[3]}`,
        text: match[4].trim()
      };
    }
    return { time: '', text: '' };
  }).filter(line => line.text !== '');
};
</script>