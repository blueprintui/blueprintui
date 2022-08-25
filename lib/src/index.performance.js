import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it('should keep layouts under 3.1kb', async () => {
    expect((await testBundleSize(`import './dist/index.min.css'`, { optimize: true })).kb).toBeLessThan(3.1);
  });
});
