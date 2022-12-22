import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it(`should bundle and treeshake all components`, async () => {
    expect((await testBundleSize(`import '@blueprintui/components/include/all.js'`, { optimize: true })).kb).toBeLessThan(31.5);
  });
});
