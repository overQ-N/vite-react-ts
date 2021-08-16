import { defineConfig, ConfigEnv, UserConfigExport, Plugin } from "vite";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import reactRefresh from "@vitejs/plugin-react-refresh";
import legacy from "@vitejs/plugin-legacy";
import { minifyHtml } from "vite-plugin-html";
import vitePluginImp from "vite-plugin-imp";
import createImportPlugin from "vite-plugin-import";
import tsconfigPaths from "vite-tsconfig-paths";
const resolve = (dir) => path.resolve(__dirname, dir);
const env = dotenv.config().parsed;

// https://vitejs.dev/config/
const config: UserConfigExport = {
  // base: "xx",
  // build: {
  //   lib: {
  //     // 自构建库
  //     entry: resolve("lib/main.ts"),
  //     name: "myLib",
  //   },
  //   rollupOptions: {
  //     // 自构建库不需要的依赖
  //     external: ["react"],
  //     output: {
  //       globals: {
  //         react: "React",
  //       },
  //     },
  //   },
  // },
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    legacy({
      targets: [
        "Android >= 39",
        "Chrome >= 50",
        "Safari >= 10.1",
        "iOS >= 10.3",
        "> 1%",
        "not IE 11",
      ],
    }),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "antd",
    //       style: (name) => {
    //         console.log(
    //           `object`,
    //           fs.existsSync(
    //             path.resolve(
    //               __dirname,
    //               `./node_modules/antd/es/${name}/style/index`
    //             )
    //           )
    //         );
    //         if (fs.existsSync(`./node_modules/antd/es/${name}/style/index`)) {
    //           return `antd/es/${name}/style/index`;
    //         }
    //         return false;
    //       },
    //     },
    //   ],
    // }),
  ],

  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // css module
        javascriptEnabled: true,
      },
    },
    modules: {
      // css  classNames: goods-list ---> goodsList
      localsConvention: "camelCase",
    },
  },
  server: {
    proxy: {
      "/code": {
        target: env.VITE_APP_API,
        changeOrigin: true,
      },
      "/upc": {
        target: env.VITE_APP_API,
        changeOrigin: true,
      },
      "/auth": {
        target: env.VITE_APP_API,
        changeOrigin: true,
      },
      "/admin": {
        target: env.VITE_APP_API,
        changeOrigin: true,
      },
    },
    // open: true,
  },
};

export default ({ command, mode }: ConfigEnv) => {
  // 官方策略顺序
  const envFiles: string[] = [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`,
  ];
  const { plugins = [], build = {} } = config;
  const isBuild = command === "build";
  // for (const file of envFiles) {
  //   try {
  //     fs.accessSync(file, fs.constants.F_OK);
  //     const envConfig = dotenv.parse(fs.readFileSync(file));
  //     for (const k in envConfig) {
  //       if (Object.prototype.hasOwnProperty.call(envConfig, k)) {
  //         process.env[k] = envConfig[k];
  //       }
  //     }
  //   } catch (error) {
  //     console.log("无配置文件");
  //   }
  // }
  if (isBuild) {
    // 生产模式下压缩html
    config.plugins = [...plugins, minifyHtml()];
    // config.define = {
    //   "process.env.NODE_ENV": "production",
    // };
  }

  return config;
};
