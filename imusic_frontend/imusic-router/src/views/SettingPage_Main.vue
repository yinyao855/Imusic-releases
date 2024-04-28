<template>
  <CurrentUser_SongList v-model:token="token"></CurrentUser_SongList>
</template>

<script setup>
import CurrentUser_SongList from "@/components/CurrentUser_SongList.vue";

const token = defineModel('token')
</script>