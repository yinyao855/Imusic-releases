<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props=defineProps({
  url:String,
})


const pdfUrl = ref(''); // pdf文件地址
const fileUrl = '/pdfjs-4.3.136-dist/web/viewer.html?file='; // pdfjs文件地址

onMounted(() => {
  pdfUrl.value = fileUrl + encodeURIComponent(props.url);
  console.log(pdfUrl.value);
});
</script>

<template>
  <div class="w-full h-full">
    <iframe :src="pdfUrl" class="w-full h-full"></iframe>
  </div>
</template>

<style scoped>

</style>
