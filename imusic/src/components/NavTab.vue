<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full h-14 pl-6">
      <div v-for="(tab, index) in tabs" :key="index" :class="[getNaviClass(index), 'text-transition']"
           @click="changeNaviMode(index)" style="line-height: 56px">{{ tab }}
        <span v-if="unReads[index].value>0"
              class="indicator-item badge badge-info badge-sm">{{ unReads[index] }}+</span>

      </div>
    </div>
    <div class="flex-1">
      <!-- 根据索引显示对应的组件 -->
      <component :is="components[state.activeTab]" v-model:username="username" v-model:token="token"
                 @PlaySongList="PlaySongList" @handlePlayAfter="handlePlayAfter"
                 @handlePlayNow="handlePlayNow"/>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, reactive, watch} from "vue";
import Message_Main from "@/views/Message/Message_Main.vue";

// tabs和components从外部传入
const {tabs, components, unReads} = defineProps(['tabs', 'components', 'unReads']);

const username = defineModel('username')
const token = defineModel('token')

const state = reactive({
  activeTab: 0 // 当前选中的标签索引
});

// 计算属性，根据索引判断是否为选中状态，并返回对应的样式类
const getNaviClass = (index) => {
  return {
    'text-base inline-block mx-3 px-1 w-30 text-center rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40 cursor-pointer': true,
    'text-cyan-700 underline underline-offset-8 decoration-2': state.activeTab === index,
  };
};

const Minimize_Player=()=>{
  emits('Minimize_Player');
}

// 切换标签的方法
const changeNaviMode = (index) => {
  state.activeTab = index;
  if(tabs[index]==='我的私信'){
    Minimize_Player();
  }
};

const emits = defineEmits(["PlaySongList", "handlePlayAfter", "handlePlayNow","Minimize_Player"]);

// emits
const PlaySongList = (id) => {
  emits('PlaySongList', id);
}

function handlePlayAfter(id) {
  emits('handlePlayAfter', id)
}

function handlePlayNow(id) {
  emits('handlePlayNow', id)
}
</script>

<style>
.text-transition {
  transition: color 0.5s ease;
}
</style>