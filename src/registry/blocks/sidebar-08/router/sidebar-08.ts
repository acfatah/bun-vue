import type { RouteRecordRaw } from 'vue-router'
import { SidebarInsetLayout } from '@/layouts/SidebarInsetLayout'
import Sidebar08 from '@/pages/Sidebar08.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/sidebar-08',
    name: 'sidebar-08',
    meta: { layout: SidebarInsetLayout },
    component: Sidebar08,
  },
]

export default routes
