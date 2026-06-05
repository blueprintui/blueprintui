import { testBundleSize } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/split-view.js';

describe('bp-split-view performance', () => {
  it(`should bundle and treeshake under 12kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/split-view.js', { optimize: true })).kb).toBeLessThan(
      12
    );
  });
});
