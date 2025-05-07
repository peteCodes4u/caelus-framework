// this file is used to configure the vite build process. Vite is a build tool that is used to build the client side of the application. Vite will not be used in the production build of the application. The production build will be done using webpack.
// https://vitejs.dev/config/

// import { defineConfig } from 'vite' to define the configuration of the vite build process.
import { defineConfig } from 'vite'

// import react from '@vitejs/plugin-react' to use the react plugin for vite. react is a plugin that is used to enable react support in vite. react will be used for our UI components.
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/graphql': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})