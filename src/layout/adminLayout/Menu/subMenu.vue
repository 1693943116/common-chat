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
