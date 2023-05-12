import { playwrightLauncher } from '@web/test-runner-playwright';
import { defaultReporter } from '@web/test-runner';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';
import { bundlePerformancePlugin, performanceReporter } from 'web-test-runner-performance';

const aliases = [{ find: /^@blueprintui\/themes\/(.+)\.css$/, replacement: `${process.cwd()}/dist/lib/$1.css` }];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...jasmineTestRunnerConfig(),
  nodeResolve: true,
  dedupe: true,
  concurrency: 1,
  concurrentBrowsers: 1,
  files: ['./src/**/*.performance.js'],
  testFramework: {
    path: '../../node_modules/jasmine-core/lib/jasmine-core/jasmine.js'
  },
  browsers: [playwrightLauncher({ product: 'chromium', launchOptions: { headless: !!process.env.GITHUB_ACTION } })],
  plugins: [bundlePerformancePlugin({ aliases, optimize: false })],
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    performanceReporter({ writePath: `./dist/performance` })
  ]
});
