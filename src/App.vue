<template>
  <el-config-provider :locale="zhCn">
    <router-view v-slot="{ Component, route }">
      <transition :name="(route.meta.transition as string) || 'fade'" mode="out-in" appear>
        <keep-alive :include="cachedViews" :max="10" v-if="!route.meta.noCache">
          <component :is="Component" :key="route.path" />
        </keep-alive>
        <component :is="Component" :key="route.path" v-else />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 缓存的视图组件名称列表
const cachedViews = ref<string[]>([])

// 获取路由实例
const router = useRouter()

// 监听路由变化，可以在这里添加额外逻辑
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 如果路由需要缓存且不在缓存列表中，添加到缓存列表
  if (to.name && !to.meta.noCache && !cachedViews.value.includes(to.name as string)) {
    cachedViews.value.push(to.name as string)
  }

  next()
})
</script>

<style scoped>
/* 过渡动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 滑动过渡效果 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
