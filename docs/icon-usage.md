# Icon 图标组件使用文档

## 组件介绍

Icon 组件是一个通用图标组件，支持 Element Plus 内置图标和阿里图标库（iconfont）。该组件提供了统一的图标调用接口，使图标的使用更加便捷和一致。

## 功能特点

- 支持 Element Plus 内置图标
- 支持阿里图标库（iconfont）
- 可自定义图标大小、颜色
- 支持自定义 class

## 基本用法

### 引入组件

```vue
import Icon from '@/components/Icon/index.vue'
```

### 使用 Element Plus 图标

```vue
<Icon name="Plus" />
<Icon name="Sunny" size="24" color="#409EFF" />
```

### 使用阿里图标库

```vue
<Icon name="jiaotan" />
<Icon name="jiaotan" size="32" color="#67C23A" />
```

## 组件属性

| 属性名      | 说明         | 类型            | 默认值 |
| ----------- | ------------ | --------------- | ------ |
| name        | 图标名称     | string          | -      |
| size        | 图标大小     | number / string | 16     |
| color       | 图标颜色     | string          | ''     |
| customClass | 自定义 class | string          | ''     |

## 使用阿里图标库（iconfont）

### 步骤 1: 创建阿里图标库项目

1. 访问 [阿里巴巴矢量图标库](https://www.iconfont.cn/)
2. 注册并登录账号
3. 创建项目，添加所需图标到项目中

### 步骤 2: 获取图标代码

1. 在项目管理页面，点击"Symbol"按钮
2. 点击"生成在线链接"或"下载至本地"
3. 如果选择在线链接，复制生成的 JS 链接
4. 如果选择下载至本地，将下载的 JS 文件放入项目的 `/public/ali-iconfont/` 目录下，并命名为 `icon.js`

### 步骤 3: 使用图标

在组件中使用阿里图标库的图标：

```vue
<Icon name="图标名称" />
```

> 注意：图标名称是在阿里图标库中的图标名称，不包含 `icon-` 前缀。例如，如果图标在阿里图标库中的名称是 `icon-jiaotan`，则在使用时只需要写 `jiaotan`。

## 示例

```vue
<template>
  <div>
    <!-- Element Plus 图标 -->
    <Icon name="Plus" />
    <Icon name="Sunny" size="24" color="#409EFF" />

    <!-- 阿里图标库图标 -->
    <Icon name="jiaotan" />
    <Icon name="jiaotan" size="32" color="#67C23A" />

    <!-- 自定义 class -->
    <Icon name="Plus" customClass="my-icon" />
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/index.vue'
</script>
```

## 注意事项

1. 确保阿里图标库的 JS 文件已正确放置在 `/public/ali-iconfont/icon.js` 路径下
2. 使用阿里图标时，只需提供图标名称，无需添加 `icon-` 前缀
3. 图标大小可以是数字（如 `16`，单位为 px）或字符串（如 `'1em'`、`'16px'`）
4. 组件会自动判断图标类型，优先使用 Element Plus 内置图标
