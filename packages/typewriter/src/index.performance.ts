import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('performance', () => {
  it(`should bundle less than 7.2kb`, async () => {
    expect(
      (await testBundleSize(`import '@blueprintui/typewriter/include/keynav.js'`, { optimize: true })).kb
    ).toBeLessThan(7.2);
  });
});
