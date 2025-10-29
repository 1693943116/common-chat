<template>
  <div class="error-page">
    <div class="error-code">401</div>
    <div class="error-desc">抱歉，您没有访问权限</div>
    <div class="error-action">
      <el-button type="primary" @click="goHome">返回首页</el-button>
      <el-button @click="goBack">返回上一页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  color: #f56c6c;
}

.error-desc {
  font-size: 24px;
  margin: 20px 0 30px;
}

.error-action {
  margin-top: 20px;
}

.error-action .el-button {
  margin: 0 10px;
}
</style>
