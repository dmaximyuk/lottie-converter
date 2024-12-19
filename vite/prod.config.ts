import { defineConfig } from "vite";

import { compilerOptions } from "../tsconfig.json";

import { defaultConfig } from "./default.config";

export default defineConfig({
  ...defaultConfig,
  base: "/zlottie",
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    outDir: compilerOptions.outDir,
    minify: "terser",
    manifest: false,
    terserOptions: {
      maxWorkers: 2,
      compress: {
        drop_debugger: true,
        drop_console: true,
        passes: 3,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("lottie-web")) {
            return "@lw";
          }
        },
        experimentalMinChunkSize: 15_000,
      },
    },
  },
});
