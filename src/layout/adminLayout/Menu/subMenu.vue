<template>
  <el-sub-menu v-if="hasChildren" :index="route.path">
    <template #title>
      <Icon v-if="getIcon" :name="getIcon" />
      <span>{{ getTitle }}</span>
    </template>
    <template v-for="child in route.children" :key="child.path">
      <sub-menu v-if="isRouteShow(child)" :route="child" />
    </template>
  </el-sub-menu>
  <template v-else>
    <link-pro v-if="isExternalLink" :to="externalLinkPath" class="menu-link">
      <el-menu-item :index="route.path">
        <Icon v-if="getIcon" :name="getIcon" />
        <template #title>{{ getTitle }}</template>
      </el-menu-item>
    </link-pro>
    <el-menu-item v-else :index="route.path">
      <Icon v-if="getIcon" :name="getIcon" />
      <template #title>{{ getTitle }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElSubMenu, ElMenuItem } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'
import Icon from '@/components/Icon/index.vue'
import LinkPro from '@/components/LinkPro/index.vue'

defineOptions({
  name: 'SubMenu',
})

interface Props {
  route: RouteRecordRaw
}

const props = defineProps<Props>()

const hasChildren = computed(() => {
  if (!props.route.children) return false
  return props.route.children.some((child) => isRouteShow(child))
})

const isRouteShow = (route: RouteRecordRaw) => {
  return !(route.meta && route.meta.hidden === true)
}

const getIcon = computed(() => {
  return props.route.meta?.icon || ''
})

const getTitle = computed(() => {
  return props.route.meta?.title || props.route.name || '未命名菜单'
})

const isExternalLink = computed(() => {
  return !!props.route.meta?.externalLink
})

const externalLinkPath = computed(() => {
  return props.route.meta?.externalLink || ''
})
</script>

<style scoped>
.el-menu-item,
.el-sub-menu__title {
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 4px 8px;
  padding-left: 16px !important;
}

/* 图标样式 */
.icon-components {
  margin-right: 12px;
  font-size: 18px;
  transition: all 0.3s;
}

/* 外部链接样式 */
.menu-link {
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.menu-link :deep(.el-menu-item) {
  width: 100%;
}

/* 自定义悬浮效果 */
:deep(.el-menu-item):hover {
  background: var(--el-menu-hover-bg-color);
  color: var(--el-menu-active-color);
  transform: translateX(4px);
}

:deep(.el-sub-menu__title):hover {
  background: var(--el-menu-hover-bg-color);
  color: var(--el-menu-active-color);
  transform: translateX(4px);
}

/* 自定义选中效果 */
:deep(.el-menu-item.is-active) {
  background: #1890ff;
  color: #ffffff;
  font-weight: bold;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.35);
}

/* 子菜单选中状态 */
:deep(.el-sub-menu.is-active) > .el-sub-menu__title {
  color: #1890ff;
  font-weight: bold;
}

/* 选中时图标效果 */
:deep(.el-menu-item.is-active) .icon-components {
  color: #ffffff;
  transform: scale(1.1);
}
</style>
