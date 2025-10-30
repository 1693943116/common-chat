<template>
  <ErrorBoundary>
    <el-config-provider :locale="zhCn">
      <RouterViewPro />
    </el-config-provider>
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ErrorBoundary from '@/components/Error/ErrorBoundary.vue'
import RouterViewPro from '@/components/RouterViewPro/index.vue'
import { useKeepAlive } from '@/hook/useKeepAlive'

// 动态添加路由页面缓存
useKeepAlive()
</script>
