import config from '@blueprintui/test/web-test-runner.performance.js';

export default {
  ...config,
  files: ['./src/**/*.performance.ts'],
  testFramework: {
    config: {
      timeout: 60000,
      ui: 'bdd'
    }
  }
};
