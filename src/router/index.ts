import { createRouter, createWebHistory } from 'vue-router'
import { staticRouter } from './staticRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter],
})

export default router
