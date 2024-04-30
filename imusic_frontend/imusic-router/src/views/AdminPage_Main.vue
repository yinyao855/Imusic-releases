<script setup>
import Search from "@/components/Search.vue";
import Admin_Songlist_View from "@/views/Admin_Songlist_View.vue";
import {computed, ref} from "vue";
const NaviClass1 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '1',
}));
const NaviClass2 = computed(() => ({
  'text-base inline-block mx-5 w-30 rounded-lg antialiased tracking-widest font-medium transition-colors duration-400 hover:bg-gray-600/40': true,
  'text-cyan-700 underline underline-offset-8 decoration-2': NaviMode.value === '2',
}));
const NaviMode=ref('1');
const Admin_Songlist_View_Ref=ref(null);
const changeNaviMode=(NewMode)=>{
  NaviMode.value=NewMode.toString();
  if(NewMode.value==='1'){
    Admin_Songlist_View_Ref.value.Get_Admin_SongList_Data();
  }
}

const token=defineModel('token');
const SearchContent=defineModel('SearchContent');

</script>

<template>
  <div class="w-full h-16 pl-6 fixed bg-zinc-900 z-50">
    <div :class="[NaviClass1, 'text-transition']" @click="changeNaviMode(1);" style="line-height: 56px">歌 单</div>
    <div :class="[NaviClass2, 'text-transition']" @click="changeNaviMode(2);" style="line-height: 56px">
      歌 曲
    </div>
    <Search v-model:SearchContent="SearchContent" @SearchOperation="SearchOperation" v-model:token="token"></Search>
  </div>
  <div class="w-full" v-if="NaviMode.value==='1'">
    <Admin_Songlist_View ref="Admin_Songlist_View_Ref" v-model:token="token"></Admin_Songlist_View>
  </div>
</template>

<style scoped>

</style>