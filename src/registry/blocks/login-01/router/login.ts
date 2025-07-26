import type { RouteRecordRaw } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import LoginView from '@/pages/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: CenteredLayout },
    component: LoginView,
  },
]

export default routes
