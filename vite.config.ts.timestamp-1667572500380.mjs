// vite.config.ts
import react from "file:///C:/Users/User/Documents/Work/geniecms_frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as path from "path";
import { defineConfig } from "file:///C:/Users/User/Documents/Work/geniecms_frontend/node_modules/vite/dist/node/index.js";
import vitePluginImp from "file:///C:/Users/User/Documents/Work/geniecms_frontend/node_modules/vite-plugin-imp/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/Users/User/Documents/Work/geniecms_frontend/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\User\\Documents\\Work\\geniecms_frontend";
var vite_config_default = defineConfig({
  server: {
    port: 3031
  },
  resolve: {
    alias: {
      "~": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`
        }
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "#ED4E60",
          "link-color": "#111"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvY3VtZW50c1xcXFxXb3JrXFxcXGdlbmllY21zX2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvY3VtZW50c1xcXFxXb3JrXFxcXGdlbmllY21zX2Zyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Vc2VyL0RvY3VtZW50cy9Xb3JrL2dlbmllY21zX2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2aXRlUGx1Z2luSW1wIGZyb20gXCJ2aXRlLXBsdWdpbi1pbXBcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAzMSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiflwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICB2aXRlUGx1Z2luSW1wKHtcclxuICAgICAgb3B0aW1pemU6IHRydWUsXHJcbiAgICAgIGxpYkxpc3Q6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaWJOYW1lOiBcImFudGRcIixcclxuICAgICAgICAgIGxpYkRpcmVjdG9yeTogXCJlc1wiLFxyXG4gICAgICAgICAgc3R5bGU6IChuYW1lKSA9PiBgYW50ZC9lcy8ke25hbWV9L3N0eWxlYCxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIC8vIFNwZWNpZnkgdGhlIGljb24gZm9sZGVyIHRvIGJlIGNhY2hlZFxyXG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvaWNvbnNcIildLFxyXG4gICAgICAvLyBTcGVjaWZ5IHN5bWJvbElkIGZvcm1hdFxyXG4gICAgICBzeW1ib2xJZDogXCJpY29uLVtkaXJdLVtuYW1lXVwiLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgbGVzczoge1xyXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLCAvLyBTdXBwb3J0IGlubGluZSBKYXZhU2NyaXB0XHJcbiAgICAgICAgbW9kaWZ5VmFyczoge1xyXG4gICAgICAgICAgXCJwcmltYXJ5LWNvbG9yXCI6IFwiI0VENEU2MFwiLFxyXG4gICAgICAgICAgXCJsaW5rLWNvbG9yXCI6IFwiIzExMVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLE9BQU8sV0FBVztBQUMxVixZQUFZLFVBQVU7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyw0QkFBNEI7QUFKckMsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQVUsYUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsU0FBUztBQUFBLFVBQ1QsY0FBYztBQUFBLFVBQ2QsT0FBTyxDQUFDLFNBQVMsV0FBVztBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUEsTUFFbkIsVUFBVSxDQUFNLGFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osbUJBQW1CO0FBQUEsUUFDbkIsWUFBWTtBQUFBLFVBQ1YsaUJBQWlCO0FBQUEsVUFDakIsY0FBYztBQUFBLFFBQ2hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
