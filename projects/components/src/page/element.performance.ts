import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/page.js';

describe('bp-page performance', () => {
  it(`should bundle and treeshake under 17.6kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/page.js', { optimize: true })).kb).toBeLessThan(17.6);
  });
});
