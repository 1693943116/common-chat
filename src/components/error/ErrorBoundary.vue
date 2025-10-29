<template>
  <div>
    <slot v-if="!hasError"></slot>
    <div v-else class="flex min-h-[400px] w-full flex-col items-center justify-center">
      <el-result
        :icon="errorSeverity === 'critical' ? 'error' : 'warning'"
        :title="errorTitle"
        :sub-title="errorMessage"
      >
        <template #icon>
          <div class="mb-6 flex justify-center">
            <el-icon
              :class="errorSeverity === 'critical' ? 'text-red-500' : 'text-yellow-500'"
              class="text-8xl"
            >
              <component :is="errorIcon" />
            </el-icon>
          </div>
        </template>
        <template #extra>
          <div class="flex flex-col items-center gap-4 sm:flex-row">
            <el-button type="primary" @click="resetError" :loading="isRetrying">
              <el-icon class="mr-2"><RefreshRight /></el-icon>
              {{ retryText }}
            </el-button>
            <el-button v-if="showReportButton" type="info" @click="reportError">
              <el-icon class="mr-2"><Warning /></el-icon>
              {{ reportErrorText }}
            </el-button>
            <el-button v-if="showBackButton" @click="goBack">
              <el-icon class="mr-2"><Back /></el-icon>
              {{ backText }}
            </el-button>
          </div>
        </template>
      </el-result>

      <div v-if="showDetails && errorDetails" class="mt-6 w-full max-w-3xl">
        <el-collapse v-model="activeCollapse">
          <el-collapse-item name="details">
            <template #title>
              <div class="flex items-center">
                <el-icon class="mr-2"><InfoFilled /></el-icon>
                <span>技术详情</span>
              </div>
            </template>
            <div class="error-details rounded bg-gray-50 p-4 dark:bg-gray-800">
              <h4 class="mb-2 font-medium">错误信息</h4>
              <pre
                class="mb-4 overflow-auto rounded border border-gray-200 bg-gray-100 p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                >{{ errorDetails.message }}</pre
              >

              <template v-if="errorDetails.stack">
                <h4 class="mb-2 font-medium">堆栈跟踪</h4>
                <pre
                  class="mb-4 overflow-auto rounded border border-gray-200 bg-gray-100 p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                  >{{ errorDetails.stack }}</pre
                >
              </template>

              <template v-if="errorDetails.componentInfo">
                <h4 class="mb-2 font-medium">组件信息</h4>
                <pre
                  class="overflow-auto rounded border border-gray-200 bg-gray-100 p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                  >{{ errorDetails.componentInfo }}</pre
                >
              </template>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElIcon, ElResult, ElCollapse, ElCollapseItem } from 'element-plus'
import { Warning, CircleCloseFilled, Back, RefreshRight, InfoFilled } from '@element-plus/icons-vue'

defineOptions({
  name: 'ErrorBoundary',
})

type ComponentInstance = {
  $el: HTMLElement
  $options: {
    name?: string
    __file?: string
  }
  $parent?: ComponentInstance | null
}

interface ErrorDetails {
  message: string
  stack?: string
  componentInfo?: string
  timestamp?: string
  url?: string
  userAgent?: string
}
interface Props {
  /** 是否显示错误详情 */
  showDetails?: boolean
  /** 是否显示返回按钮 */
  showBackButton?: boolean
  /** 是否显示报告错误按钮 */
  showReportButton?: boolean
  /** 重试按钮文本 */
  retryText?: string
  /** 返回按钮文本 */
  backText?: string
  /** 报告错误按钮文本 */
  reportErrorText?: string
  /** 自定义错误标题 */
  customErrorTitle?: string
  /** 自定义错误信息 */
  customErrorMessage?: string
  /** 自定义错误处理函数 */
  onError?: (error: Error, instance: ComponentInstance, info: string) => void
  /** 自定义错误报告函数 */
  onReport?: (errorData: ErrorDetails | null) => void
}

const {
  showDetails = true,
  showBackButton = true,
  showReportButton = true,
  retryText = '重试',
  backText = '返回上一页',
  reportErrorText = '报告问题',
  customErrorTitle = '',
  customErrorMessage = '',
  onReport,
  onError,
} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'error', error: Error, instance: ComponentInstance, info: string): void
}>()

const router = useRouter()
const hasError = ref(false)
const errorMessage = ref('')
const errorTitle = ref('页面出错了')
const errorSeverity = ref<'warning' | 'critical'>('warning')
const errorDetails = ref<ErrorDetails | null>(null)
const isRetrying = ref(false)
const activeCollapse = ref<string[]>([])

const errorIcon = computed(() => {
  return errorSeverity.value === 'critical' ? CircleCloseFilled : Warning
})

onErrorCaptured((err: Error, vueInstance, info) => {
  const error = err as Error

  hasError.value = true
  errorMessage.value = customErrorMessage || error.message || '未知错误'
  errorTitle.value = customErrorTitle || '页面出错了'

  errorSeverity.value =
    error.name === 'TypeError' || error.name === 'ReferenceError' ? 'critical' : 'warning'

  errorDetails.value = {
    message: error.message,
    stack: error.stack,
    componentInfo: info,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  }

  const componentInstance: ComponentInstance = {
    $el: vueInstance?.$el || document.createElement('div'),
    $options: {
      name: vueInstance?.$options?.name || '未知组件',
      __file: vueInstance?.$options?.__file,
    },
    $parent: null,
  }

  onError?.(error, componentInstance, info)
  emit('error', error, componentInstance, info)

  console.error('[ErrorBoundary]', error, info)

  return false
})

const resetError = async () => {
  isRetrying.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 600))
    hasError.value = false
    errorMessage.value = ''
    errorDetails.value = null
    emit('reset')
  } catch (e) {
    console.error('[ErrorBoundary] 重置错误失败', e)
  } finally {
    isRetrying.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

const reportError = () => {
  if (onReport) {
    onReport(errorDetails.value)
  } else {
    console.log('[ErrorBoundary] 报告错误', errorDetails.value)
  }
}
</script>
