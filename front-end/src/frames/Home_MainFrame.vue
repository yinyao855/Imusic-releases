<template>
  <Search_Input></Search_Input>
  <el-tabs v-if="!SongDetailVisible" v-model="activeName" class="demo-tabs ml-4 mt-2" @tab-click="handleClick">
    <el-tab-pane label="推荐" name="推荐">
      <div :style="{ height: (windowHeight-60) + 'px'}">
        <SearchResult v-if='SearchResultVisible'></SearchResult>
        <HomeView_Recommend v-else></HomeView_Recommend>
      </div>
    </el-tab-pane>
    <el-tab-pane label="最新上传" name="最新上传">
      <div :style="{ height: (windowHeight-60) + 'px'}">
        <SearchResult v-if='SearchResultVisible'></SearchResult>
        <HomeView_NewestSongs v-else></HomeView_NewestSongs>
      </div>
    </el-tab-pane>
  </el-tabs>
  <SongDetail v-if="SongDetailVisible"></SongDetail>
</template>
<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue'
import HomeView_Recommend from "@/components/HomeView_Components/HomeView_Recommend.vue";
import HomeView_NewestSongs from "@/components/HomeView_Components/HomeView_NewestSongs.vue";
import SongDetail from "@/components/SongDetail.vue";
import {SongDetailVisible} from "@/js/SongDetail.js";
import Search_Input from "@/components/HomeView_Components/Search_Input.vue";
import SearchResult from "@/components/SearchResult.vue";
import {SearchResultVisible} from "@/js/Search.js";

//当前触发的状态
const activeName = ref('推荐')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

//获取到当前窗口的长宽信息
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* 设置未被选中样式 */
::v-deep .el-tabs__item {
  font-size: 20px;
  line-height: 30px;
  text-align:center;
}
</style>