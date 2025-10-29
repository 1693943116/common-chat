import type { RouteRecordRaw } from 'vue-router'

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/components/error/401.vue'),
    meta: {
      title: '401',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/error/404.vue'),
    meta: {
      title: '404',
    },
  },
]
