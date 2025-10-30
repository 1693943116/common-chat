import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install: (app: App) => {
    // 注册所有Element Plus图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue))
      app.component(key, component)
  },
}
