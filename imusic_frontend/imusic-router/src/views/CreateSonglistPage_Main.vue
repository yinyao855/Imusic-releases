<script setup>
import { defineModel } from "vue"
import CreateSonglist from "@/views/CreateSonglist_Area.vue";
const HasLogin=defineModel('HasLogin');
const username=defineModel('username');
const token=defineModel('token')
</script>

<template>
<CreateSonglist v-model:username="username" v-model:HasLogin="HasLogin" v-model:token="token"></CreateSonglist>
</template>

<style scoped>

</style>