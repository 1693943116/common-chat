import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCachePagesStore } from '@/stores/cachePages'

/**
 * 动态添加路由的页面缓存
 */
export const useKeepAlive = () => {
  const cacheStore = useCachePagesStore()
  const route = useRoute()

  watchEffect(() => {
    const needCache = route.meta.keepAlive
    if (needCache) cacheStore.addCachedPage(route)
  })
}
