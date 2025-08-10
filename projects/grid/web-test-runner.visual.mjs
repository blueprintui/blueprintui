import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';
import execute from 'rollup-plugin-shell';
import baseConfig from './web-dev-server.config.mjs';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...jasmineTestRunnerConfig(),
  testFramework: {
    config: {
      defaultTimeoutInterval: 60000,
      styles: [
        './node_modules/@blueprintui/themes/dist/index.min.css',
        './node_modules/@blueprintui/themes/dist/index.min.css',
        './node_modules/@blueprintui/themes/dist/dark/index.min.css',
        './node_modules/@blueprintui/typography/dist/index.min.css',
        './node_modules/@blueprintui/layout/dist/index.min.css'
      ]
    }
  },
  files: ['./src/**/*.visual.ts'],
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        args: ['--enable-experimental-web-platform-features']
      }
    })
  ],
  nodeResolve: true,
  dedupe: true,
  plugins: [
    ...baseConfig.plugins,
    // https://github.com/evanw/esbuild/issues/2220#issuecomment-1116082001
    esbuildPlugin({ ts: true, target: 'auto' }),
    fromRollup(execute)({ commands: [`tsc --noEmit src/**/*.visual.ts`], hook: 'writeBundle' }),
    visualRegressionPlugin({
      update: process.argv.includes('--update-visual-baseline'),
      failureThreshold: 5
    })
  ]
});
