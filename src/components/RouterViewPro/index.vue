<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :name="(route.meta.transition as string) || 'el-fade-in-linear'"
      mode="out-in"
      appear
    >
      <div class="h-full w-full">
        <keep-alive :include="cacheStore.cachedPages" :max="10">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </div>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { useCachePagesStore } from '@/stores/cachePages'

defineOptions({
  name: 'RouterViewPro',
})

const cacheStore = useCachePagesStore()
</script>
