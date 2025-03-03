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
    },
    {
      path: '/training',
      component: () => import("@/views/Training.vue")
    },
    {
      path: '/profile',
      component: () => import("@/views/Profile.vue")
    },
    {
      path: '/addfood',
      component: () => import("@/views/AddFood.vue")
    }
  ],
})

export default router
