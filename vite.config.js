import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          global: ["globalthis", "default"],
        }),
      ],
    },
  },
  server: {
    proxy: {
      // proxy websocket and HTTP to backend
      "/ws": {
        target: "http://localhost:8080",
        ws: true, // <---- this is important for websockets
        changeOrigin: true,
      },
    },
  },
});
