import './style.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'
import axios from 'axios'

axios.defaults.withCredentials = true


const app = createApp(App)

app.directive('click-outside', {
    beforeMount: function (el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event);
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    beforeUnmount: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});

window.router=router
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(VueParticles)
app.use(router)

app.mount('#app')
