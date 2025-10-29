import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/401',
    name: '401',
    component: () => import('@/components/error/401.vue'),
    meta: {
      title: '401',
    },
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/components/error/error.vue'),
    meta: {
      title: '系统错误',
    },
  },
  // 将匹配所有路径并重定向到404页面
  {
    path: '/:pathMatch(.*)*',

    component: () => import('@/components/error/404.vue'),
    meta: {
      title: '404',
    },
  },
]
