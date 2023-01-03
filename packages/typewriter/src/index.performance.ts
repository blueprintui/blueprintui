import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it(`should bundle less than 6.6kb`, async () => {
    expect((await testBundleSize(`import '@blueprintui/typewriter/include/keylist.js'`, { optimize: true })).kb).toBeLessThan(6.6);
  });
});
