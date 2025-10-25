import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// อ่านค่า environment
const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: isDev
      ? {
          "/api": {
            target: "http://localhost:4000",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        }
      : undefined, // ❌ disable proxy ใน production
  },
  define: {
    __API_BASE_URL__: JSON.stringify(
      isDev ? "http://localhost:4000" : "https://your-backend.onrender.com"
    ),
  },
});