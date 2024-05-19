<template>
  <button class="btn" onclick="my_modal_2.showModal()">open modal</button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box" style="max-width: 72rem;">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="stats shadow flex">

        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div class="stat-title my-2">听歌统计</div>
          <div class="stat-value text-primary">4小时26分钟</div>
          <div class="stat-desc my-2">共听了97首</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="stat-title my-2">最常听的歌曲</div>
          <div class="stat-value text-secondary">红玫瑰</div>
          <div class="stat-desc my-2">共播放8次</div>
        </div>

        <div class="stat">
          <div class="stat-title my-2">喜欢听的风格</div>
          <div class="stat-value text-warning">国语, 流行, 安静</div>
          <div class="stat-desc my-2">共播放7次</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <div class="avatar online">
              <!--              <div class="w-16 rounded-full">-->
              <!--                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />-->
              <!--              </div>-->
            </div>
          </div>
          <div class="stat-value">陈奕迅</div>
          <div class="stat-title">最喜爱的歌手</div>
          <div class="stat-desc text-secondary">听了他的2首歌曲</div>
        </div>

      </div>
    </div>
  </dialog>


  <dialog id="my_modal_2" class="modal">
    <div class="modal-box" style="max-width: 72rem;">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="stats shadow flex">

        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div class="stat-title my-2">听歌统计</div>
          <div class="stat-value text-primary">100小时</div>
          <div class="stat-desc my-2">共听了197首</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="inline-block w-8 h-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="stat-title my-2">最常听的歌曲</div>
          <div class="stat-value text-secondary">红玫瑰</div>
          <div class="stat-desc my-2">共播放8次</div>
        </div>

        <div class="stat">
          <div class="stat-title my-2">喜欢听的风格</div>
          <div class="stat-value text-warning">国语, 流行, 安静</div>
          <div class="stat-desc my-2">共播放7次</div>
        </div>
      </div>
    </div>
  </dialog>


</template>
<script setup>
import {ref} from "vue";

const judge=ref(false);
</script>