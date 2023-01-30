import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3031,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: "antd",
          libDirectory: "es",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // Support inline JavaScript
        modifyVars: {
          "primary-color": "#ED4E60",
          "link-color": "#111",
        },
      },
    },
  },
});
