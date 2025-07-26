import type { RouteRecordRaw } from 'vue-router'
import CenteredLayout from '@/layouts/CenteredLayout.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/forgot-password',
    name: 'forgot-password',
    meta: { layout: CenteredLayout },
    component: ForgotPassword,
  },
]

export default routes
