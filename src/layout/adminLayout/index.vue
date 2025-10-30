<template>
  <el-container class="h-screen w-screen">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus'

defineOptions({
  name: 'admin-layout',
})
</script>
