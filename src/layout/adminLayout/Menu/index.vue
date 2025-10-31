<template>
  <div
    class="scrollbar-elegant h-full w-full overflow-y-auto overflow-x-hidden"
    :class="[mode, theme]"
  >
    <el-menu
      :default-active="activeMenu"
      router
      :collapse="isCollapse"
      :mode="mode"
      :ellipsis="ellipsis"
      :unique-opened="false"
      :class="theme"
      :default-openeds="openedSubMenus"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <sub-menu :route="route" :mode="mode" />
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

// 根据当前路径计算需要展开的子菜单
const openedSubMenus = computed(() => {
  // 水平模式下不需要预先展开子菜单，因为顶级菜单会直接显示
  if (mode === 'horizontal') {
    return []
  }

  const paths = route.path.split('/')
  const result: string[] = []

  let currentPath = ''
  for (let i = 1; i < paths.length - 1; i++) {
    currentPath += '/' + paths[i]
    result.push(currentPath)
  }

  return result
})

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
/* 亮色主题 */
.light :deep(.el-menu) {
  --el-menu-bg-color: #ffffff;
  --el-menu-text-color: #303133;
  --el-menu-hover-bg-color: #0000000f;
  --el-menu-active-color: var(--el-color-primary);
}

/* 暗色主题 */
.dark :deep(.el-menu) {
  --el-menu-bg-color: #1f2937;
  --el-menu-text-color: #e5e7eb;
  --el-menu-hover-bg-color: #2d3748;
  --el-menu-active-color: var(--el-color-primary-light-3);
}

/* 菜单项基本样式 */
:deep(.el-menu) {
  border-right: none !important;
  border-bottom: none !important;
}

:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-light-7);
}

/* 水平模式特殊样式 */
.horizontal :deep(.el-menu--horizontal) {
  display: flex;
  flex-wrap: wrap;
}

.horizontal :deep(.el-menu--horizontal > .el-menu-item),
.horizontal :deep(.el-menu--horizontal > .el-sub-menu) {
  height: 60px;
  line-height: 60px;
}
</style>
