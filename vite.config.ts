import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return require("./vite/dev.config").default;
  } else if (mode === "production") {
    return require("./vite/prod.config").default;
  }
});
