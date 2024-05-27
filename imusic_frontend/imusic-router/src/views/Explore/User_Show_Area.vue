<script setup>
import {computed, defineEmits, onMounted, ref} from "vue";
import axios from "axios";
import Other_User_Data from "@/views/Explore/Other_User_Data.vue";
import MyAlert from "@/js/MyAlert.js";

const Users = ref([]);
const token = defineModel('token');
const SearchContent = defineModel('SearchContent');
const username = defineModel('username');
const emits = defineEmits(['handlePlayNow', 'handlePlayAfter','PlaySongList'])


const GetSearchResult = () => {
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  instance.get('/search/users', {
    params: {
      'keyword': SearchContent.value
    }
  })
      .then(response => {
        Users.value = response.data.data;
        let length = Users.value.length;
        for (let i = 0; i < length; ++i) {
          Users.value[i]['islike'] = false;
        }
        const userlike = ref([]);
        const instance = axios.create({
          baseURL: 'http://182.92.100.66:5000',
          timeout: 5000, // 设置请求超时时间
          headers: {
            'Authorization': `Bearer ${token.value}`,
          }
        });
        axios.defaults.withCredentials = true;
        instance.get('/users/followings', {
          params: {
            'username': username.value
          }
        })
            .then(response => {
              userlike.value = response.data.data;
              let length2 = userlike.value.length;
              for (let i = 0; i < length; ++i) {
                for (let j = 0; j < length2; ++j) {
                  if (userlike.value[j].username === Users.value[i].username) {
                    Users.value[i].islike = true;
                    break;
                  }
                }
              }
            })
            .catch(error => {
              console.log(error.response.data);
            })
      })
      .catch(error => {
        console.log(error.response.data);
      })
}


