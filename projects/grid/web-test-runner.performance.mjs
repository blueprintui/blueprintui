import { resolve } from 'path';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner';
import { renderPerformancePlugin, bundlePerformancePlugin, performanceReporter } from 'web-test-runner-performance';
import baseConfig from './web-test-runner.config.mjs';

const aliases = [
  { find: /^@blueprintui\/grid\/(.+)/, replacement: resolve(process.cwd(), './dist/$1') },
  { find: /^@blueprintui\/themes\/(.+)/, replacement: resolve(process.cwd(), '../themes/dist/$1') }
];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...baseConfig,
  concurrency: 1,
  concurrentBrowsers: 1,
  files: ['./src/**/*.performance.ts'],
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        headless: true, // !!process.env.GITHUB_ACTION
        args: ['--enable-experimental-web-platform-features']
      }
    })
  ],
  plugins: [
    ...baseConfig.plugins,
    renderPerformancePlugin(),
    bundlePerformancePlugin({
      aliases,
      optimize: false
      // writePath: `./.performance`,
      // external: []
    })
  ],
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    performanceReporter({ writePath: `./.performance` })
  ]
});
