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
  filterBrowserLogs: ({ args }) => args === 'randomize seed',
  testFramework: {
    config: {
      styles: ['./node_modules/@blueprintui/themes/dist/index.min.css']
    }
  },
  files: ['./src/**/*.spec.ts'],
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        args: ['--enable-experimental-web-platform-features']
      }
    })
  ],
  coverageConfig: {
    include: ['**'], // https://github.com/modernweb-dev/web/issues/1400#issuecomment-1543733840
    exclude: ['**/*.d.ts', '**/node_modules/**', '**/dist/**/index.js'],
    report: true,
    reportDir: '.coverage',
    threshold: {
      statements: 90,
      branches: 85,
      functions: 50,
      lines: 90
    }
  },
  nodeResolve: true,
  dedupe: true,
  plugins: [
    ...baseConfig.plugins,
    // https://github.com/evanw/esbuild/issues/2220#issuecomment-1116082001
    esbuildPlugin({ ts: true, target: 'es2022', tsconfig: './tsconfig.spec.json' }),
    fromRollup(execute)({ commands: [`tsc --noEmit src/**/*.spec.ts src/**/*.spec.*`], hook: 'writeBundle' })
  ]
});
