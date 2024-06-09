<script setup>
import Letter from "@/components/Letter.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import {ref} from "vue";

const show = ref(false);

const information = [
  {
    url: "/yy.jpg",
    ring_type: "ring-info",
    name: "尹耀",
    description: "我是yy，来自重庆，我喜欢音乐、旅行、美食和运动。",
  },
  {
    url: "/lsw.jpg",
    ring_type: "ring-primary",
    name: "卢思文",
    description: "我叫卢思文，来自河南，喜欢拍照、听音乐和跑步",
  },
  {
    url: "/xht.jpg",
    ring_type: "ring-error",
    name: "薛惠天",
    description: "薛惠天，北京航空航天大学软件学院2022级本科生，学号22373330",
  },
  {
    url: "/nzh.jpg",
    ring_type: "ring-info",
    name: "牛梓涵",
    description: "我是nzh，来自天津，爱好辩论，大家有空来打找我桌游和剧本杀啊~",
  },
  {
    url: "/zys.jpg",
    ring_type: "ring-info",
    name: "张旖霜",
    description: "我是旖霜，来自马来西亚，想要认识很多很多的中国朋友，欢迎大家到马来西亚玩~",
  }
]
</script>

<template>
  <div class="w-full h-full bg-zinc-800 flex flex-col justify-center items-center">
    <div>
      <label class="right-8 fixed">
        <div class="round"><input name="onoff" id="onoff" type="checkbox" v-model="show">
          <div class="back"><label for="onoff" class="but"><span class="on">0</span><span class="off">I</span></label>
          </div>
        </div>
      </label>
    </div>
    <div class="h-5/6 aspect-[16/9] rounded-2xl" v-if="!show">
      <div class="w-full h-full flex flex-col justify-center items-center overflow-visible">
        <!--        <div class="font-bold text-white">Imusic开发团队</div>-->
        <br>
        <Letter/>
      </div>
    </div>
    <div class="h-5/6 aspect-[16/9] rounded-2xl" v-if="show">
      <div class="flex flex-wrap justify-center w-4/5 mx-auto">
        <div v-for="item in information">
          <PhotoCard class="my-3 mx-8" :url="item.url" :ring_type="item.ring_type" :name="item.name"
                     :description="item.description"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  display: none
}

.on, .off {
  position: absolute;
  text-align: center;
  text-shadow: inset 1px 1px 1px black;
  width: 100%;
}

.on {
  color: #fff;
  top: 10px;
  transition: all 0.1s;
  font-family: sans-serif
}

.off {
  color: #636161;
  bottom: 5px;
  transition: all 0.1s;
  transform: scaleY(0.85);
}

.but {
  background-color: #000;
  border-radius: 400px 400px 400px 400px / 400px 400px 300px 300px;
  border-bottom-width: 0;
  box-shadow: inset 8px 6px 5px -7px rgba(0, 0, 0, 1), inset -8px 6px 5px -7px rgba(0, 0, 0, 1), inset 0 -3px 2px -2px rgba(200, 200, 200, .5), 0 3px 3px -2px rgba(0, 0, 0, 1), inset 0 -230px 60px -200px rgba(255, 255, 255, .2), inset 0 220px 40px -200px rgba(0, 0, 0, .3);
  display: block;
  font-size: 17px;
  height: 60px;
  position: relative;
  transition: all 0.2s;
  width: 40px;
}

.back {
  background-color: #000;
  background-image: -webkit-linear-gradient(0deg, transparent 30%, transparent 65%), -webkit-linear-gradient(0deg, rgba(245, 245, 245, 0) 30%, rgba(150, 150, 150, .1) 50%, rgba(150, 150, 150, 0) 70%);
  border-radius: 115px;
  box-sizing: border-box;
  height: 85px;
  padding: 4px 4px;
  transition: all 0.2s;
  width: 50px;
}

input:checked + .back .on, input:checked + .back .off {
  text-shadow: inset 1px 1px 1px black;
}

input:checked + .back .on {
  color: rgb(141, 141, 141);
  top: 10px;
  transform: scaleY(0.85);
}

input:checked + .back .off {
  color: #fff;
  bottom: 5px;
  transform: scaleY(1);
}

input:checked + .back .but {
  background: #232323 -webkit-radial-gradient(55% 18%, circle closest-corner, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0));
  border-radius: 410px 410px 410px 410px / 310px 310px 410px 410px;
  box-shadow: inset 8px -4px 5px -7px rgba(0, 0, 0, 1), inset -8px -4px 5px -7px rgba(0, 0, 0, 1), 0 -3px 8px -4px rgba(250, 250, 250, .4), inset 0 3px 4px -2px rgba(10, 10, 10, 1), inset 0 280px 40px -200px rgba(0, 0, 0, .2), inset 0 -200px 40px -200px rgba(180, 180, 180, .2);
  margin-top: 20px;
}

input:checked + .back {
  background-image: -webkit-linear-gradient(90deg, black 30%, transparent 65%), -webkit-linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, rgba(250, 250, 250, .4) 50%, rgba(150, 150, 150, 0) 100%);
  box-shadow: 28px 28px 28px -28px rgba(0, 0, 0, .1), -28px 28px 28px -22px rgba(0, 0, 0, .1), 0 30px 30px 0 rgba(0, 0, 0, .2), inset 0 1px 2px 0 rgba(0, 0, 0, .6);
  padding: 2px 4px;
}

.l, .r {
  margin: 0 auto;
  text-align: center;
}

.round, #onoff, .back, .but, .on, .off {
  user-select: none;
}
</style>