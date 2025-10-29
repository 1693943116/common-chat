<template>
  <el-result icon="error" title="404" sub-title="您访问的页面不存在">
    <template #extra>
      <el-button type="primary">返回上一页</el-button>
    </template>
  </el-result>
</template>
<script lang="ts" setup>
import { ElResult, ElButton } from 'element-plus'
</script>
