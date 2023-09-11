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
        '../../node_modules/@blueprintui/themes/index.min.css',
        '../../node_modules/@blueprintui/themes/index.min.css',
        '../../node_modules/@blueprintui/themes/dark/index.min.css',
        '../../node_modules/@blueprintui/typography/index.min.css',
        '../../node_modules/@blueprintui/layout/index.min.css'
      ]
    }
  },
  files: ['./src/**/*.visual.ts'],
  browsers: [playwrightLauncher({ product: 'chromium' })],
  nodeResolve: true,
  dedupe: true,
  plugins: [
    ...baseConfig.plugins,
    // https://github.com/evanw/esbuild/issues/2220#issuecomment-1116082001
    esbuildPlugin({ ts: true, target: 'es2020' }),
    fromRollup(execute)({ commands: [`tsc --noEmit src/**/*.visual.ts`], hook: 'writeBundle' }),
    visualRegressionPlugin({
      update: process.argv.includes('--update-visual-baseline'),
      failureThreshold: 5
    })
  ]
});
