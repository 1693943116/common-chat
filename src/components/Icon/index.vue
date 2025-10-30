<template>
  <ElIcon v-if="isElementIcon" :size="size" :color="color" :class="[customClass]">
    <component :is="icon" />
  </ElIcon>

  <svg v-else :class="[customClass]" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

defineOptions({
  name: 'icon-components',
})

interface Props {
  name: string
  size?: number | string
  color?: string
  customClass?: string
}
const { name, size = 16, color = '', customClass = '' } = defineProps<Props>()

// 阿里图标库URL 将阿里图标库的--js--文件下载到本地，防止阿里服务器不稳定导致无法访问
const ICONFONT_URL = '/ali-iconfont/icon.js'

const loadIconFont = () => {
  if (document.querySelector(`script[src="${ICONFONT_URL}"]`)) {
    return
  }

  const script = document.createElement('script')
  script.src = ICONFONT_URL
  script.async = true

  document.head.appendChild(script)
}

onMounted(() => {
  loadIconFont()
})

const isElementIcon = computed(() => {
  return Object.keys(ElementPlusIconsVue).includes(name)
})

const icon = computed(() => {
  if (isElementIcon.value) return (ElementPlusIconsVue as Record<string, unknown>)[name]
  return null
})

const svgStyle = computed(() => {
  return {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    fill: color,
    overflow: 'hidden',
  }
})
</script>

<style scoped>
svg {
  display: inline-block;
}
</style>
