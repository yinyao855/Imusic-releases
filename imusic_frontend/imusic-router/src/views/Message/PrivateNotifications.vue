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
    if (Message.value[i].type === 5) {
      systemMessage.value.push(Message.value[i]);
    }
  }
}

onMounted(getSystemMessage)
</script>

<template>
  <table class="table mb-32 mt-10 text-center w-3/4 m-auto">
    <thead>
    <tr>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(message, index) in systemMessage" class="text-white hover:bg-gray-800">
      <td>{{ message.sender }}</td>
      <td>{{ message.content }}</td>
      <td class="text-right">{{ message.send_date }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>