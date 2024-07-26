<!--上传图片组件-->
<script setup>
//展示的头像
const ShowImage = defineModel('ShowImage');

//处理上传图片
const HandleImageUpload = (event) => {
  ShowImage.value = URL.createObjectURL(event.target.files[0]);
  AvatarFile.value = event.target.files[0];
}

//头像文件
const AvatarFile=defineModel('AvatarFile');
</script>

<template>
  <label class="custom-file-upload" for="file">
    <div v-if="ShowImage===null" class="flex flex-wrap">
      <div class="w-full">
        <img src="./icons/Upload_Image_Icon.svg" alt="上传图片" class="h-20 mb-2 mx-auto"
             style="fill: rgba(75, 85, 99, 1);">
      </div>
      <div class="w-full flex">
        <div class="text mx-auto">
          <span>还没有头像,点击上传</span>
        </div>
      </div>
    </div>
    <img :src="ShowImage" alt="头像" class="aspect-square h-[300px] rounded-[10px]" v-else>
    <input type="file" id="file" class="hidden" @change="HandleImageUpload">
  </label>
</template>

<style scoped>
@import url('../css/UploadImage.css');
</style>