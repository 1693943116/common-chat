# 管理布局菜单组件使用文档

## 菜单组件功能

菜单组件是一个基于路由配置自动生成的导航菜单，具有以下特点：

1. 支持根据路由的 `meta.hidden` 配置控制是否显示菜单项
2. 支持任意层级的菜单嵌套
3. 支持水平（horizontal）和垂直（vertical）两种布局模式
4. 支持亮色（light）和暗色（dark）两种主题
5. 自动处理菜单展开状态，避免路由跳转时菜单闪烁

## 使用方法

### 基本使用

```vue
<template>
  <AdminMenu />
</template>

<script setup>
import AdminMenu from '@/layout/adminLayout/Menu/index.vue'
</script>
```

### 配置选项

菜单组件接受以下 props：

| 属性名   | 类型                       | 默认值     | 说明                               |
| -------- | -------------------------- | ---------- | ---------------------------------- |
| mode     | 'horizontal' \| 'vertical' | 'vertical' | 菜单模式，水平或垂直               |
| theme    | 'light' \| 'dark'          | 'light'    | 菜单主题，亮色或暗色               |
| collapse | boolean                    | false      | 是否折叠菜单（仅在垂直模式下生效） |

### 示例

```vue
<template>
  <AdminMenu mode="vertical" theme="dark" :collapse="isCollapse" />
</template>
```

## 路由配置

菜单组件会根据路由配置自动生成菜单项，您可以通过以下方式配置路由：

### 控制菜单项显示

在路由的 `meta` 对象中设置 `hidden: true` 可以隐藏该菜单项：

```js
{
  path: '/secret',
  component: SecretPage,
  meta: {
    title: '隐藏页面',
    hidden: true // 该路由不会在菜单中显示
  }
}
```

### 设置菜单图标

在路由的 `meta` 对象中设置 `icon` 属性可以为菜单项添加图标：

```js
{
  path: '/dashboard',
  component: Dashboard,
  meta: {
    title: '仪表盘',
    icon: 'Odometer' // 使用 Element Plus 图标
  }
}
```

支持两种类型的图标：

1. Element Plus 内置图标（直接使用图标名称）
2. 阿里图标库图标（使用图标名称，需要先在项目中配置）

### 配置外部链接

在路由的 `meta` 对象中设置 `externalLink` 属性可以创建指向外部网站的菜单项：

```js
{
  path: '/external',
  name: 'external',
  meta: {
    title: '外部链接',
    icon: 'Link',
    externalLink: 'https://element-plus.org'
  }
}
```

外部链接特点：

1. 点击后会在新标签页中打开链接
2. 无需配置 component 属性
3. 可以与其他菜单配置（如图标、多级菜单等）结合使用

### 多级菜单

通过路由的嵌套关系可以创建多级菜单：

```js
{
  path: '/system',
  component: Layout,
  meta: {
    title: '系统管理',
    icon: 'Setting'
  },
  children: [
    {
      path: 'user',
      component: UserManagement,
      meta: {
        title: '用户管理',
        icon: 'User'
      }
    },
    {
      path: 'role',
      component: RoleManagement,
      meta: {
        title: '角色管理',
        icon: 'UserFilled'
      }
    },
    {
      path: 'external-docs',
      meta: {
        title: '系统文档',
        icon: 'Document',
        externalLink: 'https://docs.example.com'
      }
    }
  ]
}
```

## 技术原理

### 菜单路由集成

菜单组件通过 `router` 属性与 Vue Router 集成，实现自动路由导航功能：

```vue
<el-menu
  :default-active="activeMenu"
  router
  :collapse="isCollapse"
  :mode="mode"
  :ellipsis="ellipsis"
  :unique-opened="false"
  :class="theme"
  :default-openeds="openedSubMenus"
></el-menu>
```

### 菜单展开状态处理

组件使用 `default-openeds` 属性和计算属性 `openedSubMenus` 来处理菜单的展开状态：

```js
// 根据当前路径计算需要展开的子菜单
const openedSubMenus = computed(() => {
  // 水平模式下不需要预先展开子菜单，因为顶级菜单会直接显示
  if (mode === 'horizontal') {
    return []
  }

  const paths = route.path.split('/')
  const result: string[] = []

  let currentPath = ''
  for (let i = 1; i < paths.length - 1; i++) {
    currentPath += '/' + paths[i]
    result.push(currentPath)
  }

  return result
})
```

这确保了在路由导航时，菜单能够保持正确的展开状态，避免了菜单闪烁问题。

### 水平与垂直模式

组件支持两种布局模式：

1. **垂直模式（vertical）**：适合左侧导航栏，支持折叠功能
2. **水平模式（horizontal）**：适合顶部导航栏，自动处理子菜单弹出样式

## 与主题系统集成

菜单组件已与系统的主题切换功能集成，当系统主题切换时，菜单主题也会自动切换。您可以通过 `useTheme` hook 来控制主题：

```js
import { useTheme } from '@/hook/useTheme'

const { themeMode, toggleThemeMode } = useTheme()

// 切换主题
toggleThemeMode() // 在亮色和暗色之间切换
// 或
toggleThemeMode('dark') // 设置为暗色主题
toggleThemeMode('light') // 设置为亮色主题
```
