import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      component: () => import("@/views/Signup.vue")
    },
    {
      path: '/login',
      component: () => import("@/views/Login.vue")
    },
    {
      path: '/',
      component: () => import("@/views/Nutrition.vue")
    }
  ],
})

export default router
