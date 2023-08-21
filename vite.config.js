// Plugins
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react({ fastRefresh: false }), svgr()],
    build:   {
        outDir:   'build',
        manifest: true,
    },
    test: {
        globals:     true,
        environment: 'jsdom',
        setupFiles:  './src/setupTests.js',
    },
});
