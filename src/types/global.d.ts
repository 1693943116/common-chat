// 全局类型定义
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    transition?: string
    keepalive?: boolean
    requiresAuth?: string[]
    [key: string]: unknown
  }
}
