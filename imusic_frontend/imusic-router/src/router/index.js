import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Account/Login.vue')
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: () => import('../views/Account/Sign_up.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
  ]
})

export default router
