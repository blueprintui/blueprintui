import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/shell.js';

describe('bp-shell performance', () => {
  it(`should bundle and treeshake under 17.6kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/shell.js', { optimize: true })).kb).toBeLessThan(
      17.6
    );
  });
});
