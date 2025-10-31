import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'
import lineClamp from '@tailwindcss/line-clamp'
import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindScrollbar from 'tailwind-scrollbar'
import tailwindcssNesting from '@tailwindcss/nesting'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--el-color-primary)',
      },
    },
  },
  plugins: [
    // 排版插件
    typography,
    // 宽高比插件 aspect-w-16 aspect-h-9
    aspectRatio,
    // 多行文本截断插件 line-clamp-2 line-clamp-3
    lineClamp,
    // 动画插件
    tailwindcssAnimate,
    // 滚动条插件 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
    tailwindScrollbar({ nocompatible: true }),
    // 嵌套css
    tailwindcssNesting,
  ],
}
