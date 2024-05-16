import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/icon/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    //自定义插入位置default: body-last
    inject: 'body-last',
    // custom dom id __svg__icons__dom__
    customDomId: '__svg__icons__dom__',
  }), react(),
  ],
  resolve: {
    // 设置文件./src路径为 @
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  }

})
