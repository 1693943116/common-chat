<template>
  <div class="error-page">
    <div class="error-icon">
      <el-icon><WarningFilled /></el-icon>
    </div>
    <div class="error-title">系统错误</div>
    <div class="error-desc">{{ errorMessage || '抱歉，系统发生了未知错误' }}</div>
    <div class="error-detail" v-if="errorDetail">
      <el-collapse>
        <el-collapse-item title="错误详情">
          <pre>{{ errorDetail }}</pre>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="error-action">
      <el-button type="primary" @click="refresh">刷新页面</el-button>
      <el-button @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { WarningFilled } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const errorMessage = ref('')
const errorDetail = ref('')

onMounted(() => {
  // 从路由参数中获取错误信息
  if (route.query.message) {
    errorMessage.value = route.query.message as string
  }
  if (route.query.detail) {
    errorDetail.value = route.query.detail as string
  }
})

const refresh = () => {
  window.location.reload()
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
}

.error-icon {
  font-size: 80px;
  color: #e6a23c;
}

.error-title {
  font-size: 36px;
  font-weight: bold;
  margin: 20px 0;
}

.error-desc {
  font-size: 18px;
  margin-bottom: 30px;
  text-align: center;
}

.error-detail {
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
}

.error-detail pre {
  white-space: pre-wrap;
  word-break: break-word;
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
}

.error-action {
  margin-top: 20px;
}

.error-action .el-button {
  margin: 0 10px;
}
</style>
