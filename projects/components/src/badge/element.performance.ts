import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/badge.js';

describe('bp-badge performance', () => {
  const element = html`<bp-badge>1</bp-badge>`;

  it(`should bundle and treeshake under 7kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/badge.js', { optimize: true })).kb).toBeLessThan(7);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
