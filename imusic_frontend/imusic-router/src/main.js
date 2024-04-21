import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueParticles from 'vue-particles'

const app = createApp(App)
window.router=router
app.use(createPinia())
app.use(VueParticles)
app.use(router)

app.mount('#app')
