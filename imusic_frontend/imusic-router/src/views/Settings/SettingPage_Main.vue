<template>
  <div class="w-full h-full flex flex-col">
    <Private_Message v-model:token="token" v-model:username="username"></Private_Message>
  </div>

</template>
<script setup>
import Private_Message from "@/views/Message/Private_Message.vue";
const token=defineModel('token');
const username=defineModel('username');
</script>