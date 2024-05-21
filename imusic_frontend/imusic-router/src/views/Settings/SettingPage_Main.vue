<template>
  <NavTab :tabs="tabs" :components="components" :unReads="[0,0]"
  v-model:username="username" v-model:token="token"></NavTab>
</template>
<script setup>
import NavTab from "@/components/NavTab.vue";
import AboutUs from "@/views/AboutUs.vue";
import MessageMain from "@/views/Settings/MessageMain.vue";

const username = defineModel("username");
const token = defineModel("token");

const tabs = [
    "私信",
    "关于我们"
]

const components = [
    MessageMain,
    AboutUs,
]
</script>