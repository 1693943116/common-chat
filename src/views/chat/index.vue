<template>
  <div class="chat-container">
    <h1>聊天页面</h1>
    <p>这是一个支持缓存的页面</p>
    <el-input v-model="message" placeholder="请输入内容" />
    <div class="message-list">
      <div v-for="(msg, index) in messages" :key="index" class="message-item">
        {{ msg }}
      </div>
    </div>
  </div>
  <div>
    <el-icon><Plus /></el-icon>
    <el-icon><Sunny /></el-icon>
    <Icon name="SoldOut"></Icon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElIcon } from 'element-plus'
import Icon from '@/components/Icon/index.vue'

// 为组件定义名称，用于keep-alive缓存
defineOptions({
  name: 'ChatView',
})

const message = ref('')
const messages = ref<string[]>(['这是一条测试消息', '页面被缓存后，这些消息和输入框的内容将会保留'])
</script>

<style scoped>
.chat-container {
  padding: 20px;
}

.message-list {
  margin-top: 20px;
}

.message-item {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
