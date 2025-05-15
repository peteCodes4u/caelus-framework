// this file is used to configure the vite build process. Vite is a build tool that is used to build the client side of the application. Vite will not be used in the production build of the application. The production build will be done using webpack.
// https://vitejs.dev/config/

// import { defineConfig } from 'vite' to define the configuration of the vite build process.
import { defineConfig } from 'vite';

// import dotenv for environment variables. dotenv is a module that is used to load environment variables from a .env file into process.env. dotenv will be used to load the environment variables for the client side of the application.
import dotenv from 'dotenv';
// initialize dotenv to load the environment variables.
dotenv.config();
const vPort = parseInt(process.env.VITE_PORT);

// import react from '@vitejs/plugin-react' to use the react plugin for vite. react will be used for our UI components.
import react from '@vitejs/plugin-react';



export default defineConfig({
    plugins: [react()],
    server: {
        port: vPort,
        open: true,
        proxy: {
            '/graphql': {
                target: `http://localhost:${vPort + 1}`,
                changeOrigin: true,
                secure: false,
            }
        }
    }
})