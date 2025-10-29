# Element Plus X

基于 Vue 3、Vite、Element Plus 和 TailwindCSS 的现代化前端项目。

## 项目架构

```
element-plus-x/
├── dist/                  # 构建输出目录
├── public/                # 静态资源目录
├── src/                   # 源代码目录
│   ├── App.vue            # 应用入口组件
│   ├── main.ts            # 应用入口文件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   └── styles/            # 全局样式
├── env.d.ts               # 环境变量类型声明
├── eslint.config.ts       # ESLint 配置
├── index.html             # HTML 入口文件
├── package.json           # 项目依赖和脚本
├── postcss.config.js      # PostCSS 配置
├── tailwind.config.js     # TailwindCSS 配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # 应用的 TypeScript 配置
├── tsconfig.node.json     # Node.js 的 TypeScript 配置
└── vite.config.ts         # Vite 配置
```

## 技术栈

- **前端框架**：Vue 3.5.x
- **构建工具**：Vite (Rolldown)
- **UI 框架**：Element Plus 2.11.x
- **CSS 框架**：TailwindCSS 3.4.x
- **状态管理**：Pinia 3.0.x
- **路由管理**：Vue Router 4.6.x
- **开发语言**：TypeScript 5.9.x
- **代码规范**：ESLint + Prettier + Oxlint
- **CSS 预处理器**：Sass

## 配置流程

### 1. 项目初始化

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 代码检查
pnpm lint
```

### 2. 目录别名配置

在 `vite.config.ts` 中配置了目录别名，方便导入模块：

```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '~': fileURLToPath(new URL('./src', import.meta.url)),
  },
}
```

### 3. Element Plus 配置

Element Plus 已集成并配置中文语言包：

```typescript
// src/App.vue
import { ElConfigProvider, ElButton } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
```

### 4. 主题定制化

#### Element Plus 主题定制

主题色定制通过 CSS 变量实现，在 `src/styles/index.css` 中：

```css
:root {
  --el-color-primary: green; /* 主题色定义 */
}
```

可以通过修改 CSS 变量来自定义 Element Plus 的主题色和其他样式变量。

#### TailwindCSS 集成与定制

TailwindCSS 配置文件 `tailwind.config.js` 中扩展了颜色配置，将主题色与 Element Plus 变量关联：

```javascript
theme: {
  extend: {
    colors: {
      primary: 'var(--el-color-primary)', // 使用 Element Plus 的主题色变量
    },
  },
},
```

这样可以在 TailwindCSS 类中使用 `text-primary`、`bg-primary` 等类名来应用 Element Plus 的主题色。

#### TailwindCSS 插件

项目集成了多个 TailwindCSS 插件，增强功能：

- `@tailwindcss/typography`: 排版插件，提供美观的文本样式
- `@tailwindcss/aspect-ratio`: 宽高比控制插件
- `@tailwindcss/line-clamp`: 多行文本截断插件
- `tailwindcss-animate`: 动画插件
- `tailwindcss-scrollbar`: 滚动条样式插件

### 5. 开发工具配置

项目集成了 Vue 开发工具：

```typescript
// vite.config.ts
plugins: [vue(), vueJsx(), vueDevTools()],
```

### 6. 代码质量工具

项目配置了多种代码质量工具：

- ESLint: JavaScript/TypeScript 代码检查
- Prettier: 代码格式化
- Oxlint: 高性能 JavaScript/TypeScript 代码检查

## 最佳实践

1. **组件开发**：使用 Vue 3 组合式 API (Composition API)
2. **状态管理**：使用 Pinia 进行状态管理
3. **样式开发**：优先使用 TailwindCSS 类，结合 Element Plus 组件
4. **主题定制**：通过 CSS 变量定制 Element Plus 主题

## 浏览器兼容性

项目要求 Node.js 版本：`^20.19.0 || >=22.12.0`

推荐使用的浏览器：

- Chrome (最新版)
- Firefox (最新版)
- Edge (最新版)
- Safari (最新版)

## 开发工具推荐

- **IDE**: VS Code + Vue 官方扩展
- **浏览器扩展**: Vue.js devtools
