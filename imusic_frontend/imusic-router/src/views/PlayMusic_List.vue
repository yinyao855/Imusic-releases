<script setup>
import {defineModel, defineProps} from "vue"
const emits=defineEmits(['handleindex'])

const props = defineProps({
  songlistlast:Array,
});

const handleindex=(index)=>{
  emits('handleindex',index);
}
</script>

<template>
  <div class="overflow-x-auto overflow-y-auto max-h-96 mb-32 right-0 z-50 bottom-0 fixed bg-zinc-900 scroll-smooth">
    <table class="table">
      <tbody>
      <!-- row 1 -->
      <tr class="text-white transition duration-400 hover:bg-gray-600/40 rounded-md"
          v-for="(item, index) in props.songlistlast" :key="index" @click="handleindex(index)">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.cover"
                     alt="Avatar Tailwind CSS Component"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.title }}</div>
            </div>
          </div>
        </td>
        <td>
          {{ item.singer }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>