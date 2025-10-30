import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useCachePagesStore = defineStore('cachePages', () => {
  const cachedPages = ref<string[]>([])

  const getComponentName = (route: RouteLocationNormalizedLoaded): string | undefined => {
    const componentOptions = route.matched[route.matched.length - 1]?.components?.default
    debugger
    if (typeof componentOptions === 'object' && componentOptions) {
      if ('name' in componentOptions && typeof componentOptions.name === 'string') {
        return componentOptions.name
      }
    }

    return undefined
  }

  const addCachedPage = (route: RouteLocationNormalizedLoaded) => {
    const name = getComponentName(route)
    if (name && route.meta.keepAlive && !cachedPages.value.includes(name)) {
      cachedPages.value.push(name)
    }
  }

  const removeCachedPage = (route: RouteLocationNormalizedLoaded) => {
    const name = getComponentName(route)
    cachedPages.value = cachedPages.value.filter((item) => item !== name)
  }

  const clearCachedPages = () => (cachedPages.value.length = 0)

  return { cachedPages, addCachedPage, removeCachedPage, clearCachedPages, getComponentName }
})
