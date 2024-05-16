<script setup>
import {defineModel, defineEmits, ref} from "vue"
import axios from "axios";

const username = defineModel('username')
const SendContent = ref('');
const token = defineModel('token')
const SendOperation = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('receiver', username.value);
  formData.append('content', SendContent.value);
  instance.post('/messages/send', formData)
      .then(response => {
        console.log(response.data.success);
      })
      .catch(error => {
        console.log(error.response.data);
      })
}
</script>

<template>
  <div class="flex">
    <div class="group mx-auto">
      <svg class="search-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
           >
        <path
            d="M639.892491 415.930119 383.935495 415.930119c-17.717453 0-31.994625-14.277171-31.994625-31.994625s14.277171-31.994625 31.994625-31.994625L639.892491 351.94087c17.717453 0 31.994625 14.277171 31.994625 31.994625S657.609945 415.930119 639.892491 415.930119z"
            ></path>
        <path
            d="M579.17151 543.908618 383.935495 543.908618c-17.717453 0-31.994625-14.277171-31.994625-31.994625S366.390055 479.919368 383.935495 479.919368l195.236015 0c17.717453 0 31.994625 14.277171 31.994625 31.994625S596.888964 543.908618 579.17151 543.908618z"
            ></path>
        <path
            d="M962.246934 447.924744c0-211.74937-200.912481-383.935495-447.924744-383.935495S66.225433 236.175374 66.225433 447.924744c0 116.453553 62.957164 226.026541 172.874181 300.680665 14.621199 9.976818 34.574836 6.192508 44.379641-8.428691 9.976818-14.621199 6.192508-34.574836-8.428691-44.379641-92.027549-62.441122-144.835881-152.74853-144.835881-247.700319 0-176.486477 172.186125-319.946246 383.935495-319.946246s383.935495 143.631782 383.935495 319.946246-172.186125 319.946246-383.935495 319.946246c-2.064169 0-3.612296 0.688056-5.504452 1.204099-15.137242-2.752226-30.446498 5.160423-35.778935 20.125651-6.192508 17.373425-46.44381 46.615824-94.091718 73.794053 17.373425-58.140769 9.116748-70.697799 3.440282-78.954477-6.70855-9.976818-17.889467-15.997312-29.930455-15.997312-17.717453 0-31.994625 14.277171-31.994625 31.994625 0 5.84848 1.548127 11.180917 4.300353 15.997312-3.268268 18.233496-17.201411 60.892995-33.026709 99.768184-4.988409 12.040988-2.064169 25.974131 7.396607 35.090879 6.020494 5.84848 14.105157 8.944734 22.18982 8.944734 4.300353 0 8.77272-0.860071 13.073072-2.752226 36.466991-16.341341 147.588107-69.149672 187.667395-125.570301C765.290778 828.075928 962.246934 657.609945 962.246934 447.924744z"
            ></path>
      </svg>

      <input
          id="query"
          class="input"
          type="search"
          placeholder=""
          name="searchbar"
          v-model="SendContent"
      />
      <div
          class="btn btn-md ml-4 text-white tracking-widest bg-blue-500 hover:bg-blue-600 transition:ease-in duration-300"
          @click="SendOperation">发 送
      </div>
    </div>

  </div>


</template>

<style scoped>
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  width: 60%;
}

.input {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 45px;
  padding-left: 2.5rem;
  box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
  border: 0;
  border-radius: 12px;
  background-color: #16171d;
  outline: none;
  color: #bdbecb;
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: text;
  z-index: 0;
}

.input::placeholder {
  color: #bdbecb;
}

.input:hover {
  box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
}

.input:active {
  transform: scale(0.95);
}

.input:focus {
  box-shadow: 0 0 0 2.5px #2f303d;
}

.search-icon {
  position: absolute;
  left: 1rem;
  fill: white;
  width: 24px;
  height: 24px;
  pointer-events: none;
  z-index: 1;
}

</style>