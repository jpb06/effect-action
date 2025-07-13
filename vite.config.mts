import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// biome-ignore lint/style/noDefaultExport: vitest
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    logHeapUsage: true,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov', 'json-summary'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.type.ts',
        'src/**/index.ts',
      ],
    },
  },
});
