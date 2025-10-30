<template>
  <el-container class="h-screen w-screen">
    <!-- 左侧菜单模式 -->
    <template v-if="layoutMode === 'vertical'">
      <el-aside
        :width="isCollapse ? '64px' : '220px'"
        class="h-full overflow-y-auto overflow-x-hidden transition-all duration-300"
      >
        <AdminMenu mode="vertical" :theme="themeMode" :collapse="isCollapse" />
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
          <div>个人信息</div>
        </el-header>
        <el-main class="h-full w-full">
          <RouterViewPro />
        </el-main>
      </el-container>
    </template>

    <!-- 顶部菜单模式 -->
    <template v-else>
      <el-container>
        <el-header
          height="64px"
          class="flex items-center justify-between px-4 shadow-[rgba(0,21,41,0.08)_0px_1px_4px]"
        >
          <span class="text-lg font-bold">Element Plus X</span>
          <div class="flex-1">
            <AdminMenu mode="horizontal" :theme="themeMode" :collapse="false" />
          </div>
        </el-header>
        <el-main class="h-full w-full">
          <RouterViewPro />
        </el-main>
      </el-container>
    </template>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElContainer, ElHeader, ElMain, ElAside, ElButton } from 'element-plus'
import AdminMenu from './Menu/index.vue'
import RouterViewPro from '@/components/RouterViewPro/index.vue'
import Icon from '@/components/Icon/index.vue'

defineOptions({
  name: 'admin-layout',
})

const isCollapse = ref(false)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const themeMode = ref<'light' | 'dark'>('light')
const layoutMode = ref<'vertical' | 'horizontal'>('horizontal')
</script>
