<template>
  <el-config-provider :locale="zhCn">
    <ErrorBoundary>
      <router-view v-slot="{ Component, route }">
        <transition
          :name="(route.meta.transition as string) || 'el-fade-in-linear'"
          mode="out-in"
          appear
        >
          <keep-alive :include="[]" :max="10" v-if="!route.meta.noCache">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" :key="route.fullPath" v-else />
        </transition>
      </router-view>
    </ErrorBoundary>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ErrorBoundary from '@/components/error/ErrorBoundary.vue'
</script>
