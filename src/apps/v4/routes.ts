import type { RouteRecordRaw } from 'vue-router'
import V4Layout from './layouts/V4Layout.vue'

export const v4Routes: RouteRecordRaw[] = [
  {
    path: '/v4',
    name: 'v4',
    component: () => import('./V4View.vue'),
    meta: {
      layout: V4Layout,
    },
  },
]
