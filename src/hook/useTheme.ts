import { ref, watchEffect } from 'vue'
import { useCssVar } from '@vueuse/core'

export type ThemeColor = {
  primary: string
  success?: string
  warning?: string
  danger?: string
  info?: string
}

export type ThemeMode = 'light' | 'dark'

/**
 * 动态修改Element Plus主题色的Hook
 * @returns 主题相关的方法和状态
 */
export function useTheme() {
  // 当前主题模式
  const themeMode = ref<ThemeMode>('light')

  // 当前主题色
  const themeColor = ref<ThemeColor>({
    primary: '#4caf50', // 默认绿色
    success: '#66bb6a',
    warning: '#ffc107',
    danger: '#f44336',
    info: '#78909c',
  })

  // 亮色模式下的CSS变量引用
  const lightPrimaryColor = useCssVar('--el-color-primary')
  const lightPrimaryLight3 = useCssVar('--el-color-primary-light-3')
  const lightPrimaryLight5 = useCssVar('--el-color-primary-light-5')
  const lightPrimaryLight7 = useCssVar('--el-color-primary-light-7')
  const lightPrimaryLight9 = useCssVar('--el-color-primary-light-9')
  const lightPrimaryDark2 = useCssVar('--el-color-primary-dark-2')
  const lightSuccessColor = useCssVar('--el-color-success')
  const lightWarningColor = useCssVar('--el-color-warning')
  const lightDangerColor = useCssVar('--el-color-danger')
  const lightInfoColor = useCssVar('--el-color-info')

  // 暗色模式下的CSS变量引用
  const darkPrimaryColor = useCssVar('--el-color-primary', document.documentElement)
  const darkPrimaryLight3 = useCssVar('--el-color-primary-light-3', document.documentElement)
  const darkPrimaryLight5 = useCssVar('--el-color-primary-light-5', document.documentElement)
  const darkPrimaryLight7 = useCssVar('--el-color-primary-light-7', document.documentElement)
  const darkPrimaryLight9 = useCssVar('--el-color-primary-light-9', document.documentElement)
  const darkPrimaryDark2 = useCssVar('--el-color-primary-dark-2', document.documentElement)
  const darkSuccessColor = useCssVar('--el-color-success', document.documentElement)
  const darkWarningColor = useCssVar('--el-color-warning', document.documentElement)
  const darkDangerColor = useCssVar('--el-color-danger', document.documentElement)
  const darkInfoColor = useCssVar('--el-color-info', document.documentElement)

  /**
   * 生成主色的色阶变体
   * @param color 主色
   * @returns 色阶变体对象
   */
  const generateColorVariants = (color: string) => {
    // 将颜色转换为RGB
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
      return result
        ? {
            r: parseInt(result[1] as string, 16),
            g: parseInt(result[2] as string, 16),
            b: parseInt(result[3] as string, 16),
          }
        : { r: 0, g: 0, b: 0 }
    }

    // RGB转换为HEX
    const rgbToHex = (r: number, g: number, b: number) => {
      return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
    }

    // 调整亮度
    const adjustBrightness = (rgb: { r: number; g: number; b: number }, percent: number) => {
      const { r, g, b } = rgb
      const amount = Math.round(2.55 * percent)

      const newR = Math.max(0, Math.min(255, r + amount))
      const newG = Math.max(0, Math.min(255, g + amount))
      const newB = Math.max(0, Math.min(255, b + amount))

      return rgbToHex(newR, newG, newB)
    }

    const rgb = hexToRgb(color)

    return {
      base: color,
      light3: adjustBrightness(rgb, 20),
      light5: adjustBrightness(rgb, 40),
      light7: adjustBrightness(rgb, 60),
      light9: adjustBrightness(rgb, 80),
      dark2: adjustBrightness(rgb, -20),
    }
  }

  /**
   * 切换主题模式
   * @param mode 主题模式
   */
  const toggleThemeMode = (mode?: ThemeMode) => {
    if (mode) {
      themeMode.value = mode
    } else {
      themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
    }

    if (themeMode.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * 设置主题色
   * @param colors 主题色配置
   */
  const setThemeColors = (colors: ThemeColor) => {
    themeColor.value = {
      ...themeColor.value,
      ...colors,
    }
  }

  /**
   * 重置为默认主题色
   */
  const resetThemeColors = () => {
    themeColor.value = {
      primary: '#4caf50',
      success: '#66bb6a',
      warning: '#ffc107',
      danger: '#f44336',
      info: '#78909c',
    }
  }

  // 监听主题色变化，自动更新CSS变量
  watchEffect(() => {
    const { primary, success, warning, danger, info } = themeColor.value
    const primaryVariants = generateColorVariants(primary)

    // 更新亮色模式变量
    lightPrimaryColor.value = primaryVariants.base
    lightPrimaryLight3.value = primaryVariants.light3
    lightPrimaryLight5.value = primaryVariants.light5
    lightPrimaryLight7.value = primaryVariants.light7
    lightPrimaryLight9.value = primaryVariants.light9
    lightPrimaryDark2.value = primaryVariants.dark2

    if (success) lightSuccessColor.value = success
    if (warning) lightWarningColor.value = warning
    if (danger) lightDangerColor.value = danger
    if (info) lightInfoColor.value = info

    // 更新暗色模式变量（暗色模式下使用稍亮的主色）
    const darkPrimaryVariants = generateColorVariants(
      primaryVariants.light3, // 暗色模式下使用亮一点的主色
    )

    darkPrimaryColor.value = darkPrimaryVariants.base
    darkPrimaryLight3.value = darkPrimaryVariants.light3
    darkPrimaryLight5.value = darkPrimaryVariants.light5
    darkPrimaryLight7.value = darkPrimaryVariants.light7
    darkPrimaryLight9.value = darkPrimaryVariants.light9
    darkPrimaryDark2.value = darkPrimaryVariants.dark2

    if (success) darkSuccessColor.value = generateColorVariants(success).light3
    if (warning) darkWarningColor.value = warning
    if (danger) darkDangerColor.value = generateColorVariants(danger).light3
    if (info) darkInfoColor.value = generateColorVariants(info).light3
  })

  return {
    themeMode,
    themeColor,
    toggleThemeMode,
    setThemeColors,
    resetThemeColors,
  }
}
