// vite.config.js
import { defineConfig } from "file:///D:/person/project/financial/financial-web/node_modules/vite/dist/node/index.js";
import react from "file:///D:/person/project/financial/financial-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { createSvgIconsPlugin } from "file:///D:/person/project/financial/financial-web/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\person\\project\\financial\\financial-web";
var vite_config_default = defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/icon/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
      //自定义插入位置default: body-last
      inject: "body-last",
      // custom dom id __svg__icons__dom__
      customDomId: "__svg__icons__dom__"
    }),
    react()
  ],
  resolve: {
    // 设置文件./src路径为 @
    alias: [
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "src")
      }
    ]
  },
  server: {
    proxy: {
      "/proxy": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/proxy/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwZXJzb25cXFxccHJvamVjdFxcXFxmaW5hbmNpYWxcXFxcZmluYW5jaWFsLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccGVyc29uXFxcXHByb2plY3RcXFxcZmluYW5jaWFsXFxcXGZpbmFuY2lhbC13ZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3BlcnNvbi9wcm9qZWN0L2ZpbmFuY2lhbC9maW5hbmNpYWwtd2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvaWNvbi9zdmcnKV0sXG4gICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcbiAgICAvL1x1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NTE2NVx1NEY0RFx1N0Y2RWRlZmF1bHQ6IGJvZHktbGFzdFxuICAgIGluamVjdDogJ2JvZHktbGFzdCcsXG4gICAgLy8gY3VzdG9tIGRvbSBpZCBfX3N2Z19faWNvbnNfX2RvbV9fXG4gICAgY3VzdG9tRG9tSWQ6ICdfX3N2Z19faWNvbnNfX2RvbV9fJyxcbiAgfSksIHJlYWN0KCksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICAvLyBcdThCQkVcdTdGNkVcdTY1ODdcdTRFRjYuL3NyY1x1OERFRlx1NUY4NFx1NEUzQSBAXG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0AnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvcHJveHknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL3Byb3h5LywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVQsU0FBUyxvQkFBb0I7QUFDcFYsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQUMscUJBQXFCO0FBQUE7QUFBQSxNQUU3QixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGNBQWMsQ0FBQztBQUFBO0FBQUEsTUFFdEQsVUFBVTtBQUFBO0FBQUEsTUFFVixRQUFRO0FBQUE7QUFBQSxNQUVSLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUFHLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFlBQVksRUFBRTtBQUFBLE1BQ2hEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
