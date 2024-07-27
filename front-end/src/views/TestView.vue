<template>
  <div>
    <button @click="generateLRCFile">生成LRC文件</button>
    <textarea v-model="lrcContent" rows="10" cols="50"></textarea>
    <button @click="downloadGeneratedFile">下载生成的文件</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const lyrics = ref([
  { timestamp: '00:00.20', content: 'Verse 1 lyrics' },
  { timestamp: '00:15.00', content: 'Chorus lyrics' },
  { timestamp: '01:00.50', content: 'Verse 2 lyrics' },
  // 更多歌词条目...
]);

let lrcContent = ref('');
let generatedFile = ref(null);

const generateLRCFile = () => {
  let content = '';
  lyrics.value.forEach(line => {
    content += `[${line.timestamp}] ${line.content}\n`;
  });
  lrcContent.value = content;

  const blob = new Blob([lrcContent.value], { type: 'text/plain' });
  generatedFile.value = new File([blob], 'song.lyrics.lrc', { type: 'text/plain' });
};

const downloadGeneratedFile = () => {
  if (generatedFile.value) {
    const url = URL.createObjectURL(generatedFile.value);
    const a = document.createElement('a');
    a.href = url;
    a.download = generatedFile.value.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
};
</script>

<style scoped>
/* 可选的样式 */
textarea {
  margin-top: 10px;
}
</style>
