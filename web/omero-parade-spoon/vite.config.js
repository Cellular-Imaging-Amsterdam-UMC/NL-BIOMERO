import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'omero_parade',
      fileName: 'bundle'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue'
        // }
      }
    },
    outDir: "omero_parade/static/omero_parade/js"
  },
  mode: 'production',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env': {}
  }
})

