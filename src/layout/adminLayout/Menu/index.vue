<template>
  <div class="menu-container" :class="[mode, theme]">
    <el-menu
      :default-active="activeMenu"
      router
      :collapse="isCollapse"
      :mode="mode"
      :ellipsis="ellipsis"
      :unique-opened="false"
      :class="theme"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <sub-menu :route="route" />
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import SubMenu from './subMenu.vue'
import { ElMenu } from 'element-plus'

defineOptions({
  name: 'AdminMenu',
})

interface Props {
  mode?: 'horizontal' | 'vertical'
  theme?: 'light' | 'dark'
  collapse?: boolean
}

const { mode = 'vertical', theme = 'light', collapse = false } = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const isCollapse = computed(() => mode === 'vertical' && collapse)
const ellipsis = computed(() => mode === 'horizontal')
const activeMenu = computed(() => route.path)

const filterHiddenRoutes = (routes: RouteRecordRaw[]) => {
  return routes.filter((route) => {
    return !(route?.meta?.hidden === true)
  })
}

const menuRoutes = computed(() => {
  const routes = router.getRoutes()

  const layoutRoutes = routes.filter((route) => {
    return route.path === '/' && route.children && route.children.length > 0
  })

  if (layoutRoutes.length > 0 && layoutRoutes[0]?.children) {
    return filterHiddenRoutes(layoutRoutes[0].children as RouteRecordRaw[])
  }

  return filterHiddenRoutes(
    routes.filter((route) => {
      const specialPaths = ['/login', '/401', '/:pathMatch(.*)']
      return !specialPaths.includes(route.path)
    }),
  )
})
</script>

<style scoped>
.menu-container {
  height: 100%;
  width: 100%;
}

.menu-container.vertical {
  overflow-y: auto;
  overflow-x: hidden;
}

.menu-container.horizontal {
  width: 100%;
}

/* 亮色主题 */
.menu-container.light :deep(.el-menu) {
  --el-menu-bg-color: #ffffff;
  --el-menu-text-color: #303133;
  --el-menu-hover-bg-color: #f0f5ff;
  --el-menu-active-color: var(--el-color-primary);
  border-right: 1px solid #e6e6e6;
  padding: 6px;
}

/* 暗色主题 */
.menu-container.dark :deep(.el-menu) {
  --el-menu-bg-color: #1f2937;
  --el-menu-text-color: #e5e7eb;
  --el-menu-hover-bg-color: #2d3748;
  --el-menu-active-color: var(--el-color-primary-light-3);
  border-right: 1px solid #374151;
  padding: 6px;
}

/* 菜单项基本样式 */
.menu-container :deep(.el-menu) {
  border-right: none;
}

/* 移除菜单项默认样式 */
.menu-container :deep(.el-menu-item.is-active) {
  border-left: none;
  background-color: transparent; /* 移除默认背景色，使用SubMenu中的自定义样式 */
}

/* 子菜单样式 */
.menu-container :deep(.el-menu--inline) {
  padding-left: 0;
  background: transparent;
}

/* 折叠状态下的菜单样式 */
.menu-container :deep(.el-menu--collapse) {
  width: 64px;
}
</style>
