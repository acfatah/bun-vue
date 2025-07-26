import type { RouteRecordRaw } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import SignUp from '@/pages/SignUp.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: { layout: CenteredLayout },
    component: SignUp,
  },
]

export default routes
