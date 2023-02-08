import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-sort.js';

describe('bp-button-sort performance', () => {
  const element = html`<bp-button-sort></bp-button-sort>`;

  it(`should bundle and treeshake under 11kb`, async () => {
    expect((await testBundleSize('@blueprintui/components/include/button-sort.js', { optimize: true })).kb).toBeLessThan(11);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
