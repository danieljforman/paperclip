import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function workspaceResolver(): Plugin {
  return {
    name: "workspace-resolver",
    enforce: "pre",
    resolveId(source) {
      const fixed: Record<string, string> = {
        "@": path.resolve(__dirname, "./src"),
        lexical: path.resolve(__dirname, "./node_modules/lexical/Lexical.mjs"),

        "@paperclipai/shared": path.resolve(__dirname, "../packages/shared/src/index.ts"),
        "@paperclipai/shared/telemetry": path.resolve(
          __dirname,
          "../packages/shared/src/telemetry/index.ts"
        ),

        "@paperclipai/db": path.resolve(__dirname, "../packages/db/src/index.ts"),

        "@paperclipai/adapter-utils": path.resolve(
          __dirname,
          "../packages/adapter-utils/src/index.ts"
        ),
        "@paperclipai/adapter-utils/server-utils": path.resolve(
          __dirname,
          "../packages/adapter-utils/src/server-utils.ts"
        ),

        "@paperclipai/plugin-sdk": path.resolve(
          __dirname,
          "../packages/plugins/sdk/src/index.ts"
        )
      };

      if (source in fixed) {
        return fixed[source];
      }

      const adapterMatch = source.match(
        /^@paperclipai\/adapter-([^/]+?)(?:\/(ui|server))?$/
      );

      if (adapterMatch) {
        const [, adapterName, subpath] = adapterMatch;
        if (subpath === "ui") {
          return path.resolve(
            __dirname,
            `../packages/adapters/${adapterName}/src/ui/index.ts`
          );
        }
        if (subpath === "server") {
          return path.resolve(
            __dirname,
            `../packages/adapters/${adapterName}/src/server/index.ts`
          );
        }
        return path.resolve(
          __dirname,
          `../packages/adapters/${adapterName}/src/index.ts`
        );
      }

      return null;
    }
  };
}

export default defineConfig({
  plugins: [workspaceResolver(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      lexical: path.resolve(__dirname, "./node_modules/lexical/Lexical.mjs")
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