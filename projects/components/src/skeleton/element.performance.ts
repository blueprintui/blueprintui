import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/skeleton.js';

describe('bp-skeleton performance', () => {
  const element = html` <bp-skeleton effect="pulse" shape="rect"></bp-skeleton> `;

  it(`should bundle and treeshake under 6.5kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/skeleton.js', { optimize: true })).kb).toBeLessThan(
      6.5
    );
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
