import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useCachePagesStore = defineStore('cachePages', () => {
  const cachedPages = ref<string[]>([])

  // 获取组件名称
  const getComponentName = (route: RouteLocationNormalizedLoaded): string | undefined => {
    const componentOptions = route.matched[route.matched.length - 1]?.components?.default
    return componentOptions?.name ?? undefined
  }

  // 添加组件缓存
  const addCachedPage = (route: RouteLocationNormalizedLoaded) => {
    const name = getComponentName(route)
    if (name && route.meta.keepAlive && !cachedPages.value.includes(name)) {
      cachedPages.value.push(name)
    }
  }

  // 移除组件缓存
  const removeCachedPage = (route: RouteLocationNormalizedLoaded) => {
    const name = getComponentName(route)
    cachedPages.value = cachedPages.value.filter((item) => item !== name)
  }

  // 清楚全部缓存
  const clearCachedPages = () => (cachedPages.value.length = 0)

  return { cachedPages, addCachedPage, removeCachedPage, clearCachedPages, getComponentName }
})
