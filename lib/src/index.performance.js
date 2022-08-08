import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it('should keep layouts under 3.3kb', async () => {
    expect((await testBundleSize(`import './dist/lib/index.min.css'`, { optimize: true })).kb).toBeLessThan(1.3);
  });
});
