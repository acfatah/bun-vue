import type { RouteRecordRaw } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import Login from '@/pages/SignIn.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { layout: CenteredLayout },
    component: Login,
  },
]

export default routes
