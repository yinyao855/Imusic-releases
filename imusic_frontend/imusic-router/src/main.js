import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'
import axios from 'axios'

// 全局设置 axios 发送请求带上cookie
axios.defaults.withCredentials = true

const app = createApp(App)
window.router=router
app.use(createPinia())
app.use(VueParticles)
app.use(router)

app.mount('#app')
