// 全局类型定义
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    transition?: string
    keepAlive?: boolean
    requiresAuth?: string[]
    hidden?: boolean // 在菜单栏隐藏
    externalLink?: string // 外部链接
    [key: string]: unknown
  }
}
