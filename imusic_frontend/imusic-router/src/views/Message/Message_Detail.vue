<script setup>
import {onMounted, ref} from "vue";
import Input from "@/components/Input.vue"
import axios from "axios";

const username = defineModel('username');
const token = defineModel('token');
const ForeignUser = defineModel('ForeignUser');
const Message = defineModel('Message');
const ShowMessage = ref([]);
const MyAvatar = defineModel('MyAvatar');
const OtherAvatar = defineModel('OtherAvatar');

const GetInitData = () => {
  let length = Message.value.length;
  for (let i = 0; i < length; ++i) {
    if (Message.value[i].sender === ForeignUser.value) {
      ShowMessage.value.push(Message.value[i]);
    }
  }
}


onMounted(GetInitData);
</script>

<template>
  <div class="w-full h-full px-4 pb-32">
    <div class="h-12 w-full mb-4">
      <Input v-model:username="ForeignUser" v-model:token="token"></Input>
    </div>
    <!--    <div class="h-12 w-96 bg-yellow-400 mx-auto">-->

    <!--    </div>-->

    <div class="w-full">
      <div class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component"
                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
          </div>
        </div>
        <div class="chat-bubble">It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.It was said that you would, destroy the Sith, not join them.</div>
      </div>
      <div class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component"
                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
          </div>
        </div>
        <div class="chat-bubble">It was you who would bring balance to the Force</div>
      </div>
      <div class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component"
                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
          </div>
        </div>
        <div class="chat-bubble">Not leave it in Darkness</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>