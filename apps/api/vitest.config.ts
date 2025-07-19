import path from 'path';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        environment: 'node',
        projects: [
            {
                extends: true,
                test: {
                    name: 'unit',
                    include: ['test/**/*.unit.test.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'e2e',
                    include: ['test/**/*.e2e.test.ts'],
                },
            },
        ],
        alias: {
            '~/': path.resolve('./src', __filename)
        }
    },
    plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
});
