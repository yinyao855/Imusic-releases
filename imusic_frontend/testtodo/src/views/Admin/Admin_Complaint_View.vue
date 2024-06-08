<script setup>

import {defineEmits, onMounted, ref,defineModel} from "vue";
import axios from "axios";
const ComplaintId = ref([]);
const Complaints = ref([]);
const token = defineModel('token');
function GetComplaintId(){
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/complaints/appeals/review', {
  })
      .then((response) => {
        console.log(response.data.data);
        ComplaintId.value = response.data.data;
        for(let i=0;i<ComplaintId.value.length;++i){
          ComplaintId.value[i].complaint_date=ComplaintId.value[i].id;
          getComplaint(ComplaintId.value[i].id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
}
function getComplaint(id){
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/complaints/review?complaint_id='+id, {
  })
      .then((response) => {
        console.log(response.data.data);
        Complaints.value.push(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

onMounted(() => {
  GetComplaintId();
});
</script>

<template>
  <div class="overflow-x-auto mx-4">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">投诉者</th>
        <th class="text-left text-sm font-semibold">被投诉者</th>
        <th class="text-left text-sm font-semibold">投诉原因</th>
        <th class="text-left text-sm font-semibold">投诉对象</th>
        <th class="text-left text-sm font-semibold">时间</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white rounded-md"
          v-for="(item, index) in Complaints" :key="index">
        <td>
          {{ item.complainer }}
        </td>
        <td>
          {{ item.complained }}
        </td>
        <td>{{ item.content}}</td>
        <td>{{ item.object_id }}</td>
        <td>
          {{ item.complaint_date }}
        </td>
      </tr>
      </tbody>
    </table>

  </div>
  <div class="h-32"></div>
</template>

<style scoped>

</style>