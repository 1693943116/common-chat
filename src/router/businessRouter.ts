import type { RouteRecordRaw } from 'vue-router'

export const businessRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/adminLayout/index.vue'),
    meta: {
      title: 'layout管理系统',
    },
    children: [
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat/index.vue'),
        meta: { title: '聊天' },
      },
    ],
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue'),
    meta: { title: '聊天' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
  },
]
