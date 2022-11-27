import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner';
import { renderPerformancePlugin, bundlePerformancePlugin, performanceReporter } from 'web-test-runner-performance';
import baseConfig from './web-test-runner.config.mjs';

const aliases = [
  { find: /^@blueprintui\/icons\/include\/(.+)\.js$/, replacement: `${process.cwd()}/dist/lib/include/$1.js` },
  { find: /^@blueprintui\/icons\/([^.]+)$/, replacement: `${process.cwd()}/dist/lib/$1/index.js` },
  { find: /^@blueprintui\/icons\/(.+)\.js$/, replacement: `${process.cwd()}/dist/lib/$1.js` },
];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...baseConfig,
  concurrency: 1,
  concurrentBrowsers: 1,
  files: ['./src/**/*.performance.ts'],
  browsers: [playwrightLauncher({ product: 'chromium', launchOptions: { headless: !!process.env.GITHUB_ACTION } })],
  plugins: [
    ...baseConfig.plugins,
    renderPerformancePlugin(),
    bundlePerformancePlugin({
      aliases,
      optimize: false,
      // writePath: `./dist/performance`, // uncomment to see bundle output with sourcemaps
      // external: [] // externals are not used so each bundle measured includes all third party dependencies
    }),
  ],
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    performanceReporter({ writePath: `./dist/performance` }),
  ],
});
