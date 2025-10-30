<template>
  <el-result icon="error" title="401" sub-title="您暂无权限">
    <template #extra>
      <el-button type="primary">返回上一页</el-button>
    </template>
  </el-result>
</template>
<script lang="ts" setup>
import { ElResult, ElButton } from 'element-plus'

defineOptions({
  name: 'no-401',
})
</script>
