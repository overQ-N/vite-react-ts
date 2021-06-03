import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const url = 'http://10.0.0.124:60005'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/admin': {
        target: url,
        changeOrigin: true,
        // rewrite:(path)=>path.replace(/^\/admin/,'')
      },
    },
  },
})
