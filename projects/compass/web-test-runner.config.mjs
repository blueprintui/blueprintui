import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { jasmineTestRunnerConfig } from 'web-test-runner-jasmine';

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...jasmineTestRunnerConfig(),
  files: ['./src/**/*.spec.ts'],
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
  plugins: [esbuildPlugin({ ts: true, target: 'es2022', tsconfig: './tsconfig.spec.json' })]
});
