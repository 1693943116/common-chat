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
        path: '/external',
        name: 'external',
        component: () => import('@/views/test/index.vue'), // 添加一个占位组件
        meta: {
          title: '外部链接',
          icon: 'Link',
          externalLink: 'https://element-plus.org',
        },
      },
      {
        path: '/chat1',
        name: 'chat1',
        component: () => import('@/views/chat/index.vue'),
        meta: { title: '聊天', icon: 'ChatDotRound' },
      },
      {
        path: '/chat2',
        name: 'chat2',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '聊天', icon: 'ChatDotRound' },
      },
      {
        path: '/chat3',
        name: 'chat3',
        component: () => import('@/views/test/index.vue'),
        meta: { title: '聊天', icon: 'ChatDotRound' },
      },
      {
        path: '/chat4',
        name: 'chat4',
        meta: { title: '聊天', icon: 'ChatDotRound' },
        children: [
          {
            path: '/chat4/chat5',
            name: 'chat5',
            component: () => import('@/views/test/index.vue'),
            meta: { title: '聊天', icon: 'ChatDotRound' },
          },
          {
            path: '/chat4/chat6',
            name: 'chat6',
            component: () => import('@/views/test/index.vue'),
            meta: { title: '聊天', icon: 'ChatDotRound' },
          },
          {
            path: '/chat4/chat7',
            name: 'chat7',
            component: () => import('@/views/test/index.vue'),
            meta: { title: '聊天', icon: 'ChatDotRound' },
          },
        ],
      },
      {
        path: '/chat8',
        name: 'chat8',
        meta: { title: '聊天', icon: 'ChatDotRound' },
        children: [
          {
            path: '/chat8/external',
            name: 'subExternal',
            component: () => import('@/views/test/index.vue'),
            meta: {
              title: '子菜单外部链接',
              icon: 'Link',
              externalLink: 'https://github.com/element-plus/element-plus',
            },
          },
          {
            path: '/chat8/chat9',
            name: 'chat9',
            component: () => import('@/views/test/index.vue'),
            meta: { title: '聊天', icon: 'ChatDotRound' },
          },
          {
            path: '/chat8/chat10',
            name: 'chat10',
            component: () => import('@/views/test/index.vue'),
            meta: { title: '聊天', icon: 'ChatDotRound' },
          },
          {
            path: '/chat8/chat11',
            name: 'chat11',
            component: () => import('@/views/test/index.vue'),
            meta: { title: '聊天', icon: 'ChatDotRound' },
          },
        ],
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
