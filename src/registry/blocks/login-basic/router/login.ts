import CenteredLayout from '@/layouts/CenteredLayout.vue'
import Login from '@/pages/Login.vue'

export default [
  {
    path: '/login',
    name: 'login',
    meta: { layout: CenteredLayout },
    component: Login,
  },
]
