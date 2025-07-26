import type { RouteRecordRaw } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import SignIn from '@/pages/SignIn.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: { layout: CenteredLayout },
    component: SignIn,
  },
]

export default routes
