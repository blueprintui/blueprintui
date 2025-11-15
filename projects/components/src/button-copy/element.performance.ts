import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-copy.js';

describe('bp-button-copy performance', () => {
  const element = html`<bp-button-copy value="test">copy</bp-button-copy>`;

  it(`should bundle and treeshake button-copy under 13kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-copy.js', { optimize: true })).kb
    ).toBeLessThan(13);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
