import { testBundleSize, testRenderTime, html } from 'web-test-runner-performance/browser.js';
import '@blueprintui/components/include/button-handle.js';

describe('bp-button-handle performance', () => {
  const element = html`<bp-button-handle></bp-button-handle>`;

  it(`should bundle and treeshake under 9.7kb`, async () => {
    expect(
      (await testBundleSize('@blueprintui/components/include/button-handle.js', { optimize: true })).kb
    ).toBeLessThan(9.7);
  });

  it(`should render under 20ms`, async () => {
    expect((await testRenderTime(element)).duration).toBeLessThan(20);
  });
});
