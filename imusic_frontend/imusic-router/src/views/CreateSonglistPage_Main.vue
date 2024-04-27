<script setup>
import { defineModel } from "vue"
import CreateSonglist from "@/views/CreateSonglist.vue";
const HasLogin=defineModel('HasLogin');
const username=defineModel('username');
</script>

<template>
<CreateSonglist v-model:username="username" v-model:HasLogin="HasLogin"></CreateSonglist>
</template>

<style scoped>

</style>