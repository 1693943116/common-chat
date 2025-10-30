# Element Plus X 主题色配置

## 概述

Element Plus X 提供完整的主题色配置系统，支持亮色/暗色模式和动态主题色修改。

配置方式：

- **静态配置**：通过 CSS 变量预定义
- **动态配置**：通过 JavaScript 实时修改

## 默认主题色

### 亮色模式

```css
--el-color-primary: #4caf50;
--el-color-primary-light-3: #81c784;
--el-color-primary-light-5: #a5d6a7;
--el-color-primary-light-7: #c8e6c9;
--el-color-primary-light-9: #e8f5e9;
--el-color-primary-dark-2: #388e3c;

--el-color-success: #66bb6a;
--el-color-warning: #ffc107;
--el-color-danger: #f44336;
--el-color-info: #78909c;
```

### 暗色模式

```css
--el-color-primary: #66bb6a;
--el-color-primary-light-3: #81c784;
--el-color-primary-light-5: #a5d6a7;
--el-color-primary-light-7: #c8e6c9;
--el-color-primary-light-9: #e8f5e9;
--el-color-primary-dark-2: #43a047;

--el-color-success: #81c784;
--el-color-warning: #ffd54f;
--el-color-danger: #e57373;
--el-color-info: #90a4ae;
```

## useTheme Hook 使用

```vue
<script setup lang="ts">
import { useTheme } from '@/hook/useTheme'

const { themeMode, themeColor, toggleThemeMode, setThemeColors, resetThemeColors } = useTheme()
</script>
```

### API

| 名称             | 说明             | 类型                               |
| ---------------- | ---------------- | ---------------------------------- |
| themeMode        | 当前主题模式     | ref<'light' \| 'dark'>             |
| themeColor       | 当前主题色配置   | ref<ThemeColor>                    |
| toggleThemeMode  | 切换主题模式     | (mode?: 'light' \| 'dark') => void |
| setThemeColors   | 设置主题色       | (colors: ThemeColor) => void       |
| resetThemeColors | 重置为默认主题色 | () => void                         |

### 类型定义

```typescript
export type ThemeColor = {
  primary: string
  success?: string
  warning?: string
  danger?: string
  info?: string
}

export type ThemeMode = 'light' | 'dark'
```

## 使用示例

### 切换主题模式

```vue
<template>
  <el-button @click="toggleThemeMode()">切换主题模式</el-button>
  <el-button @click="toggleThemeMode('light')">亮色模式</el-button>
  <el-button @click="toggleThemeMode('dark')">暗色模式</el-button>
</template>
```

### 修改主题色

```vue
<template>
  <el-color-picker v-model="primaryColor" @change="updateThemeColor" />
  <el-button @click="resetThemeColors">重置主题色</el-button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '@/hook/useTheme'

const { themeColor, setThemeColors, resetThemeColors } = useTheme()
const primaryColor = ref(themeColor.value.primary)

const updateThemeColor = (color: string) => {
  setThemeColors({ primary: color })
}

watch(
  () => themeColor.value,
  (newTheme) => {
    primaryColor.value = newTheme.primary
  },
  { deep: true },
)
</script>
```

### 完整示例

```vue
<template>
  <div class="theme-config">
    <div class="theme-mode">
      <span>主题模式：{{ themeMode }}</span>
      <el-switch
        v-model="isDarkMode"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="handleModeChange"
      />
    </div>

    <div class="theme-colors">
      <div class="color-item">
        <span>主色：</span>
        <el-color-picker v-model="colors.primary" @change="updateThemeColors" />
      </div>
      <!-- 其他颜色选择器 -->
    </div>

    <el-button @click="resetThemeColors">重置主题色</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useTheme } from '@/hook/useTheme'
import { Moon, Sunny } from '@element-plus/icons-vue'

const { themeMode, themeColor, toggleThemeMode, setThemeColors, resetThemeColors } = useTheme()

const isDarkMode = computed({
  get: () => themeMode.value === 'dark',
  set: (value) => toggleThemeMode(value ? 'dark' : 'light'),
})

const colors = reactive({
  primary: themeColor.value.primary,
  success: themeColor.value.success || '',
  warning: themeColor.value.warning || '',
  danger: themeColor.value.danger || '',
  info: themeColor.value.info || '',
})

const updateThemeColors = () => {
  setThemeColors(colors)
}

watch(
  () => themeColor.value,
  (newTheme) => {
    Object.assign(colors, {
      primary: newTheme.primary,
      success: newTheme.success || '',
      warning: newTheme.warning || '',
      danger: newTheme.danger || '',
      info: newTheme.info || '',
    })
  },
  { deep: true },
)
</script>
```

## 技术原理

### Tailwind 集成

项目将 Element Plus 的 CSS 变量与 Tailwind 集成：

```javascript
theme: {
  extend: {
    colors: {
      primary: 'var(--el-color-primary)',
    },
  },
},
```

使用示例：

```vue
<!-- Element Plus 按钮 -->
<el-button type="primary">按钮</el-button>

<!-- Tailwind 类 -->
<div class="bg-primary p-4 text-white">使用主题色的背景</div>
```

### 色阶生成

系统根据主色自动生成不同亮度的变体：

- 基础色（base）
- 浅色变体（light3、light5、light7、light9）
- 深色变体（dark2）

### CSS 变量位置

- 亮色模式：`src/styles/customizeElement/light.css`
- 暗色模式：`src/styles/customizeElement/dark.css`

## 自定义主题色

### 静态配置

直接修改 CSS 文件：

```css
/* light.css */
:root {
  --el-color-primary: #1890ff !important; /* 蓝色主题 */
  --el-color-primary-light-3: #40a9ff !important;
  --el-color-primary-light-5: #69c0ff !important;
  --el-color-primary-light-7: #91d5ff !important;
  --el-color-primary-light-9: #e6f7ff !important;
  --el-color-primary-dark-2: #096dd9 !important;
}
```

### 动态配置

使用 `useTheme` Hook 并保存到本地存储：

```typescript
import { useTheme } from '@/hook/useTheme'
import { watch } from 'vue'

const { themeMode, themeColor, toggleThemeMode, setThemeColors } = useTheme()

// 加载主题设置
const loadThemeFromStorage = () => {
  const savedThemeMode = localStorage.getItem('themeMode')
  const savedThemeColor = localStorage.getItem('themeColor')

  if (savedThemeMode) {
    toggleThemeMode(savedThemeMode as 'light' | 'dark')
  }

  if (savedThemeColor) {
    try {
      setThemeColors(JSON.parse(savedThemeColor))
    } catch (e) {
      console.error('Failed to parse theme colors', e)
    }
  }
}

// 保存主题设置
watch(themeMode, (mode) => {
  localStorage.setItem('themeMode', mode)
})

watch(
  themeColor,
  (colors) => {
    localStorage.setItem('themeColor', JSON.stringify(colors))
  },
  { deep: true },
)

loadThemeFromStorage()
```

## 最佳实践

1. **保持色彩一致性**：确保所有衍生色保持一致的色调和饱和度
2. **考虑可访问性**：确保主题色与背景色有足够对比度
3. **暗色模式适配**：暗色模式下使用稍亮的主色
4. **保存用户偏好**：将用户的主题设置保存到本地存储
5. **提供重置选项**：让用户可以轻松恢复默认主题设置

## 注意事项

1. 修改主题色时会自动生成色阶变体
2. 暗色模式下主色会自动调整为稍亮的变体
3. 只指定主色（primary）时，其他辅助色保持不变
4. CSS 变量使用 `!important` 标记覆盖默认样式
