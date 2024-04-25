<template>
  <div>
    <input type="text" v-model="songTitle" placeholder="Enter song title">
    <input type="text" v-model="singerName" placeholder="Enter singer name">
    <input type="file" @change="onMp3FileChange">
    <input type="file" @change="onCoverFileChange">
    <button @click="submitSong">Upload Song</button>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const songTitle = ref('');
const singerName = ref('');
const mp3File = ref(null);
const coverImageFile = ref(null);

const onMp3FileChange = (event) => {
  mp3File.value = event.target.files[0];
};

const onCoverFileChange = (event) => {
  coverImageFile.value = event.target.files[0];
};

const submitSong = () => {
  let formData = new FormData();
  formData.append('title', songTitle.value);
  formData.append('singer', singerName.value);
  formData.append('cover', coverImageFile.value);
  formData.append('audio', mp3File.value);
  formData.append('uploader','xht')

  axios.post('http://182.92.100.66:5000/songs/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
      .then(response => {
        alert('Song uploaded successfully!');
        console.log(response.data);
      })
      .catch(error => {
        alert('Failed to upload song.');
        console.error(error.response ? error.response : error);
      });
};
</script>

<style>
/* Include any CSS you want for your component */
</style>