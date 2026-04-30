import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig, loadEnv } from "vite"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
    plugins: [react(), svgr()],
    server: {
      port: 8178,
    },
    preview: {
      port: 8178,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
