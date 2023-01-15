import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it(`should bundle less than 6.3kb`, async () => {
    expect((await testBundleSize(`import '@blueprintui/crane/include/crane.js'`, { optimize: true })).kb).toBeLessThan(6.3);
  });
});
