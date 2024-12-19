import { InlineConfig } from "vite";
import path from "node:path";

import core from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsPaths from "vite-tsconfig-paths";
import { compression } from "vite-plugin-compression2";
import { analyzer } from "vite-bundle-analyzer";

export const defaultConfig: InlineConfig = {
  appType: "spa",
  publicDir: "public",
  assetsInclude: ["**/*.tgs"],
  plugins: [
    tsPaths(),
    core(),
    svgr(),
    compression({
      algorithm: "gzip",
      threshold: 10_000,
      deleteOriginalAssets: true,
    }),
    // analyzer(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
};
