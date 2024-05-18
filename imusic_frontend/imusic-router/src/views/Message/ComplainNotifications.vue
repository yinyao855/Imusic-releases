<script setup>
import {defineModel} from "vue";

const token = defineModel("token");
const username = defineModel("username");
const Message = defineModel("Message");
</script>

<template>
  <div class="overflow-x-auto px-10">
    <table class="table">
      <tbody>
      <tr class="text-white hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in Message" @click="">
        <td class="w-28">
          <img src="" alt="头像"
               class="h-14 rounded-xl aspect-square inline-block"/>
          <div v-if="!item.is_read" class="text-red-500 inline-block" style="font-size: 50px">.</div>
        </td>
        <td class="">
          <div class="font-bold text-xl mb-2">{{ item.sender }}</div>
          <div class="text-sm text-left opacity-50 truncate w-96">{{ item.content }}</div>
        </td>
        <td class="w-40 text-sm opacity-50">
          {{ item.send_date }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>