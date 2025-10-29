<template>
  <div class="home-container">
    <el-row :gutter="20" justify="center" align="middle">
      <el-col :span="24">
        <el-card shadow="hover" class="welcome-card">
          <template #header>
            <div class="card-header">
              <h2>欢迎使用 Element Plus X</h2>
            </div>
          </template>
          <div class="card-content">
            <el-alert
              title="路由配置成功"
              type="success"
              description="您已成功配置了router-view组件，并且正在查看首页。"
              show-icon
              :closable="false"
            />

            <div class="feature-list">
              <h3>已配置功能：</h3>
              <el-timeline>
                <el-timeline-item timestamp="路由过渡动画" placement="top" type="primary">
                  <el-card>
                    <p>支持多种过渡效果：fade、slide-left、slide-right</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="页面缓存" placement="top" type="success">
                  <el-card>
                    <p>使用keep-alive组件实现页面缓存，提升用户体验</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="动态页面标题" placement="top" type="warning">
                  <el-card>
                    <p>根据路由meta信息自动设置页面标题</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

onMounted(() => {
  ElMessage({
    message: '首页加载完成',
    type: 'success',
    duration: 2000,
  })
})
</script>

<style scoped>
.home-container {
  padding: 20px;
  min-height: 100vh;
  background-color: var(--el-bg-color);
}

.welcome-card {
  max-width: 900px;
  margin: 40px auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  margin-top: 20px;
}

.feature-list {
  margin-top: 30px;
}

h3 {
  margin-bottom: 20px;
  color: var(--el-text-color-primary);
}
</style>
