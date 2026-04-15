import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "./",

  build: {
    manifest: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        main: path.resolve(__dirname, "src/main.tsx"),
      },
    },
  },

  server: {
    host: "::",
    port: 8080,
  },
  // ИСПРАВЛЕННАЯ СЕКЦИЯ PLUGINS
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
