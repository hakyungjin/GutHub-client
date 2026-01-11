import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "types/index": "src/types/index.ts",
    "apis/index": "src/apis/index.ts",
    "stores/index": "src/stores/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "providers/index": "src/providers/index.ts",
    "components/index": "src/components/index.ts",
  },
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
  banner: {
    js: "'use client';",
  },
  clean: true,
  external: ["react", "react-native", "axios", "zustand", "@tanstack/react-query"],
  injectStyle: true,
});
