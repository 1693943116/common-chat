<template>
  <el-container class="h-screen w-screen" style="border: 1px solid red">
    <el-aside
      :width="isCollapse ? '64px' : '220px'"
      class="h-full overflow-y-auto overflow-x-hidden transition-all duration-300"
    >
      <AdminMenu :mode="'vertical'" :theme="themeMode" :collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header
        height="64px"
        class="flex items-center justify-between px-4 shadow-[rgba(0,21,41,0.08)_0px_1px_4px]"
      >
        <div class="flex items-center">
          <el-button type="text" @click="toggleCollapse">
            <Icon :name="isCollapse ? 'Expand' : 'Fold'" />
          </el-button>
        </div>
        <div class="flex items-center">
          <el-button type="text" @click="() => toggleThemeMode()">
            <Icon :name="themeMode === 'dark' ? 'Sunny' : 'Moon'" />
          </el-button>
        </div>
      </el-header>
      <el-main class="h-full w-full">
        <RouterViewPro />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElContainer, ElHeader, ElMain, ElAside, ElButton } from 'element-plus'
import AdminMenu from './Menu/index.vue'
import RouterViewPro from '@/components/RouterViewPro/index.vue'
import Icon from '@/components/Icon/index.vue'
import { useTheme } from '@/hook/useTheme'

defineOptions({
  name: 'admin-layout',
})

// 菜单折叠状态
const isCollapse = ref(false)

// 切换菜单折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 获取主题模式和切换方法
const { themeMode, toggleThemeMode } = useTheme()
</script>
