import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      lexical: path.resolve(__dirname, "./node_modules/lexical/Lexical.mjs"),

      // Force Vite to resolve internal workspace packages from source during UI build
      "@paperclipai/shared": path.resolve(__dirname, "../packages/shared/src/index.ts"),
      "@paperclipai/shared/telemetry": path.resolve(__dirname, "../packages/shared/src/telemetry/index.ts"),

      "@paperclipai/db": path.resolve(__dirname, "../packages/db/src/index.ts"),
      "@paperclipai/adapter-utils": path.resolve(__dirname, "../packages/adapter-utils/src/index.ts"),
      "@paperclipai/adapter-utils/server-utils": path.resolve(
        __dirname,
        "../packages/adapter-utils/src/server-utils.ts"
      ),

      "@paperclipai/adapter-claude-local": path.resolve(
        __dirname,
        "../packages/adapters/claude-local/src/index.ts"
      ),
      "@paperclipai/adapter-claude-local/server": path.resolve(
        __dirname,
        "../packages/adapters/claude-local/src/server/index.ts"
      ),

      "@paperclipai/adapter-codex-local": path.resolve(
        __dirname,
        "../packages/adapters/codex-local/src/index.ts"
      ),
      "@paperclipai/adapter-cursor-local": path.resolve(
        __dirname,
        "../packages/adapters/cursor-local/src/index.ts"
      ),
      "@paperclipai/adapter-gemini-local": path.resolve(
        __dirname,
        "../packages/adapters/gemini-local/src/index.ts"
      ),
      "@paperclipai/adapter-openclaw-gateway": path.resolve(
        __dirname,
        "../packages/adapters/openclaw-gateway/src/index.ts"
      ),
      "@paperclipai/adapter-opencode-local": path.resolve(
        __dirname,
        "../packages/adapters/opencode-local/src/index.ts"
      ),
      "@paperclipai/adapter-pi-local": path.resolve(
        __dirname,
        "../packages/adapters/pi-local/src/index.ts"
      ),

      "@paperclipai/plugin-sdk": path.resolve(
        __dirname,
        "../packages/plugins/sdk/src/index.ts"
      )
    }
  },
  server: {
    port: 5173,
    watch: process.cwd().startsWith("/mnt/")
      ? { usePolling: true, interval: 1000 }
      : undefined,
    proxy: {
      "/api": {
        target: "http://localhost:3100",
        ws: true
      }
    }
  }
});