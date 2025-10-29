<template>
  <el-config-provider :locale="zhCn">
    <el-button type="primary">主要按钮</el-button>
    <el-button>主要按钮</el-button>
    <div>dvdvdv</div>
    <BubbleList :list="list" />
    <Sender />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider, ElButton } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { BubbleList, Sender } from 'vue-element-plus-x'

const list = [
  {
    content: 'Hello, Element Plus X',
    role: 'user',
  },
]
</script>
