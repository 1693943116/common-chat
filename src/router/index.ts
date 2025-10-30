import { createRouter, createWebHistory } from 'vue-router'
import { businessRouter } from './businessRouter'
import { staticRouter } from './staticRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...businessRouter, ...staticRouter],
})

export default router
