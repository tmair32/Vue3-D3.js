import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

import { resolve } from "path";
import { readFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Pages({
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: "",
        },
      ],
      extensions: ["vue"],
      extendRoute(route) {
        // Get inspired from anthony fu"s personal website
        // https://github.com/antfu/antfu.me
        const path = resolve(__dirname, route.component.slice(1));
        const md = readFileSync(path, "utf-8");
      },
    }),
    eslintPlugin(),
    vue(),
    WindiCSS(),
  ],
});