const HandleLike = (index) => {
  //未登录不能关注
  console.log(username.value)
  if (username.value === '请先登录') {
    MyAlert({type: 'alert-warning', text: '请先登录'})
    return;
  }
  const UserId = Users.value[index].username;
  console.log(UserId);
  const instance = axios.create({
    baseURL: 'http://182.92.100.66:5000',
    timeout: 5000, // 设置请求超时时间
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  axios.defaults.withCredentials = true;
  const formData = new FormData();
  formData.append('username', UserId)
  instance.post('/users/follow', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  Users.value[index].islike = !Users.value[index].islike
}

const ShowUserData = ref(false);
const ShowUsername = ref('');

const ActiveUserDetail = (index) => {
  if(token.value===''){
    MyAlert({type: 'alert-warning', text: '请先登录'})
    return;
  }
  ShowUsername.value = Users.value[index].username;
  console.log(ShowUsername.value);
  ShowUserData.value = true;
}

const CloseUserDetail = () => {
  ShowUserData.value = false;
}

const handlePlayNow = (id) => {
  emits('handlePlayNow', id)
}

const handlePlayAfter = (id) => {
  emits('handlePlayAfter', id);
}

const PlaySongList=(id)=>{
  emits('PlaySongList',id);
}

onMounted(GetSearchResult);
</script>

<template>
  <transition name="slide" appear>
    <div class="transition-container-2" v-if="ShowUserData">
      <Other_User_Data v-model:token="token" v-model:ShowUsername="ShowUsername" v-model:username="username" @changesize="CloseUserDetail"
                       @handlePlayNow="handlePlayNow" @handlePlayAfter="handlePlayAfter" @PlaySongList="PlaySongList"></Other_User_Data>
    </div>
  </transition>
  <div class="overflow-x-auto mx-12 mb-32" v-if="!ShowUserData">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th class="text-left text-sm font-semibold">账号及头像</th>
        <th class="text-left text-sm font-semibold">注册时间</th>
        <th class="text-left text-sm font-semibold">关注</th>
        <th class="text-left text-sm font-semibold">详情</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="text-white rounded-md"
          v-for="(item, index) in Users" :key="index">
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar justify-center">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="item.avatar"
                     alt="头像"/>
              </div>
            </div>
            <div>
              <div class="font-bold">{{ item.username }}</div>
              <!--              <div class="text-sm opacity-50">United States</div>-->
            </div>
          </div>
        </td>
        <td>{{ item.registration_date }}</td>
        <td>
          <div class="tooltip" :data-tip="item.islike?'取消关注':'添加关注'">
            <svg @click="HandleLike(index)" v-if="!item.islike" class="icon fill-white"
                 viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg" width="20" height="20">
              <path
                  d="M744.0384 131.6864a209.5104 209.5104 0 0 1 190.976 124.8256c0.4096 0.9216 0.8192 1.9968 1.28 3.1232a241.0496 241.0496 0 0 1 15.0016 59.1872v0.9728a230.4 230.4 0 0 1 1.9456 30.72A247.04 247.04 0 0 1 880.64 526.0288l-363.52 363.52a9.0624 9.0624 0 0 1-6.5536 2.7136 8.9088 8.9088 0 0 1-6.3488-2.56l-359.0656-358.912a252.16 252.16 0 0 1-74.496-184.32v-0.3584A250.4704 250.4704 0 0 1 87.04 259.9424a208.896 208.896 0 0 1 259.6864-116.1216 217.856 217.856 0 0 1 111.36 93.1328A59.8528 59.8528 0 0 0 510.0032 266.24H517.12l6.8608-1.6896a61.696 61.696 0 0 0 34.0992-22.4256l1.792-2.4064 1.536-2.6112a198.912 198.912 0 0 1 21.76-30.1568l0.512-0.5632 0.512-0.5632c2.4064-2.8672 4.7616-5.5296 7.2192-8.0896 1.4336-1.536 3.072-3.2768 3.8912-3.9936l0.8192-0.8192 0.8192-0.768c2.9696-2.9696 5.12-5.12 7.68-7.2192 4.0448-3.5328 7.424-6.2976 10.24-8.4992l0.6144-0.4608 0.5632-0.4608c2.8672-2.2528 6.3488-4.6592 10.24-7.3728s8.2944-5.4272 11.776-7.424c3.5328-2.048 7.0656-3.9424 10.5984-5.7344a210.944 210.944 0 0 1 93.952-22.2208m0-57.4464A268.1856 268.1856 0 0 0 624.2816 102.4c-4.5568 2.304-9.1648 4.8128-13.7728 7.4752s-9.9328 6.144-14.8992 9.3696-9.5744 6.5536-14.1824 10.24-9.216 7.2704-13.6192 11.1104-7.424 6.656-11.0592 10.24c-2.5088 2.304-4.8128 4.8128-7.1168 7.2704-3.2256 3.4816-6.2976 6.912-9.3696 10.5472a258.048 258.048 0 0 0-28.16 38.8608 3.3792 3.3792 0 0 1-2.0992 1.3312 2.6624 2.6624 0 0 1-2.4576-1.3312 275.2512 275.2512 0 0 0-141.5168-117.76A266.24 266.24 0 0 0 34.0992 237.3632v0.3584a314.2144 314.2144 0 0 0 70.656 333.7216l358.9632 358.912a66.56 66.56 0 0 0 93.952 0l363.776-363.52a305.152 305.152 0 0 0 89.6-216.32 280.832 280.832 0 0 0-2.5088-38.2976 299.1616 299.1616 0 0 0-19.1488-74.8544c-0.3584-0.768-0.5632-1.3312-0.768-1.8944a266.9568 266.9568 0 0 0-244.6336-161.2288z"
              ></path>
            </svg>
            <svg @click="HandleLike(index)" v-if="item.islike" class="icon" viewBox="0 0 1093 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 width="20" height="20">
              <path
                  d="M537.209749 246.735695c22.579939-125.653383 157.939631-190.594584 248.614765-187.827065 137.918426 6.636716 260.062434 134.142516 253.945461 284.241582a304.116193 304.116193 0 0 1-0.728528 11.660897c-0.071076 4.60661-0.017769 9.217661-0.284304 13.997519-12.802554 202.317673-142.422864 310.224281-261.164112 371.709414-198.697242 135.719514-243.279627 247.068863-243.279627 247.068864s-59.392835-104.637115-222.529894-243.301839c-117.524072-114.698804-260.457794-191.896162-267.343276-407.251828-0.155479-4.788742 0.519743-9.386467 0.839584-13.975308 0.008884-3.891408 0.053307-7.765047 0.21767-11.683108 6.094762-150.121277 140.699272-260.493332 278.62214-253.852174 80.497948 3.886966 183.442567 66.882463 213.090121 189.213046z"
                  fill="#F06262"></path>
              <path
                  d="M534.291193 1021.019253c-11.914105 0-22.961972-6.476795-28.919025-16.924959-0.57305-1.003948-59.437258-102.05617-215.169091-234.421788a32.757125 32.757125 0 0 1-1.692496-1.545902c-21.527126-21.007383-44.537963-41.259585-66.793618-60.841007C121.166714 618.800489 17.191494 527.299097 11.141154 338.10382c-0.17769-5.441752 0.266535-10.20384 0.617472-14.028614 0.071076-0.777393 0.146594-1.554786 0.208786-2.327737 0.017769-3.918061 0.07996-7.822796 0.244324-11.767511 3.162879-77.921445 37.328197-150.694327 96.205731-204.86308C167.908032 50.379517 248.086138 20.509852 325.723279 24.250223c75.087292 3.620431 161.249104 50.006368 211.157743 133.938173 53.031538-83.598636 155.283167-132.685459 243.32405-132.685459a218.274222 218.274222 0 0 1 7.223093 0.119941c75.407134 3.629315 149.757013 39.762548 203.983515 99.133172 55.932325 61.236367 84.93131 139.273311 81.652932 219.744605-0.146594 3.882523-0.422013 7.818354-0.715202 11.7453l-0.026653 2.634252a247.673009 247.673009 0 0 1-0.297631 11.798606c-11.030098 174.340404-104.303947 308.314115-277.280581 398.47395-184.362112 126.355258-229.157726 230.006195-229.593066 231.04568a33.125832 33.125832 0 0 1-28.630279 20.740849 31.260088 31.260088 0 0 1-2.230007 0.079961z m-200.061012-301.379769c102.136131 86.930321 164.607442 160.867071 197.990925 205.662684 33.152485-48.042895 100.083813-125.893265 226.581223-212.294958 1.115004-0.759624 2.27443-1.452615 3.473836-2.074529 154.061549-79.773862 233.622183-192.371483 243.230763-344.225236 0.151036-2.683117 0.159921-5.526155 0.182132-8.342539l0.044423-4.055771c0.008884-0.679664 0.03998-1.359327 0.093287-2.034549 0.266535-3.433857 0.524185-6.894367 0.65301-10.377087 5.179659-127.021595-98.511257-243.577258-221.956844-249.694232-75.882454-2.181143-195.338903 53.70676-214.520524 160.427289a33.316848 33.316848 0 0 1-31.793158 27.408661 33.272426 33.272426 0 0 1-33.37904-25.454072c-24.952098-102.953504-110.603052-160.316232-182.318679-163.776743a213.116774 213.116774 0 0 0-10.239378-0.244323c-56.958484 0-114.818744 23.1752-158.743677 63.586315-45.759581 42.09917-72.302003 98.41797-74.745239 158.579314a256.45533 256.45533 0 0 0-0.191017 10.403742c0 0.746297-0.026653 1.492595-0.07996 2.23445-0.111056 1.603651-0.25765 3.216186-0.404245 4.828721-0.213228 2.296641-0.413129 4.464458-0.368706 5.766036 5.126352 160.369539 89.87553 234.950415 188.004755 321.298802 22.611034 19.905706 45.981693 40.473307 68.486113 62.378025z"
                  fill="#BF4C4C"></path>
            </svg>
          </div>
        </td>
        <td>
          <div class="tooltip" data-tip="用户详情" @click="ActiveUserDetail(index)">
            <svg class="icon fill-white hover:fill-gray-400 transition duration-400" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 width="20" height="20">
              <path
                  d="M747.7 288.2c0-17.6-14.4-32.1-32.1-32.1H306.4c-17.6 0-32.1 14.4-32.1 32.1 0 17.6 14.4 32.1 32.1 32.1h409.2c17.7 0 32.1-14.5 32.1-32.1zM306.4 448c-17.6 0-32.1 14.4-32.1 32.1 0 17.6 14.4 32.1 32.1 32.1h191.1c17.7 0 32.2-14.4 32.1-32.1 0-17.6-14.4-32.1-32.1-32.1H306.4zM766.6 776.8c-2.1-2.1-4.4-3.9-6.9-5.2 18.1-25.8 28.7-57.1 28.7-90.9 0-88.2-72.4-159.6-161.7-159.6S465 592.5 465 680.7s72.4 159.6 161.7 159.6c32.7 0 63.2-9.6 88.7-26.1 1.5 2.9 3.4 5.6 5.8 8l83.3 83.3c12.5 12.5 32.9 12.5 45.4 0s12.5-32.9 0-45.4l-83.3-83.3z m-139.9 0.6c-54.1 0-98-43.3-98-96.7s43.9-96.7 98-96.7 98 43.3 98 96.7c0 53.4-43.8 96.7-98 96.7z"
              ></path>
              <path
                  d="M577.6 895.4H221.2c-35.2 0-64-28.8-64-64V192.8c0-35.2 28.8-64 64-64h547.3c35.2 0 64 28.8 64 64v318.4h0.3v0.1c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1c0-1.2-0.1-2.3-0.2-3.5v-316c0-70.4-27.6-128-98-128H225c-70.4 0-128 57.6-128 128v639.8c0 70.4 57.6 128 128 128h352.2c17.8 0 32.2-14.4 32.2-32.1 0-17.6-14.2-31.9-31.8-32.1z"
              ></path>
              <path d="M832.7 639.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"></path>
            </svg>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter-active {
  transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.transition-container {
  right: 0;
  top: 0;
  height: 100%
}


.transition-container-2 {
  right: 0;
  top: 0;
  height: 100%;
}
</style>