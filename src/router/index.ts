import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页',
        transition: 'slide-right',
        // 默认缓存该页面
        noCache: false,
      },
    },
  ],
})

export default router
