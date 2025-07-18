import type { RouteRecordRaw } from 'vue-router'
import WelcomeLayout from '@/layouts/WelcomeLayout.vue'
import HomeView from '@/views/Welcome/HomeView.vue'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { createRouter, createWebHistory } from 'vue-router'

const { start: startLoading, done: doneLoading } = useNProgress()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: WelcomeLayout,
    },
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Welcome/AboutView.vue'),
    meta: {
      layout: WelcomeLayout,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((_to, _from, next) => {
  startLoading()
  next()
})

router.afterEach(() => {
  doneLoading()
})

export default router
