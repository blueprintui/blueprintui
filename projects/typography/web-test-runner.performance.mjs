import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';
import { bundlePerformancePlugin } from 'web-test-runner-performance';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...jasmineTestRunnerConfig(),
  filterBrowserLogs: ({ args }) => args === 'randomize seed',
  files: ['./src/**/*.performance.js'],
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
  testFramework: {
    path: '../../node_modules/jasmine-core/lib/jasmine-core/jasmine.js'
  },
  plugins: [esbuildPlugin({ ts: true, target: 'esnext' }), bundlePerformancePlugin({ optimize: false })]
});
