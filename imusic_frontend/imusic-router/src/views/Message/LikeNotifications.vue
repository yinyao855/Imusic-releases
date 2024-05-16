<script setup>
import axios from "axios";
import {onMounted, defineModel, defineEmits, ref} from "vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
const systemMessage = ref([])

const extractDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().slice(0, 10);
}

function getSystemMessage() {
  const length = ref(0);
  length.value = Message.value.length;
  for (let i = 0; i < length.value; i++) {
    if (Message.value[i].type === 3) {
      systemMessage.value.push(Message.value[i]);
    }
  }
}

onMounted(getSystemMessage)
</script>

<template>
  <table class="table mb-32 text-center w-1/2 m-auto">
    <thead>
    <tr>
      <th class="">系统通知</th>
      <th class="">内容</th>
      <th class="">日期</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(message, index) in systemMessage" class="text-white">
      <td>{{ message.title }}</td>
      <td>{{ message.content }}</td>
      <td>{{ message.send_date }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>