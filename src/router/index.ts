import { createRouter, createWebHistory } from 'vue-router'

// import BlankLayout from '@/layouts/BlankLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, _from, savedPosition) {
    if (to && to.hash) {
      return {
        el: to.hash,
        top: 64,
        behavior: 'smooth',
      }
    }
    else if (savedPosition) {
      return savedPosition
    }
    else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue'),
      // meta: {
      //   layout: BlankLayout,
      // },
    },
  ],
})

export default router
