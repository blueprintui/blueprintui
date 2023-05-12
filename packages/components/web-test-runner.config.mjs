import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';
import execute from 'rollup-plugin-shell';
import baseConfig from './web-dev-server.config.mjs';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  // uncomment open/manual to debug in browser
  // open: true,
  // manual: true,
  ...jasmineTestRunnerConfig(),
  testFramework: {
    config: {
      styles: [
        '../../node_modules/@blueprintui/themes/index.min.css',
        '../../node_modules/@blueprintui/themes/modern/index.min.css',
        '../../node_modules/@blueprintui/themes/modern-dark/index.min.css',
        '../../node_modules/@blueprintui/typography/index.min.css',
        '../../node_modules/@blueprintui/layout/index.min.css'
      ]
    }
  },
  files: ['./src/**/*.spec.ts'],
  browsers: [playwrightLauncher({ product: 'chromium' })],
  coverageConfig: {
    extension: ['.ts'],
    exclude: [
      '**/*.d.ts',
      '**/node_modules/**',
      '**/test/**',
      '**/dist/lib/**/*.css.js',
      '**/dist/lib/**/index.js',
      '**/dist/lib/include/*.js',
      '**/dist/lib/icons/*.js'
    ],
    report: true,
    reportDir: 'dist/coverage',
    threshold: {
      statements: 90,
      branches: 85,
      functions: 80,
      lines: 90
    }
  },
  nodeResolve: true,
  dedupe: true,
  plugins: [
    ...baseConfig.plugins,
    // https://github.com/evanw/esbuild/issues/2220#issuecomment-1116082001
    esbuildPlugin({ ts: true, target: 'es2020' }),
    fromRollup(execute)({ commands: [`tsc --noEmit src/**/*.spec.ts src/**/*.spec.*`], hook: 'writeBundle' })
  ]
});
