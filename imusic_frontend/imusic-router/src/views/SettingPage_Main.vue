<template>
  <div>
    <input type="radio" id="contactChoice1" name="contact" value="email" v-model="selectedContactMethod" />
    <label for="contactChoice1">电子邮件</label>

    <input type="radio" id="contactChoice2" name="contact" value="phone" v-model="selectedContactMethod" />
    <label for="contactChoice2">电话</label>

    <input type="radio" id="contactChoice3" name="contact" value="mail" v-model="selectedContactMethod" />
    <label for="contactChoice3">邮件</label>
  </div>
  <div>
    <button @click="submitContactMethod">提交</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedContactMethod = ref('');

const submitContactMethod = () => {
  // 在这里可以获取selectedContactMethod的值，并执行所需的操作
  alert(`选择的联系方式: ${selectedContactMethod.value}`);
};
</script>