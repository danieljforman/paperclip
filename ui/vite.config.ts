import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      {
        find: "lexical",
        replacement: path.resolve(__dirname, "./node_modules/lexical/Lexical.mjs")
      },

      // Shared
      {
        find: "@paperclipai/shared/telemetry",
        replacement: path.resolve(__dirname, "../packages/shared/src/telemetry/index.ts")
      },
      {
        find: "@paperclipai/shared",
        replacement: path.resolve(__dirname, "../packages/shared/src/index.ts")
      },

      // DB
      {
        find: "@paperclipai/db",
        replacement: path.resolve(__dirname, "../packages/db/src/index.ts")
      },

      // Adapter utils
      {
        find: "@paperclipai/adapter-utils/server-utils",
        replacement: path.resolve(__dirname, "../packages/adapter-utils/src/server-utils.ts")
      },
      {
        find: "@paperclipai/adapter-utils",
        replacement: path.resolve(__dirname, "../packages/adapter-utils/src/index.ts")
      },

      // Claude local — specific subpaths FIRST
      {
        find: "@paperclipai/adapter-claude-local/ui",
        replacement: path.resolve(__dirname, "../packages/adapters/claude-local/src/ui/index.ts")
      },
      {
        find: "@paperclipai/adapter-claude-local/server",
        replacement: path.resolve(__dirname, "../packages/adapters/claude-local/src/server/index.ts")
      },
      {
        find: "@paperclipai/adapter-claude-local",
        replacement: path.resolve(__dirname, "../packages/adapters/claude-local/src/index.ts")
      },

      // Cursor local — specific subpaths FIRST
      {
        find: "@paperclipai/adapter-cursor-local/ui",
        replacement: path.resolve(__dirname, "../packages/adapters/cursor-local/src/ui/index.ts")
      },
      {
        find: "@paperclipai/adapter-cursor-local/server",
        replacement: path.resolve(__dirname, "../packages/adapters/cursor-local/src/server/index.ts")
      },
      {
        find: "@paperclipai/adapter-cursor-local",
        replacement: path.resolve(__dirname, "../packages/adapters/cursor-local/src/index.ts")
      },

      // Codex local — specific subpaths FIRST
      {
        find: "@paperclipai/adapter-codex-local/ui",
        replacement: path.resolve(__dirname, "../packages/adapters/codex-local/src/ui/index.ts")
      },
      {
        find: "@paperclipai/adapter-codex-local/server",
        replacement: path.resolve(__dirname, "../packages/adapters/codex-local/src/server/index.ts")
      },
      {
        find: "@paperclipai/adapter-codex-local",
        replacement: path.resolve(__dirname, "../packages/adapters/codex-local/src/index.ts")
      },

      // Other adapters
      {
        find: "@paperclipai/adapter-gemini-local",
        replacement: path.resolve(__dirname, "../packages/adapters/gemini-local/src/index.ts")
      },
      {
        find: "@paperclipai/adapter-openclaw-gateway",
        replacement: path.resolve(__dirname, "../packages/adapters/openclaw-gateway/src/index.ts")
      },
      {
        find: "@paperclipai/adapter-opencode-local",
        replacement: path.resolve(__dirname, "../packages/adapters/opencode-local/src/index.ts")
      },
      {
        find: "@paperclipai/adapter-pi-local",
        replacement: path.resolve(__dirname, "../packages/adapters/pi-local/src/index.ts")
      },

      // Plugin SDK
      {
        find: "@paperclipai/plugin-sdk",
        replacement: path.resolve(__dirname, "../packages/plugins/sdk/src/index.ts")
      }
    ]
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