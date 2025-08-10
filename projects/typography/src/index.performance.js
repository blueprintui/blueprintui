import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it('should build under 1.1kb', async () => {
    expect((await testBundleSize(`import './dist/index.min.css'`, { optimize: true })).kb).toBeLessThan(1.1);
  });
});
