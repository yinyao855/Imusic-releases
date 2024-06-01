<script setup>
const props = defineProps({
  url: String,
  ring_type: String,
  name: String,
  description: String,
})
</script>

<template>
  <div class="card">
    <div class="content">
      <div class="back">
        <div class="back-content">
          <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <path
                d="M594.078367 1000.398466l-70.942749-51.485605-8.070816 24.822338-8.070816-24.822338-70.942749
                51.485605 57.134255-73.220628L45.210691 602.069365l-0.110517-0.083911c-17.916045-13.505595-25.41074-36.763298-18.648732-57.873082l0.033769-0.104377
                53.607942-163.377998L185.237865 55.593156l0.070608-0.201591c4.862751-13.718443 17.421788-22.582321
                31.994692-22.582321 14.572904 0 27.130917 8.864902 31.994692 22.582321l0.137123 0.404206 101.646028
                314.219471 327.968613 0 101.71152-314.423109 0.071631-0.201591c4.862751-13.71742 17.421788-22.582321
                31.995715-22.582321 0 0-0.001023 0 0 0 14.572904 0 27.131941 8.864902 31.993668 22.583344l0.137123
                0.404206 105.080244 324.834226 53.641711 163.480328c6.762007 21.109784-0.731664 44.366464-18.648732
                57.874105l-0.224104 0.165776L536.944112 927.178861 594.078367 1000.398466zM361.043916 400.715451
                515.064802 874.446869l154.020886-473.731418L361.043916 400.715451zM929.826154 417.504836 594.078367
                847.782579l372.565321-270.382057c7.42818-5.658883 10.562567-15.238053 7.81192-23.883967L929.826154
                417.504836zM63.48387 577.398476l372.567367 270.384104L100.302427 417.504836 55.67502 553.514509C52.922327
                562.16247 56.057737 571.739593 63.48387 577.398476zM126.140908 400.715451l347.349009 445.143313-144.726196-445.143313L126.140908
                400.715451zM701.366905 400.715451 556.64071 845.85774l347.349009-445.14229L701.366905 400.715451zM711.313441
                370.016265l203.02395 0L815.82882 65.493643c-0.239454-0.63445-0.896416-1.984191-3.00238-1.984191-2.108011
                0-2.76395 1.350764-3.004427 1.985214L711.313441 370.016265zM318.78137 370.016265l0.032746 0L220.306568
                65.493643c-0.239454-0.63445-0.896416-1.984191-3.00238-1.984191-2.105964 0-2.762927 1.349741-3.003404
                1.984191L115.79119 370.016265 318.78137 370.016265z"
                fill="#ffffff"></path>
          </svg>
          <strong>Hover Me</strong>
        </div>
      </div>
      <div class="front">
        <div class="img">
          <div class="circle">
          </div>
          <div class="circle" id="right">
          </div>
          <div class="circle" id="bottom">
          </div>
        </div>

        <div class="front-content">
          <div class="avatar m-auto">
            <div :class="['w-24','rounded-full','ring',props.ring_type,'ring-offset-base-100','ring-offset-2']">
              <img :src="props.url" class="w-24 aspect-square rounded-full" alt="avatar"/>
            </div>
          </div>
          <div class="description">
            <div class="title">
              <p class="title">
                <strong>{{ props.name }}</strong>
              </p>
              <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256"
                   xmlns="http://www.w3.org/2000/svg">
                <g style="mix-blend-mode: normal" text-anchor="end" font-size="none" font-weight="bold"
                   font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10"
                   stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero"
                   fill="#20c997">
                  <g transform="scale(8,8)">
                    <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <p class="card-footer">
              {{ props.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  overflow: visible;
  width: 210px;
  height: 280px;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 300ms;
  box-shadow: 0 0 10px 1px #000000ee;
  border-radius: 5px;
}

.front, .back {
  background-color: #151515;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.back::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
  animation: rotation_481 5000ms infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #151515;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.card:hover .content {
  transform: rotateY(180deg);
}

@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}

.front {
  transform: rotateY(180deg);
  color: white;
}

.front .front-content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.description {
  box-shadow: 0 0 10px 5px #00000088;
  width: 100%;
  padding: 10px;
  background-color: #00000099;
  backdrop-filter: blur(5px);
  border-radius: 5px;
}

.title {
  font-size: 18px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
}

.title p {
  width: 50%;
}

.card-footer {
  color: #ffffff88;
  margin-top: 5px;
  font-size: 16px;
}

.front .img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #ffbb66;
  position: relative;
  filter: blur(15px);
  animation: floating 2600ms infinite linear;
}

#bottom {
  background-color: #ff8866;
  left: 50px;
  top: 0;
  width: 150px;
  height: 150px;
  animation-delay: -800ms;
}

#right {
  background-color: #ff2233;
  left: 160px;
  top: -80px;
  width: 30px;
  height: 30px;
  animation-delay: -1800ms;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>