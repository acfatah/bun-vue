import type { RouteRecordRaw } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import RegisterView from '@/pages/Register.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'register',
    meta: { layout: CenteredLayout },
    component: RegisterView,
  },
]

export default routes
